import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";

const SideBar = () => {
    const { token, setToken } = useAuth();

    return (
        <div className="h-60 w-60 bg-blue-400 border-2 border-amber-200">
            <ol>
                <li hidden={!token}>
                    <button onClick={() => setToken(null)}>Log out</button>
                </li>
                <li hidden={!token}>
                    <Link to="/create">Create listing</Link>
                </li>
                <li hidden={!!token}>
                    <Link to="/login">Log in</Link>
                </li>
                <li hidden={!!token}>
                    <Link to="/signup">Sign up</Link>
                </li>
            </ol>
        </div>
    );
};

export default SideBar;
