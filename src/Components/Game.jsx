import { useState } from "react";
import GameField from "../lib/gameField";
import Field from "./Field";

const Game = () => {
  const initField = new GameField(10, 10, "empty");
  for (let i = 1; i < 4; i++) {
    initField.changeState([i, 1], "ship");
  }

  const [field, setField] = useState(initField);

  return <Field field={field.field} />;
};

export default Game;
