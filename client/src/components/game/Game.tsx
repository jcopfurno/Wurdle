import Field from "./field/Field";
import Letter from "./letter/Letter";
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
        activeRow,
        handleSubmit,
        handleLetter,
        handleBackspace
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
                            columns={columns}
                        />
                    ))}
                </div>
            
                <div className="letters">
                    {Letters.map((_, row) => (
                        <div className="row">
                            {row === 2 &&
                                <button className="letter enter" onClick={()=> handleSubmit()}>
                                    ENTER
                                </button>
                            }

                            {Letters[row].map((letter, index) => (
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
            </div>
        </>
    )
}

export default Game;