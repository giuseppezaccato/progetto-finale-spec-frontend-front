import {
    useRef,
    useEffect,
    // useEffect,//fix => customHook
    // useMemo,//fix => customHook
    useState,
} from "react";
// import { debounce } from "lodash"; //fix => customHook
import { useSmartphoneSearch } from "../hooks/useSmartphoneSearch";
import FavButton from "../components/ui/FavButton";
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

export default function Compara() {
    // const [allSmartphones, setAllSmartphones] = useState([]); //fix => globalContext(in customHook)
    // const [searchQuery, setSearchQuery] = useState(""); //fix => customHook
    // const [debouncedQuery, setDebouncedQuery] = useState(""); //fix => customHook
    const [compareList, setCompareList] = useState([]);
    const { query, setQuery, filteredResults } = useSmartphoneSearch()
    const inputRef = useRef()

    const caratteristiche = [
        "brand", "price", "display", "cpu", "ram", "storage", "battery", "camera", "os"
    ];

    // rendering al mount del componente //fix => globalContext(nel customHook)
    // useEffect(() => {
    //     fetch(`${URL}/smartphones`)
    //         .then(res => res.json())
    //         .then(data => setAllSmartphones(data))
    //         .catch(err => console.error(err));
    // }, []);

    //fix =>  customHook
    // const debouncedSetQuery = useMemo(() => debounce(setDebouncedQuery, 400), []);    // rendering al mount del componente 
    // useEffect(() => {
    //     debouncedSetQuery(searchQuery);
    //     return () => debouncedSetQuery.cancel();
    // }, [searchQuery, debouncedSetQuery]);


    //fix =>  customHook
    // const filteredOptions = useMemo(() => { 
    //     if (!debouncedQuery) return [];
    //     const lower = debouncedQuery.toLowerCase();
    //     return allSmartphones.filter(s =>
    //         s.title.toLowerCase().includes(lower)
    //     );
    // }, [debouncedQuery, allSmartphones]);

    const addToCompare = async (smartphoneBase) => {

        if (compareList.find(p => p.id === smartphoneBase.id))
            return;
        if (compareList.length >= 4) {
            alert("Puoi confrontare al massimo 4 smartphone.")
            // setSearchQuery("") //fix =>  customHook
            setQuery("")
            return
        }

        try {
            const res = await fetch(`${URL}/smartphones/${smartphoneBase.id}`);
            const fullData = await res.json();
            setCompareList(prev => [...prev, fullData.smartphone]);
        } catch (err) {
            console.error("Errore durante il fetch del dettaglio:", err);
        }

        // setSearchQuery(""); //fix =>  customHook
        // setDebouncedQuery(""); //fix =>  customHook
        setQuery("")
    };

    const removeFromCompare = (id) => {
        setCompareList(prev => prev.filter(p => p.id !== id));
    };


    // Al montaggio del componente, imposta il focus sull'input di ricerca
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center text-center mb-3">
                <span className="h4 fw-bold mb-0 my-2 mb-md-0">Smartphone Battle</span>
                <img
                    src="/battle.jpeg"
                    alt="logo"
                    className="mx-auto mx-md-3"
                    style={{ width: "120px", maxWidth: "40vw" }}
                />
            </div>

            <div className="row justify-content-center w-100 mx-0">
                <div className="col-12 col-md-8 col-lg-7 px-1">
                    <div className="d-flex justify-content-center mb-4">
                        <div className="position-relative w-100" style={{ maxWidth: "500px" }}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cerca Smartphone..."
                                className="form-control"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        inputRef.current.value = ""
                                        setQuery("")
                                    }}
                                    className="btn btn-sm btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-2"
                                    style={{ zIndex: 4 }}
                                    aria-label="Resetta ricerca"
                                    tabIndex={0}
                                >
                                    &times;
                                </button>
                            )}
                            {query.trim() !== "" && filteredResults.length > 0 && (
                                <ul
                                    className="list-group position-absolute top-100 start-0 w-100 z-3 overflow-auto"
                                    style={{ maxHeight: "240px" }}
                                >
                                    {filteredResults.map(phone => (
                                        <li
                                            key={phone.id}
                                            onClick={() => addToCompare(phone)}
                                            className="list-group-item list-group-item-action"
                                            style={{ cursor: "pointer" }}
                                        >
                                            {phone.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {compareList.length > 0 ? (
                        <div className="table-responsive mb-5">
                            <table className="table table-bordered align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="align-middle text-center" style={{ minWidth: 100 }}>Caratteristica</th>
                                        {compareList.map(phone => (
                                            <th key={phone.id} className="position-relative align-middle text-center" style={{ minWidth: 140 }}>
                                                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
                                                    <img src={`/images/${phone.image}`}
                                                        alt={phone.title}
                                                        style={{ maxHeight: "60px", width: "auto" }}
                                                        className="m-1" />
                                                    <div className="d-flex flex-column align-items-center">
                                                        <Link to={`/smartphone/${phone.id}`} className="small">{phone.title}</Link>
                                                        <FavButton smartphone={phone} />
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCompare(phone.id)}
                                                        className="btn btn-sm btn-danger ms-md-2 mt-2 mt-md-0"
                                                        title="Rimuovi"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {caratteristiche.map(key => (
                                        <tr key={key}>
                                            <td className="fw-semibold text-capitalize text-center">{key}</td>
                                            {compareList.map(phone => (
                                                <td key={phone.id + key} className="text-center">
                                                    {key === "price" && phone[key] !== undefined
                                                        ? `${phone[key]} €`
                                                        : (key === "ram" || key === "storage") && phone[key] !== undefined
                                                            ? `${phone[key]} GB`
                                                            : key === "battery" && phone[key] !== undefined
                                                                ? `${phone[key]} mAh`
                                                                : phone[key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-secondary text-center">Aggiungi smartphone per iniziare la comparazione.</p>
                    )}
                </div>
            </div>
        </>
    );
}
