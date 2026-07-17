import { Link, useNavigate } from "react-router-dom";
import './Homepage.css'
import { useEffect, useState } from "react";
import Session from "supertokens-auth-react/recipe/session";
import LogoutButton from "./logout_button/LogoutButton";


const Homepage = ({}) => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function check() {
            setLoggedIn(await Session.doesSessionExist());
        }

        check();
    }, []);

    return (
        <>            
            {loggedIn ? <p>You're logged in</p> : <p> You're not logged in</p>}

            <div className="homepage">
                <div className="menu">
                    <button 
                        onClick={() => navigate("/wurdle/game/6/5")} 
                        className="link"
                    > 
                        Play Wurdle!
                    </button>

                    {loggedIn && 
                        <>
                            <LogoutButton
                                    setLoggedIn = {setLoggedIn}
                            />
                        </>
                    }

                    {!loggedIn &&
                        <>
                            <button 
                                onClick={() => navigate("/auth?show=signin")} 
                                className="link"
                            >
                                Sign in
                            </button>

                            <button
                                onClick={() => navigate("/auth?show=signup")}
                                className="link"
                            >
                                Sign up
                            </button>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Homepage;