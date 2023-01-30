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
                row.push({ state: initState, coord: [j, i] });
            this.field.push(row);
        }
    }

    getState(point) {
        return this.field[point[1]][point[0]].state;
    }
    shoot(point) {
        const state = this.getState(point);
        switch (state) {
            case "empty":
                return this.changeState(point, "s-empty");

            case "ship":
                return this.changeState(point, "w-ship");

            default:
                return this;
        }
    }

    changeState(point, state) {
        this.field[point[1]][point[0]] = { state: state, coord: point };
        return cloneDeep(this);
    }

    addShip(ship, coord) {
        const newField = cloneDeep(this.field);
        const [x, y] = coord;
        for (let row = 0; row < ship.length; row++) {
            for (let col = 0; col < ship[row].length; col++) {
                if (!this.isValidCoordToDeploy(col + x, row + y)) return false;
                newField[row + y][col + x].state = "ship";
            }
        }
        this.field = newField;
        return true;
    }

    isValidCoordToDeploy(x, y) {
        if (y >= this.rows || x >= this.cols) return false;
        if (this.field[y][x].state === "ship") return false;
        if (y - 1 >= 0 && this.field[y - 1][x].state === "ship") return false;
        if (y + 1 < this.rows && this.field[y + 1][x].state === "ship")
            return false;
        if (x - 1 >= 0 && this.field[y][x - 1].state === "ship") return false;
        if (x + 1 < this.cols && this.field[y][x + 1].state === "ship")
            return false;
        if (
            x - 1 >= 0 &&
            y - 1 >= 0 &&
            this.field[y - 1][x - 1].state === "ship"
        )
            return false;
        if (
            x - 1 >= 0 &&
            y + 1 < this.rows &&
            this.field[y + 1][x - 1].state === "ship"
        )
            return false;
        if (
            x + 1 < this.cols &&
            y + 1 < this.rows &&
            this.field[y + 1][x + 1].state === "ship"
        )
            return false;
        if (
            x + 1 < this.cols &&
            y - 1 >= 0 &&
            this.field[y - 1][x + 1].state === "ship"
        )
            return false;

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
}
