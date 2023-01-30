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

        return gameField.shoot(point);
    }
    getShotLinePoint(gameField, wounded) {
        let points = [];
        let directions = [];
        if (wounded[0][0] === wounded[1][0]) {
            directions = [
                [0, 1],
                [0, -1],
            ];

            wounded.sort((a, b) => b[1] - a[1]);
            points = [wounded[0], wounded[wounded.length - 1]];
        } else {
            directions = [
                [1, 0],
                [-1, 0],
            ];

            wounded.sort((a, b) => b[0] - a[0]);
            points = [wounded[0], wounded[wounded.length - 1]];
        }
        const index =
            this.getFreeSpace(gameField, points[0], directions[0]) >
            this.getFreeSpace(gameField, points[1], directions[1])
                ? 0
                : 1;

        console.log(
            directions,
            points,
            this.getFreeSpace(gameField, points[0], directions[0]),
            this.getFreeSpace(gameField, points[1], directions[1]),
            index
        );
        const point = [
            points[index][0] + directions[index][0],
            points[index][1] + directions[index][1],
        ];
        console.log(point);
        return point;
    }

    getShotAroundPoint(gameField, point) {
        const [x, y] = point;

        let directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];

        let res = { direction: [], freeSpace: 0 };
        for (const direction of directions) {
            const freeSpace = this.getFreeSpace(gameField, point, direction);
            if (freeSpace > res.freeSpace) res = { freeSpace, direction };
        }

        return [x + res.direction[0], y + res.direction[1]];
    }

    isShotted(gameField, point) {
        return ["w-ship", "d-ship", "s-empty"].includes(
            gameField.getState(point)
        );
    }

    getFreeSpace(gameField, point, direction) {
        const [dx, dy] = direction;
        let [x, y] = point;
        x += dx;
        y += dy;
        let res = 0;
        while (
            x >= 0 &&
            x < gameField.cols &&
            y >= 0 &&
            y < gameField.rows &&
            ["ship", "empty"].includes(gameField.getState([x, y]))
        ) {
            res++;
            x += dx;
            y += dy;
        }
        return res;
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
        return res;
    }
}
