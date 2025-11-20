import ky from "ky";
import useRequest from "../../Hooks/useRequest";
import loader from "../../assets/loader.svg";
import AddToCardButton from "../AddToCartButtons/AddToCartButton";
import Counter from "../Counter/Counter";
import { useState } from "react";
import "./style.css";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CatalogProps {
  onAddToCart: (
    product: {
      id: number;
      name: string;
      price: number;
      image: string;
      quantity: number;
    },
    quantity: number
  ) => void;
}

function Catalog({ onAddToCart }: CatalogProps) {
  const [quantityEveryProduct, setQuantityEveryProduct] = useState<{
    [key: number]: number;
  }>({});
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantityEveryProduct((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const [cards, loading, error] = useRequest(fetchCards);
  function fetchCards() {
    return ky(
      `https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json`
    ).json<ProductProps[]>();
  }
  if (error) {
    console.log("Ошибка: ", error);
    return (
      <>
        <h2 style={{ color: "red", fontSize: "50px" }}>ERROR</h2>
        {error}
      </>
    );
  }

  if (loading) {
    return (
      <>
        <h1>Catalog</h1>
        <div className="cards">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div className="card" key={item}>
              <img className="picture" src={loader} />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Catalog</h1>
      <div className="cards">
        {cards.map((card: ProductProps) => (
          <div className="card" key={card.id}>
            <img className="picture" src={card.image} alt={card.name} />
            <div className="nameWeightCounter">
              {card.name.split("-").map((item, index) => (
                <span
                  key={index}
                  className={index === 0 ? "productName" : "productWeight"}
                >
                  {item}
                </span>
              ))}
              <Counter
                value={quantityEveryProduct[card.id] || 1}
                onChange={(newValue) => handleQuantityChange(card.id, newValue)}
              />
            </div>
            <div className="priceAdd">
              <div className="price">$ {card.price}</div>
              <AddToCardButton
                onClick={() => {
                  const quantity = quantityEveryProduct[card.id] || 1;
                  if (quantity > 0) {
                    onAddToCart(
                      {
                        id: card.id,
                        name: card.name,
                        price: card.price,
                        image: card.image,
                        quantity: quantity,
                      },
                      quantity
                    );
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Catalog;
