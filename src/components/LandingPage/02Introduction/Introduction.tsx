import Mono from '../../../assets/Mono/Sostenibilidad1.png'
import styles from './styles.module.css';

function Introduction() {

    return (
        <div className={`${styles.container} p-5 d-flex align-items-center justify-content-between`}>
            <div className={`${styles.image__Information} d-flex align-items-center justify-content-center`}>
                <img src={Mono} alt="Ecopcion" className={styles.image} />
            </div>
            <div className={`${styles.text__Information}`}>
                <div className={`${styles.container__Title} mb-4`}>
                    <h1 className={`${styles.title} `}>Aumenta la competitividad y sostenibilidad de tu pyme.</h1>
                    <p className={`${styles.text} text-center`}>Organiza, controla y lleva al día, las finanzas, la gestión de clientes y la sostenibilidad de tu negocio para tomar decisiones con tranquilidad.</p>
                </div>
            </div>
        </div>
    );
}

export default Introduction;