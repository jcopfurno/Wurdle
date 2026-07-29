import { useEffect, useState } from 'react';
import './Field.css';

type Props = {
    letter: string;
    color: string;
    index: number;
    columns: number;
    shake: boolean;
}

const Field = ({
        letter,
        color,
        index,
        columns,
        shake
    }: Props) => {

    const [actualColor, setActualColor] = useState("black")
    const [colorAnimation, setColorAnimation] = useState(false)

    const column = index % columns;

    useEffect(() => {
        if (color != "black") {
            setTimeout(() => {
                setColorAnimation(true)

                setTimeout(() => {
                    setActualColor(color);
                }, 250);
            }, 250*column)
        }
        else {
            // resetting the puzzle
            
            setActualColor(color);
            setColorAnimation(false);
        }
    }, [color]);

    return (
        <>
            <div className={
                    `field 
                    ${actualColor} 
                    ${colorAnimation ? "correct" : ""} 
                    ${shake ? "shake" : ""}
                    ${letter != "" ? "active" : ""}
                `}>
                <b> {letter} </b>
            </div>
        </>
    )
}

export default Field;