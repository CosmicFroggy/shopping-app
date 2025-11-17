export type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
};
