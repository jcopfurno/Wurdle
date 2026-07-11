import './Field.css';

type Props = {
    index: number;
    row: number;
    col: number;
    activeRow: number;
    letters: string[];
}

const Field = ({
        index,
        row, 
        col,
        activeRow,
        letters
    }: Props) => {
    return (
        <>
            <div className="field">
                <div>
                    {letters[index]}
                </div>
            </div>
        </>
    )
}

export default Field;