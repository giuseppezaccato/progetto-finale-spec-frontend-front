import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
// import SearchBar from "../components/SearchBar";

//implementa visualizzazione della searchbar(componente) 
// con useLocation in combinazione con useRef ;) come in binaryBazaar :D
// cosi spieghi cosa è lo useLocation e come si usa col REF in combinazione col condizionale per la visualizzazione(MOLTO INTERESSANTE)


export default function DefaultLayout() {
    // const location = useLocation();

    // visualizza il componente solo in rotte specifiche
    // const showSearchBar = ["/", "/compara"].includes(location.pathname);

    return (
        <>
            <Header
            // {/* {showSearchBar ? <SearchBar /> : null} */}
            />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}