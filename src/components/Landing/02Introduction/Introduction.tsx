import Mono from '../../../assets/Landing/Mono/Sostenibilidad1.png';
import styles from './styles.module.css';

function Introduction() {
    return (
        <section className={`${styles.container} p-5 d-flex align-items-center justify-content-between`}>
            <div className={`${styles.image__Information} d-flex align-items-center justify-content-center`}>
                <img src={Mono} alt="Ilustración sobre sostenibilidad" className={styles.image} />
            </div>
            <div className={`${styles.text__Information}`}>
                <div className={`${styles.container__Title} mb-4`}>
                    <h1 className={`${styles.title}`}>Aumenta la competitividad y sostenibilidad de tu pyme.</h1>
                    <h2 className={`${styles.text} text-center`}>Organiza, controla y lleva al día las finanzas, la gestión de clientes y la sostenibilidad de tu negocio para tomar decisiones con tranquilidad.</h2>
                </div>
            </div>
        </section>
    );
}

export default Introduction;