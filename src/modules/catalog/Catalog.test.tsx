import { render, screen } from "@testing-library/react";
import { Catalog } from "./Catalog";
import { ThemeContext } from "../../contexts/ThemeContext";
import type { Product } from "../../contexts/ThemeContext";
import { describe, it, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Apple",
    price: 1,
    image: "apple.png",
    category: "fruit",
  },
];

const renderWithProviders = (products: Product[]) =>
  render(
    <MantineProvider>
      <ThemeContext.Provider
        value={{
          products,
          setProducts: vi.fn(),
          cartItems: [],
          addToCart: vi.fn(),
          updateCount: vi.fn(),
          removeFromCart: vi.fn(),
        }}
      >
        <Catalog />
      </ThemeContext.Provider>
    </MantineProvider>
  );

describe("Catalog", () => {
  it("рендерит заголовок", () => {
    renderWithProviders(mockProducts);
    expect(screen.getByText("Catalog")).toBeInTheDocument();
  });

  it("рендерит 8 скелетонов, если нет продуктов", () => {
    renderWithProviders([]);
    const cards = screen.getAllByTestId("card");
    expect(cards.length).toBe(8);
  });
});
