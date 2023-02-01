import { useState } from "react";
import Field from "./Field";
import "../style/game.css";

const SelectShip = ({ setSelectedShip, setShipsToDeploy, shipsToDeploy }) => {
    const [selectedId, setSelectedId] = useState();
    const handleClick = (ship) => {
      console.log(ship);
        setSelectedShip(ship);
        setSelectedId(ship.id);
    };
    return (
        <>
            <div className="select-cont">
                {shipsToDeploy.map((ship) => {
                    return (
                        <div
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setShipsToDeploy((prev) => {
                                    return prev.map((x) => {
                                        if (x.id === ship.id) {
                                            return {
                                                ...x,
                                                gameField:
                                                    x.gameField.rotateShip(),
                                            };
                                        }
                                        return x;
                                    });
                                });
                                handleClick(ship);
                            }}
                            onClick={() => handleClick(ship)}
                            className={` select-item  ${
                                selectedId === ship.id
                                    ? "select-cont-selected"
                                    : ""
                            }`}
                            key={ship.id}
                        >
                            <div>
                                <Field field={ship.gameField.field} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default SelectShip;
