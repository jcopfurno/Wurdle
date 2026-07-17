import './Field.css';

type Props = {
    letter: string;
    color: string;
}

const Field = ({
        letter,
        color
    }: Props) => {
    return (
        <>
            <div className={`field ${color}`}>
                <b> {letter} </b>
            </div>
        </>
    )
}

export default Field;