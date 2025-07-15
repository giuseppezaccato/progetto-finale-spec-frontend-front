import { useEffect, useState } from 'react';
import Carousel from '../components/ui/Carousel';
import Loader from '../components/common/Loader';
const URL = import.meta.env.VITE_BASE_URL;

const Homepage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //* IIFE
        (async () => {
            try {

                //* situazione precedente... 
                // const ids = [];
                // for (let i = 1; i <= 51; i++) {
                //     ids.push(i);
                // }
                //fix ...soluzione migliorata con fetch mappato per recuperare dinamicamente gli ids

                // Prima fetch leggera per recuperare solo gli ID
                const res = await fetch(`${URL}/smartphones`);
                const data = await res.json();

                // Estraggo gli ID
                const ids = data.map(s => s.id);

                // fetch multiple in parallelo per ogni dettaglio salvando solo quello che mi serve
                // (l'immagine principalmente e il titolo)
                const detailedResponses = await Promise.all(
                    ids.map(id =>
                        fetch(`${URL}/smartphones/${id}`)
                            .then(res => res.json())
                            .then(data => ({
                                id: data.smartphone.id,
                                image: `/images/${data.smartphone.image}`,
                                title: data.smartphone.title
                            }))
                    )
                );

                setImages(detailedResponses);
            } catch (error) {
                console.error('Errore nel fetch:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            <section className="hero-section position-relative w-100" style={{ minHeight: 220 }}>
                <div className="container-fluid p-0 h-100">
                    <div className="row g-0 h-100">
                        <div className="col-12 position-relative h-100">
                            <img
                                src="/MobileTimeline2.jpg"
                                alt="Evoluzione degli smartphone"
                                className="img-fluid w-100 h-100"
                                style={{ objectFit: 'cover', minHeight: 220, maxHeight: '40vh' }}
                            />
                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
                                <h1 className="display-4 fw-bold text-white text-shadow mb-2 text-center">Benvenuto su BenchSmart</h1>
                                <p className="lead text-white text-shadow mb-0 text-center">Confronta, scrolla, innamorati. Gli smartphone come non li hai mai visti</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section className="d-flex justify-content-center align-items-start w-100" style={{ minHeight: '40vh' }}>
                <Carousel images={images} />
            </section>
        </>
    );
};

export default Homepage;
