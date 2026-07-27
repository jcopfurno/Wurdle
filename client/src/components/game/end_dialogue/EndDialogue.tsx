import './EndDialogue.css'
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom"

type Props = {
    toggleEndDialogue: () => void;
    gameWon: boolean;
}

const EndDialogue = ({toggleEndDialogue, gameWon}: Props) => {
    const navigate = useNavigate();

    return (
        <>
            <div id="end_dialogue">
                <button id="end_dialogue_toggle" onClick={toggleEndDialogue}>
                    <p>Back to puzzle</p> <IoClose color="white" size={30}/> 
                </button>

                <div id="end_dialogue_text">
                    {gameWon ? 
                        <>
                            <h2> Congratulations! You won! </h2> 
                        </>
                        :
                        <h2> Good try! </h2>
                    }
                </div>

                <div className="menu">
                    <button
                        className="link"
                        onClick={() => window.location.reload()} 
                    >
                        Play again
                    </button>

                    <button
                        className="link"
                        onClick={() => navigate("/")}
                    >
                        Return to homepage
                    </button>
                </div>
            </div>
        </>
    )
}

export default EndDialogue;