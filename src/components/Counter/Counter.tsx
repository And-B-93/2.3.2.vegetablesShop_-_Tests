import { Button, Group } from "@mantine/core";
import "./style.css";

interface CounterProps {
  value: number;
  onChange: (newValue: number) => void;
}

const Counter = ({ value, onChange }: CounterProps) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <Group gap="xs">
      <Button
        size="xs"
        radius="md"
        onClick={handleDecrement}
        color="rgba(112, 110, 110, 1)"
      >
        <div className="mathSymbol"> - </div>
      </Button>

      {value}
      <Button
        color="rgba(112, 110, 110, 1)"
        size="xs"
        radius="md"
        onClick={handleIncrement}
      >
        <div className="mathSymbol"> + </div>
      </Button>
    </Group>
  );
};

export default Counter;
