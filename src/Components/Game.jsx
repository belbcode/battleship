import { createContext, useCallback, useState } from "react";
import { cloneDeep } from "lodash";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css";
import SelectShip from "./SelectShip";

export const GameContext = createContext({ handleCellClick: () => {} });

const Game = () => {
    const initField = new GameField(10, 10, "empty");
    for (let i = 1; i < 4; i++) {
        initField.changeState([i, 1], "ship");
    }

    const [field, setField] = useState(initField);
    const aaa = new GameField(1, 2, "ship").field;
    const [selectedShip, setSelectedShip] = useState(aaa);

    const handleCellClick = (coords) => {
        console.log("setting up a ship");
        setField((prev) => {
            const newGameField = cloneDeep(prev);
            newGameField.addShip(selectedShip, coords);
            return newGameField;
        });
    };

    return (
        <>
            <GameContext.Provider value={{ handleCellClick }}>
                <Field field={field.field} />
            </GameContext.Provider>
            <SelectShip setSelectedShip={setSelectedShip} />
        </>
    );
};

export default Game;
