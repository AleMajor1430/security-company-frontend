import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/auth-context";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const success = await login(credentials);
            if (success) {
                toast.success("Login successful!");
                navigate("/dashboard");
            } else {
                toast.error("Invalid email or password");
            }
            console.log(success)
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <ToastContainer position="bottom-left" />
            </div>
        </div>
    );
}