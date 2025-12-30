import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate, Link } from "react-router-dom";
import type { UserInfo } from "../types/UserInfo";
import NavBar from "../components/NavBar";
import { AuthInfo } from "../auth/types/AuthTypes";

const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const { authInfo, setAuthInfo } = useAuth();
    const navigate = useNavigate();

    // if authInfo isn't null then return to home, they're already logged in
    useEffect(() => {
        if (authInfo) {
            navigate("/");
        }
    }, [authInfo, navigate]);

    const login = async (userInfo: UserInfo): Promise<void> => {
        try {
            const backendPort: number =
                parseInt(import.meta.env.VITE_BACKEND_PORT) || 8080;
            const res: Response = await fetch(
                `http://localhost:${backendPort}/auth`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userInfo),
                },
            );

            if (!res.ok) {
                const data = await res.json(); // TODO: define a type for the response body?
                setError(data.error);
            } else {
                const data: AuthInfo = await res.json();
                setAuthInfo(data);
            }
        } catch (error) {
            // TODO: do I still need this catch?
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setError(null);
        const userInfo: UserInfo = {
            username,
            password,
        };
        login(userInfo);
    };

    return (
        <div>
            <NavBar />
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col bg-cyan-200 drop-shadow-sm rounded-md p-8">
                    <h1 className="text-2xl font-semibold">Log In!</h1>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        {/* conditionally show login error */}
                        {error && (
                            <p
                                data-testid="loginError"
                                className="text-red-600"
                            >
                                {error}
                            </p>
                        )}
                        <input
                            className="border-b-2 focus:outline-none"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ): void => setUsername(e.target.value.trim())}
                        />
                        <input
                            className="border-b-2 focus:outline-none"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ): void => setPassword(e.target.value.trim())}
                        />
                        <button type="submit">Login</button>
                    </form>
                    <p>
                        No account?{" "}
                        <Link className="text-blue-600" to="/signup">
                            Sign up!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
