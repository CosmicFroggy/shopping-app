import { useState } from "react";
import account from "../../../assets/account.png";
import AccountMenu from "./AccountMenu";
import { useRef } from "react";

const AccountMenuController = () => {
    const [open, setOpen] = useState<boolean>(false);
    const menuTimeoutId = useRef<number | null>(null);

    const CLOSE_DELAY = 300; // ms

    const cancelMenuClose = (): void => {
        if (menuTimeoutId.current !== null) {
            window.clearTimeout(menuTimeoutId.current);
            menuTimeoutId.current = null;
        }
    };

    const openMenu = (): void => {
        cancelMenuClose();
        setOpen(true);
    };

    const closeMenuWithDelay = (): void => {
        cancelMenuClose();
        menuTimeoutId.current = window.setTimeout(() => {
            setOpen(false);
        }, CLOSE_DELAY);
    };

    const closeMenu = (): void => {
        setOpen(false);
    };

    return (
        <div onMouseEnter={openMenu} onMouseLeave={closeMenuWithDelay}>
            <button
                onClick={() => {
                    if (open) closeMenu();
                    else openMenu();
                }}
            >
                <img src={account} alt="account" className="h-10" />
            </button>
            {open && (
                <div className="z-50 absolute top-full right-0">
                    <AccountMenu />
                </div>
            )}
        </div>
    );
};

export default AccountMenuController;
