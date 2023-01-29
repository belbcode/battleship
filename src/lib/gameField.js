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

    changeState(point, state) {
        this.field[point[1]][point[0]] = { state: state, coord: point };
    }

    addShip(ship, coord) {
        const [x, y] = coord;
        for (let row = 0; row < ship.length; row++) {
            for (let col = 0; col < ship[row].length; col++) {
                this.field[row + y][col + x].state = "ship";
            }
        }
        return this.field;
    }

    changeStates(points, state) {
        for (const point of points) this.changeState(point, state);
    }
}
