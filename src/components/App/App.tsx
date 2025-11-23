import { StrictMode, useState } from "react";
import Catalog from "../../components/Catalog/Catalog";
import CartPopup from "../../components/CartPopup/CartPopup";
import "./style.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

function App() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  const addToCart = (product: CartItem, quantity: number) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.items.findIndex(
        (item) => item.id === product.id
      );

      const newItems = [...prevCart.items];

      if (itemIndex >= 0) {
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + quantity,
        };
      } else {
        newItems.push({ ...product, quantity: quantity });
      }

      const totalItems = newItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalPrice = newItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems: totalItems,
        totalPrice: totalPrice,
      };
    });
  };

  const updateCartQuantity = (productId: number, change: number) => {
    setCart((prevCart) => {
      const newItems = prevCart.items
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) {
              return null;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item !== null) as CartItem[];

      const totalItems = newItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalPrice = newItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  return (
    <StrictMode>
      <>
        <header>
          <h2 className="siteName" style={{ margin: 0, color: "black" }}>
            <span className="vegetable">Vegetable</span>
            <span className="shop">Shop</span>
          </h2>
          <div className="cart-info">
            <CartPopup cart={cart} onUpdateQuantity={updateCartQuantity} />
          </div>
        </header>
        <Catalog onAddToCart={addToCart} />
      </>
    </StrictMode>
  );
}

export default App;
