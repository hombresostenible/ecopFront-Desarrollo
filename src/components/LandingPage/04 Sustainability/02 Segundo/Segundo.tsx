import NavBarLandingPage from '../../01 NavBarLandingPage/NavBarLandingPage';
import Footer from '../../Footer/Footer';
import styles from './styles.module.css';

function Segundo () {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} text-center`}>Porque hacemos más competitivo tu negocio</h2>
                    <p className='mb-5'>EcopcionApp sabe que la competitividad es fundamental para tu negocio y entiende que la competitividad se logra a través de los datos y el conocimiento profundo que puedas desarrollar sobre tu empresa, tus clientes y el impacto que generas en el mundo. </p>
                    <p className='mb-5'>A través de nuestro software y en la medida en que cargues tus inventarios y registres de manera permanente tus transacciones, podrás contar con datos en tiempo real sobre tus finanzas, clientes, ventas y sostenibilidad. Calculando y analizando los indicadores, podrás conocer a profundidad tu negocio y tomar decisiones que generen mayor valor al mercado y mayor impacto en el mundo. </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Segundo;