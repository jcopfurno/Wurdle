import { Activity, useEffect, useState } from 'react';
import './Field.css';

type Props = {
    letter: string;
    color: string;
    index: number;
    columns: number;
}

const Field = ({
        letter,
        color,
        index,
        columns
    }: Props) => {

    const [actualColor, setActualColor] = useState("black")
    const [correctAnimation, setCorrectAnimation] = useState(false)

    const column = index % columns;

    useEffect(() => {
        if (color != "black") {
            setTimeout(() => {
                setCorrectAnimation(true)

                setTimeout(() => {
                    setActualColor(color);
                }, 300);
            }, 500*column)
        }
    }, [color]);

    return (
        <>
            <div className={`field ${actualColor} ${correctAnimation ? "correct" : ""}`}>
                <b> {letter} </b>
            </div>
        </>
    )
}

export default Field;