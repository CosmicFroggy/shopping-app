import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";

const SideBar = () => {
    const { authInfo, setAuthInfo } = useAuth();

    return (
        <div className="p-3 h-60 w-60 bg-blue-400 border-2 border-amber-200">
            <div className="mb-2">
                <h1 className="font-semibold text-lg" hidden={!authInfo}>
                    {authInfo?.username}
                </h1>
                <h2 className="italic text-sm" hidden={!authInfo}>
                    {authInfo?.role}
                </h2>
            </div>
            <ol>
                <li hidden={!authInfo}>
                    <button onClick={() => setAuthInfo(null)}>Log out</button>
                </li>
                <li hidden={authInfo?.role !== "ADMIN"}>
                    <Link to="/create">Create listing</Link>
                </li>
                <li hidden={!!authInfo}>
                    <Link to="/login">Log in</Link>
                </li>
                <li hidden={!!authInfo}>
                    <Link to="/signup">Sign up</Link>
                </li>
            </ol>
        </div>
    );
};

export default SideBar;
