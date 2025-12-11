import React from "react";
import ife from "../assets/IMG_7969.JPG";
import man from "../assets/IMG_7970.JPG";
import ven from "../assets/IMG_7971.JPG";
import helen from "../assets/IMG_7972.JPG";
import ref from "../assets/IMG_7973.JPG";
import un from "../assets/IMG_2884.JPG";
import { Link } from "react-router-dom";
const Favourite = () => {
  const bookCovers = [
    {
      pic: ife,
    },
    {
      pic: man,
    },
    {
      pic: ven,
    },
    {
      pic: helen,
    },
    {
      pic: ref,
    },
    {
      pic: un,
    },
  ];

  return (
    <div className=" h-screen py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .book-grid {
            animation: slideInLeft 0.8s ease-out;
          }

          .content-section {
            animation: slideInRight 0.8s ease-out;
          }

          .book-item {
            animation: fadeIn 0.6s ease-out backwards;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .book-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }

          .book-item:nth-child(1) { animation-delay: 0.1s; }
          .book-item:nth-child(2) { animation-delay: 0.15s; }
          .book-item:nth-child(3) { animation-delay: 0.2s; }
          .book-item:nth-child(4) { animation-delay: 0.25s; }
          .book-item:nth-child(5) { animation-delay: 0.3s; }
          .book-item:nth-child(6) { animation-delay: 0.35s; }
          .book-item:nth-child(7) { animation-delay: 0.4s; }
          .book-item:nth-child(8) { animation-delay: 0.45s; }
          .book-item:nth-child(9) { animation-delay: 0.5s; }

          .stat-item {
            animation: fadeIn 0.6s ease-out backwards;
          }

          .stat-item:nth-child(1) { animation-delay: 0.6s; }
          .stat-item:nth-child(2) { animation-delay: 0.7s; }
          .stat-item:nth-child(3) { animation-delay: 0.8s; }
        `}
      </style>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Book Grid */}
          <div className="book-grid">
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              {bookCovers.map((book, index) => (
                <div
                  key={index}
                  className={`book-item pic} rounded-lg shadow-lg overflow-hidden aspect-[3/4] flex items-center justify-center p-4`}
                >
                  <img src={book.pic} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="content-section space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Find Your Favorite
              </h1>
              <h2 className="text-4xl lg:text-5xl font-bold text-indigo-600 mb-6">
                Book Here!
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-lg">
              Discover your next great read from Ayodeji Ajagbe curated
              collection of bestsellers, classics, and hidden gems. Whether
              you're into mysteries, romances, or peotry non-fiction,Ayodeji has
              something special waiting for you.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link to="/shop">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300">
                  Shop now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
