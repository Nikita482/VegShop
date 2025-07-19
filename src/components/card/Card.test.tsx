import { render, screen, fireEvent } from "@testing-library/react";
import { MyCard } from "./Card";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MantineProvider } from "@mantine/core";
import { describe, expect, vi, test, beforeEach } from "vitest";

const mockAddToCart = vi.fn();

const mockContextValue = {
  products: [],
  setProducts: () => {},
  cartItems: [],
  updateCount: () => {},
  removeFromCart: () => {},
  addToCart: mockAddToCart,
};

const productMock = {
  id: 1,
  name: "Test Product",
  price: 10,
  image: "test-image.jpg",
  category: "Test Category",
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MantineProvider>
      <ThemeContext.Provider value={mockContextValue}>
        {ui}
      </ThemeContext.Provider>
    </MantineProvider>
  );
};

describe("MyCard", () => {
  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  test("renders loading skeleton when product is null", () => {
    renderWithProviders(<MyCard product={null} data-testid="loading-card" />);
    expect(screen.getByTestId("loading-card")).toBeInTheDocument();
    expect(screen.getByAltText("loading")).toBeInTheDocument();
  });

  test("renders product info and updates count", () => {
    renderWithProviders(
      <MyCard product={productMock} data-testid="product-card" />
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$ 10")).toBeInTheDocument();

    const incrementBtn = screen.getAllByRole("button", { name: "+" })[0];
    fireEvent.click(incrementBtn);
    expect(screen.getByText("$ 20")).toBeInTheDocument();

    const decrementBtn = screen.getAllByRole("button", { name: "–" })[0];
    fireEvent.click(decrementBtn);
    expect(screen.getByText("$ 10")).toBeInTheDocument();
  });

  test("calls addToCart correct amount of times on button click", () => {
    renderWithProviders(<MyCard product={productMock} />);
    const addButton = screen.getByRole("button", { name: /add to cart/i });

    fireEvent.click(addButton);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);

    const incrementBtn = screen.getAllByRole("button", { name: "+" })[0];
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);

    fireEvent.click(addButton);
    expect(mockAddToCart).toHaveBeenCalledTimes(4);
  });
});
