import { cloneDeep } from "lodash";
import GameField from "./gameField";

export default class AiGameField extends GameField {
    constructor(cols, rows, initShips) {
        super(cols, rows, "empty");
        const ships = cloneDeep(initShips);
        this.deployShips(
            ships.map((ship) => {
                if (Math.random() > 0.5) ship.gameField.rotateShip();
                return ship;
            })
        );
    }

    deployShips(ships) {
        const prevField = cloneDeep(this.field);
        let attempt = 0;
        for (const ship of ships) {
            let coords = this.getRandomCoords();
            while (!this.addShip(ship, coords)) {
                coords = this.getRandomCoords();
                attempt++;
                if (attempt > 1000) {
                    this.field = prevField;
                    this.deployShips(ships);
                    return;
                }
            }
        }
    }

    getRandomCoords() {
        const coords = [
            +(Math.random() * (this.cols - 1)).toFixed(0),
            +(Math.random() * (this.rows - 1)).toFixed(0),
        ];
        return coords;
    }

    aiShot(field) {
        let point = field.getRandomCoords();
        while (
            ["w-ship", "d-ship", "s-empty"].includes(field.getState(point))
        ) {
            point = field.getRandomCoords();
        }

        return field.shoot(point);
    }
}
