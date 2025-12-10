import logo from "../assets/logo.png";
import account from "../assets/account.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useAuth } from "../auth/useAuth";

const NavBar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { authInfo } = useAuth();

    return (
        <div
            data-testid="navbarRoot"
            className="relative bg-amber-200 p-2.5 flex items-center justify-between"
        >
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 z-50" />
                <h1 className="text-4xl font-semibold ml-2">Flower Shop</h1>
                <Link hidden={!authInfo} className="ml-4 font-bold" to="/">
                    Home
                </Link>
                <Link
                    hidden={authInfo?.role !== "ADMIN"}
                    className="ml-4 font-bold"
                    to="/create"
                >
                    Create listing
                </Link>
            </div>
            {authInfo && (
                <button onClick={() => setOpen(!open)}>
                    <img src={account} alt="account" className="h-10" />
                </button>
            )}
            {open && (
                <div className="z-50 absolute top-full right-0">
                    <SideBar />
                </div>
            )}
        </div>
    );
};

export default NavBar;
