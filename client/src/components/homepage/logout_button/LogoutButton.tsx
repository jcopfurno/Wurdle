import Session from "supertokens-auth-react/recipe/session";
import '../Homepage.css'

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function LogoutButton ({setLoggedIn} : Props) {
    function handleSignout () {
        Session.signOut();
        setLoggedIn(false);
    }

    return (
        <button 
            className="link" 
            onClick={() => handleSignout()}
        > 
            Sign out 
        </button>
    )
}

export default LogoutButton