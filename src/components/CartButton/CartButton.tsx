import { Button } from "@mantine/core";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

export const CartButton = ({ title, onClick }: ButtonProps) => {
  return (
    <Button color="green" onClick={onClick}>
      {title}
    </Button>
  );
};
