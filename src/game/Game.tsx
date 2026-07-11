import Field from "./Field";
import './Game.css'
import { useEffect, useState } from "react";

type GameProps = {
    columns: number;
    rows: number;
}

const Game = ({columns, rows}: GameProps) => {
    const numberOfFields = columns * rows;
    const fields = Array.from({length: numberOfFields});

    const [activeRow, setActiveRow] = useState(0);
    const [activeInput, setActiveInput] = useState(0);
    const [letters, setLetters] = useState<string[]>(Array.from({length: numberOfFields}, () => ""));

    function handleSubmit() {
        setActiveRow(activeRow + 1)
        setActiveInput((activeRow+1) * columns);
    }
    
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (/^[a-zA-Z]$/.test(event.key)) {
                const letter = event.key.toUpperCase();
                if (activeInput < (activeRow + 1) * columns) {
                    setLetters(prevLetters => {
                        const newLetters = [...prevLetters];
                        newLetters[activeInput] = letter;
                        return newLetters;
                    });
                    setActiveInput(activeInput + 1);
                }
            }
            else if (event.key === "Backspace") {
                if (activeInput > activeRow * columns) {
                    setLetters(prevLetters => {
                        const newLetters = [...prevLetters];
                        newLetters[activeInput - 1] = "";
                        return newLetters;
                    });
                    setActiveInput(activeInput - 1);
                }
            }
            else if (event.key === "Enter") {
                handleSubmit();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeInput, activeRow, columns]);

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
                            letters={letters}
                        />
                    ))}
                </div>

                <button onClick={() => handleSubmit()}>
                    <h1> Submit </h1>
                </button>
            </div>
        </>
    )
}

export default Game;