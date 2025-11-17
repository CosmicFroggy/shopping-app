import { useContext } from "react";

import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./types/AuthTypes";

export const useAuth = (): AuthContextType => useContext(AuthContext);
