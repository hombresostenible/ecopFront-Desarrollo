/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from "./data";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './styles.module.css';

function SliderCel () {
    const sliderRef = useRef<Slider | null>(null);
    const settings = {
        dots: false, // Establecer dots en false para ocultar las viñetas
        adaptiveHeight: true,
        dotsClass: "slickDots lineIndicator",
        customPaging: (i: any) => (
            <div style={{ position: "absolute", top: "-10px", opacity: 0 }}>{i}</div>
        ),
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    
    return (
        <div className={`${styles.containerSlider} w-100`}>
           <div className={`${styles.sliderCel} position-relative`}>
                <div className={`${styles.containerButtonsCel} position-absolute d-flex align-items-center justify-content-between`}>
                    <div onClick={() => sliderRef.current?.slickPrev()} >
                        <IoIosArrowBack className={styles.buttonCel} />
                    </div>
                    <div onClick={() => sliderRef.current?.slickNext()} >
                        <IoIosArrowForward className={styles.buttonCel} />
                    </div>
                </div>

                <Slider {...settings} ref={sliderRef} >
                    {data.map((item, key) => (
                        <div key={key} className={`${styles.map} m-auto d-flex align-items-center justify-content-between position-relative`}>
                            <div className={`${styles.containerSliderImg} d-flex align-items-center justify-content-center overflow-hidden`}>
                                <img className={`${styles.image} `} src={item.image} alt={item.title} />
                            </div>

                            <div className={`${styles.contanerTextSlider} text-center d-flex flex-column align-items-center justify-content-center`}>
                                <h2 className={`${styles.titleSlider} m-0`}>{item.title}</h2>
                                <p className={`${styles.textSlider} m-0`}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
                
                <div className={`${styles.titlePresentation} p-3 position-absolute`}>
                    <h2 className="text-center">Esto es todo lo que puedes hacer</h2>
                </div>   
            </div>
        </div>
    );
}

export default SliderCel;