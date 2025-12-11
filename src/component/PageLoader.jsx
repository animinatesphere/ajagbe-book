import React, { useEffect, useState } from "react";
import { BookOpen, Feather, Sparkles } from "lucide-react";

export default function PageLoader({ minDuration = 2000 }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [minDuration]);

  if (!loading) return null;

  return (
    <div
      aria-hidden={!loading}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <Sparkles
          className="absolute top-20 left-20 w-6 h-6 text-white/30 animate-pulse"
          style={{ animationDelay: "0ms" }}
        />
        <Sparkles
          className="absolute top-40 right-32 w-4 h-4 text-white/40 animate-pulse"
          style={{ animationDelay: "300ms" }}
        />
        <Sparkles
          className="absolute bottom-32 left-40 w-5 h-5 text-white/20 animate-pulse"
          style={{ animationDelay: "600ms" }}
        />
        <Sparkles
          className="absolute bottom-20 right-20 w-6 h-6 text-white/35 animate-pulse"
          style={{ animationDelay: "900ms" }}
        />
        <Feather
          className="absolute top-32 right-48 w-8 h-8 text-white/20 animate-bounce"
          style={{ animationDelay: "200ms", animationDuration: "3s" }}
        />
        <Feather
          className="absolute bottom-40 left-32 w-6 h-6 text-white/25 animate-bounce"
          style={{ animationDelay: "500ms", animationDuration: "3.5s" }}
        />
      </div>

      {/* Main loader container */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Animated book with pages */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-32 h-32 rounded-full bg-white/10 blur-2xl animate-pulse"></div>

          {/* Rotating circles */}
          <div className="relative w-32 h-32">
            <div
              className="absolute inset-0 w-full h-full rounded-full border-4 border-white/20 border-t-white animate-spin"
              style={{ animationDuration: "2s" }}
            ></div>
            <div
              className="absolute inset-2 w-28 h-28 rounded-full border-4 border-white/10 border-b-white/80 animate-spin"
              style={{
                animationDuration: "1.5s",
                animationDirection: "reverse",
              }}
            ></div>
          </div>

          {/* Center book icon with bounce */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <BookOpen className="w-10 h-10 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Text with typewriter effect simulation */}
        <div className="text-center px-4">
          <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg animate-pulse">
            I promise this suspense won't last <br /> as long as my drafts
          </h3>
          <div className="flex items-center justify-center gap-2">
            <p className="text-base text-white/90 tracking-widest font-medium">
              Loading
            </p>
            <span className="flex gap-1">
              <span
                className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "0ms" }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "200ms" }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "400ms" }}
              ></span>
            </span>
          </div>
        </div>

        {/* Creative wave animation at bottom */}
        <div className="flex gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-12 bg-white rounded-full"
              style={{
                animation: "wave 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: scaleY(0.3);
            opacity: 0.5;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
