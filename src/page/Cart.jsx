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
      <div className="min-h-screen bg-gray-50 py-16 pt-40">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Your Cart</h1>
                  <div className="text-sm text-gray-500">{count} item(s)</div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => clearCart()}
                  className="text-sm text-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {items.length === 0 ? (
                  <div className="p-12 text-center text-gray-500">
                    Your cart is empty. Browse the shop to add items.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((it, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 rounded-lg border"
                      >
                        <img
                          src={it.image}
                          alt=""
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{it.title}</h3>
                            <div className="text-gray-700 font-medium">
                              ₦{(parsePrice(it.price) * (it.qty || 1)).toFixed(2)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{it.price}</p>
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              onClick={() => decreaseQty(it.title)}
                              className="px-3 py-1 bg-gray-100 rounded"
                            >
                              -
                            </button>
                            <div className="px-3 py-1 border rounded">
                              {it.qty || 1}
                            </div>
                            <button
                              onClick={() => increaseQty(it.title)}
                              className="px-3 py-1 bg-gray-100 rounded"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeItem(it.title)}
                              className="ml-4 text-sm text-red-600"
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

              <aside className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
                <div className="flex justify-between text-gray-700 mb-2">
                  <div>Subtotal</div>
                  <div className="font-medium">₦{subtotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-between text-gray-500 mb-4">
                  <div>Shipping</div>
                  <div>Calculated at checkout</div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <button onClick={() => setShowOrderForm(true)} className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold">
                    Proceed to Checkout
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    {showOrderForm && (
      <OrderForm open={showOrderForm} onClose={() => setShowOrderForm(false)} />
    )}
    </>
  );
}
