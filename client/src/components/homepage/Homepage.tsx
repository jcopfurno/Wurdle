import { useNavigate } from "react-router-dom";
import './Homepage.css'


const Homepage = ({}) => {
    const navigate = useNavigate();

    return (
        <>  
            <div className="homepage">
                <button 
                    onClick={() => navigate("/wurdle/game/6/5")} 
                    className="link"
                > 
                    Play Wurdle!
                </button>
            </div>
        </>
    )
}

export default Homepage;