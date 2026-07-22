import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import Home from "@/pages/Home/Home";
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
import { AuthRoute } from "@/components/routing/AuthRoute";
import Dashboard from "../pages/Dashboard/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <AuthRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);