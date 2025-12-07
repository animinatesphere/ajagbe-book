import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_items");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.debug("Failed to parse cart from storage", e);
      return [];
    }
  });

  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("cart_items", JSON.stringify(items));
    } catch (e) {
      console.debug("Failed to persist cart", e);
    }
  }, [items]);

  const addItem = (item) => {
    // keep simple: push item and increment quantity if same title
    setItems((prev) => {
      const copy = [...prev];
      const idx = copy.findIndex((i) => i.title === item.title);
      if (idx >= 0) {
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + 1 };
      } else {
        copy.push({ ...item, qty: 1 });
      }
      return copy;
    });
    try {
      setLastAdded(item.title || "Item added");
      // clear toast after 3s
      setTimeout(() => setLastAdded(null), 3000);
    } catch (e) {
      console.debug(e);
    }
  };

  const increaseQty = (title) => {
    setItems((prev) =>
      prev.map((it) => (it.title === title ? { ...it, qty: (it.qty || 1) + 1 } : it))
    );
  };

  const decreaseQty = (title) => {
    setItems((prev) =>
      prev
        .map((it) => (it.title === title ? { ...it, qty: Math.max(1, (it.qty || 1) - 1) } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const removeItem = (title) => {
    setItems((prev) => prev.filter((i) => i.title !== title));
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((s, it) => s + (it.qty || 1), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        count,
        increaseQty,
        decreaseQty,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
