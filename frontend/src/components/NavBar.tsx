import logo from "../assets/logo.png";
import account from "../assets/account.png";

const NavBar = () => {
    return (
        <div className="bg-amber-200 p-2.5 flex items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10" />
                <h1 className="text-4xl font-semibold ml-2">Flower Shop</h1>
            </div>
            <img src={account} alt="Logo" className="h-10" />
        </div>
    );
};

export default NavBar;
