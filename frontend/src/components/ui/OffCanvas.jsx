import { useFavourites } from "../../context/FavContext";

const FavOffCanvas = ({ show, onClose }) => {
    const { favourites, removeFavourite } = useFavourites();

    return (
        <div
            className={`offcanvas offcanvas-end${show ? " show" : ""}`}
            tabIndex="-1"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">Smartphone preferiti</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="offcanvas-body">
                {(!favourites || favourites.length === 0) ? (
                    <p className="text-muted">Nessun preferito aggiunto.</p>
                ) : (
                    <ul className="list-group">
                        {favourites.map((fav) => (
                            <li
                                key={fav.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{fav.title}</strong>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeFavourite(fav.id)}
                                >
                                    Rimuovi
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FavOffCanvas;
