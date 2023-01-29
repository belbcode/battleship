import { useState } from "react";
import GameField from "../lib/gameField";
import Field from "./Field";

const Game = () => {
  const [field, setField] = useState(new GameField(10, 10, "empty"));
  return <Field field={field.field} />;
};

export default Game;
