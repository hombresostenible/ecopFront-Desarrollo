import { Link } from 'react-router-dom';
import NavBarLandingPage from '../../../../components/LandingPage/01 NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function SendEmailResetPasswordUserPage() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.containerSendEmail}>
                <div className={` d-flex flex-column align-items-center justify-content-center`}>
                    <div>
                        <h2 className={`${styles.subtitle} text-center mt-4`}>Restablece tu contraseña</h2>
                        <p className='text-center'>Introduce la dirección de correo que usaste en el registro. Te enviaremos un correo con el link de verificación para que puedas restablecer tu contraseña.</p>

                        <div className={`${styles.containerInfo} d-flex flex-column align-items-center justify-content-center`}>
                            <p className='m-4'>Si necesitas más ayuda, consulta nuestros medios de comunicación  <Link to="/ecoptionAssistance" className={`${styles.link} text-sky-500`} >Ecopción.</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SendEmailResetPasswordUserPage;