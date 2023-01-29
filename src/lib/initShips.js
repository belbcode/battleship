import GameField from "./gameField";

const initShips = [
    { id: "shipP1", gameField: new GameField(1, 2, "ship") },
    { id: "shipP2", gameField: new GameField(1, 4, "ship") },
    { id: "shipP3", gameField: new GameField(1, 3, "ship") },
    { id: "shipP4", gameField: new GameField(1, 2, "ship") },
];

export default initShips;
