import Cell from "./Cell";
import "../style/row.css";
const Row = ({ row }) => {
  return (
    <div className="row">
      {row.map((v, i) => (
        <Cell state={v} key={i} />
      ))}
    </div>
  );
};

export default Row;
