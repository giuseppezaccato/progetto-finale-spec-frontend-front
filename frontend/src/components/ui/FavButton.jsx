
import { useFavourites } from '../../context/FavContext'
import { useRef } from 'react';

export default function FavButton({ smartphone }) {
    const { addFavourite, removeFavourite, favourites, setShowOffCanvas } = useFavourites()
    const timeoutRef = useRef(null)

    const isFav = favourites.some(f => f.id === smartphone.id);

    //task logica di azzeramento timer per nascondere automaticamente offCanvas 
    //task sulla base di uno useRef ancorato al componente cliccato il quale fa partire un timeout
    const handleClick = () => {
        if (isFav) {
            removeFavourite(smartphone.id);
            setShowOffCanvas(false);

            //* se esiste timeout lo azzero
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

        } else {
            addFavourite(smartphone);
            setShowOffCanvas(true);

            //* se esiste timeout lo azzero
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            //* faccio partire nuovo timeout
            timeoutRef.current = setTimeout(() => {
                setShowOffCanvas(false);
                timeoutRef.current = null;
            }, 1500);
        }

        console.log(smartphone);
    };


    return (
        <button
            onClick={handleClick}
            className="btn rounded btn-outline-info"
            disabled={!smartphone?.id}
        >
            {isFav ? "★Rimuovi dai Preferiti" : "☆Aggiungi ai Preferiti"}
        </button>
    )
}



