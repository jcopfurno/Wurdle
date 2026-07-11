import Field from "./Field";
import './Game.css'
import { useEffect, useState } from "react";
import { Words } from "./Words";

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

    function getRandomWord() {
        return Words[Math.floor(Math.random() * Words.length)];
    }

    const wordToGuess = getRandomWord();

    function handleSubmit() {
        const word = letters.slice(activeRow * columns, (activeRow + 1) * columns).join("").toLowerCase();
        console.log("Submitted word:", word);

        if (word.length === columns && Words.includes(word)) {
            console.log("Valid word");

            setActiveRow(activeRow + 1)
            setActiveInput((activeRow+1) * columns);
        }
        else {
            console.log("Invalid word or incorrect length");
        }
    }

    function handleLetter(letter: string) {
        if (activeInput < (activeRow + 1) * columns) {
            setLetters(prevLetters => {
                const newLetters = [...prevLetters];
                newLetters[activeInput] = letter;
                return newLetters;
            });
            setActiveInput(activeInput + 1);
        }
    }

    function handleBackspace() {
        if (activeInput > activeRow * columns) {
            setLetters(prevLetters => {
                const newLetters = [...prevLetters];
                newLetters[activeInput - 1] = "";
                return newLetters;
            });
            setActiveInput(activeInput - 1);
        }
    }
    
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (/^[a-zA-Z]$/.test(event.key)) {
                const letter = event.key.toUpperCase();

                handleLetter(letter);
            }
            else if (event.key === "Backspace") {
                handleBackspace();
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