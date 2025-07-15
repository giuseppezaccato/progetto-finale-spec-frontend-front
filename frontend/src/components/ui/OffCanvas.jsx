import { Link } from "react-router-dom";
import { useFavourites } from "../../context/FavContext";

const FavOffCanvas = ({ show, onClose }) => {
    const { favourites, removeFavourite, resetFavourites } = useFavourites();

    return (
        <div
            className={`offcanvas offcanvas-end custom-offcanvas ${show ? " show" : ""}`}
            tabIndex="-1"
        >
            <div className="offcanvas-header px-3 py-2">
                <h5 className="offcanvas-title fs-6">Smartphone preferiti</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="offcanvas-body px-3 py-2">
                {(!favourites || favourites.length === 0) ? (
                    <p className="text-muted small">Nessun preferito aggiunto.</p>
                ) : (
                    <>
                        <ul className="list-group list-group-flush">
                            {favourites.map((fav) => (
                                <li
                                    key={fav.id}
                                    className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2"
                                >
                                    <Link to={`/smartphone/${fav.id}`} className="fw-semibold text-decoration-none small">
                                        {fav.title}
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => removeFavourite(fav.id)}
                                    >
                                        Rimuovi
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-center mb-3">
                            <button
                                className="btn btn-sm btn-outline-warning"
                                onClick={resetFavourites}
                            >
                                Rimuovi tutti
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FavOffCanvas;
