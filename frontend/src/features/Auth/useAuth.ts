import { useContext } from "react";

import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./Auth.types";

export const useAuth = (): AuthContextType => useContext(AuthContext);
