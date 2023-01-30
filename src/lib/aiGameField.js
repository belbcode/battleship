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
        } else if (wounded.length === 1) {
            point = this.getShotAroundPoint(gameField, wounded[0]);
            if (point === undefined)
                throw new Error("a-a-a-a-a point undefined");
        } else {
            point = this.getShotLinePoint(gameField, wounded);
            if (point === undefined)
                throw new Error("a-a-a-a-a point undefined");
        }

        console.log(point);
        return gameField.shoot(point);
    }
    getShotLinePoint(gameField, wounded) {
        let [x, y] = wounded[0];
        let [dx, dy] = wounded[0][0] === wounded[1][0] ? [0, 1] : [1, 0];

        let count = 0;
        while (true) {
            count++;
            if (count > Math.max(gameField.rows, gameField.cols) * 3)
                throw new Error("something went wrong");
            x += dx;
            y += dy;
            if (
                x >= gameField.cols ||
                y >= gameField.rows ||
                gameField.getState([x, y]) === "s-empty"
            ) {
                dx *= -1;
                dy *= -1;
            } else if (["ship", "empty"].includes(gameField.getState([x, y])))
                return [x, y];
        }
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
        const num = Math.floor(Math.random() * options.length);
        const shotPoint = options[num];

        if (shotPoint === undefined)
            throw new Error("a-a-a-a-a point undefined");
        console.log(options);
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
        const ships = {};
        for (let row = 0; row < gameField.rows; row++) {
            for (let col = 0; col < gameField.cols; col++) {
                if (gameField.getState([col, row]) === "w-ship") {
                    const shipId = gameField.getShipId([col, row]);
                    if (ships[shipId]) ships[shipId].push([col, row]);
                    else ships[shipId] = [[col, row]];
                }
            }
        }
        let res = [];
        for (const ship in ships) {
            if (res.length < ships[ship].length) res = ships[ship];
        }
        console.log(res);
        return res;
    }
}
