import React from "react";

const Footer = React.memo(() => (
    <footer className="bg-dark text-white py-4 px-3">
        <div className="container">
            <div className="row justify-content-between align-items-center text-center text-md-start gy-3">
                {/* Colonna sinistra */}
                <div className="col-12 col-md-4 order-3 order-md-1">
                    <span className="d-block fs-6 fs-md-5">BenchSmart™ © 2025</span>
                </div>

                {/* Colonna centrale */}
                <div className="col-12 col-md-4 order-1 order-md-2 text-center">
                    <span className="d-block fst-italic text-secondary fs-6">
                        Verso l'infinito e oltre... i benchmark!
                    </span>
                </div>

                {/* Colonna destra */}
                <div className="col-12 col-md-4 order-2 order-md-3 text-md-end">
                    <span className="d-block fs-6">
                        Powered by passion.❤️(), focus.☕(), and difference.💡()
                    </span>
                </div>
            </div>
        </div>
    </footer>
));

export default Footer;
