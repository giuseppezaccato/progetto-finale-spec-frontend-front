import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
// import SearchBar from "../components/SearchBar";


export default function DefaultLayout() {
    // const location = useLocation();

    // const showSearchBar = ["/", "/compara"].includes(location.pathname);

    return (
        <>
            <div className="d-flex flex-column min-vh-100">

                <Header
                // {/* {showSearchBar ? <SearchBar /> : null} */}
                />
                <main className="flex-grow-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}