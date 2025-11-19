import { useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./AuthContext";

type props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: props) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
