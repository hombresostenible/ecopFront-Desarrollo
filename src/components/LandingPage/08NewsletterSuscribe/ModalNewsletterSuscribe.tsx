import Fondo from '../../../assets/LandingPage//08NewsletterSuscribe/Modal.jpg';
import Logo from '../../../assets/LandingPage/LogoEcopcion.svg';
import styles from './styles.module.css';

function ModalNewsletterSuscribe() {

    return (
        <div className={`${styles.containerModalNewsletterSuscribe} d-flex align-items-end justify-content-center`}>
            <div className={`${styles.containerFondo} `}>
                <img src={Fondo} alt="Fondo" className={styles.imageFondo} />
            </div>
            <div className={`${styles.containerText} `}>

                <div className={`${styles.containerLogo} d-flex flex-column align-items-end justify-content-center`}>
                    <p className={`${styles.allusiveTitle} `}>ÚNETE A NUESTRA MISIÓN</p>
                    <img src={Logo} alt="Logo" className={styles.logo} />
                    <p className={`${styles.allusiveText} text-center`}>Ingresa tus datos y recibe información exclusiva</p>
                </div>
                
            </div>
        </div>
    );
}

export default ModalNewsletterSuscribe;