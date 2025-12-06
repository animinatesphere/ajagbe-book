import React, { useState, useEffect } from "react";
import { Award } from "lucide-react";
import awa from "../assets/IMG_7974.WEBP";
import awa2 from "../assets/IMG_7975.WEBP";
const AwardsBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const awards = [
    {
      title: "2025 National Book Awards for Fiction Shortlist",
      buttonText: "Explore Now",
      pic: awa,
    },
    {
      title: "2025 International Literary Excellence Award Winners",
      buttonText: "View Winners",
      pic: awa2,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % awards.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden mt-10 mb-10">
      <style>
        {`
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideOutLeft {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(-100%);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(5deg);
            }
          }

          @keyframes shine {
            0% {
              filter: brightness(1);
            }
            50% {
              filter: brightness(1.3);
            }
            100% {
              filter: brightness(1);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          .slide-enter {
            animation: slideInRight 0.8s ease-out forwards;
          }

          .trophy-icon {
            animation: float 3s ease-in-out infinite, shine 2s ease-in-out infinite;
          }

          .button-pulse {
            animation: bounce 2s ease-in-out infinite;
          }

          .dot {
            transition: all 0.3s ease;
          }

          .dot.active {
            transform: scale(1.3);
          }
        `}
      </style>

      <div className="bg-white py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center min-h-[200px]">
            {/* Content Section */}
            <div className="space-y-4 flex justify-between">
              <div className="slide-enter" key={currentSlide}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 non">
                  {awards[currentSlide].title}
                </h2>
                <button className="button-pulse bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300">
                  {awards[currentSlide].buttonText}
                </button>
              </div>
            </div>

            {/* Trophy & Books Illustration */}
            <div className="flex justify-center md:justify-end max-w-[300px] max-h-[300px] ">
              <img src={awards[currentSlide].pic} alt="" />
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-3 mt-6">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`dot w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-indigo-600 active"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsBanner;
