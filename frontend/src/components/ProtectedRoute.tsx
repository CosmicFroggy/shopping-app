import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { authInfo } = useAuth();

    if (!authInfo) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
