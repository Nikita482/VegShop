import { useState, useEffect, useCallback } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Product, CartItem } from "./ThemeContext";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch(
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const addToCart = useCallback((product: Product, count = 1) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, count: item.count + count } : item
        );
      }
      return [...items, { ...product, count }];
    });
  }, []);

  const updateCount = useCallback((id: number, count: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, count: Math.max(1, count) } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        products,
        setProducts,
        cartItems,
        addToCart,
        updateCount,
        removeFromCart,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
