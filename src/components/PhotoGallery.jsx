import Slider from "react-slick";
import "../styles/photoGallery.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "animate.css/animate.min.css";
//libreria para detectar cuando la seccion este en el vh
import { useInView } from "react-intersection-observer";

const PhotoGallery = () => {
    //logica libreria react-intersection-observer
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="photo-gallery-container">
            <h2
                className={`photo-gallery-title animate__animated ${
                    inView ? "animate__fadeInDown" : ""
                }`}
                ref={ref}
            >
                Lo nuevo!!!
            </h2>
            <Slider {...settings}>
                <div className="photo-gallery-slide">
                    <img src="/flyer combo afiliación 1.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer combo afiliación 2.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer combo afiliación 4.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 1.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 2.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 3.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 4.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 5.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 6.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 7.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 8.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 9.png" />
                </div>
                <div className="photo-gallery-slide">
                    <img src="/flyer limpiador 10.png" />
                </div>
            </Slider>
        </div>
    );
};

export default PhotoGallery;
