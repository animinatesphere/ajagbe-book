import { Search, ShoppingCart, User, BookOpen } from "lucide-react";
import { Menu, X } from "lucide-react";
import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/ggg.JPG";
import { CartContext } from "../context/CartContext";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cart = useContext(CartContext);
  const cartCount = cart?.count || 0;
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl py-2"
            : "bg-white shadow-lg py-3"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/home" className="flex-shrink-0 group">
              <img
                src={logo}
                alt="Logo"
                className={`object-contain transition-all duration-300 ${
                  scrolled ? "max-w-[80px] h-[80px]" : "max-w-[100px] h-[100px]"
                } group-hover:scale-105`}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden xl:flex items-center gap-8">
              {[
                { to: "/home", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/shop", label: "Shop" },
                { to: "/event", label: "Event" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
                { to: "/interview", label: "Interview" },
                { to: "/giveaway", label: "Giveaway" },
                { to: "/signed-book", label: "Signed Book" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-700 font-semibold text-sm uppercase tracking-wide hover:text-gray-900 transition-colors relative group py-2"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-6 h-6 text-gray-700" />
              </button>

              {/* Cart with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCartOpen((s) => !s)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Open cart"
                >
                  <ShoppingCart className="w-6 h-6 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white rounded-full bg-red-500 animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                {cartOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setCartOpen(false)}
                    />
                    <div className="absolute right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-5 py-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg">Your Cart</h4>
                          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                            {cartCount} {cartCount === 1 ? "item" : "items"}
                          </span>
                        </div>
                      </div>

                      <div className="max-h-80 overflow-auto p-4">
                        {cart?.items?.length ? (
                          <div className="space-y-3">
                            {cart.items.map((it, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <img
                                  src={it.image}
                                  alt={it.title}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-gray-900 truncate">
                                    {it.title}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">
                                    {it.price} × {it.qty}
                                  </div>
                                </div>
                                <button
                                  onClick={() => cart.removeItem(it.title)}
                                  className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-12 text-center">
                            <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                            <p className="text-sm text-gray-500">
                              Your cart is empty
                            </p>
                          </div>
                        )}
                      </div>

                      {cart?.items?.length ? (
                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <button
                              onClick={() => cart.clearCart()}
                              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                            >
                              Clear All
                            </button>
                            <Link
                              to="/cart"
                              className="text-sm text-gray-900 font-medium hover:underline"
                              onClick={() => setCartOpen(false)}
                            >
                              View Full Cart
                            </Link>
                          </div>
                          <Link to="/cart" onClick={() => setCartOpen(false)}>
                            <button className="w-full px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                              Proceed to Checkout
                            </button>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Add-to-Cart Toast Notification */}
      {cart?.lastAdded && (
        <div className="fixed top-24 right-4 md:right-8 z-50 animate-slide-in-right">
          <div className="bg-white border-2 border-green-500 rounded-xl shadow-2xl px-5 py-4 flex items-center gap-4 min-w-[280px]">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-900">
                Added to cart!
              </div>
              <div className="text-xs text-gray-600 mt-0.5 truncate">
                {cart.lastAdded}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl transform transition-transform overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-white/10 px-6 py-5 z-10">
              <button
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold tracking-widest">AJAGBE</h2>
              </div>
              <p className="text-sm text-white/70 ml-13">AUTHOR & WRITER</p>
            </div>

            {/* Navigation Links */}
            <nav className="px-4 py-6">
              <ul className="space-y-1">
                {[
                  { to: "/home", label: "Home" },
                  { to: "/about", label: "About" },
                  { to: "/shop", label: "Shop" },
                  { to: "/event", label: "Event" },
                  { to: "/blog", label: "Blog" },
                  { to: "/contact", label: "Contact" },
                  { to: "/interview", label: "Interview" },
                  { to: "/giveaway", label: "Giveaway" },
                  { to: "/signed-book", label: "Signed Book" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg uppercase font-semibold text-sm tracking-wide text-white hover:bg-white/10 transition-all duration-200 group"
                      onClick={() => setOpen(false)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white group-hover:scale-150 transition-all"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent border-t border-white/10 px-6 py-5">
              <div className="flex items-center justify-around">
                <button
                  className="flex flex-col items-center gap-2 p-3 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                  <span className="text-xs">Search</span>
                </button>

                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-white/10 rounded-lg transition-colors relative"
                >
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-bold text-white rounded-full bg-red-500">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">Cart</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
