import logo from "../assets/logo.png";
import account from "../assets/account.png";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { token, setToken } = useAuth();

    return (
        <div className="relative bg-amber-200 p-2.5 flex items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 z-50" />
                <h1 className="text-4xl font-semibold ml-2">Flower Shop</h1>
            </div>
            <img
                src={account}
                alt="Logo"
                className="h-10"
                onClick={() => setOpen(!open)}
            />
            {open && (
                <div className="absolute top-full right-0 h-60 w-60 bg-blue-400 border-2 border-amber-200">
                    <ol>
                        <li hidden={!token}>
                            <button onClick={() => setToken(null)}>
                                Log out
                            </button>
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
            )}
        </div>
    );
};

export default NavBar;
