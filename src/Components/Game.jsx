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
      console.log(selectedShip);
        if (!selectedShip) return;

          setField( (prev) => {
            try {
              const newMatrix = prev.insertAt(selectedShip.gameField.field.map((element, index) => {
                console.log(element, index);
                if(element[0].orientation) {
                  return {...element[0] , coord:[coords[0], coords[1]+index],}
                } else {
                  return {...element[0] , coord:[coords[0] + index, coords[1]]}
                }
              }))
              setShipsToDeploy(prev => {
                return prev.filter((x) => selectedShip.id !== x.id)
              })
              setSelectedShip(null)
              
              return newMatrix  
            }
            catch(err) {
              console.log(err)
              return prev
            }
            
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
                    <h3>Enemy field</h3>
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
