import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function PageLoader({ minDuration = 600 }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader on initial mount (defer setState to avoid sync state change in effect)
    let mounted = true;
    const s = setTimeout(() => setLoading(true), 0);
    const t = setTimeout(() => {
      if (mounted) setLoading(false);
    }, minDuration);

    return () => {
      mounted = false;
      clearTimeout(s);
      clearTimeout(t);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Show loader briefly on every route change
    let mounted = true;
    const s = setTimeout(() => setLoading(true), 0);
    const t = setTimeout(() => {
      if (mounted) setLoading(false);
    }, minDuration);
    return () => {
      mounted = false;
      clearTimeout(s);
      clearTimeout(t);
    };
  }, [location.pathname, minDuration]);

  if (!loading) return null;

  return (
    <div
      aria-hidden={!loading}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white"
    >
      <div className="flex flex-col items-center gap-6 p-6 rounded-xl shadow-2xl bg-white/95 backdrop-blur-md w-[min(640px,92%)] max-w-full">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center shadow-lg animate-pulse">
            <BookOpen className="w-10 h-10 text-indigo-700" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Ajagbe Books</h3>
            <p className="text-sm text-gray-500">Loading the page — one moment please...</p>
          </div>
        </div>

        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-400 animate-loader" style={{ width: "60%" }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loader {
          0% { transform: translateX(-30%); }
          50% { transform: translateX(30%); }
          100% { transform: translateX(-30%); }
        }
        .animate-loader {
          animation: loader 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
