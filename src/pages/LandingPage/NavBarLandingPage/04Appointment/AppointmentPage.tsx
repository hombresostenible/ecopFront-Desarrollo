/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import Citas from '../../../../assets/LandingPage/Citas.png';
import NavBarLandingPage from '../../../../components/LandingPage/01 NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../components/LandingPage/Footer/Footer';
import CreateAppointment from './CreateAppointmentPage';
import styles from './styles.module.css';

function AppointmentPage() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className={`${styles.containerIntroductionAppointment} `}>
                    <div className={`${styles.introductionAppointment} `}>
                        <div className={`${styles.containerImage} `}>
                            <img src={Citas} alt="Citas" className={styles.image} />
                            <div className={`${styles.divCita} `}>Aparta tu cita</div>
                        </div>

                        <div className={`${styles.containerInfo} `}>
                            <div>
                                <h1 className={`${styles.title} `}>Centro para agendamiento de citas Ecopción</h1>
                                <p className={`${styles.textIntroduction} `}>En esta sección podrás solicitar, tus citas en Ecopción, contamos un equipo de profesionales a tu servicio para ayudarte en tu crecimiento.</p>
                            </div>
                            <div className={`${styles.buttonConsult} `}>
                                    <Link
                                        to="/appointment/consult"
                                        className={styles.consultAppointment}
                                    >
                                        Si tienes una cita, consulta su estado acá
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <CreateAppointment />
            </div>
            <Footer />
        </div>
    );
}

export default AppointmentPage;