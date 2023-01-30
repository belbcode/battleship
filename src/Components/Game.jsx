import { createContext, useState } from "react";
import { cloneDeep, map } from "lodash";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css";
import SelectShip from "./SelectShip";
import initShips from "../lib/initShips";
import initAiField from "../lib/getAiGameField";

export const GameContext = createContext({ handleCellClick: () => {} });

const Game = () => {
    const initField = new GameField(10, 10, "empty");

    const [aiField, setAiField] = useState(initAiField);
    const [field, setField] = useState(initField);
    const [enemyField, setEnemyField] = useState(
        new GameField(10, 10, "unknown")
    );

    const [selectedShip, setSelectedShip] = useState();

    const [shipsToDeploy, setShipsToDeploy] = useState(initShips);

    const handleCellClick = (coords) => {
        if (!selectedShip) return;
        setField((prev) => {
            const newGameField = cloneDeep(prev);
            const isAdded = newGameField.addShip(
                selectedShip.gameField.field,
                coords
            );
            if (isAdded)
                setShipsToDeploy((prev) =>
                    prev.filter((x) => x.id !== selectedShip.id)
                );
            return newGameField;
        });
    };

    return (
        <>
            <div className="flex">
                <GameContext.Provider value={{ handleCellClick }}>
                    <Field field={field.field} />
                    <Field field={enemyField.field} />
                    <Field field={aiField.field} />
                </GameContext.Provider>
            </div>
            <SelectShip
                setSelectedShip={setSelectedShip}
                shipsToDeploy={shipsToDeploy}
                setShipsToDeploy={setShipsToDeploy}
            />
        </>
    );
};

export default Game;
