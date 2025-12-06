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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
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
        className="relative z-50 w-full max-w-md bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={() => {
            setOpen(false);
            if (onClose) onClose();
          }}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="px-8 pt-14 pb-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get exclusive updates and new releases. Join our newsletter — one
              quick step.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                aria-label="Email address"
              />
              {error && (
                <p className="mt-2.5 text-sm text-red-600 flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={handleSend}
              disabled={sent}
              className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-xl font-medium hover:bg-gray-800 active:bg-gray-950 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {sent ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Sent
                </span>
              ) : (
                "Send"
              )}
            </button>

            <button
              onClick={() => {
                setOpen(false);
                if (onClose) onClose();
              }}
              className="w-full text-gray-600 px-6 py-2.5 rounded-xl font-medium hover:text-gray-900 hover:bg-gray-50 transition-all text-sm"
            >
              Maybe later
            </button>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-gray-400 text-center mt-7">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
