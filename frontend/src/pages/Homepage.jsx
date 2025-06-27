import { useEffect, useState } from 'react';
import Carousel from '../components/ui/Carousel';
import Loader from '../components/common/Loader';
const URL = import.meta.env.VITE_BASE_URL;

const Homepage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSmartphones = async () => {
            try {
                // Prima fetch leggera per recuperare solo gli ID
                const res = await fetch(`${URL}/smartphones`);
                const data = await res.json();

                // Estraggo gli ID
                const ids = data.map(s => s.id);

                //  fetch multiple in parallelo per ogni dettaglio e salvo solo quello che mi serve(l'immagine principalmente e il titolo)
                const detailedResponses = await Promise.all(
                    ids.map(id =>
                        fetch(`${URL}/smartphones/${id}`)
                            .then(res => res.json())
                            .then(data => ({ id: data.smartphone.id, image: data.smartphone.image, title: data.smartphone.title }))
                    )
                );
                setImages(detailedResponses);
            } catch (error) {
                console.error('Errore nel fetch:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSmartphones();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Carousel images={images} />
        </div>
    );
};

export default Homepage;
