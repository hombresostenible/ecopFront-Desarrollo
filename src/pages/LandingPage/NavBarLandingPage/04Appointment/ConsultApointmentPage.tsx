import Footer from '../../../../components/Platform/Footer/Footer';
import NavBarLandingPage from '../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import styles from './styles.module.css';

function ConsultApointmentPage() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.containerComponents}>
                <div className={styles.containerDataConsult}>
                    <h2 className={`${styles.subtitle} `} >Ingresa el número de cita para consultar, cancelar o modificar tu turno</h2>
                    <div className={styles.dataConsult}>
    
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ConsultApointmentPage;