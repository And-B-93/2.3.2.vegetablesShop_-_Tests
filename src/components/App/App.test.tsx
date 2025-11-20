import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { expect, it, describe, beforeAll } from "vitest";
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

describe("App component", function () {
  it("должен рендерить app", async () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Vegetable/i)).toBeInTheDocument();
    });
  });

  it("должен рендерить попап корзины при нажатии на кнопку корзины", async () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );

    const cartBtn = screen.getByText(/cart/i);
    fireEvent.click(cartBtn);

    await waitFor(() => {
      const cartPopupForTest = document.querySelector(
        ".mantine-Popover-dropdown"
      );
      expect(cartPopupForTest).not.toBeNull();
    });
  });
});
