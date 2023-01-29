import { useState } from "react";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css"
import SelectShip from "./SelectShip";

const Game = () => {
  const initField = new GameField(10, 10, "empty");
  for (let i = 1; i < 4; i++) {
    initField.changeState([i, 1], "ship");
  }

  const [field, setField] = useState(initField);
  console.log(initField)
  console.log(field)
  return( 
    <>
    <Field field={field.field} />
    <SelectShip />
    </>
  );
};

export default Game;
