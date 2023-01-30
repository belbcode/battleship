import { cloneDeep } from "lodash";

//empty
//ship
//w-ship
//d-ship
//s-empty
//unknown

export default class GameField {
    field = [];
    cols;
    rows;
    constructor(cols, rows, initState) {
        this.cols = cols;
        this.rows = rows;
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++)
                row.push({ state: initState, coord: [j, i], shipId: null });
            this.field.push(row);
        }
    }

    getState(point) {
        return this.field[point[1]][point[0]].state;
    }

    shoot(point) {
        const [x, y] = point;
        const state = this.getState(point);
        switch (state) {
            case "empty":
                return this.changeState(point, "s-empty");

            case "ship":
                const coords = [];
                this.getShipCoords(point, this.field[y][x].shipId, coords);
                console.log(coords);
                return this.changeState(point, "w-ship");

            default:
                return this;
        }
    }

    getShipCoords(point, shipId, coords) {
        const [x, y] = point;
        if (
            x < 0 ||
            y < 0 ||
            x >= this.cols ||
            y > this.rows ||
            this.field[y][x].shipId !== shipId
        )
            return coords;

        for (let coord of coords) {
            if (coord[0] === x && coord[1] === y) return coords;
        }

        coords.push(point);

        this.getShipCoords([x - 1, y], shipId, coords);
        this.getShipCoords([x + 1, y], shipId, coords);
        this.getShipCoords([x, y - 1], shipId, coords);
        this.getShipCoords([x, y + 1], shipId, coords);
    }

    changeState(point, state) {
        this.field[point[1]][point[0]] = { state: state, coord: point };
        return cloneDeep(this);
    }

    addShip(ship, coord) {
        const newField = cloneDeep(this.field);
        const [x, y] = coord;
        const field = ship.gameField.field;
        for (let row = 0; row < field.length; row++) {
            for (let col = 0; col < field[row].length; col++) {
                if (!this.isValidCoordToDeploy(col + x, row + y)) return false;
                newField[row + y][col + x].state = "ship";
                newField[row + y][col + x].shipId = ship.id;
            }
        }
        this.field = newField;
        return true;
    }

    isValidCoordToDeploy(x, y) {
        if (y >= this.rows || x >= this.cols) return false;
        if (this.field[y][x].state === "ship") return false;

        return true;
    }

    changeStates(points, state) {
        for (const point of points) this.changeState(point, state);
    }

    rotateShip() {
        const res = [];
        if (this.field.length === 1) {
            for (const cell of this.field[0]) {
                res.push([cell]);
            }
            this.field = res;
        } else {
            for (const cell of this.field) {
                res.push(cell[0]);
            }
            this.field = [res];
        }

        return this;
    }

    getRandomCoords() {
        const coords = [
            +(Math.random() * (this.cols - 1)).toFixed(0),
            +(Math.random() * (this.rows - 1)).toFixed(0),
        ];
        return coords;
    }
}
