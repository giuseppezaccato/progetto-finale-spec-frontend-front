import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useEffect, useRef } from "react";


export default function DefaultLayout() {
    const location = useLocation();
    const topOfPageRef = useRef(null);

    useEffect(() => {
        // Scroll to the top of the page when the route changes
        if (topOfPageRef.current) {
            topOfPageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [location.pathname]);

    return (
        <>
            <div className="d-flex flex-column min-vh-100" ref={topOfPageRef}>
                <Header />
                <main className="flex-grow-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}