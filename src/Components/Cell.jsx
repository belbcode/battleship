import { useContext, useState } from "react";
import "../style/cell.css";
import { GameContext } from "./Game";

const cellSize = 30; //!!! Important !!!/

const Cell = ({ cellState }) => {
    const { handleCellClick } = useContext(GameContext);
    const { coord, state } = cellState;
    return (
        <div
            onClick={() => {
                handleCellClick(coord);
            }}
            className={`cell`}
            style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
        >
            <div className={`cell-inner cell-${state}`}></div>
        </div>
    );
};

export default Cell;
