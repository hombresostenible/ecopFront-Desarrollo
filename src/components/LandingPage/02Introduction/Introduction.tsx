/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageBanner from '../../../assets/Imagen1.png';
import styles from './styles.module.css';

function Introduction() {

    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.containerIntroduction} d-flex align-items-center justify-content-center`}>
                <div className={`${styles.imageInformation} d-flex align-items-center justify-content-center`}>
                    <img src={ImageBanner} alt="Ecopcion" className={styles.image} />
                </div>
                <div className={`${styles.textInformation} `}>
                    <div className={`${styles.containerTitle} mb-4`}>
                        <h1 className={`${styles.title} `}>Aumenta la competitividad y sostenibilidad de tu pyme.</h1>
                    </div>
                    <div>
                        <p className={`${styles.text} text-center`}>Organiza, controla y lleva al día, las finanzas, la gestión de clientes y la sostenibilidad de tu negocio para tomar decisiones con tranquilidad.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;