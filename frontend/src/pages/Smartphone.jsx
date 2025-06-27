import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SmartphoneCard from "../components/smartphone/SmartphoneCard";
import Loader from "../components/common/Loader";

const URL = import.meta.env.VITE_BASE_URL;

export default function Smartphone() {
    const { id } = useParams();
    const [smartphone, setSmartphone] = useState(null);

    const fetchSmartphone = async () => {
        const res = await fetch(`${URL}/smartphones/${id}`);
        const data = await res.json();
        setSmartphone(data);
    };

    useEffect(() => {
        fetchSmartphone();
    }, [id]);

    return (
        <div >
            {smartphone ? (
                <>
                    <SmartphoneCard smartphone={smartphone} />
                </>
            ) : (
                <Loader />
            )}

        </div>
    );
}
