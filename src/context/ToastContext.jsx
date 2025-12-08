import React, { useState, useCallback } from "react";
import { ToastContext } from "./ToastCore";

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, opts = {}) => {
    const id = ++idCounter;
    const toast = { id, message, type: opts.type || "info", duration: opts.duration || 4000 };
    setToasts((t) => [toast, ...t]);
    if (toast.duration > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, toast.duration);
    }
    return id;
  }, []);

  const hide = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      <div aria-live="polite" className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div key={t.id} className={`max-w-sm w-full px-4 py-3 rounded-lg shadow-lg border ${t.type === 'error' ? 'bg-red-50 border-red-200' : t.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className={`text-sm ${t.type === 'error' ? 'text-red-800' : t.type === 'success' ? 'text-green-800' : 'text-gray-800'}`}>{t.message}</div>
                {t.type !== 'info' && <div className="text-xs text-gray-500 mt-1">{t.type.toUpperCase()}</div>}
              </div>
              <button onClick={() => hide(t.id)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

