import { createContext, useContext, useEffect, useState } from "react";

//task imposto chiave(key) per salvare i preferiti nel localStorage
const FAVOURITES_KEY = "favourites";
//todo Usare il MAIUSCOLO per i nomi delle variabili come `FAVOURITES_KEY` 
//todo è una convenzione per indicare che si tratta di una "costante"—cioè un valore che non 
//todo dovrebbe mai cambiare durante l’esecuzione del programma.

//task Creazione del contesto per i preferiti
const FavContext = createContext();

//task provider che gestisce lo stato dei preferiti rendendolo disponibile ai componenti figli
export function FavProvider({ children }) {
    //task stato locale reattivo per la lista dei preferiti
    const [favourites, setFavourites] = useState([]);

    //task per la visualizzazione dell'OffCanvas
    const [showOffCanvas, setShowOffCanvas] = useState(false);


    //task primo montaggio: carico i preferiti da localStorage (se presenti)
    useEffect(() => {
        try {
            const stored = localStorage.getItem(FAVOURITES_KEY); //task recupero lo stato
            if (stored) {
                setFavourites(JSON.parse(stored)); //task aggiorno lo stato
            }
        } catch (error) {
            console.warn("Errore nel leggere il localStorage:", error);
        }
    }, []);

    //task ogni volta che la dependecy [favourites], salva la nuova lista su localStorage
    useEffect(() => {
        try {
            localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites)); //task aggiorno lo stato
        } catch (error) {
            console.warn("Errore nel salvare su localStorage:", error);
        }
    }, [favourites]);

    // Aggiunge un elemento ai preferiti solo se non è già presente
    const addFavourite = (item) => {
        if (!item.id) {
            console.warn("Elemento senza ID, non può essere aggiunto ai preferiti");
            return;
        }
        if (!favourites.find(f => f.id === item.id)) {
            setFavourites(prev => [...prev, item]);
        }
    };

    // Rimuove un elemento dai preferiti tramite il suo id
    const removeFavourite = (id) => {
        setFavourites(prev => prev.filter(item => item.id !== id));
    };

    //task Valore fornito dal contesto: lista dei preferiti e funzioni di gestione
    const value = {
        favourites,
        addFavourite,
        removeFavourite,
        showOffCanvas,
        setShowOffCanvas
    };

    // Rende disponibili i dati e le funzioni ai componenti figli tramite il provider
    return (
        <FavContext.Provider value={value}>
            {children}
        </FavContext.Provider>
    );
}

//task customHook per accedere facilmente al contesto preferiti
export function useFavourites() {
    return useContext(FavContext);
}
