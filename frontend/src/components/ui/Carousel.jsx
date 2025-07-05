import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Link } from 'react-router-dom';

const CarouselSwiper = React.memo(({ images }) => {

    return (
        <div className="container-fluid py-4 d-flex justify-content-center align-items-start">
            <div className="w-100" style={{ maxWidth: '800px' }}>
                <Swiper
                    modules={[Autoplay, EffectCoverflow]}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    effect={'coverflow'}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    grabCursor={true}
                    slidesPerView={'3'}
                    // slidesPerView={1}
                    breakpoints={{
                        576: { slidesPerView: 4, spaceBetween: 10 },
                        768: { slidesPerView: 5, spaceBetween: 10 },
                        992: { slidesPerView: 6, spaceBetween: 10 },
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
                                    className="img-fluid"
                                    style={{
                                        width: '100%',
                                        maxHeight: '300px',
                                        objectFit: 'contain',
                                        cursor: 'grab'
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
