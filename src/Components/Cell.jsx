import "../style/cell.css";
const cellSize = 30;

const Cell = ({ state }) => {
  return (
    <div
      className={`cell`}
      style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
    >
      <div className={`cell-inner cell-${state}`}></div>
    </div>
  );
};

export default Cell;
