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
      for (let i = 0; i < cols; i++) row.push(initState);
      this.field.push(row);
    }
  }
  changeState(point, state) {
    this.field[point[1]][point[0]] = state;
  }
}
