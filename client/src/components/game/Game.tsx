import Field from "./field/Field";
import Letter from "./letter/Letter";
import './Game.css';
import useGame from "../../hooks/useGame";
import { useParams } from "react-router-dom";
import { Letters } from "../../utils/Letters";

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
                        />
                    ))}
                </div>
            
                <div className="letters">
                    {Letters.map((_, row) => (
                        <div className="row">
                            {Letters[row].map((letter, index) => (
                                <Letter
                                    handleLetter={handleLetter}
                                    letter={letter}
                                />
                            ))}
                        </div>
                    ))}

                </div> 
            </div>
        </>
    )
}

export default Game;