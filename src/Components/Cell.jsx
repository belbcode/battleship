import "../style/cell.css";
const cellSize = 30; //!!! Important !!!/

const Cell = ({ cellState }) => {
  const {coords, state} = cellState
  return (
    <div onClick={()=> {

    }}
      className={`cell`}
      style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
    >
      <div className={`cell-inner cell-${state}`}></div>
    </div>
  );
};

export default Cell;
