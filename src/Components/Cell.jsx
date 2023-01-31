import "../style/cell.css";
import "../style/test.css";
import Default from '../assets/other/sea.jpg'


// const cellSize = 30; //!!! Important !!!/

// const Cell = ({ cellState, handleCellClick }) => {
//     const { coord, state } = cellState;
//     return (
//         <div
//             onClick={() => {
//                 handleCellClick(coord);
//             }}
//             className={`cell`}
//             style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
//         >
//             <div className={`cell-inner cell-${state}`}></div>
//         </div>
//     );
// };

const CellImage = ({image, orientation}) => {
    const rotateDeg = orientation ? '90deg' : '0deg'
    return (
        <img style={{transform: `rotate(${rotateDeg})`}} className="img" src={image} alt="" />
    )
}

const Cell = ({state, handleCellClick}) => {
    return (
        <div className="cell" onClick={() => {
                            handleCellClick(state.coord);
                        }}>
            
            {/* <div className="cell-inner"> */}
            <CellImage image={state.image || Default} orientation={state.orientation} />

            {/* </div> */}
        </div>
    )
}

export default Cell;
