import './Field.css';

type Props = {
    index: number;
    row: number;
    col: number;
    activeRow: number;
    letter: string;
    color: string;
}

const Field = ({
        index,
        row, 
        col,
        activeRow,
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