import "./Header.css";
import { useState } from "react";
import { Button, Paper, Transition } from "@mantine/core";

export const Header = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="header">
        <h1>Vegetable</h1>
        <div>
          <Button onClick={() => setOpened((e) => !e)}>Открыть окно</Button>

          <Transition
            mounted={opened}
            transition="fade"
            duration={200}
            timingFunction="ease"
          >
            {(styles) => (
              <Paper style={{ ...styles }} shadow="md">
                <div className="header__window">Твой контент</div>
              </Paper>
            )}
          </Transition>
        </div>
      </div>
    </>
  );
};
