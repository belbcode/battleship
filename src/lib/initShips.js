import GameField from "./gameField";

import head from "../assets/ship/a.png"
import body_1 from "../assets/ship/body_a.png"
import body_2 from "../assets/ship/body_b.png"
import body_3 from "../assets/ship/body_c.png"
import tail from "../assets/ship/head_g.png"

const ship2 = [head, tail]
const ship3 = [head, body_3, tail]
const ship4 = [head, body_1, body_3, tail]
const ship5 = [head, body_1, body_2, body_3, tail]
const initShips = [
    { id: "shipP1", gameField: new GameField(1, 5, "ship", ship5, {orientation: true}) },
    { id: "shipP2", gameField: new GameField(1, 4, "ship", ship4, {orientation: true}) },
    { id: "shipP3", gameField: new GameField(1, 4, "ship", ship4, {orientation: true}) },
    { id: "shipP4", gameField: new GameField(1, 3, "ship", ship3, {orientation: true}) },
    { id: "shipP5", gameField: new GameField(1, 3, "ship", ship3, {orientation: true}) },
    { id: "shipP6", gameField: new GameField(1, 3, "ship", ship3, {orientation: true}) },
    { id: "shipP7", gameField: new GameField(1, 2, "ship", ship2, {orientation: true}) },
    { id: "shipP8", gameField: new GameField(1, 2, "ship", ship2, {orientation: true}) },
    { id: "shipP9", gameField: new GameField(1, 2, "ship", ship2, {orientation: true}) },
    { id: "shipP10", gameField: new GameField(1, 2, "ship", ship2, {orientation: true}) },
];

export default initShips;
