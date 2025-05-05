import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout, verifyUser } from "../services/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const verifySession = async () => {
        try {
            const { data } = await verifyUser();
            if (data?.user) {
                setCurrentUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Session verification failed:", error);
            localStorage.removeItem("user");
            return false;
        }
    };

    const login = async (credentials) => {
        try {
            const { data } = await apiLogin(credentials);
            console.log("Login response:", data);

            if (data?.success) {
                const user = {
                    email: credentials.email,
                    role: data.role,
                    message: data.message,
                };

                setCurrentUser(user);
                localStorage.setItem("user", JSON.stringify(user));
                return true;
            }

            return false;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };


    const logout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setCurrentUser(null);
            localStorage.removeItem("user");
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const hasSession = await verifySession();

            if (!hasSession) {
                const storedUser = localStorage.getItem("user");
                if (storedUser && storedUser !== "undefined") {
                    try {
                        const parsedUser = JSON.parse(storedUser);
                        setCurrentUser(parsedUser);
                    } catch (error) {
                        console.error("Failed to parse user:", error);
                        localStorage.removeItem("user");
                    }
                }
            }

            setLoading(false);
        };

        initializeAuth();
    }, []);

    const value = {
        currentUser,
        loading,
        login,
        logout,
        verifySession,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
