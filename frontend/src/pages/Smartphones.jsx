import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useMemo, useState } from "react"; //fix => customHook
// import { debounce } from 'lodash' //fix => customHook
import { useSmartphoneSearch } from "../hooks/useSmartphoneSearch";
import { useState, useMemo } from "react";
import FavButton from "../components/ui/FavButton";
// import FavButton from "../components/ui/FavButton";

//* funzione di supporto (oppure importa lodash)
// function standardDebounce(callback, delay) {
//     let timer;
//     return (value) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             callback(value);
//         }, delay);
//     };
// }

// const URL = import.meta.env.VITE_BASE_URL //fix => customHook

export default function Smartphones() {

    //task inizializzazione stati reeattivi per query di ricerca e prodotti
    // const [products, setProducts] = useState([]) //fix => customHook
    // const [query, setQuery] = useState("") //fix => customHook
    const { query, setQuery, filteredResults } = useSmartphoneSearch()
    const navigate = useNavigate()

    //task aggiungo stati per ordinamento
    const [sortBy, setSortBy] = useState("title")
    const [sortOrder, setSortOrder] = useState(1)

    //task icona cliccabile per cambiare ordine
    const sortingArrow = sortOrder === 1 ? "⇩" : "⇧";


    // rendering al mount del componente //fix => globalContext(nel customHook)
    //     fetch(`${URL}/smartphones`)
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    //         .catch(err => console.error(err))
    // }, [])


    //fix => tutto nel customHook/GlobalContext (lasciato qui la ""situazione 1 > (ma !==) situazione 2"")
    //* situazione 1 => Ricerca con debounce: attesa 500ms prima di filtrare i prodotti per ridurre i render e migliorare le performance
    //? migliori performance su filtri costosi o grossi dataset

    // nuovo stato per la query "debouncata"
    // const [debouncedQuery, setDebouncedQuery] = useState(query);


    // Versione con standardDebounce(la sintassi è la stessa, ma senza uso di lodash)
    // const debouncedSetQuery = useMemo(
    //     () => standardDebounce((val) => setDebouncedQuery(val), 500),
    //     []
    // );

    // Versione con lodash debounce
    // const debouncedSetQuery = useMemo(
    //     () => debounce((val) => setDebouncedQuery(val), 500),
    //     []);

    // useEffect che aggiorna debouncedQuery ogni volta che query cambia, usando la funzione debounced
    // useEffect(() => {
    //     debouncedSetQuery(query);
    // Cleanup: cancella eventuali chiamate pendenti per evitare memory leak
    // return () => {
    // debouncedSetQuery.cancel();
    // * metodo nativo di lodash che sotituisce in js setTimeout/clearTimeout(di debouncedSetQuery)
    // };
    // }, [query, debouncedSetQuery]);

    // useMemo per filtrare i prodotti in base a title, category e brand, usando la query "debouncata"
    // const filteredProducts = useMemo(() => {
    // if (!debouncedQuery) return products
    // const lowerQuery = debouncedQuery.toLowerCase()
    // return products.filter(p =>
    //     (p.title && p.title.toLowerCase().includes(lowerQuery)) ||
    //     (p.category && p.category.toLowerCase().includes(lowerQuery)) ||
    //     (p.brand && p.brand.toLowerCase().includes(lowerQuery))
    // )
    // }, [debouncedQuery, products])


    //* situazione 2 => Ricerca istantanea: filtraggio immediato dei prodotti ad OGNI variazione dell’input utente
    //? piu reattivo ma meno performante su dataset pesanti o se l'utente digita velocemente

    // const filteredProducts = useMemo(() => {
    //     if (!query) return products
    //     const lowerQuery = query.toLowerCase()
    //     return products.filter(p =>
    //         (p.title && p.title.toLowerCase().includes(lowerQuery)) ||
    //         (p.category && p.category.toLowerCase().includes(lowerQuery)) ||
    //         (p.brand && p.brand.toLowerCase().includes(lowerQuery))
    //     )
    // }, [query, products])

    // const handleKeyDown = (e) => {//fix refactor e  => customHook
    //     const selectedSmartphone = filteredProducts.find(p => p.title === e.target.value)
    //     if (e.key === "Enter") {
    //         navigate(`/smartphone/${selectedSmartphone.id}`)
    //     }
    // }  

    //task al press di enter reindirizzo l'utente alla pagina dettagli di selectedSmartphone
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const selectedSmartphone = filteredResults.find(p => p.title === query);
            if (selectedSmartphone) {
                navigate(`/smartphone/${selectedSmartphone.id}`);
            }
        }
    };

    //task salvo la funzione in una variabile per ordinare
    //? (ricorda che il sort MODIFICA l'array di partenza quindi sempre meglio usare una sua copia (...spread))
    const organizedResults = useMemo(() => {
        return [...filteredResults]
            .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => {
                let matchup;

                if (sortBy === 'title') {
                    matchup = a.title.localeCompare(b.title);
                } else if (sortBy === 'category') {
                    matchup = a.category.localeCompare(b.category);
                } else {
                    // fallback se in futuro vuoi aggiungere altro
                    matchup = 0;
                }

                return matchup * sortOrder;
            });
    }, [filteredResults, query, sortBy, sortOrder]);

    const sortingFunctionBy = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder * -1); // inverti il verso
        } else {
            setSortBy(field);
            setSortOrder(1); // reset verso a crescente quando cambio campo
        }
    };


    return (
        <>
            <div className="list-group list-group-flush mx-auto col-12 col-md-8 col-lg-6 px-2">

                <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Cerca Smartphone"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    list="smartphones-list"
                    style={{ maxWidth: "100%" }}
                />

                <datalist id="smartphones-list">
                    {filteredResults.map(s => (
                        <option key={s.id} value={s.title}>
                            {s.title} ({s.category})
                        </option>
                    ))}
                </datalist>

                <div className="d-flex justify-content-center my-2 flex-wrap gap-2">
                    <div className="btn-group w-100 w-md-auto" role="group">
                        <button
                            type="button"
                            className={`btn btn-outline-info ${sortBy === 'title' ? 'active' : ''}`}
                            onClick={() => sortingFunctionBy('title')}
                        >
                            Modello {sortBy === 'title' && sortingArrow}
                        </button>
                        <button
                            type="button"
                            className={`btn btn-outline-info ${sortBy === 'category' ? 'active' : ''}`}
                            onClick={() => sortingFunctionBy('category')}
                        >
                            Categoria {sortBy === 'category' && sortingArrow}
                        </button>
                    </div>
                </div>

                {organizedResults.map(product => (
                    <div
                        key={product.id}
                        className="list-group-item list-group-item-action w-100 px-2 py-3"
                    >
                        <div className="row align-items-center">
                            {/* Colonna: Titolo + Link */}
                            <div className="col-12 col-md-8 mb-2 mb-md-0">
                                <Link to={`/smartphone/${product.id}`} className="text-decoration-none">
                                    <h5 className="mb-1">{product.title}</h5>
                                </Link>
                                <small className="text-muted">{product.category}</small>
                            </div>

                            {/* Colonna: Bottone preferiti, sempre allineato a destra */}
                            <div className="col-12 col-md-4 text-end mt-2 mt-md-0">
                                <FavButton smartphone={product} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}