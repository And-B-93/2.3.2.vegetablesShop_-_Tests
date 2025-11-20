import { expect, it, describe, beforeAll, vi } from "vitest";
vi.mock("../../Hooks/useRequest", () => ({
  default: vi.fn(() => [
    [
      {
        id: 98,
        name: "Brocolli - 999 Kg",
        price: 9999,
        image: "brocolli.jpg",
      },
      {
        id: 99,
        name: "Cucumber - 999 Kg",
        price: 9999,
        image: "cucumber.jpg",
      },
    ],
    false,
    "",
  ]),
}));

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Catalog from "./Catalog";

import { MantineProvider } from "@mantine/core";

// Мок window.matchMedia для корректной работы MantineProvider в тестах
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe("CatalogComponent", function () {
  it("проверка увеличения счетчика товара", async () => {
    const mockAddToCart = vi.fn();
    render(
      <MantineProvider>
        <Catalog onAddToCart={mockAddToCart} />
      </MantineProvider>
    );

    await screen.findByText(/Brocolli/i);
    const plusBtnAll = screen.getAllByText("+");
    const plusBtn = plusBtnAll[0];

    fireEvent.click(plusBtn);

    const newCounters = screen.getAllByText("2");
    const newCounter = newCounters[0];

    expect(newCounter).toBeInTheDocument();
  });

  it("проверка отсутсвия 0 при клике на -", async () => {
    const mockAddToCart = vi.fn();
    render(
      <MantineProvider>
        <Catalog onAddToCart={mockAddToCart} />
      </MantineProvider>
    );

    await screen.findByText(/Brocolli/i);
    const minusBtnAll = screen.getAllByText("-");
    const minusBtn = minusBtnAll[0];

    fireEvent.click(minusBtn);

    const newCounters = screen.getAllByText("1");
    const newCounter = newCounters[0];

    expect(newCounter).toBeInTheDocument();
  });

  it("проверка изменения товара при клике на + и  -", async () => {
    const mockAddToCart = vi.fn();
    render(
      <MantineProvider>
        <Catalog onAddToCart={mockAddToCart} />
      </MantineProvider>
    );

    await screen.findByText(/Brocolli/i);

    const plusBtnAll = screen.getAllByText("+");
    const plusBtn = plusBtnAll[0];

    const minusBtnAll = screen.getAllByText("-");
    const minusBtn = minusBtnAll[0];

    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    fireEvent.click(minusBtn);

    const newCounters = screen.getAllByText("3");
    const newCounter = newCounters[0];

    expect(newCounter).toBeInTheDocument();
  });

  it("проверка добавления в корзину товара по клику на кнопку Add to cart", async () => {
    const mockAddToCart = vi.fn();
    render(
      <MantineProvider>
        <Catalog onAddToCart={mockAddToCart} />
      </MantineProvider>
    );

    const addToCartBtns = screen.getAllByText(/add to cart/i);
    const addToCartBtn = addToCartBtns[0];

    fireEvent.click(addToCartBtn);

    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 98,
        name: "Brocolli - 999 Kg",
        price: 9999,
        quantity: 1,
      }),
      1
    );
  });
});
