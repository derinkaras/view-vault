import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ImageCarousel(props) {
    const { data } = props
    const swiperRef = useRef(null);

    useEffect(() => {
        // Force Swiper to update immediately after mounting
        const timer = setTimeout(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            // This will force Swiper to recalculate and apply the 3D effect
            swiperRef.current.swiper.update();
            
            // Trigger a resize event to force recalculation
            window.dispatchEvent(new Event('resize'));
            
            // Force an update on the coverflow effect
            swiperRef.current.swiper.params.effect = 'coverflow';
            swiperRef.current.swiper.update();
        }
        }, 100);
        
        return () => clearTimeout(timer);
    }, [data]);

    return (
        <div className="w-11/12 max-w-4xl mx-auto my-8">
        <Swiper
            ref={swiperRef}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            initialSlide={2}
            loopAdditionalSlides={2}
            lazy={false}
            preloadImages={true}
            updateOnImagesReady={true}
            observer={true}
            observeParents={true}
            coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 250,
            modifier: 1.5,
            slideShadows: true
            }}
            pagination={{ 
            clickable: true,
            dynamicBullets: true
            }}
            navigation={true}
            autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            }}
            loop={true}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper movie-carousel"
            breakpoints={{
            320: {
                slidesPerView: 3,
                coverflowEffect: {
                rotate: 30,
                depth: 150,
                modifier: 1.2
                }
            },
            640: {
                slidesPerView: 3,
                coverflowEffect: {
                rotate: 35,
                depth: 200,
                modifier: 1.3
                }
            },
            768: {
                slidesPerView: 5,
                coverflowEffect: {
                rotate: 40,
                depth: 250,
                modifier: 1.5
                }
            }
            }}
            onInit={(swiper) => {
            // Additional initialization on Swiper init
            setTimeout(() => {
                swiper.update();
            }, 100);
            }}
        >
            {data && data.length > 0 && data.map((movie, index) => (
            <SwiperSlide key={index}>
                <div className="relative group overflow-hidden rounded-lg">
                <img 
                    src={movie.Poster} 
                    alt={movie.Title || 'movie poster'} 
                    className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                    loading="eager" // Force eager loading instead of lazy loading
                    onLoad={(e) => {
                    // When each image loads, update the swiper
                    if (swiperRef.current && swiperRef.current.swiper) {
                        swiperRef.current.swiper.update();
                    }
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {movie.Title && <p className="text-white text-sm font-bold truncate">{movie.Title}</p>}
                    {movie.Year && <p className="text-gray-300 text-sm">{movie.Year}</p>}
                </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
    };

