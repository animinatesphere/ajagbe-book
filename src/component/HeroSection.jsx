import React, { useEffect, useState } from "react";

// Import your actual images
import ch from "../assets/IMG_3702.JPG";
import medal from "../assets/IMG_7974.WEBP";
import medal2 from "../assets/IMG_7975.WEBP";

const heroVariants = [
  {
    preTitle: "For author & writer",
    titleLines: ["Meet Your next", "favourite book."],
    buttonText: "Purchase",
    medals: [medal, medal2],
    heroImage: ch,
    heroAlt: "Author portrait",
  },
  {
    preTitle: "New release",
    titleLines: ["Discover the", "latest novel."],
    buttonText: "Learn more",
    medals: [medal],
    heroImage: ch,
    heroAlt: "New release image",
  },
];

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!heroVariants || heroVariants.length <= 1) return;
    const id = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((s) => (s + 1) % heroVariants.length);
        setIsTransitioning(false);
      }, 500);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  const displayed =
    heroVariants && heroVariants.length
      ? heroVariants[current]
      : {
          preTitle: "",
          titleLines: [""],
          buttonText: "",
          medals: [],
          heroImage: "",
          heroAlt: "",
        };

  return (
    <div className=" z-[1] relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 w-full min-h-screen overflow-hidden">
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }

          .hero-text {
            animation: slideInLeft 1s ease-out;
          }

          .hero-image {
            animation: slideInRight 1s ease-out;
          }

          .hero-image img {
            animation: float 3s ease-in-out infinite;
          }

          .medal-bounce {
            animation: fadeInUp 0.8s ease-out backwards;
          }

          .medal-bounce:nth-child(1) {
            animation-delay: 0.3s;
          }

          .medal-bounce:nth-child(2) {
            animation-delay: 0.5s;
          }

          .button-shine {
            position: relative;
            overflow: hidden;
          }

          .button-shine::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: shimmer 3s infinite;
          }

          .decorative-circle {
            position: absolute;
            border-radius: 50%;
            opacity: 0.1;
            animation: float 4s ease-in-out infinite;
          }

          .circle-1 {
            width: 300px;
            height: 300px;
            background: linear-gradient(135deg, #ff6b6b, #ffd93d);
            top: 10%;
            right: 5%;
            animation-delay: 0s;
          }

          .circle-2 {
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #6bcfff, #a78bfa);
            bottom: 15%;
            left: 10%;
            animation-delay: 1s;
          }

          .circle-3 {
            width: 150px;
            height: 150px;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            top: 40%;
            left: 5%;
            animation-delay: 2s;
          }

          .title-gradient {
            background: linear-gradient(135deg, #1e293b, #e4573d, #1e293b);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 4s ease-in-out infinite;
          }

          .transition-content {
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
          }

          .transition-out {
            opacity: 0;
            transform: scale(0.95);
          }

          .dot {
            transition: all 0.3s ease;
          }

          .dot.active {
            transform: scale(1.5);
          }
        `}
      </style>

      {/* Decorative Background Circles */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 px-6 md:px-16 lg:px-32 py-12 md:py-20 min-h-screen">
        {/* Text Section */}
        <div
          className={`w-full md:w-1/2 transition-content ${
            isTransitioning ? "transition-out" : ""
          }`}
        >
          <div className="hero-text space-y-6">
            <p className="text-lg md:text-xl font-semibold text-gray-600 uppercase tracking-wide">
              {displayed.preTitle}
            </p>

            <h1 className="mt-4 text-4xl md:text-5xl lg:text-7xl title-gradient uppercase font-bold leading-tight">
              {displayed.titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Medals */}
            <div className="flex items-center gap-4 md:gap-6 mt-8">
              {displayed.medals.map((m, idx) => (
                <div
                  key={idx}
                  className="medal-bounce transform hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src={m}
                    alt={`medal-${idx}`}
                    className="w-20 md:w-32 h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              ))}
            </div>

            {/* Button */}
            <button className="button-shine mt-8 inline-block uppercase bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-110 transform transition-all duration-300 active:scale-95">
              {displayed.buttonText}
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-3 mt-8">
              {heroVariants.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrent(index);
                      setIsTransitioning(false);
                    }, 500);
                  }}
                  className={`dot w-3 h-3 rounded-full transition-all duration-300 ${
                    current === index
                      ? "bg-orange-600 active"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div
          className={`w-full md:w-1/2 flex items-center justify-center transition-content ${
            isTransitioning ? "transition-out" : ""
          }`}
        >
          <div className="hero-image relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 blur-3xl"></div>
            <img
              src={displayed.heroImage}
              alt={displayed.heroAlt}
              className="relative w-full max-w-[420px] md:max-w-[640px] lg:max-w-[820px] object-cover drop-shadow-2xl transition-transform duration-500 hover:scale-105 rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
