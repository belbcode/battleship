import { useState } from "react";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css";

const SelectShip = ({selectShip}) => {
    const selectField = new GameField(1, 3, "ship");

    const [selectBox, setSelectBox] = useState([
        { id: "shipP1", field: new GameField(1, 2, "ship") },
        { id: "shipP2", field: new GameField(1, 4, "ship") },
        { id: "shipP3", field: new GameField(1, 3, "ship") },
        { id: "shipP4", field: new GameField(1, 2, "ship") },
    ]);

    return (
        <>
            <div className="select-cont">
                {selectBox.map((field, index) => {
                    return (
                        <div onClick={() => selectShip.handleSelect(selectBox[index])} className="select-item" key={index}>
                            <div>
                                <Field field={field.field.field} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default SelectShip;
