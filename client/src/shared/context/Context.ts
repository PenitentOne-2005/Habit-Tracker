import { createContext } from "react";
import type { AuthContextType } from "./interface";

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
