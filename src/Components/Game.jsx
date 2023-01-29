import { createContext, useState } from "react";
import { cloneDeep } from "lodash";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css";
import SelectShip from "./SelectShip";
import initShips from "../lib/initShips";

export const GameContext = createContext({ handleCellClick: () => {} });

const Game = () => {
    const initField = new GameField(10, 10, "empty");

    const [field, setField] = useState(initField);

    const [selectedShip, setSelectedShip] = useState();

    const [shipsToDeploy, setShipsToDeploy] = useState(initShips);

    const handleCellClick = (coords) => {
        if (!selectedShip) return;
        setField((prev) => {
            const newGameField = cloneDeep(prev);
            newGameField.addShip(selectedShip.gameField.field, coords);
            return newGameField;
        });
        setShipsToDeploy((prev) =>
            prev.filter((x) => x.id !== selectedShip.id)
        );
    };

    return (
        <>
            <GameContext.Provider value={{ handleCellClick }}>
                <Field field={field.field} />
            </GameContext.Provider>
            <SelectShip
                setSelectedShip={setSelectedShip}
                shipsToDeploy={shipsToDeploy}
                setShipsToDeploy={setShipsToDeploy}
            />
        </>
    );
};

export default Game;
