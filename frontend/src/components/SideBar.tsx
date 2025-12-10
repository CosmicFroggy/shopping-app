import { useAuth } from "../auth/useAuth";

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
                <li>
                    <button onClick={() => setAuthInfo(null)}>Log out</button>
                </li>
            </ol>
        </div>
    );
};

export default SideBar;
