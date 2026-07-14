import { Link } from "react-router-dom";
import './Homepage.css'

const Homepage = ({}) => {
    return (
        <>
            <div className="homepage">
                <div className="menu">
                    <Link to="/wurdle/game/6/5"> 
                        <div className="link">
                            Play Wurdle!
                        </div>
                    </Link>

                    <Link to="/wurdle/signin">
                        <div className="link">
                            Sign in
                        </div>
                    </Link>

                    <Link to="/wurdle/signup">
                        <div className="link">
                            Sign up
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Homepage;