/* eslint-disable react-hooks/exhaustive-deps */
import Footer from '../../../../components/Platform/Footer/Footer';
import NavBarLandingPage from '../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import styles from './styles.module.css';

function ConfirmAppointmentPage() {  

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.containerComponents}>
                <div className={styles.confirmAppointment}>
                    <h1 className={`${styles.title} mt-3 text`}>Confirmación de tu cita</h1>

                </div>


            </div>
            <Footer />
        </div>
    );
}

export default ConfirmAppointmentPage;