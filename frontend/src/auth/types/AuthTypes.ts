export type AuthInfo = {
    username: string;
    role: string;
    token: string;
};

export type AuthContextType = {
    authInfo: AuthInfo | null;
    setAuthInfo: (authInfo: AuthInfo | null) => void;
};
