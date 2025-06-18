
import { useFavourites } from '../../context/FavContext'

export default function FavButton({ smartphone }) {
    const { addFavourite, setShowOffCanvas } = useFavourites()

    const handleClick = () => {
        addFavourite(smartphone.smartphone);
        setShowOffCanvas(true);
    }

    return (
        <button
            onClick={handleClick}
            className="btn rounded btn-outline-info "
        // disabled={!smartphone.smartphone?.id}
        >
            Aggiungi ai Preferiti
        </button>

    )
}