// Example Vercel/Netlify-style serverless function.
// Expects environment variables:
// PAYSTACK_SECRET_KEY, VITE_SUPABASE_URL (or SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY

import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const env =
  typeof globalThis !== "undefined" &&
  globalThis["process"] &&
  globalThis["process"].env
    ? globalThis["process"].env
    : {};
const SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || "";
const PAYSTACK_SECRET_KEY = "sk_live_29af43e7481d63fea57397d8090952be51f98cda";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  const { reference, orderId } = req.body || {};
  if (!reference || !orderId)
    return res.status(400).json({ error: "Missing reference or orderId" });
  if (!PAYSTACK_SECRET_KEY)
    return res
      .status(500)
      .json({ error: "Server misconfigured: missing PAYSTACK_SECRET_KEY" });

  try {
    const verifyResp = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        headers: {
          Authorization: `Bearer ${`sk_live_29af43e7481d63fea57397d8090952be51f98cda`}`,
        },
      }
    );
    const verifyJson = await verifyResp.json();
    if (!verifyJson || !verifyJson.status || !verifyJson.data) {
      return res
        .status(500)
        .json({ verified: false, error: "Invalid response from Paystack" });
    }

    const success =
      verifyJson.status === true && verifyJson.data.status === "success";
    if (success) {
      const payment_channel = verifyJson.data.channel || null;
      const paid_at = new Date(
        verifyJson.data.paid_at || Date.now()
      ).toISOString();
      // update order row
      const { error } = await supabase
        .from("orders")
        .update({
          paid: true,
          paid_at,
          payment_reference: reference,
          payment_channel,
          status: "paid",
          unread: true,
        })
        .eq("id", orderId);
      if (error) {
        console.error("Supabase update error", error);
        return res
          .status(500)
          .json({ verified: false, error: "Failed to update order" });
      }
      // Send notification email to admin (optional, via SendGrid)
      try {
        const SENDGRID_KEY = env.SENDGRID_API_KEY || "";
        const ADMIN_EMAIL = env.ADMIN_EMAIL || "";
        if (SENDGRID_KEY && ADMIN_EMAIL) {
          const sgBody = {
            personalizations: [
              {
                to: [{ email: ADMIN_EMAIL }],
                subject: `New paid order #${orderId}`,
              },
            ],
            content: [
              {
                type: "text/plain",
                value: `Order ${orderId} has been paid.\nCustomer: ${
                  verifyJson.data.customer
                    ? verifyJson.data.customer.email || ""
                    : ""
                }\nAmount: ${
                  verifyJson.data.amount / 100
                }\nReference: ${reference}\n`,
              },
            ],
            from: { email: ADMIN_EMAIL },
          };
          await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${SENDGRID_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sgBody),
          });
        }
      } catch (mailErr) {
        console.error("Failed to send admin email", mailErr);
      }

      return res.status(200).json({ verified: true, data: verifyJson.data });
    }

    return res.status(200).json({ verified: false, data: verifyJson.data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ verified: false, error: String(err) });
  }
}
