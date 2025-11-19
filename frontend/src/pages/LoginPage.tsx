import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate, Link } from "react-router-dom";
import type { UserInfo } from "../types/UserInfo.";

const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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
            const res: Response = await fetch("http://localhost:8080/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userInfo: UserInfo = { username, password };
        login(userInfo);
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <h1>Log In!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                        setUsername(e.target.value)
                    }
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                        setPassword(e.target.value)
                    }
                />
                <button type="submit">Login</button>
            </form>
            <p>
                No account? <Link to="/signup">Sign up!</Link>
            </p>
        </div>
    );
};

export default LoginPage;
