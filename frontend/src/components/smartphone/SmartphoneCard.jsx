import React from 'react';
import FavButton from '../ui/FavButton';
import Loader from '../common/Loader';


const SmartphoneCard = React.memo(({ smartphone }) => {

    const phone = smartphone.smartphone

    if (!smartphone) return <Loader />;

    return (
        <div className="bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 text-center">
            {/* Immagine */}
            <img
                src={phone.image}
                alt={phone.title}
                className="w-60 h-60 object-contain rounded-md mb-4 flex-shrink-0"
            />

            {/* Titolo */}
            <h3 className="text-xl font-bold text-gray-800 mb-3">{phone.title}</h3>
            <FavButton smartphone={smartphone} />

            {/* Caratteristiche tecniche */}
            <div className="text-gray-600 text-sm w-full text-center">
                <p className="mb-1"><strong className="text-gray-700">Brand:</strong> {phone.brand}</p>
                <p className="mb-1"><strong className="text-gray-700">Categoria:</strong> {phone.category}</p>
                <p className="mb-1"><strong className="text-gray-700">Display:</strong> {phone.display}</p>
                <p className="mb-1"><strong className="text-gray-700">CPU:</strong> {phone.cpu}</p>
                <p className="mb-1"><strong className="text-gray-700">RAM:</strong> {phone.ram} GB</p>
                <p className="mb-1"><strong className="text-gray-700">Storage:</strong> {phone.storage} GB</p>
                <p className="mb-1"><strong className="text-gray-700">Batteria:</strong> {phone.battery} mAh</p>
                <p className="mb-1"><strong className="text-gray-700">Fotocamera:</strong> {phone.camera}</p>
                <p className="mb-1"><strong className="text-gray-700">OS:</strong> {phone.os}</p>
            </div>

            {/* Prezzo */}
            <div className="mt-3 w-full">
                <span className="text-2xl font-bold text-blue-600"><strong>{phone.price} €</strong></span>
            </div>

        </div>
    );
});

export default SmartphoneCard;