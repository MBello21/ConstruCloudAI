import { Outlet } from "react-router";
import ScrollToTop from "../components/ui/ScrollToTop";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/ui/Footer";
import { Sidebar } from "../components/layout/Sidebar";

export const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <ScrollToTop />
      <div className="w-70.5 shrink-0">
        <Sidebar /> 
      </div>
      <div className="flex flex-col flex-1">
        <Navbar /> 
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};
