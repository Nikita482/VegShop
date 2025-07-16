import "./Card.css";
import {
  Card,
  Image,
  Text,
  Button,
  Divider,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useState } from "react";

export const MyCard = () => {
  const [count, setCount] = useState(1);

  return (
    <>
      <Card className="card" shadow="sm" padding="md" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://via.placeholder.com/300x200"
            height={160}
            alt="Product"
            fit="cover"
          />
        </Card.Section>

        <Divider my="sm" />

        <Group justify="space-between" align="center" mb={16}>
          <Text fw={500}>Название</Text>

          <Group align="center" gap="xs">
            <Text size="sm" c="dimmed" style={{ whiteSpace: "nowrap" }}>
              500 г
            </Text>

            <Group gap="xs" align="center" wrap={"nowrap"}>
              <ActionIcon
                variant="outline"
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                size={28}
              >
                –
              </ActionIcon>
              <Text>{count}</Text>
              <ActionIcon
                variant="outline"
                onClick={() => setCount((c) => c + 1)}
                size={28}
              >
                +
              </ActionIcon>
            </Group>
          </Group>
        </Group>

        <Group justify="space-between">
          <Text fw={600}>₽ 350</Text>
          <Button radius="md">В корзину</Button>
        </Group>
      </Card>
    </>
  );
};
