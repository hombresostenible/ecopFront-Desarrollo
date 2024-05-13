/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageBanner from '../../../assets/LandingPage/02Introduction/ImageBanner.png';
import styles from './styles.module.css';

function Introduction() {

    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.containerIntroduction} d-flex align-items-center justify-content-center`}>
                <div className={`${styles.imageInformation} d-flex align-items-center justify-content-center`}>
                    <img src={ImageBanner} alt="Ecopcion" className={styles.image} />
                </div>
                <div className={`${styles.textInformation} `}>
                    <div className={`${styles.containerTitle} `}>
                        <h1 className={`${styles.title} text-center`}>La transformación digital y la sostenibilidad ambiental determinarán el éxito de los negocios en el futuro.</h1>
                    </div>
                    <div>
                        <p className={`${styles.text} text-center`}>Cada vez son más los negocios que digitalizan sus procesos administrativos y además, cuidan su gestión ambiental.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;