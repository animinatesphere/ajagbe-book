import React, { useState, useContext } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { CartContext } from "../context/CartContext";
import { useToast } from "../context/useToast";

export default function OrderForm({ open, onClose }) {
  const { items, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState("physical"); // 'physical' or 'pdf'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = items.reduce((s, it) => {
    const n = String(it.price || "").replace(/[^0-9.]/g, "");
    return s + parseFloat(n || "0") * (it.qty || 1);
  }, 0);

  const transportFee = delivery === "physical" ? 2 : 0;
  const total = subtotal + transportFee;

  const toast = useToast();

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.show("Please provide name and email", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        toast.show(
          "Supabase not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env and restart the dev server",
          { type: "error", duration: 6000 }
        );
        setLoading(false);
        return;
      }
      const payload = {
        items: JSON.stringify(items || []),
        total: `₦${total.toFixed(2)}`,
        name,
        email,
        location: location || null,
        phone: phone || null,
        delivery_type: delivery,
        transport_fee: transportFee,
        status: "pending",
        unread: true,
        created_at: new Date().toISOString(),
        deliver_by: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      };

      // insert order first (pending)
      const { data: inserted, error: insertErr } = await supabase
        .from("orders")
        .insert([payload])
        .select()
        .single();
      if (insertErr) throw insertErr;

      const orderId = inserted.id;

      const loadPaystack = () => {
        return new Promise((resolve, reject) => {
          if (window.PaystackPop) return resolve();
          const s = document.createElement("script");
          s.src = "https://js.paystack.co/v1/inline.js";
          s.onload = () => resolve();
          s.onerror = () => reject(new Error("Failed to load Paystack script"));
          document.body.appendChild(s);
        });
      };

      // prepare Paystack
      await loadPaystack();
      const pk = "pk_live_1e4ccb71f9c9b5ae46fc03fc3e44b09bd319b1ff";
      if (!pk) {
        toast.show("Missing Paystack public key (VITE_PAYSTACK_PUBLIC_KEY)", {
          type: "error",
        });
        return;
      }

      const reference = `order_${orderId}_${Date.now()}`;

      // update order with reference (optional)
      // await supabase
      //   .from("orders")
      //   .update({ payment_reference: reference })
      //   .eq("id", orderId);

      const handler = window.PaystackPop.setup({
        key: pk,
        email,
        amount: Math.round(total * 100),
        currency: "NGN",
        ref: reference,
        metadata: { orderId },
        callback: function (response) {
          // ✅ Changed from async function
          // Verify payment
          fetch(
            import.meta.env.VITE_PAYSTACK_VERIFY_URL || "/api/paystack-verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                reference: response.reference,
                orderId,
              }),
            }
          )
            .then((res) => res.json())
            .then((json) => {
              if (json.verified) {
                toast.show("Payment verified — order completed", {
                  type: "success",
                });
                clearCart();
                setSuccess(true);
                setTimeout(() => {
                  setSuccess(false);
                  onClose && onClose();
                }, 1500);
              } else {
                toast.show("Payment could not be verified. Contact admin.", {
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.error(err);
              toast.show("Payment verification failed. Check console.", {
                type: "error",
              });
            });
        },
        onClose: function () {
          toast.show("Payment window closed", { type: "info", duration: 2500 });
        },
      });
      handler.openIframe();
    } catch (err) {
      console.error(err);
      toast.show("Failed to create order. Check console.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6">
        <h3 className="text-xl font-semibold mb-3">Complete Order</h3>
        <p className="text-sm text-gray-600 mb-4">
          Total: <strong>₦{total.toFixed(2)}</strong>{" "}
          {transportFee > 0 && (
            <span className="text-xs text-gray-500">
              (includes ₦{transportFee} transport)
            </span>
          )}
        </p>
        {success ? (
          <div className="p-6 text-center">
            <div className="text-green-600 font-semibold mb-2">
              Order sent to admin
            </div>
            <div className="text-sm text-gray-600">
              Your order will be delivered within 48 hours.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm">Phone number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm">Location (for delivery)</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm">Delivery type:</label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  checked={delivery === "physical"}
                  onChange={() => setDelivery("physical")}
                />{" "}
                Physical copy
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  checked={delivery === "pdf"}
                  onChange={() => setDelivery("pdf")}
                />{" "}
                PDF
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => onClose && onClose()}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-gray-900 text-white rounded"
              >
                {loading ? "Sending..." : "Send order"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
