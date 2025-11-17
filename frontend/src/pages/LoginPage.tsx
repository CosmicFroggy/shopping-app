import { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log("login attempt!");
        setUsername("");
        setPassword("");
    };

    return (
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
    );
};

export default LoginPage;
