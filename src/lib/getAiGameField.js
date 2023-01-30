import GameField from "./gameField";
import initShips from "./initShips";
import { cloneDeep } from "lodash";

const initAiField = new GameField(10, 10, "empty");
const ships = cloneDeep(initShips);
initAiField.deployShips(
    ships.map((ship) => {
        if (Math.random() > 0.5) ship.gameField.rotateShip();
        return ship.gameField.field;
    })
);

export default initAiField;
