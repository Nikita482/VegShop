import { createContext } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = Product & { count: number };

interface ThemeContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, count?: number) => void;
  updateCount: (id: number, count: number) => void;
  removeFromCart: (id: number) => void;
}

const defaultContext: ThemeContextType = {
  products: [],
  setProducts: () => {},
  cartItems: [],
  addToCart: () => {},
  updateCount: () => {},
  removeFromCart: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);
