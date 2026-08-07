import { Outlet } from "react-router";
import ScrollToTop from "../shared/components/ScrollToTop";
import { Navbar } from "../shared/layout/Navbar";
import { Footer } from "../shared/components/Footer";
import { Sidebar } from "../shared/layout/Sidebar";

export const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <ScrollToTop />
      <div className="w-70.5 shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};
