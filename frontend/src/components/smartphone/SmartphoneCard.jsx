import React from 'react';
import FavButton from '../ui/FavButton';
import Loader from '../common/Loader';
import HomeButton from '../ui/HomeButton';


const SmartphoneCard = React.memo(({ smartphone }) => {

    const phone = smartphone.smartphone

    if (!smartphone) return <Loader />;

    return (
        <div className="container my-5">
            <div className="row align-items-center">
                {/* Immagine a sinistra */}
                <div className="col-md-4 text-center mb-3 mb-md-0">
                    <img
                        src={`/images/${phone.image}`}
                        alt={phone.title}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "300px", objectFit: "contain" }}
                    />
                </div>

                {/* Dettagli a destra */}
                <div className="col-md-8">
                    <div className="d-flex justify-content-between align-items-start">
                        <h3 className="fw-bold">{phone.title}</h3>
                        <HomeButton />
                    </div>

                    <hr />

                    <ul className="list-unstyled text-muted mb-3">
                        <li><strong>Brand:</strong> {phone.brand}</li>
                        <li><strong>Categoria:</strong> {phone.category}</li>
                        <li><strong>Display:</strong> {phone.display}</li>
                        <li><strong>CPU:</strong> {phone.cpu}</li>
                        <li><strong>RAM:</strong> {phone.ram} GB</li>
                        <li><strong>Storage:</strong> {phone.storage} GB</li>
                        <li><strong>Batteria:</strong> {phone.battery} mAh</li>
                        <li><strong>Fotocamera:</strong> {phone.camera}</li>
                        <li><strong>OS:</strong> {phone.os}</li>
                    </ul>

                    <div className="d-flex justify-content-around align-items-center">
                        <FavButton smartphone={phone} />
                        <span className="fs-4 fw-bold text-primary">{phone.price} €</span>
                    </div>
                </div>
            </div>
        </div>

    );
});

export default SmartphoneCard;