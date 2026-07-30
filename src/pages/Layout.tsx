import { Outlet } from "react-router"
import ScrollToTop from "../components/ui/ScrollToTop";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/ui/Footer";


export const Layout = () => {

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
        </>

    )
}