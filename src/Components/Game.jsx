import { createContext, useCallback, useState } from "react";
import { cloneDeep } from "lodash";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css";
import SelectShip from "./SelectShip";

export const GameContext = createContext({ handleCellClick: () => {} });

const Game = () => {
    const initField = new GameField(10, 10, "empty");

    const [field, setField] = useState(initField);

    const [selectedShip, setSelectedShip] = useState();

    const handleCellClick = (coords) => {
        if (!selectedShip) return;
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
