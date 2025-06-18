import { createContext, useContext, useEffect, useState } from "react";

//task contesto globale
const GlobalContext = createContext();

//task recupero la variabile da .env
const URL = import.meta.env.VITE_BASE_URL;

//task  provider che gestisce lo stato globale(wrap globale in App.jsx)
export function GlobalProvider({ children }) {
    //task tutti gli smartphone
    const [allSmartphones, setAllSmartphones] = useState([]);

    //task recupera la lista di tutti gli smartphone dall'API al montaggio del componente
    useEffect(() => {
        fetch(`${URL}/smartphones`)
            .then(res => res.json()) // Converte la risposta in JSON
            .then(data => setAllSmartphones(data)) // Aggiorna lo stato con i dati ricevuti
            .catch(err => console.error(err)); // Gestisce eventuali errori
    }, []);

    //task rendo disponibili i dati tramite il context ai {children} tramite il prop value
    return (
        <GlobalContext.Provider value={{ allSmartphones }}>
            {children}
        </GlobalContext.Provider>
    );
}

//task customHook per accedere facilmente al contesto globale
export function useGlobal() {
    return useContext(GlobalContext);
}
