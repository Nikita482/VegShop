import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MantineProvider } from "@mantine/core";
import { describe, test, expect, vi } from "vitest";

const mockUpdateCount = vi.fn();

const emptyCartContext = {
  cartItems: [],
  updateCount: mockUpdateCount,
};

const filledCartContext = {
  cartItems: [
    { id: 1, name: "Test Product", price: 10, image: "img.jpg", count: 2 },
    { id: 2, name: "Another Product", price: 20, image: "img2.jpg", count: 3 },
  ],
  updateCount: mockUpdateCount,
};

const renderWithProviders = (contextValue: any) =>
  render(
    <MantineProvider>
      <ThemeContext.Provider value={contextValue}>
        <Header />
      </ThemeContext.Provider>
    </MantineProvider>
  );

describe("Header", () => {
  test("рендерит название и кнопку корзины без количества, если корзина пуста", () => {
    renderWithProviders(emptyCartContext);
    expect(screen.getByText("Vegetable")).toBeInTheDocument();
    expect(screen.getByText("SHOP")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cart/i })).toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  test("отображает правильное количество товаров в корзине, если корзина заполнена", () => {
    renderWithProviders(filledCartContext);

    const countElement = screen.getByText(
      filledCartContext.cartItems.length.toString()
    );
    expect(countElement).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Cart/i });
    expect(button).toContainElement(countElement);
  });
});
