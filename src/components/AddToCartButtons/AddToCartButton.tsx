import { Button } from "@mantine/core";
import greenCart from "../../assets/cartGreen.svg";
import "./style.css";

interface AddToCartButtonProps {
  onClick: () => void;
}

const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
  return (
    <Button
      variant="filled"
      color="rgba(155, 222, 155, 1)"
      radius="md"
      onClick={onClick}
      size="xm"
      fullWidth
    >
      <div className="addToCard">
        <p style={{ color: "green" }}>Add to cart</p>
        <img className="cartGreen" src={greenCart} alt="Cart" />
      </div>
    </Button>
  );
};

export default AddToCartButton;
