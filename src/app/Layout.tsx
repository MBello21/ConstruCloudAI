import { Outlet } from "react-router";
import ScrollToTop from "../shared/components/ScrollToTop";
import { Navbar } from "../shared/layout/Navbar";
import { Footer } from "../shared/components/Footer";
import { Sidebar } from "../shared/layout/Sidebar";
import { useAuth } from "../features/auth/context/AuthContext";
import { NotificacionCompletarPerfil } from "../features/auth/components/NotificacionCompletarPerfil";

export const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      <ScrollToTop />
      <div className="w-70.5 shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <div className="flex-1 overflow-auto">
            <NotificacionCompletarPerfil user={user} />
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
