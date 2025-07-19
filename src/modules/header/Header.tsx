import "./Header.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Button,
  Paper,
  Transition,
  Text,
  Image,
  Group,
  ActionIcon,
} from "@mantine/core";

import cartWin from "../../assets/cartWin.png";
import cart_empty from "../../assets/cart_empty.png";

export const Header = () => {
  const ctx = useContext(ThemeContext);
  const [opened, setOpened] = useState(false);

  if (!ctx) return null;

  const { cartItems, updateCount } = ctx;

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <div className="header">
      <h1 className="header__name">
        Vegetable <span className="header__shop">SHOP</span>
      </h1>

      <div className="header__right">
        <div className="header__container">
          <Button
            className="header__btn"
            w={144}
            fw={600}
            radius="md"
            bg={"rgba(84, 180, 106, 1)"}
            c={"rgba(255, 255, 255, 1)"}
            onClick={() => setOpened((o) => !o)}
          >
            {cartItems.length === 0 ? (
              ""
            ) : (
              <Text
                bg={"rgba(255, 255, 255, 1)"}
                c={"rgba(33, 37, 41, 1)"}
                w={20}
                h={20}
                fw={600}
                size="sm"
                mr={10}
                style={{
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartItems.length}
              </Text>
            )}
            Cart
            <img style={{ marginLeft: "10px" }} src={cartWin} alt="cartWin" />
          </Button>
        </div>
        <Transition
          mounted={opened}
          transition="fade"
          duration={200}
          timingFunction="ease"
        >
          {(styles) => (
            <Paper
              style={{
                ...styles,
                maxHeight: 400,
                overflowY: "auto",
              }}
              shadow="md"
              radius={16}
            >
              <div className="header__window">
                {cartItems.length === 0 ? (
                  <>
                    <Image
                      src={cart_empty}
                      alt="no card"
                      style={{ width: 117, height: 106, margin: "24px auto" }}
                    />
                    <Text
                      c={"rgba(134, 142, 150, 1)"}
                      style={{
                        margin: "0 auto 30px auto",
                        textAlign: "center",
                      }}
                    >
                      + You cart is empty!
                    </Text>
                  </>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <Group
                        key={item.id}
                        mb={12}
                        className="header__wrapperCard"
                      >
                        <div className="header__card">
                          <Image src={item.image} className="header__img" />
                          <div style={{ margin: "10px 0 0 10px" }}>
                            <Text fw={600} size="18px" c="rgba(33, 37, 41, 1)">
                              {item.name}
                            </Text>
                            <Text
                              size="16px"
                              fw={600}
                              mt={10}
                              c="rgba(33, 37, 41, 1)"
                            >
                              き {item.price * item.count}
                            </Text>
                          </div>
                        </div>

                        <Group gap="xs">
                          <ActionIcon
                            aria-label="decrement"
                            style={{
                              backgroundColor: "rgba(222, 226, 230, 1)",
                              color: "rgba(33, 37, 41, 1)",
                              border: "none",
                            }}
                            radius="md"
                            onClick={() => updateCount(item.id, item.count - 1)}
                          >
                            –
                          </ActionIcon>
                          <Text>{item.count}</Text>
                          <ActionIcon
                            aria-label="increment"
                            style={{
                              backgroundColor: "rgba(222, 226, 230, 1)",
                              color: "rgba(33, 37, 41, 1)",
                              border: "none",
                            }}
                            radius="md"
                            onClick={() => updateCount(item.id, item.count + 1)}
                          >
                            +
                          </ActionIcon>
                        </Group>
                      </Group>
                    ))}
                    <Group
                      justify="space-between"
                      style={{ padding: "5px 10px" }}
                    >
                      <Text fw={600}>Total</Text>
                      <Text fw={600}>${total}</Text>
                    </Group>
                  </>
                )}
              </div>
            </Paper>
          )}
        </Transition>
      </div>
    </div>
  );
};
