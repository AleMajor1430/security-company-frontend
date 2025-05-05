import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import Layout from "./routes/(admin)/layout";
import DashboardPage from "./routes/(admin)/dashboard/page";
import Companies from "./routes/(admin)/companies/page";
import Login from "./routes/pages/Login";
import Guards from "./routes/(admin)/guards/page";
import FireArms from "./routes/(admin)/firearms/page";
import UserProfile from "./routes/(admin)/profile/page";
import ProtectedRoute from "./components/ProtectedRoutes";
import NotFoundPage from "./routes/pages/NotFoundPage";
import { Navigate } from "react-router-dom";
import CompanyInformationPage from "./routes/(admin)/company-information/page";
import SecurityCompanyInformationPage from "./routes/(admin)/security-information/page";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/dashboard" replace />,
        },
        {
            path: "dashboard",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "companies",
                    element: <Companies />,
                },
                {
                    path: "guards",
                    element: <Guards />,
                },
                {
                    path: "firearms",
                    element: <FireArms />,
                },
                {
                    path: "profile",
                    element: <UserProfile />,
                },
                {
                    path: "companies-information",
                    element: <CompanyInformationPage />,
                },
                {
                    path: "security-information",
                    element: <SecurityCompanyInformationPage />,
                },
            ],
        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;