import React from 'react';
import FavButton from '../ui/FavButton';

/**
 * Componente riutilizzabile per visualizzare i dettagli di uno smartphone in una card.
 * Ottimizzato con React.memo per prevenire re-rendering non necessari se le props non cambiano.
 smartphone - Le proprietà passate al componente.
 smartphone.smartphone - Un oggetto contenente i dettagli dello smartphone.
 smartphone.smartphone.id - ID univoco dello smartphone.
 smartphone.smartphone.title - Titolo/Nome dello smartphone.
 smartphone.smartphone.category - Categoria dello smartphone (es. Flagship, Mid-range).
 smartphone.smartphone.brand - Brand dello smartphone.
 smartphone.smartphone.price - Prezzo dello smartphone.
 smartphone.smartphone.display - Specifiche del display.
 smartphone.smartphone.cpu - Specifiche della CPU.
 smartphone.smartphone.ram - RAM dello smartphone in GB.
 smartphone.smartphone.storage - Spazio di archiviazione in GB.
 smartphone.smartphone.battery - Capacità della batteria in mAh.
 smartphone.smartphone.camera - Specifiche della fotocamera.
 smartphone.smartphone.os - Sistema operativo.
 smartphone.smartphone.image - URL dell'immagine dello smartphone.
 */
const SmartphoneCard = React.memo(({ smartphone }) => {

    if (!smartphone) return <div>Caricamento...</div>;

    return (
        <div className="bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4   text-center">
            {/* Immagine dello smartphone */}
            <img
                src={smartphone.smartphone.image}
                alt={smartphone.smartphone.title}
                className="w-60 h-60 object-contain rounded-md mb-4 flex-shrink-0" // w-48 e h-48 per dimensioni fisse, object-contain per non tagliare
            />

            {/* Titolo dello newSmartphone */}
            <h3 className="text-xl font-bold text-gray-800 mb-3">{smartphone.smartphone.title}</h3>
            <FavButton smartphone={smartphone} />

            {/* Caratteristiche tecniche */}
            <div className="text-gray-600 text-sm w-full text-center">
                <p className="mb-1"><strong className="text-gray-700">Brand:</strong> {smartphone.smartphone.brand}</p>
                <p className="mb-1"><strong className="text-gray-700">Categoria:</strong> {smartphone.smartphone.category}</p>
                <p className="mb-1"><strong className="text-gray-700">Display:</strong> {smartphone.smartphone.display}</p>
                <p className="mb-1"><strong className="text-gray-700">CPU:</strong> {smartphone.smartphone.cpu}</p>
                <p className="mb-1"><strong className="text-gray-700">RAM:</strong> {smartphone.smartphone.ram} GB</p>
                <p className="mb-1"><strong className="text-gray-700">Storage:</strong> {smartphone.smartphone.storage} GB</p>
                <p className="mb-1"><strong className="text-gray-700">Batteria:</strong> {smartphone.smartphone.battery} mAh</p>
                <p className="mb-1"><strong className="text-gray-700">Fotocamera:</strong> {smartphone.smartphone.camera}</p>
                <p className="mb-1"><strong className="text-gray-700">OS:</strong> {smartphone.smartphone.os}</p>
            </div>

            {/* Prezzo */}
            <div className="mt-3 w-full">
                <span className="text-2xl font-bold text-blue-600"><strong>{smartphone.smartphone.price} €</strong></span>
            </div>

        </div>
    );
});

export default SmartphoneCard;