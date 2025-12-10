import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function PageLoader({ minDuration = 2000 }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      {/* Main loader container */}
      <div className="flex flex-col items-center gap-8">
        {/* Logo and spinning circle */}
        <div className="relative">
          {/* Spinning border */}
          <div className="w-24 h-24 rounded-full border-4 border-gray-200 border-t-gray-900 animate-spin"></div>

          {/* Logo in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">AJAGBE</h3>
          <p className="text-sm text-gray-500 tracking-wide">Loading...</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          <div
            className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
