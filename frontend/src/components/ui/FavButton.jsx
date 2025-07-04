
import { useFavourites } from '../../context/FavContext'

export default function FavButton({ smartphone }) {
    const { addFavourite, removeFavourite, favourites, setShowOffCanvas } = useFavourites()


    const isFav = favourites.some(f => f.id === smartphone.id);

    const handleClick = () => {
        if (isFav) {
            removeFavourite(smartphone.id);
            setShowOffCanvas(false);

        } else {
            addFavourite(smartphone);
            setShowOffCanvas(true);
        }
        console.log(smartphone)
    }

    return (
        <button
            onClick={handleClick}
            className="btn rounded btn-outline-info  "
            disabled={!smartphone?.id}
        >
            {isFav ? "★Rimuovi dai Preferiti" : "☆Aggiungi ai Preferiti"}
        </button>
    )
}
