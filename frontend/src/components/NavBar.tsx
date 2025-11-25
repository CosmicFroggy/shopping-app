import logo from "../assets/logo.png";
import account from "../assets/account.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const NavBar = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="relative bg-amber-200 p-2.5 flex items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 z-50" />
                <h1 className="text-4xl font-semibold ml-2">Flower Shop</h1>
                <Link className="ml-4 font-bold" to="/">
                    Home
                </Link>
            </div>
            <img
                src={account}
                alt="Logo"
                className="h-10"
                onClick={() => setOpen(!open)}
            />
            {open && (
                <div className="absolute top-full right-0">
                    <SideBar />
                </div>
            )}
        </div>
    );
};

export default NavBar;
