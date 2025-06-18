import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash"; //task  importazione e uso centralizzati SOLO QUI
import { useGlobal } from "../context/GlobalContext"; //task import global

export function useSmartphoneSearch(delay = 400) {
    const { allSmartphones } = useGlobal(); //task importo dal global il fetchAll
    const [query, setQuery] = useState(""); //task stato query da filtrare e  debouncare sotto
    const [debouncedQuery, setDebouncedQuery] = useState("");

    //task  uso useMemo per memorizzare la funzione lodash.debounce, aggiornata solo se cambia delay
    const debouncedSetQuery = useMemo(() => debounce(setDebouncedQuery, delay), [delay]);

    //task  aggiorno debouncedQuery solo dopo il delay, e cancello il debounce alla dismiss
    useEffect(() => {
        debouncedSetQuery(query);
        return () => debouncedSetQuery.cancel(); //task ricorda .cancel fa il cleanUp
    }, [query, debouncedSetQuery]);

    //task  filtro gli smartphone in base alla query debouncata
    const filteredResults = useMemo(() => {
        if (!debouncedQuery) return allSmartphones;
        const lower = debouncedQuery.toLowerCase();
        return allSmartphones.filter(s =>
            s.title.toLowerCase().includes(lower) ||
            (s.category?.toLowerCase().includes(lower) || "")
        );
    }, [debouncedQuery, allSmartphones]);

    return { query, setQuery, filteredResults };
}
