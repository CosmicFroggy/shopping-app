import { useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import { AuthInfo } from "./types/AuthTypes";

type props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: props) => {
    const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);

    return (
        <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
