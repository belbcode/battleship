import { useState } from "react";
import Field from "./Field";
import "../style/game.css";
import GameField from "../lib/gameField";

const SelectShip = ({ setSelectedShip, setShipsToDeploy, shipsToDeploy }) => {
    const [selectedId, setSelectedId] = useState();
    const handleClick = (ship) => {
        setSelectedShip(ship);
        setSelectedId(ship.id);
    };

    return (
        <>
            <div className="select-cont">
                {shipsToDeploy.map((ship) => {
                    const field = new GameField(5, 5, "empty");
                    if (ship.gameField.rows > 1) {
                        field.addShip(ship, [
                            2,
                            ship.gameField.rows > 3 ? 0 : 1,
                        ]);
                    } else
                        field.addShip(ship, [
                            ship.gameField.cols > 3 ? 0 : 1,

                            2,
                        ]);
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
                                <Field field={field.field} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default SelectShip;
