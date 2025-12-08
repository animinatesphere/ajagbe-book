import { Search, ShoppingCart, User, BookOpen } from "lucide-react";
import { Menu, X } from "lucide-react";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/ggg.JPG";
import { CartContext } from "../context/CartContext";
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cart = useContext(CartContext);
  const cartCount = cart?.count || 0;
  const [cartOpen, setCartOpen] = useState(false);

  // const links = ["Homes", "About", "Shop", "Event", "Blog", "Contact us"];

  return (
    <>
      {/* container */}
      <div className="flex fixed w-full z-10 items-center justify-between p-2 md:p-4 bg-[#fff] shadow-lg">
        {/* logo */}
        <img
          src={logo}
          alt=""
          className="max-w-[100px] h-[100px] object-contain"
        />
        {/* logo */}

        {/* desktop links (hidden on mobile) */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link
              to="/home"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Homes
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/event"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Event
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/interview"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Interview
            </Link>
          </li>
          <li>
            <Link
              to="/giveaway"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Giveaway
            </Link>
          </li>
          <li>
            <Link
              to="/signed-book"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Signed Book
            </Link>
          </li>
        </ul>

        {/* desktop actions (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-10">
          <Search width={30} height={30} className="text-[#333333]" />
          <div className="relative">
            <button
              onClick={() => setCartOpen((s) => !s)}
              className="relative"
              aria-label="Open cart"
            >
              <ShoppingCart width={30} height={30} className="text-[#333333]" />
              <span className="text-[12px] w-[20px] h-[20px] absolute -top-1 right-[-6px] flex items-center justify-center text-[#fff] rounded-full bg-[#e4573d]">
                {cartCount}
              </span>
            </button>

            {/* Cart dropdown */}
            {cartOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-40">
                <h4 className="text-sm font-semibold mb-2">Your Cart</h4>
                <div className="max-h-56 overflow-auto space-y-3">
                  {cart?.items?.length ? (
                    cart.items.map((it, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img
                          src={it.image}
                          alt=""
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{it.title}</div>
                          <div className="text-xs text-gray-500">
                            {it.price} · qty {it.qty}
                          </div>
                        </div>
                        <button
                          onClick={() => cart.removeItem(it.title)}
                          className="text-xs text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">
                      Your cart is empty
                    </div>
                  )}
                </div>
                {cart?.items?.length ? (
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => cart.clearCart()}
                        className="text-sm text-gray-600"
                      >
                        Clear
                      </button>
                      <Link
                        to="/cart"
                        className="px-3 py-2 bg-gray-100 rounded text-sm"
                        onClick={() => setCartOpen(false)}
                      >
                        View Cart
                      </Link>
                    </div>
                    <Link to="/cart">
                      <button className="w-full px-4 py-2 bg-gray-900 text-white rounded">
                        Checkout
                      </button>
                    </Link>
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <User width={30} height={30} className="text-[#333333]" />
        </div>

        {/* hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded-md text-[#2c2c2c]"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu width={28} height={28} />
        </button>
      </div>

      {/* transient add-to-cart toast */}
      {cart?.lastAdded && (
        <div className="fixed top-20 right-6 z-50">
          <div className="bg-white border rounded-lg shadow-lg px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-700">
              ✓
            </div>
            <div>
              <div className="text-sm font-semibold">Added to cart</div>
              <div className="text-xs text-gray-500">{cart.lastAdded}</div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar / dropdown */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* overlay (fade in) */}
          <div
            className="absolute inset-0 bg-black/40 animate__animated animate__fadeIn"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* sidebar (slide in) */}
          <aside className="relative w-64 max-w-full h-full bg-[#333333] text-white p-6 animate__animated animate__slideInLeft animate__faster">
            <button
              className="absolute top-4 right-4 text-white p-1"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X width={22} height={22} />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3">
                <BookOpen width={28} height={28} className="text-white" />
                <h2
                  className="text-[20px] font-bold lib"
                  style={{ letterSpacing: "3px" }}
                >
                  AJAGBE
                </h2>
              </div>
              <p className="text-sm text-white/80">AUTHOR & WRITER</p>
            </div>

            <nav>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    to="/home"
                    className="uppercase font-bold text-white transition-transform duration-200 ease-in-out hover:translate-x-2 hover:text-[#f3f3f3]"
                    // style={{ animationDelay: `${idx * 100}ms` }}
                    onClick={() => setOpen(false)}
                  >
                    Homes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="uppercase font-bold text-white transition-transform duration-200 ease-in-out hover:translate-x-2 hover:text-[#f3f3f3]"
                    onClick={() => setOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="uppercase font-bold text-white transition-transform duration-200 ease-in-out hover:translate-x-2 hover:text-[#f3f3f3]"
                    onClick={() => setOpen(false)}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/event"
                    className="uppercase font-bold text-white transition-transform duration-200 ease-in-out hover:translate-x-2 hover:text-[#f3f3f3]"
                    onClick={() => setOpen(false)}
                  >
                    Event
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Blog"
                    className="uppercase font-bold text-white transition-transform duration-200 ease-in-out hover:translate-x-2 hover:text-[#f3f3f3]"
                    onClick={() => setOpen(false)}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="uppercase font-bold text-white transition-transform duration-200 ease-in-out hover:translate-x-2 hover:text-[#f3f3f3]"
                    onClick={() => setOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/interview"
                    className="uppercase font-bold text-white transition-transform duration-200 ease-in-out hover:translate-x-2 hover:text-[#f3f3f3]"
                    onClick={() => setOpen(false)}
                  >
                    Interview 
                  </Link>
                </li>
                <li>
                  <Link
                    to="/giveaway"
                    className="text-white font-bold text-[16px] non uppercase"
                    onClick={() => setOpen(false)}
                  >
                    Giveaway
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signed-book"
                    className="text-white font-bold text-[16px] non uppercase"
                    onClick={() => setOpen(false)}
                  >
                    Signed Book
                  </Link>
                </li>
                {/* {links.map((label, idx) => (
                  <li
                    key={label}
                    className={`animate__animated animate__fadeInUp`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <Link
                      to="/home"
                      className="uppercase font-bold text-white transition-transform duration-200 ease-in-out hover:translate-x-2 hover:text-[#f3f3f3]"
                    >
                      {label}
                    </Link>
                  </li>
                ))} */}
              </ul>
            </nav>

            <div className="mt-8 border-t border-white/20 pt-4">
              <div
                className="flex items-center gap-4 animate__animated animate__fadeInUp"
                style={{ animationDelay: "600ms" }}
              >
                <Search width={24} height={24} className="text-white" />
                <Link to="/cart" onClick={() => setOpen(false)}>
                  <div className="relative">
                    <ShoppingCart
                      width={24}
                      height={24}
                      className="text-white"
                    />
                    <span className="text-[12px] w-[18px] h-[18px] absolute -top-2 right-[-6px] flex items-center justify-center text-[#fff] rounded-full bg-[#e4573d]">
                      {cartCount}
                    </span>
                  </div>
                </Link>
                <User
                  width={24}
                  height={24}
                  className="text-white"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
