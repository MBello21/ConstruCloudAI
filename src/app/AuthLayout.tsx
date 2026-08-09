import { Outlet } from "react-router";
import { AuthProvider } from "../features/auth/context/AuthContext";

export const AuthLayout = () => (
    <AuthProvider>
        <Outlet />
    </AuthProvider>
);