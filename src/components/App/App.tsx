import { useState } from 'react';
import Catalog from '../../components/Catalog/Catalog';
import CartPopup from '../../components/CartPopup/CartPopup';
import './style.css';
//import { useLocalStorage } from "@mantine/hooks";

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

  //функция для добавления товара в корзину
  const addToCart = (product: CartItem, quantity: number) => {
    setCart((prevCart) => {
      //проверка на наличие товара
      const itemIndex = prevCart.items.findIndex(
        (item) => item.id === product.id
      );
      // копия карта
      const newItems = [...prevCart.items];

      if (itemIndex >= 0) {
        // если товар  есть, то увеличиваем
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + quantity,
        };
      } else {
        // если товара нет, то добавялем
        newItems.push({ ...product, quantity: quantity });
      }
      // подсчет суммы
      const totalItems = newItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalPrice = newItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      //обновленный карт
      return {
        items: newItems,
        totalItems: totalItems,
        totalPrice: totalPrice,
      };
    });
  };

  //функция для удаления товара из корзины
  const updateCartQuantity = (productId: number, change: number) => {
    //console.log("Изменяем товар:", productId, "на", change);

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

      // итоги
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
    <>
      <header>
        <h2 className="siteName" style={{ margin: 0, color: 'black' }}>
          <span className="vegetable">Vegetable</span>
          <span className="shop">Shop</span>
        </h2>
        <div className="cart-info">
          <CartPopup cart={cart} onUpdateQuantity={updateCartQuantity} />
        </div>
      </header>
      <Catalog onAddToCart={addToCart} />
    </>
  );
}

export default App;
