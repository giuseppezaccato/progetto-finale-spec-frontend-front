import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import React from 'react';

const CarouselSwiper = React.memo(({ images }) => {
    return (
        <div style={{
            minHeight: '700px', // altezza minima
            padding: '10px'
        }}>
            <div style={{ width: '90%', maxWidth: '800px' }}>
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={4}
                    spaceBetween={10}
                >
                    {images.map(({ id, image, title }) => (
                        <SwiperSlide key={id}>
                            <Link to={`/smartphone/${id}`}>
                                <p className='mt-5 text-center text-dark fs-5'
                                    style={{ height: '60px' }}
                                >{title}</p>
                                <img
                                    src={image}
                                    alt={`Smartphone ${id}`}
                                    style={{
                                        width: '100%',
                                        maxHeight: '500px',
                                        objectFit: 'contain',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 8px rgba(26, 21, 21, 0.2)',
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
