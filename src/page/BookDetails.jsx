import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import books from "../data/books";
import { CartContext } from "../context/CartContext";
import Footer from "../component/Footer";

export default function BookDetails() {
  const { slug } = useParams();
  const book = books[slug];
  const { addItem } = useContext(CartContext);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Book not found</h2>
          <Link to="/shop" className="text-sm text-blue-600 mt-4 inline-block">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addItem({ title: book.title, price: book.price, image: book.image });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16 pt-33">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="p-8 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full max-w-sm object-cover rounded"
                />
              </div>
              <div className="lg:col-span-2 p-8">
                <Link to="/shop" className="text-sm text-gray-500">
                  ← Back to shop
                </Link>
                <h1 className="text-4xl font-bold mt-3">{book.title}</h1>
                <div className="mt-4 text-gray-700 text-lg">
                  {book.description}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="text-2xl font-semibold">{book.price}</div>
                  <button
                    onClick={handleAdd}
                    className="px-5 py-3 bg-gray-900 text-white rounded-lg"
                  >
                    Add to cart
                  </button>
                  <Link to="/cart" className="px-4 py-3 border rounded text-sm">
                    View Cart
                  </Link>
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
