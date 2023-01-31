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
    constructor(cols, rows, initState, images, states) {
        this.cols = cols;
        this.rows = rows;
        this.images = images;
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++)
                row.push({ state: initState, coord: [j, i], shipId: null, image: images ? images[i] : null, ...states});
            this.field.push(row);
        }
    }

    getState(point) {
        return this.field[point[1]][point[0]].state;
    }
    getShipId(point) {
        return this.field[point[1]][point[0]].shipId;
    }

    shoot(point) {
        const state = this.getState(point);
        switch (state) {
            case "empty":
                return this.changeCell(point, "s-empty");

            case "ship":
                return this.shotShip(point);

            default:
                return this;
        }
    }

    shotShip(point) {
        const [x, y] = point;
        const coords = [];
        this.getShipCoords(point, this.field[y][x].shipId, coords);
        const res = this.changeCell(point, "w-ship");
        if (this.isShipDestroyed(coords)) {
            this.deployedShips--;
            return this.changeCells(coords, "d-ship");
        } else return res;
    }

    isShipDestroyed(coords) {
        for (const coord of coords) {
            if (this.getState(coord) === "ship") return false;
        }
        return true;
    }
    getShipCoords(point, shipId, coords) {
        const [x, y] = point;
        if (
            x < 0 ||
            y < 0 ||
            x >= this.cols ||
            y >= this.rows ||
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

    changeCell(point, state, shipId = null) {
        const cell = this.field[point[1]][point[0]];
        this.field[point[1]][point[0]] = { ...cell, state: state };
        if (shipId) this.field[point[1]][point[0]].shipId = shipId;
        return cloneDeep(this);
    }

    changeCells(points, state) {
        for (const point of points) this.changeCell(point, state);

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
        this.deployedShips++;
        return true;
    }

    insertAt(stateArray) {

        stateArray.forEach((state) => {
            const [x, y] = state.coord
            // if(x > this.height || y > this.length) {
            //     throw new Error("insertion out of matrix bounds")
            // }
            this.field[y][x] = state
        })
        return cloneDeep(this.field)
    }

    isValidCoordToDeploy(x, y) {
        if (y >= this.rows || x >= this.cols) return false;
        if (this.field[y][x].state === "ship") return false;

        return true;
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
            Math.floor(Math.random() * this.cols),
            Math.floor(Math.random() * this.rows),
        ];
        return coords;
    }
}
