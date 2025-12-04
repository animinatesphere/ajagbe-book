import { Search, ShoppingCart, User, BookOpen } from "lucide-react";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["Homes", "About", "Shop", "Event", "Blog"];

  return (
    <>
      {/* container */}
      <div className="flex fixed w-full z-10 items-center justify-between p-6 md:p-8 bg-[#fff] shadow-lg">
        {/* logo */}
        <div className="flex flex-col items-start md:items-center">
          <div className="flex items-center gap-3">
            <BookOpen width={34} height={34} className="text-[#2c2c2c]" />
            <h1
              className="lib text-2xl md:text-3xl lg:text-4xl font-bold text-[#2c2c2c] tracking-widest"
              style={{
                letterSpacing: "4px",
                textShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              AJAGBE
            </h1>
          </div>
          <p className="lib text-xs md:text-sm text-[#666666] tracking-wide mt-1">
            AUTHOR & WRITER
          </p>
        </div>
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
              to="/home"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/home"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/home"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Event
            </Link>
          </li>
          <li>
            <Link
              to="/home"
              className="text-[#696969] font-bold text-[16px] non uppercase"
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* desktop actions (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-10">
          <Search width={30} height={30} className="text-[#333333]" />
          <div className="relative">
            <ShoppingCart width={30} height={30} className="text-[#333333]" />
            <span className="text-[12px] w-[20px] h-[20px] absolute -top-1 right-[-6px] flex items-center justify-center text-[#fff] rounded-full bg-[#e4573d]">
              0
            </span>
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
                {links.map((label, idx) => (
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
                ))}
              </ul>
            </nav>

            <div className="mt-8 border-t border-white/20 pt-4">
              <div
                className="flex items-center gap-4 animate__animated animate__fadeInUp"
                style={{ animationDelay: "600ms" }}
              >
                <Search width={24} height={24} className="text-white" />
                <div className="relative">
                  <ShoppingCart width={24} height={24} className="text-white" />
                  <span className="text-[12px] w-[18px] h-[18px] absolute -top-2 right-[-6px] flex items-center justify-center text-[#fff] rounded-full bg-[#e4573d]">
                    0
                  </span>
                </div>
                <User width={24} height={24} className="text-white" />
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
