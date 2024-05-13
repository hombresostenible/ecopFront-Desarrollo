import NavBarLandingPage from '../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function ContactUsPage() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} d-flex`}>
                <div className={`${styles.containerFormContact} d-flex`}>
                    <div className={`${styles.containerForm} `}>

                        <h1 className={styles.title}>¡Déjanos tus datos!</h1>
                        <p className={styles.text}>Uno de nuestros asesores se comunicará contigo lo más pronto posible.</p>
                        
   
                    </div>

                    <div className={`${styles.containerContact} d-flex flex-column align-items-start justify-content-start`}>
                        <div className={`${styles.infoText} `}>
                            <h2 className={`${styles.infoTitle} `}>Contáctanos, estamos para ayudarte</h2>
                            <p className={`${styles.infoP} `}><span className={`${styles.spanWhatsApp} `}>WhatsApp</span> 321 327 0365</p>
                            <p>
                                <span className={`${styles.infoEmail} `}>Email</span>
                                {' '}
                                <a href="mailto:felipehernandezramirez@gmail.com" className={`${styles.email} `}>felipehernandezramirez@gmail.com</a>
                            </p>
                        </div>
                        <div className={`${styles.containerOpeningHours} `}>
                            <h2 className={`${styles.opening} `}>Horario de atención</h2>
                            <p className={`${styles.hours} `}>Lunea a Viernes, de 9 am a 5 pm, días festivos no operamos</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContactUsPage;