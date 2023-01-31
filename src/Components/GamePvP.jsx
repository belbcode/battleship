import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import GameField from "../lib/gameField";
import Field from "./Field";
import "../style/game.css";
import SelectShip from "./SelectShip";
import initShips from "../lib/initShips";
import { io } from "socket.io-client";
import userEvent from "@testing-library/user-event";

const initEnemyField = new GameField(10, 10, "unknown");
initEnemyField.deployedShips = initShips.length;

const socket = io("http://localhost:3002");

const Game = () => {
    const [gamePhase, setGamePhase] = useState("wait-player");
    const [isMyMove, setIsMyMove] = useState();
    const [isWin, setIsWin] = useState();
    useEffect(() => {
        socket.on("deployment", () => {
            setGamePhase("deployment");
        });

        socket.on("battle", (isMyMove) => {
            setIsMyMove(isMyMove);
            setGamePhase("battle");
        });

        socket.on("shot", (coords) => {
            setField((prev) => {
                const newField = prev.shoot(coords);
                socket.emit(
                    "hit",
                    coords,
                    newField.getState(coords),
                    newField.getShipId(coords)
                );
                if (newField.deployedShips === 0) socket.emit("game-over");
                return newField;
            });
            setIsMyMove(true);
        });
        socket.on("hit", (coords, state, shipId) => {
            setEnemyField(enemyField.changeCell(coords, state, shipId));
            if (state === "d-ship") setEnemyField(enemyField.shotShip(coords));
            setIsMyMove(false);
        });
        socket.on("game-over", (isWin) => {
            setGamePhase("game-over");
            setIsWin(isWin);
        });
    }, []);

    const [field, setField] = useState(new GameField(10, 10, "empty"));
    const [enemyField, setEnemyField] = useState(initEnemyField);
    const [selectedShip, setSelectedShip] = useState();
    const [shipsToDeploy, setShipsToDeploy] = useState(initShips);

    useEffect(() => {
        if (shipsToDeploy.length === 0) socket.emit("deployed");
    }, [shipsToDeploy]);

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
        socket.emit("shot", coords);
    };

    return (
        <>
            <h1>{`${gamePhase}`}</h1>;
            {gamePhase === "game-over" && (
                <h1>{`${isWin ? "You won" : "You lost"}`}</h1>
            )}
            ;
            {gamePhase === "battle" && (
                <h1>{`${isMyMove ? "Your move" : "Enemy move"}`}</h1>
            )}
            ;
            <div className="flex">
                <div>
                    <h3>{`My field. Deployed: ${field.deployedShips}`}</h3>
                    <Field
                        field={field.field}
                        handleCellClick={deploySelectedShip}
                    />
                </div>
                {shipsToDeploy.length === 0 && (
                    <div>
                        <h3>{`Enemy field. Deployed: ${enemyField.deployedShips}`}</h3>
                        <Field
                            field={enemyField.field}
                            handleCellClick={
                                isMyMove && gamePhase === "battle"
                                    ? shoot
                                    : () => {}
                            }
                        />
                    </div>
                )}
            </div>
            {gamePhase === "deployment" && (
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
