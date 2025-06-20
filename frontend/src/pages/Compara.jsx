import {
    // useEffect,//fix => customHook
    // useMemo,//fix => customHook
    useState,
} from "react";
// import { debounce } from "lodash"; //fix => customHook
import { useSmartphoneSearch } from "../hooks/useSmartphoneSearch";

const URL = import.meta.env.VITE_BASE_URL;

export default function Compara() {
    // const [allSmartphones, setAllSmartphones] = useState([]); //fix => globalContext(in customHook)
    // const [searchQuery, setSearchQuery] = useState(""); //fix => customHook
    // const [debouncedQuery, setDebouncedQuery] = useState(""); //fix => customHook
    const [compareList, setCompareList] = useState([]);
    const { query, setQuery, filteredResults } = useSmartphoneSearch()

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
        if (compareList.find(p => p.id === smartphoneBase.id)) return;
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

    return (
        <>

            <div className="d-flex align-items-center text-center ">
                <img
                    src="/battle.jpeg"
                    alt="logo"
                    className="me-3"
                    style={{ width: "200px" }}
                />
                <span className="h4 fw-bold mb-0">Smartphone Battle</span>
            </div>


            <div className=" row col-7 mx-auto">
                <div className="d-flex justify-content-center mb-4">
                    <div className="position-relative w-100" style={{ maxWidth: "500px" }}>

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cerca Smartphone..."
                            className="input form-control"
                        />

                        {/* {filteredOptions.length > 0 && ( //fix => customHook*/}
                        {query.trim() !== "" && filteredResults.length > 0 && (
                            <ul
                                className="list-group position-absolute top-100 start-0 w-100 z-3 overflow-auto"
                                style={{ maxHeight: "240px" }}
                            >
                                {/* {filteredOptions.map(phone => ( //fix =>  customHook */}
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
                        <table className="table table-bordered align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Caratteristica</th>
                                    {compareList.map(phone => (
                                        <th key={phone.id} className="position-relative">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{phone.title}</span>
                                                <button
                                                    onClick={() => removeFromCompare(phone.id)}
                                                    className="btn btn-sm btn-danger ms-2"
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
                                        <td className="fw-semibold text-capitalize">{key}</td>
                                        {compareList.map(phone => (
                                            <td key={phone.id + key}>
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
        </>
    );
}
