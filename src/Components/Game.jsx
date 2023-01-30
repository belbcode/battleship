import { useState } from "react";
import { cloneDeep, map } from "lodash";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css";
import SelectShip from "./SelectShip";
import initShips from "../lib/initShips";
import initAiField from "../lib/getAiGameField";

const Game = () => {
    const [aiField, setAiField] = useState(initAiField);
    const [field, setField] = useState(new GameField(10, 10, "empty"));
    const [enemyField, setEnemyField] = useState(
        new GameField(10, 10, "unknown")
    );

    const [selectedShip, setSelectedShip] = useState();

    const [shipsToDeploy, setShipsToDeploy] = useState(initShips);

    const deploySelectedShip = (coords) => {
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

    const shoot = (coords) => {
        setAiField(aiField.shoot(coords));
        setEnemyField(enemyField.changeState(coords, aiField.getState(coords)));
    };

    return (
        <>
            <div className="flex">
                <div>
                    <h3>My field</h3>
                    <Field
                        field={field.field}
                        handleCellClick={deploySelectedShip}
                    />
                </div>
                <div>
                    <h3>How I see enemy field</h3>
                    <Field field={enemyField.field} handleCellClick={shoot} />
                </div>
                <div>
                    <h3>How I see enemy field</h3>
                    <Field field={aiField.field} handleCellClick={() => {}} />
                </div>
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
