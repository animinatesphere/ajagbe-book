import React from "react";
import {
  BookOpen,
  Facebook,
  Heart,
  Instagram,
  MessageCircle,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          .footer-section {
            animation: fadeInUp 0.6s ease-out backwards;
          }

          .footer-section:nth-child(1) { animation-delay: 0.1s; }
          .footer-section:nth-child(2) { animation-delay: 0.2s; }
          .footer-section:nth-child(3) { animation-delay: 0.3s; }
          .footer-section:nth-child(4) { animation-delay: 0.4s; }

          .heart-icon {
            animation: pulse 1.5s ease-in-out infinite;
          }

          .payment-icon {
            transition: transform 0.3s ease, opacity 0.3s ease;
          }

          .payment-icon:hover {
            transform: translateY(-4px);
            opacity: 0.8;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Books Section */}
          <div className="footer-section">
            {/* logo */}
            <div className="flex flex-col items-start md:items-center">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen width={34} height={34} className="text-[#2c2c2c]" />
                <h1
                  className="lib text-2xl md:text-3xl lg:text-4xl font-bold text-[#ffffff] tracking-widest"
                  style={{
                    letterSpacing: "4px",
                    textShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  AJAGBE
                </h1>
              </div>
              <p className="lib text-xs md:text-sm text-[#ffffff] tracking-wide mt-1">
                AUTHOR & WRITER
              </p>
            </div>
            {/* logo */}
            <p className="text-gray-400 text-sm leading-relaxed">
              Books Delivered, Imagination Unlimited
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4 non">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white non transition-colors duration-300 text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white  non transition-colors duration-300 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white non transition-colors duration-300 text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4 non">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400 non">
                <span className="block">
                  Email: management@ajagbeayodeji.com
                </span>
              </li>

              <li className="text-gray-400 non">
                <span className="block">MMEC, Mullana - 133207</span>
              </li>
              <div className="flex items  gap-3">
                <Link to="https://x.com/the_ayodimeji1?s=21">
                  <Twitter width={16} height={16} />
                </Link>
                <Link to="https://www.instagram.com/the_ayodimeji1?igsh=MWU2NXJzd3pkcGFz&utm_source=qr">
                  <Instagram width={16} height={16} />
                </Link>
                <Link
                  to="
https://www.facebook.com/share/1E9AeKKGRw/?mibextid=wwXIfr"
                >
                  <Facebook width={16} height={16} />
                </Link>
                <Link
                  to="
https://www.threads.com/@the_ayodimeji1?igshid=NTc4MTIwNjQ2YQ=="
                >
                  <MessageCircle width={16} height={16} />
                </Link>
              </div>
            </ul>
          </div>

          {/* We Accept Section */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4 non">We Accept</h3>
            <div className="flex gap-3 items-center">
              <div className="payment-icon bg-white rounded px-3 py-2">
                <span className="text-blue-600 font-bold text-lg non">
                  VISA
                </span>
              </div>
              <div className="payment-icon bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-white font-bold text-xs non">MC</span>
              </div>
              <div className="payment-icon bg-gradient-to-r from-blue-400 to-blue-600 rounded px-3 py-2">
                <span className="text-white font-bold text-xs non">AMEX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row non justify-center items-center gap-2 text-sm text-gray-400">
            <p className="non">© 2025 Books. All rights reserved</p>
            <span className="hidden md:inline">|</span>
            <Link to="https://hex-portfolio-zeta.vercel.app">
              <p className="flex items-center gap-1 non">
                Made by Hexcode
                <Heart className="heart-icon w-4 h-4 text-red-500 fill-red-500" />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
