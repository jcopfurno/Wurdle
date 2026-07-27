import { useEffect, useState } from "react";
import { Words } from "../utils/Words";

type Props = {
    rows: number;
    columns: number;
}

function useGame ({rows, columns}: Props) {
    const numberOfFields =  rows * columns;
    const fields = Array.from({length: numberOfFields});

    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [showEndDialogue, setShowEndDialogue] = useState(false)

    const [activeRow, setActiveRow] = useState(0);
    const [activeInput, setActiveInput] = useState(0);
    const [letters, setLetters] = useState<string[]>(Array.from({length: numberOfFields}, () => ""));
    const [colors, setColors] = useState<string[]>(Array.from({length: numberOfFields}, () => "black"));
    const [shakingRow, setShakingRow] = useState<number | null>(null);
    const [wordToGuess, setWordToGuess] = useState("adieu");
    useEffect (() => {
        setWordToGuess(getRandomWord());
    }, []);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [letterColors, setLetterColors] = useState<Record<string, string>>(
        Object.fromEntries(alphabet.map(letter => [letter, "gray"]))
    );

    function getRandomWord() { 
        const randomWord = Words[Math.floor(Math.random() * Words.length)]

        //console.log("Random word to guess:", randomWord);

        return randomWord;
    }

    function toggleEndDialogue () {
        setShowEndDialogue(!showEndDialogue);
    }
    

    function handleCheck(word: string) {
        const newColors = [...colors];
        const newLetterColors = {...letterColors};
        const rowOffset = activeRow * columns;

        const remaining: Record<string, number> = {};

        for (let i = 0; i < word.length; i++) {
            if (word[i] === wordToGuess[i]) {
                newColors[rowOffset + i] = "green";
                
                newLetterColors[word[i].toUpperCase()] = "green";
            }
            else {
                remaining[wordToGuess[i]] = (remaining[wordToGuess[i]] ?? 0) + 1;
            }
        }

        for (let i = 0; i < word.length; i++) {
            if (newColors[rowOffset + i] === "green") continue;

            if (remaining[word[i]] > 0) {
                newColors[rowOffset + i] = "yellow";
                remaining[word[i]]--;

                if (newLetterColors[word[i].toUpperCase()] != "green") {
                    newLetterColors[word[i].toUpperCase()] = "yellow";
                }
            }
            else {
                newColors[rowOffset + i] = "gray";

                if (newLetterColors[word[i].toUpperCase()] === "gray") {
                    newLetterColors[word[i].toUpperCase()] = "black";
                }
            }
        }

        let correctGuess = true;
        for (let i = 0; i < columns; i++) {
            if (newColors[rowOffset + i] != "green") {
                correctGuess = false;
            }
        }

        if (correctGuess) {
            setGameWon(true)
            setTimeout(() => {
                setGameOver(true);
            }, 1750);
        }

        setColors(newColors);
        setLetterColors(newLetterColors);
    }

    function handleSubmit() {
        const word = letters.slice(activeRow * columns, (activeRow + 1) * columns).join("").toLowerCase();
        console.log("Submitted word:", word);

        if (word.length === columns && Words.includes(word)) {
            console.log("Valid word");

            handleCheck(word);
            if (activeRow + 1 >= rows) {
                setTimeout(() => {
                    setGameOver(true);
                }, 1750);
            }

            setActiveRow(activeRow + 1)
            setActiveInput((activeRow+1) * columns);
        }
        else {
            setShakingRow(activeRow);
            
            setTimeout(() => {
                setShakingRow(null);
            }, 400)
            console.log("Invalid word");
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
        if (gameOver) {
            setShowEndDialogue(true);
        }
    }, [gameOver])

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

    return {
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
    }
}

export default useGame;