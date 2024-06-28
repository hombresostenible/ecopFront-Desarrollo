/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import macbook from '../../../../assets/macbook.jpg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './styles.module.css';

function PreviousBtn({ onClick }: { onClick: () => void }) {
    return (
        <div className={`${styles.button__Next} d-flex align-items-center justify-content-center position-absolute`} onClick={onClick}>
            <IoIosArrowBack className={`${styles.icon__Arrow}`} />
        </div>
    );
}

function NextBtn({ onClick }: { onClick: () => void }) {
    return (
        <div className={`${styles.button__Prev} d-flex align-items-center justify-content-center position-absolute`} onClick={onClick}>
            <IoIosArrowForward className={`${styles.icon__Arrow}`} />
        </div>
    );
}

function Banner() {
    const sliderRef = useRef<Slider | null>(null);

    const handlePrevious = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const [showButtons, setShowButtons] = useState(false);

    return (
        <div
            className={`${styles.container} position-relative overflow-hidden`}
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
        >
            {showButtons && (
                <div>
                    <PreviousBtn onClick={handlePrevious} />
                    <NextBtn onClick={handleNext} />
                </div>
            )}
            <div className='position-relative overflow-hidden'>
                <Slider
                    ref={sliderRef}
                    autoplay
                    autoplaySpeed={5000}
                    initialSlide={2}
                    infinite
                    prevArrow={<></>}
                    nextArrow={<></>}
                    customPaging={(_i) => {
                        return <div></div>
                    }}
                    dotsClass='slick-dots custom-indicator'
                >
                    <Link to='/first'>
                        <div className={styles.container__First_Component}>
                            <img src={macbook} alt="macbook" className={styles.logo} loading="lazy" />
                            <p className={`${styles.ggggggg} position-absolute`}><span className={styles.ghhhhh}>Software todo en uno</span>. A diferencia de otros softwares, ecopción te permite gestionar los aspectos más importantes de tu negocio - asuntos administrativos, financieros, clientes y el impacto que generas  - en un solo lugar.</p>
                        </div>
                    </Link>
                    <Link to='/second'>
                        <div className={styles.container__Second_Component}>
                            <img src={macbook} alt="macbook" className={styles.logo} loading="lazy" />
                            <p className={`${styles.ggggggg} position-absolute`}><span className={styles.ghhhhh}>Software todo en uno</span>. A diferencia de otros softwares, ecopción te permite gestionar los aspectos más importantes de tu negocio - asuntos administrativos, financieros, clientes y el impacto que generas  - en un solo lugar.</p>
                        </div>
                    </Link>
                    <Link to='/third'>
                        <div className={styles.container__Third_Component}>
                            <img src={macbook} alt="macbook" className={styles.logo} loading="lazy" />
                            <p className={`${styles.ggggggg} position-absolute`}><span className={styles.ghhhhh}>Software todo en uno</span>. A diferencia de otros softwares, ecopción te permite gestionar los aspectos más importantes de tu negocio - asuntos administrativos, financieros, clientes y el impacto que generas  - en un solo lugar.</p>
                        </div>
                    </Link>
                    <Link to='/fourth'>
                        <div className={styles.container__Fourth_Component}>
                            <img src={macbook} alt="macbook" className={styles.logo} loading="lazy" />
                            <p className={`${styles.ggggggg} position-absolute`}><span className={styles.ghhhhh}>Software todo en uno</span>. A diferencia de otros softwares, ecopción te permite gestionar los aspectos más importantes de tu negocio - asuntos administrativos, financieros, clientes y el impacto que generas  - en un solo lugar.</p>
                        </div>
                    </Link>
                </Slider>
            </div>
        </div>
    );
}

export default Banner;