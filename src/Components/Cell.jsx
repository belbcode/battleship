import "../style/cell.css";

const Cell = ({ state }) => {
  return (
    <div className={`cell`} style={{ width: "30px", height: "30px" }}>
      <div className={`cell-${state}`}></div>
    </div>
  );
};

export default Cell;
