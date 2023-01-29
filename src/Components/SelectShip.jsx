import { useState } from "react";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css";

const SelectShip = ({ setSelectedShip }) => {
    const [selectBox, setSelectBox] = useState([
        { id: "shipP1", gameField: new GameField(1, 2, "ship") },
        { id: "shipP2", gameField: new GameField(1, 4, "ship") },
        { id: "shipP3", gameField: new GameField(1, 3, "ship") },
        { id: "shipP4", gameField: new GameField(1, 2, "ship") },
    ]);

    const [selectedId, setSelectedId] = useState();
    const handleClick = (ship) => {
        setSelectedShip(ship.gameField.field);
        setSelectedId(ship.id);
    };

    return (
        <>
            <div className="select-cont">
                {selectBox.map((ship) => {
                    return (
                        <div
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setSelectBox((prev) => {
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
