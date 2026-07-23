import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import Home from "@/pages/Home/Home";
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
import { AuthRoute } from "../components/routing/AuthRoute";
import { AppLayout } from "../app/AppLayout";
import Dashboard from "../pages/Dashboard/DashboardPage";
import { PageNotBuilt } from "../pages/NoPage/PageNotBuilt";
import { NotFoundPage } from "../pages/NoPage/NotFoundPage";

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
      {
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/applications", element: <PageNotBuilt title="Applications" /> },
          { path: "/pipeline", element: <PageNotBuilt title="Pipeline" /> },
          { path: "/settings", element: <PageNotBuilt title="Settings" /> },
          { path: "/profile", element: <PageNotBuilt title="profile" /> },
          { path: "/help" , element:  <PageNotBuilt title="Help" /> }
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);