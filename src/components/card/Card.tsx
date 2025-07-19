import "./Card.css";
import { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import type { Product } from "../../contexts/ThemeContext";
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  ActionIcon,
  Skeleton,
} from "@mantine/core";

type Props = {
  product: Product | null;
  "data-testid"?: string;
};

export const MyCard = ({ product, "data-testid": testId }: Props) => {
  const [count, setCount] = useState(1);
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;

  const { addToCart } = ctx;

  if (!product) {
    return (
      <Card
        className="card"
        data-testid={testId}
        shadow="sm"
        padding="md"
        radius="lg"
        withBorder
      >
        <div style={{ position: "relative" }}>
          <Skeleton height={276} radius="lg" />
          <img
            src="./assets/loader.png"
            alt="loading"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 22,
              height: 20,
            }}
          />
        </div>
        <Skeleton height={24} mt="md" />
        <Skeleton height={36} mt="sm" />
      </Card>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < count; i++) {
      addToCart(product);
    }
  };

  return (
    <Card
      className="card"
      data-testid={testId}
      shadow="sm"
      padding="md"
      radius="lg"
      withBorder
    >
      <Card.Section>
        <Image
          src={product.image}
          height={276}
          alt={product.name}
          fit="cover"
        />
      </Card.Section>

      <Group justify="space-between" align="center" mb={20}>
        <Text fw={600}>{product.name}</Text>
        <Group align="center" gap="xs">
          <Group gap="xs" align="center" wrap="nowrap">
            <ActionIcon
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              size={28}
              style={{
                backgroundColor: "rgba(222, 226, 230, 1)",
                color: "rgba(33, 37, 41, 1)",
                border: "none",
              }}
            >
              –
            </ActionIcon>
            <Text>{count}</Text>
            <ActionIcon
              onClick={() => setCount((c) => c + 1)}
              size={28}
              style={{
                backgroundColor: "rgba(222, 226, 230, 1)",
                color: "rgba(33, 37, 41, 1)",
                border: "none",
              }}
            >
              +
            </ActionIcon>
          </Group>
        </Group>
      </Group>

      <Group justify="space-between">
        <Text fw={600} size="lg">
          $ {product.price * count}
        </Text>
        <Button
          radius="md"
          style={{
            backgroundColor: "rgba(231, 250, 235, 1)",
            color: "rgba(59, 148, 78, 1)",
            width: "70%",
          }}
          onClick={handleAddToCart}
        >
          Add to cart
          <img style={{ marginLeft: 10 }} src="./assets/cart.png" alt="cart" />
        </Button>
      </Group>
    </Card>
  );
};
