import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import Footer from "../component/Footer";
import OrderForm from "../component/OrderForm";

const parsePrice = (p) => {
  if (!p) return 0;
  const n = String(p).replace(/[^0-9.]/g, "");
  return parseFloat(n || "0");
};

export default function Cart() {
  const { items, increaseQty, decreaseQty, removeItem, clearCart, count } =
    useContext(CartContext);

  const [showOrderForm, setShowOrderForm] = useState(false);

  const subtotal = items.reduce(
    (s, it) => s + parsePrice(it.price) * (it.qty || 1),
    0
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-12 md:py-16 pt-32 md:pt-40">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 text-center md:text-left">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Shopping Cart
                </h1>
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              {count === 0
                ? "Your cart is empty"
                : `${count} item${count > 1 ? "s" : ""} in your cart`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 md:p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white flex items-center justify-between">
                  <h2 className="text-lg md:text-xl font-semibold">
                    Cart Items
                  </h2>
                  {items.length > 0 && (
                    <button
                      onClick={() => clearCart()}
                      className="text-xs md:text-sm text-red-300 hover:text-red-100 transition-colors font-medium px-3 py-1 rounded-full border border-red-300 hover:border-red-100"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="p-4 md:p-6">
                  {items.length === 0 ? (
                    <div className="py-16 md:py-20 text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-sm md:text-base text-gray-500">
                        Browse the shop to add items to your cart
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((it, idx) => (
                        <div
                          key={idx}
                          className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 md:p-5 rounded-xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300 bg-white"
                        >
                          {/* Product Image */}
                          <div className="w-full sm:w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                            <img
                              src={it.image}
                              alt={it.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900 text-base md:text-lg pr-2">
                                {it.title}
                              </h3>
                              <div className="text-gray-900 font-bold text-lg md:text-xl whitespace-nowrap">
                                ₦
                                {(parsePrice(it.price) * (it.qty || 1)).toFixed(
                                  2
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-3 md:mb-4">
                              Unit Price: {it.price}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="inline-flex items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                                <button
                                  onClick={() => decreaseQty(it.title)}
                                  className="px-3 md:px-4 py-2 hover:bg-gray-200 transition-colors text-gray-700 font-semibold"
                                >
                                  −
                                </button>
                                <div className="px-4 md:px-5 py-2 bg-white font-semibold text-gray-900 min-w-[3rem] text-center">
                                  {it.qty || 1}
                                </div>
                                <button
                                  onClick={() => increaseQty(it.title)}
                                  className="px-3 md:px-4 py-2 hover:bg-gray-200 transition-colors text-gray-700 font-semibold"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(it.title)}
                                className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 md:p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                  <h4 className="text-lg md:text-xl font-semibold">
                    Order Summary
                  </h4>
                </div>

                <div className="p-5 md:p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="text-sm md:text-base">Subtotal</span>
                    <span className="font-semibold text-base md:text-lg">
                      ₦{subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center text-gray-500 pb-4 border-b border-gray-200">
                    <span className="text-sm md:text-base">Shipping</span>
                    <span className="text-xs md:text-sm">
                      Calculated at checkout
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-base md:text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-gray-900">
                      ₦{subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => setShowOrderForm(true)}
                    disabled={items.length === 0}
                    className="w-full px-4 py-3 md:py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Security Badge */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Secure Checkout</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Card */}
              {items.length > 0 && (
                <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-5 border border-blue-100">
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                    💡 Shopping Benefits
                  </h5>
                  <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Free shipping on orders over ₦10,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>30-day return policy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Secure payment processing</span>
                    </li>
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
      <Footer />
      {showOrderForm && (
        <OrderForm
          open={showOrderForm}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </>
  );
}
