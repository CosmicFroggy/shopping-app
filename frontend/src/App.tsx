import { Routes, Route } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import { AuthProvider } from "./auth/AuthProvider";
import LoginPage from "./pages/LoginPage";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<ListingsPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
