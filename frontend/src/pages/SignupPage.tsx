import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate, Link } from "react-router-dom";
import type { UserInfo } from "../types/UserInfo.";
import NavBar from "../components/NavBar";

const SignupPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    // if token isn't null then return to home, they're already logged in
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const login = async (userInfo: UserInfo): Promise<void> => {
        try {
            const backendPort: string =
                import.meta.env.VITE_BACKEND_PORT || "8080";
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
                throw new Error(
                    `Could not find user. Request response status: ${res.status}`,
                );
            }

            const data = await res.json(); // TODO: define a type for the response body?
            setToken(data.token);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    const signup = async (userInfo: UserInfo): Promise<boolean> => {
        try {
            const backendPort: string =
                import.meta.env.VITE_BACKEND_PORT || "8080";
            const res: Response = await fetch(
                `http://localhost:${backendPort}/user/register`,
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
                return false;
            }
            return true;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            return false;
        }
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();
        setError(null);
        setUsername("");
        setPassword("");
        const userInfo: UserInfo = { username, password };
        const success: boolean = await signup(userInfo);
        if (success) {
            login(userInfo);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col bg-cyan-200 drop-shadow-sm rounded-md p-8">
                    <h1 className="text-2xl font-semibold">Sign Up!</h1>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        {/* conditionally show signup error */}
                        {error && (
                            <p
                                className="text-red-600"
                                style={{ color: "red" }}
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
                            ): void => setUsername(e.target.value)}
                        />
                        <input
                            className="border-b-2 focus:outline-none"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ): void => setPassword(e.target.value)}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                    <p>
                        Already have an account?{" "}
                        <Link className="text-blue-600" to="/login">
                            Log in!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
