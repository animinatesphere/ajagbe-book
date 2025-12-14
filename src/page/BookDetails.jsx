import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import books from "../data/books";
import { CartContext } from "../context/CartContext";
import Footer from "../component/Footer";
import { supabase } from "../lib/supabaseClient";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";

export default function BookDetails() {
  const { slug } = useParams();
  const [displayBook, setDisplayBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    let mounted = true;

    const fetchBook = async () => {
      setLoading(true);

      // First, try to get from Supabase
      try {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("slug", slug)
          .limit(1);

        if (!error && data && data.length > 0) {
          if (mounted) {
            setDisplayBook(data[0]);
            setLoading(false);
          }
          return;
        }
      } catch (e) {
        console.debug("Error fetching book from Supabase:", e);
      }

      // Fallback to local data
      if (mounted) {
        const localBook = books[slug];
        if (localBook) {
          setDisplayBook(localBook);
        }
        setLoading(false);
      }
    };

    fetchBook();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const handleAddToCart = () => {
    if (displayBook) {
      addItem({
        title: displayBook.title,
        price: displayBook.price || displayBook.prize,
        image: displayBook.image_url || displayBook.image,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#4F46E5] mx-auto mb-4" />
          <p className="text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!displayBook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Book not found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the book you're looking for.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-6 py-3 rounded-lg hover:bg-[#4338CA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
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

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .book-detail-container {
            animation: fadeIn 0.6s ease-out;
          }

          .book-image-container {
            animation: scaleIn 0.8s ease-out;
          }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-16 pt-24 md:pt-32">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Back Button */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#4F46E5] transition-colors mb-6 md:mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Shop</span>
          </Link>

          {/* Main Content */}
          <div className="book-detail-container bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Image Section */}
              <div className="book-image-container p-6 md:p-12 flex items-center justify-center bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF]">
                <div className="relative w-full max-w-md">
                  <img
                    src={displayBook.image_url || displayBook.image}
                    alt={displayBook.title}
                    className="w-full h-auto object-contain rounded-lg shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-[#4F46E5] text-white px-6 py-3 rounded-full shadow-lg">
                    <span className="text-2xl font-bold">
                      ₦{displayBook.price || displayBook.prize}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="inline-block bg-[#4F46E5]/10 text-[#4F46E5] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Featured Book
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {displayBook.title}
                  </h1>
                </div>

                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    About this book
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {displayBook.description ||
                      displayBook.dis ||
                      "A captivating read that will keep you engaged from start to finish."}
                  </p>
                </div>

                {/* Additional Details */}
                <div className="mb-8 grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="text-2xl font-bold text-[#4F46E5]">
                      ₦{displayBook.price || displayBook.prize}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Availability</p>
                    <p className="text-lg font-semibold text-green-600">
                      In Stock
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#18181B] text-white px-8 py-4 rounded-lg hover:bg-[#4F46E5] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg font-semibold text-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <Link
                    to="/cart"
                    className="flex-1 flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all duration-300 font-semibold text-lg"
                  >
                    View Cart
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Quality Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
