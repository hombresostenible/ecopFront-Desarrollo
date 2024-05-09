import NavBarLandingPage from '../../../../components/LandingPage/01 NavBarLandingPage/NavBarLandingPage';
import styles from './styles.module.css';

function CreateAppointmentPage() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.containerComponents} `}>
                <div className={`${styles.containerAppointment} `}>
                    <h2 className={`${styles.subtitle} `}>Ingresa los datos solicitados a continuación para agendar tu turno</h2>
                </div>
            </div>
        </div>
    );
}

export default CreateAppointmentPage;