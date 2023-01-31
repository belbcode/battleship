import { useState } from "react";
import { cloneDeep } from "lodash";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css";
import SelectShip from "./SelectShip";
import initShips from "../lib/initShips";
import AiGameField from "../lib/aiGameField";

const Game = () => {
    const [aiField, setAiField] = useState(new AiGameField(10, 10, initShips));
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
            const isAdded = newGameField.addShip(selectedShip, coords);
            if (isAdded)
                setShipsToDeploy((prev) =>
                    prev.filter((x) => x.id !== selectedShip.id)
                );
            return newGameField;
        });
    };

    const shoot = (coords) => {
        if (enemyField.getState(coords) !== "unknown") return;
        setAiField(aiField.shoot(coords));
        setEnemyField(
            enemyField.changeCell(
                coords,
                aiField.getState(coords),
                aiField.getShipId(coords)
            )
        );
        if (enemyField.getState(coords) === "d-ship")
            setEnemyField(enemyField.shotShip(coords));
        setField((prev) => {
            return aiField.aiShot(prev);
        });
    };

    return (
        <>
            <div className="flex">
                <div>
                    <h3>{`My field. Deployed: ${field.deployedShips}`}</h3>
                    <Field
                        field={field.field}
                        handleCellClick={deploySelectedShip}
                    />
                </div>
                {shipsToDeploy.length === 0 && (
                    <>
                        <div>
                            <h3>{`Enemy field. Deployed: ${aiField.deployedShips}`}</h3>
                            <Field
                                field={enemyField.field}
                                handleCellClick={shoot}
                            />
                        </div>
                        {/* <div>
                            <h3>{`Enemy field. Deployed: ${aiField.deployedShips}`}</h3>
                            <Field
                                field={aiField.field}
                                handleCellClick={() => {}}
                            />
                        </div> */}
                    </>
                )}
            </div>
            {shipsToDeploy.length > 0 && (
                <SelectShip
                    setSelectedShip={setSelectedShip}
                    shipsToDeploy={shipsToDeploy}
                    setShipsToDeploy={setShipsToDeploy}
                />
            )}
        </>
    );
};

export default Game;
