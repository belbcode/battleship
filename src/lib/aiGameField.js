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

    aiShot(gameField) {
        const wounded = this.getWoundedShip(gameField);
        let point = [];
        if (wounded.length === 0) {
            point = this.getRandomShotPoint(gameField);
            return gameField.shoot(point);
        } else {
            point = this.getShotAroundPoint(gameField, wounded[0]);
        }

        console.log(point);
        return gameField.shoot(point);
    }

    getShotAroundPoint(gameField, point) {
        const [x, y] = point;

        const options = [];
        if (x - 1 >= 0 && !this.isShotted(gameField, [x - 1, y]))
            options.push([x - 1, y]);
        if (x + 1 < gameField.cols && !this.isShotted(gameField, [x + 1, y]))
            options.push([x + 1, y]);
        if (y - 1 >= 0 && !this.isShotted(gameField, [x, y - 1]))
            options.push([x, y - 1]);
        if (y + 1 < gameField.rows && !this.isShotted(gameField, [x, y + 1]))
            options.push([x, y + 1]);
        const num = (Math.random() * options.length).toFixed(0);
        const shotPoint = options[num];
        console.log("shotPoint", shotPoint, options.length, num);
        return shotPoint;
    }

    isShotted(gameField, point) {
        return ["w-ship", "d-ship", "s-empty"].includes(
            gameField.getState(point)
        );
    }

    getRandomShotPoint(gameField) {
        let point = gameField.getRandomCoords();
        while (
            ["w-ship", "d-ship", "s-empty"].includes(gameField.getState(point))
        ) {
            point = gameField.getRandomCoords();
        }
        return point;
    }

    getWoundedShip(gameField) {
        const res = [];
        for (let row = 0; row < gameField.rows; row++) {
            for (let col = 0; col < gameField.cols; col++) {
                if (gameField.getState([col, row]) === "w-ship")
                    res.push([col, row]);
            }
        }
        return res;
    }
}
