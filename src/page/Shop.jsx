import React, { useContext } from "react";
import ife from "../assets/IMG_7969.JPG";
import man from "../assets/IMG_7970.JPG";
import ven from "../assets/IMG_7971.JPG";
import helen from "../assets/IMG_7972.JPG";
import ref from "../assets/IMG_7973.JPG";
import un from "../assets/IMG_2884.JPG";
import { ShoppingCart } from "lucide-react";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import booksData from "../data/books";
import { CartContext } from "../context/CartContext";

const books = [
  {
    image: ife,
    prize: "$3",
    title: "Letter to ife",
    dis: "a unique anthology of epistolary poetry-poems in the form of letters",
    but: "Add to cart",
  },
  {
    image: man,
    prize: "$2",
    title: "Mandem:Poem in pidgin English",
    dis: "Pidgin English na one of di main language wey plenty naija people dey yarn",
    but: "Add to cart",
  },
  {
    image: ven,
    prize: "$3",
    title: "Vendetta",
    dis: "nonee",
    but: "Add to cart",
  },
  {
    image: helen,
    prize: "$4",
    title: "What Happened to Helen ",
    dis: "A bestselling author and story writer needed a break from her marriage",
    but: "Add to cart",
  },
  {
    image: ref,
    prize: "$4",
    title: "Reflection:Rulers and Preys",
    dis: "the result is an electrifying vision of how exceedingly violent governing ",
    but: "Add to cart",
  },
  {
    image: un,
    prize: "$4",
    title: "Uder the Milky Way",
    dis: "This is a book earth about us",
    but: "Add to cart",
  },
];

const Shop = () => {
  const { addItem } = useContext(CartContext);
  const slugify = (s) =>
    String(s)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const findSlug = (title) => {
    const s = slugify(title);
    if (booksData[s]) return s;
    // fallback: try to match by title keywords
    const norm = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
    for (const k of Object.keys(booksData)) {
      const t = booksData[k].title.toLowerCase();
      if (t.includes(norm) || norm.includes(t)) return k;
    }
    return s;
  };

  return (
    <>
      <style>
        {`
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

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .book-card {
            animation: fadeInUp 0.6s ease-out backwards;
          }

          .book-card:nth-child(1) { animation-delay: 0.1s; }
          .book-card:nth-child(2) { animation-delay: 0.2s; }
          .book-card:nth-child(3) { animation-delay: 0.3s; }
          .book-card:nth-child(4) { animation-delay: 0.4s; }
          .book-card:nth-child(5) { animation-delay: 0.5s; }
          .book-card:nth-child(6) { animation-delay: 0.6s; }

          .book-card:hover .book-image {
            animation: float 2s ease-in-out infinite;
          }
        `}
      </style>

      {/* container */}
      <div className="pt-35 pb-16 mx-auto px-6 max-w-7xl">
        <p className="text-[32px] text-[#1C2024] non text-center font-bold mb-12">
          Book Shop
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((item, index) => (
            <div
              key={index}
              className="book-card w-full relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] p-6">
                <Link to={`/book/${findSlug(item.title)}`} className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="book-image w-full h-[320px] object-contain relative mx-auto transition-transform duration-500"
                  />
                </Link>
                <span className="absolute text-[18px] text-white non font-bold bg-[#4F46E5] top-6 left-6 text-center px-4 py-2 rounded-full shadow-lg">
                  {item.prize}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-[20px] non font-bold text-[#1C2024] mb-3">
                  <Link
                    to={`/book/${findSlug(item.title)}`}
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="text-[14px] non font-normal text-[#6B7280] leading-relaxed mb-6 min-h-[60px]">
                  {item.dis}
                </p>
                <button
                  onClick={() =>
                    addItem({
                      title: item.title,
                      price: item.prize,
                      image: item.image,
                    })
                  }
                  className="flex items-center justify-center bg-[#18181B] text-[#FFFFFF] gap-2 w-full h-[44px] rounded-lg hover:bg-[#4F46E5] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md font-medium"
                >
                  <ShoppingCart width={20} height={20} /> {item.but}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      {/* end of container */}
    </>
  );
};

export default Shop;
