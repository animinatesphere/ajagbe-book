import React, { useState, useRef, useEffect, useContext } from "react";
import ife from "../assets/IMG_7969.JPG";
import man from "../assets/IMG_7970.JPG";
import ven from "../assets/IMG_7971.JPG";
import helen from "../assets/IMG_7972.JPG";
import ref from "../assets/IMG_7973.JPG";
import un from "../assets/IMG_2884.JPG";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import booksData from "../data/books";

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

const Realease = () => {
  const { addItem } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const scrollToPage = (pageIndex) => {
    if (scrollRef.current) {
      const cardWidth = 252; // 232px + 20px gap
      scrollRef.current.scrollTo({
        left: pageIndex * cardWidth * itemsPerPage,
        behavior: "smooth",
      });
      setCurrentIndex(pageIndex);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const cardWidth = 252;
        const scrollLeft = scrollRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / (cardWidth * itemsPerPage));
        setCurrentIndex(newIndex);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const slugify = (s) =>
    String(s)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const findSlug = (title) => {
    const s = slugify(title);
    if (booksData[s]) return s;
    const norm = title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
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

          .scroll-container {
            scrollbar-width: none;
          }

          .scroll-container::-webkit-scrollbar {
            display: none;
          }

          .dot {
            transition: all 0.3s ease;
          }

          .dot.active {
            transform: scale(1.3);
          }
        `}
      </style>

      {/* container */}
      <div className="pt-30  pb-30 max-w-[1400px] mx-auto px-4">
        <p className="text-[24px] text-[#1C2024] non text-center font-bold mb-8">
          New Realeases
        </p>

        <div ref={scrollRef} className="scroll-container overflow-x-auto pb-4">
          <div className="flex gap-5 justify-center min-w-max mx-auto w-fit">
            {books.map((item, index) => (
              <div
                key={index}
                className="book-card w-[232px] min-w-[232px] relative bg-[#EEF2FF] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <Link to={`/book/${findSlug(item.title)}`} className="block">
                    <img
                      src={item.image}
                      alt=""
                      className="book-image w-[232px] h-[250px] object-contain pt-2 relative mx-auto transition-transform duration-500"
                    />
                  </Link>
                  <span className="absolute text-[16px] text-[#4F46E5] non font-bold bg-[#EEF2FF] top-4 left-4 text-center px-3 py-1 rounded-full shadow-md">
                    {item.prize}
                  </span>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-[12px] non font-normal text-[#1C2024] mt-3 min-h-[48px]">
                    {item.dis}
                  </p>
                  <button
                    onClick={() =>
                      addItem({ title: item.title, price: item.prize, image: item.image })
                    }
                    className="flex items-center justify-center bg-[#18181B] text-[#FFFFFF] gap-2 w-full h-[32px] mt-3 rounded-md hover:bg-[#4F46E5] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
                  >
                    <ShoppingCart width={20} height={20} /> {item.but}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToPage(index)}
              className={`dot w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-[#4F46E5] active"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* end of container */}
    </>
  );
};

export default Realease;
