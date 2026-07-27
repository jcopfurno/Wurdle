import Field from "./field/Field";
import Letter from "./letter/Letter";
import EndDialogue from "./end_dialogue/EndDialogue";
import './Game.css';
import './letter/Letter.css';
import useGame from "../../hooks/useGame";
import { useParams } from "react-router-dom";
import { Letters } from "../../utils/Letters";
import { IoBackspaceOutline } from "react-icons/io5";

type RouteParams = {
    rows: string;
    columns: string;
};

const Game = ({}) => {
    const params = useParams <RouteParams>();

    const rows = Number(params.rows);
    const columns = Number(params.columns);

    const {
        letters,
        colors,
        fields,
        letterColors,
        shakingRow,
        gameOver,
        gameWon,
        showEndDialogue,
        handleSubmit,
        handleLetter,
        handleBackspace,
        toggleEndDialogue
    } = useGame({rows, columns});

    return (
        <>
            <div className="game">
                <div className="grid">
                    {fields.map((_, index) => (
                        <Field
                            letter={letters[index]}
                            color={colors[index]}
                            index={index}
                            shake={Math.floor(index / columns) === shakingRow}
                            columns={columns}
                        />
                    ))}
                </div>
            {!gameOver ? 
                <div className="letters">
                    {Letters.map((_, row) => (
                        <div className="row">
                            {row === 2 &&
                                <button className="letter enter" onClick={()=> handleSubmit()}>
                                    ENTER
                                </button>
                            }

                            {Letters[row].map((letter, _) => (
                                <Letter
                                    handleLetter={handleLetter}
                                    color={letterColors[letter]}
                                    letter={letter}
                                />
                            ))}

                            {row === 2 &&
                                <button className="letter backspace" onClick={()=> handleBackspace()}>
                                    <IoBackspaceOutline size={24}/>
                                </button>
                            }
                        </div>
                    ))}

                </div> 
                :
                <div className="menu"> 
                    <button
                        onClick={toggleEndDialogue} 
                        className="link"
                    >
                        See results 
                    </button>

                    <button 
                        onClick={() => window.location.reload()} 
                        className="link"
                    > 
                        Play again!
                    </button>
                </div>
            }
            </div>
            {showEndDialogue && 
            
            <EndDialogue
                toggleEndDialogue={toggleEndDialogue}
                gameWon={gameWon}
            />}
        </>
    )
}

export default Game;