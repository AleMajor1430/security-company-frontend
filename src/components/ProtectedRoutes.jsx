import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export default function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!currentUser) return <Navigate to="/login" replace />;

    return children;
}