import { Routes, Route } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import { AuthProvider } from "./auth/AuthProvider";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<ListingsPage />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
