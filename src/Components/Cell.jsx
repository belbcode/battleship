import "../style/cell.css";
import crossImg from "../assets/cross.svg";

const cellSize = 30; //!!! Important !!!/

const Cell = ({ cellState, handleCellClick }) => {
    const { coord, state } = cellState;
    return (
        <div
            onClick={() => {
                handleCellClick(coord);
            }}
            className={`cell`}
            style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
        >
            <div className={`cell-inner cell-${state}`}>
                {["d-ship", "w-ship", "s-empty"].includes(state) && (
                    <img src={crossImg} />
                )}
            </div>
        </div>
    );
};

export default Cell;
