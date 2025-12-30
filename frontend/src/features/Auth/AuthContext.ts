import { createContext } from "react";
import type { AuthContextType } from "./Auth.types";

export const AuthContext = createContext<AuthContextType>({
    authInfo: null,
    setAuthInfo: () => {},
});
