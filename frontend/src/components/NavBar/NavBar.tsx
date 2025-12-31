import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import AccountMenuController from "./AccountMenu/AccountMenuController";
import { useAuth } from "../../features/Auth/useAuth";

const NavBar = () => {
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
            {authInfo && <AccountMenuController />}
        </div>
    );
};

export default NavBar;
