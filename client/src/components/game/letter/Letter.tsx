import './Letter.css';

type Props = {
    letter: string;
    handleLetter: (letter: string) => void;
}

const Letter = ({
        letter,
        handleLetter
    }: Props) => {
    return (
        <>
            <button className="letter" onClick={(e) => {
                handleLetter(letter)
                e.currentTarget.blur() //if you click Enter after pressing the button, you won't write the letter again
            }}>
                <b> {letter} </b>
            </button>
        </>
    )
}

export default Letter;