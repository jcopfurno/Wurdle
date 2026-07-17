import Field from "./Field";
import './Game.css'
import useGame from "../../hooks/useGame";
import { useParams } from "react-router-dom";

type RouteParams = {
    rows: string;
    columns: string;
};

const Game = ({}) => {
    const params = useParams <RouteParams>();

    const rows = Number(params.rows);
    const columns = Number(params.columns);

    const {
        activeRow,
        activeInput,
        letters,
        colors,
        fields
    } = useGame({rows, columns});

    return (
        <>
            <div className="game">
                <div className="grid">
                    {fields.map((_, index) => (
                        <Field
                            index={index}
                            row={Math.floor(index / columns)} 
                            col={index % columns} 
                            activeRow={activeRow}
                            letter={letters[index]}
                            color={colors[index]}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Game;