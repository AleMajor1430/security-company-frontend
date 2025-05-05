// routes/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg">The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">
                Return to Dashboard
            </Link>
        </div>
    );
}