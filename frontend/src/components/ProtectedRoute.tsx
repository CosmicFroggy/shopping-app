import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: props) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
