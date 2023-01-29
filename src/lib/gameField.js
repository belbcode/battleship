// 0  - empty field           //empty
// 1  - alive ship            //ship
// 2  - damaged ship          //w-ship
// 3  - destroyed ship        //d-ship
// 4  - empty shotted field   //s-empty
// 5  - unknown               //unknown

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
}
