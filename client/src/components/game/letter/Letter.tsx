import './Letter.css';

type Props = {
    letter: string;
    color: string;
    handleLetter: (letter: string) => void;
}

const Letter = ({
        letter,
        color,
        handleLetter
    }: Props) => {
    return (
        <>
            <button className={`letter ${color}`} onClick={(e) => {
                handleLetter(letter)
                e.currentTarget.blur() //if you click Enter after pressing the button, you won't write the letter again
            }}>
                <b> {letter} </b>
            </button>
        </>
    )
}

export default Letter;