import React, { useEffect, useState } from "react";

export default function SubscribeModal({ onClose }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // show modal on mount (page refresh)
    const t = setTimeout(() => setOpen(true), 150);
    return () => clearTimeout(t);
  }, []);

  const validateEmail = (v) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const handleSend = () => {
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // simulate send
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      if (onClose) onClose();
    }, 700);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50 animate__animated animate__fadeIn"
        aria-hidden
        onClick={() => {
          setOpen(false);
          if (onClose) onClose();
        }}
      />

      {/* modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-50 w-full max-w-lg mx-4 bg-white rounded-2xl p-6 md:p-8 shadow-2xl animate__animated animate__zoomIn"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f97316] to-[#e11d48] flex items-center justify-center text-white text-2xl font-bold">
              ✉️
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-[#111827]">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm text-[#6b7280]">Get exclusive updates and new releases. Join our newsletter — one quick step.</p>

            <div className="mt-4">
              <label className="sr-only">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e4573d]"
                aria-label="Email address"
              />
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleSend}
                className="inline-flex items-center gap-2 bg-[#e4573d] text-white px-4 py-2 rounded-md shadow hover:brightness-95 transition"
              >
                {sent ? "Sent" : "Send"}
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  if (onClose) onClose();
                }}
                className="text-sm text-gray-600 hover:underline"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
