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

  const transportFee = delivery === "physical" ? 1000 : 0;
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

      const handler = window.PaystackPop.setup({
        key: pk,
        email,
        amount: Math.round(total * 100),
        currency: "NGN",
        ref: reference,
        metadata: { orderId },
        callback: function (response) {
          // ⭐ NO async keyword - Paystack doesn't allow it
          console.log("✅ Payment successful:", response);

          // Use .then() instead of async/await
          const verifyUrl = import.meta.env.VITE_PAYSTACK_VERIFY_URL;

          if (verifyUrl) {
            // ⭐ OPTION 1: Verify with backend
            fetch(verifyUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                reference: response.reference,
                orderId,
              }),
            })
              .then((res) => {
                if (!res.ok) {
                  return res.text().then((errorText) => {
                    console.error("Verification API error:", errorText);
                    throw new Error(
                      `Verification failed: ${res.status} ${res.statusText}`
                    );
                  });
                }

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                  return res.text().then((text) => {
                    console.error("Non-JSON response:", text);
                    throw new Error("Server returned non-JSON response");
                  });
                }

                return res.json();
              })
              .then((json) => {
                if (json.verified) {
                  // Update order status to completed
                  return supabase
                    .from("orders")
                    .update({
                      status: "completed",
                      payment_reference: response.reference,
                      payment_status: "paid",
                    })
                    .eq("id", orderId)
                    .then(() => {
                      toast.show("Payment verified — order completed", {
                        type: "success",
                      });
                      clearCart();
                      setSuccess(true);
                      setTimeout(() => {
                        setSuccess(false);
                        onClose && onClose();
                      }, 2000);
                    });
                } else {
                  throw new Error("Payment verification failed");
                }
              })
              .catch((err) => {
                console.error("Payment verification error:", err);

                // Still update order with payment info
                supabase
                  .from("orders")
                  .update({
                    status: "payment_pending_verification",
                    payment_reference: response.reference,
                    payment_notes: `Verification error: ${err.message}`,
                  })
                  .eq("id", orderId)
                  .then(() => {
                    toast.show(
                      "Payment received but verification failed. We'll process your order manually. Order ID: " +
                        orderId,
                      { type: "warning", duration: 5000 }
                    );

                    clearCart();
                    setSuccess(true);
                    setTimeout(() => {
                      setSuccess(false);
                      onClose && onClose();
                    }, 3000);
                  });
              });
          } else {
            // ⭐ OPTION 2: No backend - directly update Supabase
            supabase
              .from("orders")
              .update({
                status: "completed",
                payment_reference: response.reference,
                payment_status: "paid",
                paid_at: new Date().toISOString(),
              })
              .eq("id", orderId)
              .then(() => {
                toast.show("Payment successful — order completed!", {
                  type: "success",
                });
                clearCart();
                setSuccess(true);
                setTimeout(() => {
                  setSuccess(false);
                  onClose && onClose();
                }, 2000);
              })
              .catch((err) => {
                console.error("Order update error:", err);
                toast.show(
                  "Payment successful but order update failed. Contact support with Order ID: " +
                    orderId,
                  {
                    type: "warning",
                    duration: 5000,
                  }
                );
              });
          }
        },
        onClose: function () {
          toast.show("Payment window closed", { type: "info", duration: 2500 });
          setLoading(false);
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error("Order creation error:", err);
      toast.show(`Failed to create order: ${err.message}`, { type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-green-600 font-semibold text-lg mb-2">
              Order Successful!
            </div>
            <div className="text-sm text-gray-600">
              Your order will be delivered within 48 hours.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="+234 XXX XXX XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Location (for delivery)
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="Lagos, Nigeria"
              />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <label className="block text-sm font-medium mb-2">
                Delivery type:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={delivery === "physical"}
                    onChange={() => setDelivery("physical")}
                    className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-sm">
                    Physical copy (+₦1,000 transport)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={delivery === "pdf"}
                    onChange={() => setDelivery("pdf")}
                    className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-sm">PDF (Free)</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => onClose && onClose()}
                className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Proceed to Payment"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
