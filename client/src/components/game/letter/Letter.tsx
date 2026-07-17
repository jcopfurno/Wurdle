import './Letter.css';

type Props = {
    letter: string;
}

const Letter = ({
        letter
    }: Props) => {
    return (
        <>
            <button className="letter">
                <b> {letter} </b>
            </button>
        </>
    )
}

export default Letter;