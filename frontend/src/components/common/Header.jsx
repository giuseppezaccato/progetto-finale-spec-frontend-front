// import { useState } from "react"; //fix => FavContext
import { NavLink } from "react-router-dom";
import FavOffCanvas from "../ui/OffCanvas";
import { useFavourites } from "../../context/FavContext";

export default function Header() {
    const { setShowOffCanvas, showOffCanvas } = useFavourites()

    return (
        <>
            <FavOffCanvas
                show={showOffCanvas}
                onClose={() => setShowOffCanvas(false)}
            />
            <nav className="navbar navbar-expand-md bg-info">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <img style={{
                            height: "80px",
                            mixBlendMode: "initial"
                        }} src="/benchSmart.png" alt="logo" />
                        BenchSmart
                    </NavLink>

                    {/* Bottone hamburger */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item"><NavLink className="nav-link" to="/smartphones">Smartphones</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/compare">Compara</NavLink></li>
                            <li className="nav-item">
                                <span className="nav-link btn btn-link p-0 d-flex align-items-center" onClick={() => setShowOffCanvas(prev => !prev)} style={{ cursor: "pointer" }}>
                                    <span
                                        className="fav-icon fs-3 me-2"
                                        role="img"
                                        aria-label="heart"
                                        style={{ color: showOffCanvas ? "#b4c32a" : undefined, transition: "color 0.2s" }}
                                    >
                                        📱
                                    </span>
                                    <span className=" fs-5">Preferiti</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )
}
