import { useNavigate } from "react-router-dom";
import './Homepage.css'


const Homepage = ({}) => {
    const navigate = useNavigate();

    return (
        <>  
            <div className="homepage">
                <div className="menu"> 
                    <button 
                        onClick={() => navigate("/game/6/5")} 
                        className="link"
                    > 
                        Play Wurdle!
                    </button>
                </div>
            </div>
        </>
    )
}

export default Homepage;