import {
  Popover,
  Button,
  Stack,
  Group,
  Text,
  Image,
  Badge,
} from "@mantine/core";
import emptyCart from "../../assets/cart_content.svg";
import "./style.css";
import whiteCart from "../../assets/cartWhite.svg";

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

interface CartPopoverProps {
  cart: Cart;
  onUpdateQuantity: (productId: number, change: number) => void;
}

const CartItem = ({
  item,
  onUpdateQuantity,
}: {
  item: CartItem;
  onUpdateQuantity: (productId: number, change: number) => void;
}) => {
  const handleDecrease = () => onUpdateQuantity(item.id, -1);
  const handleIncrease = () => onUpdateQuantity(item.id, 1);

  return (
    <Group justify="space-between" style={{ padding: "10px 0" }}>
      <Group gap="xs">
        <Image
          src={item.image}
          alt={item.name}
          radius="md"
          style={{ width: "50px", height: "50px" }}
        />
        <div>
          <Text fw={500} size="sm">
            {item.name}
          </Text>
          ${item.price * item.quantity}
        </div>
      </Group>

      <Group gap="xs">
        <Button
          color="rgba(112, 110, 110, 1)"
          size="xs"
          radius="md"
          onClick={handleDecrease}
        >
          -
        </Button>
        {item.quantity}
        <Button
          color="rgba(112, 110, 110, 1)"
          size="xs"
          radius="md"
          onClick={handleIncrease}
        >
          +
        </Button>
      </Group>
    </Group>
  );
};

const CartPopup = ({ cart, onUpdateQuantity }: CartPopoverProps) => {
  return (
    <Popover width={400} position="bottom-end" closeOnClickOutside={true}>
      <Popover.Target>
        <Button
          color="green"
          leftSection={
            cart.totalItems > 0 ? (
              <Badge color="white" circle>
                <span style={{ color: "black" }}>{cart.totalItems}</span>
              </Badge>
            ) : null
          }
        >
          <Group gap="xs">
            Cart <img className="cartWhite" src={whiteCart} alt="Cart" />
          </Group>
        </Button>
      </Popover.Target>

      <Popover.Dropdown
        style={
          cart.items.length === 0
            ? {
                height: "226px",
                width: "301px",
                padding: 0,
                border: "0px",
                borderRadius: "16px",
                marginTop: "20px",
              }
            : { height: "auto", minWidth: "444px", marginTop: "20px" }
        }
      >
        <Stack gap="sm">
          {cart.items.length === 0 ? (
            <Stack align="center" gap="md">
              <img className="emptyCart" src={emptyCart} alt="emptyCart" />
            </Stack>
          ) : (
            <>
              <Stack gap="xs" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                  />
                ))}
              </Stack>

              <Group
                justify="space-between"
                style={{ borderTop: "1px solid black" }}
              >
                <Text fw="bold">Total </Text>
                <Text fw="bold">$ {cart.totalPrice}</Text>
              </Group>
            </>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CartPopup;
