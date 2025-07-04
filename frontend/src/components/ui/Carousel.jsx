import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import React from 'react';

const CarouselSwiper = React.memo(({ images }) => {
    return (
        <div className="container-fluid py-4 d-flex justify-content-center align-items-center">
            <div className="w-100" style={{ maxWidth: '800px' }}>
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1}
                    breakpoints={{
                        576: { slidesPerView: 2, spaceBetween: 10 },
                        768: { slidesPerView: 3, spaceBetween: 10 },
                        992: { slidesPerView: 4, spaceBetween: 10 },
                    }}
                    spaceBetween={10}
                >
                    {images.map(({ id, image, title }) => (
                        <SwiperSlide key={id}>
                            <Link to={`/smartphone/${id}`}>
                                <p className="mt-3 text-center text-dark fs-6 fs-md-5" style={{ minHeight: '48px' }}>
                                    {title}
                                </p>
                                <img
                                    src={image}
                                    alt={`Smartphone ${id}`}
                                    className="img-fluid "
                                    style={{
                                        width: '100%',
                                        maxHeight: '300px',
                                        objectFit: 'contain',
                                        cursor: 'grab',
                                    }}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
});

export default CarouselSwiper;
