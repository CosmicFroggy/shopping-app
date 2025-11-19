import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ListingsPage from "./pages/ListingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <ListingsPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
