import { Link, useLocation } from 'react-router-dom';
// ELEMENTOS DEL COMPONENTE
import { FaLinkedin} from 'react-icons/fa';
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoTelegram } from "react-icons/bi";
import styles from './styles.module.css';

function Footer() {
    const location = useLocation();

    return (
        <div className={`${styles.container} `}>
            <footer className={`${styles.container__Footer} m-auto`}>
                <div className={`${styles.columns} p-5 d-flex flex-wrap align-items-start justify-content-center gap-5`}>
                    <div className={`${styles.column__Section} d-flex flex-column align-items-start justify-content-center`}>
                        <h6 className={`${styles.title__Section} `}>SOBRE NOSOTROS</h6>
                        <Link to="/blog" className={`${styles.link} ${location.pathname === '/blog' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Blog</p>
                        </Link>
                        <Link to="/our-company" className={`${styles.link} ${location.pathname === '/our-company' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">La empresa</p>
                        </Link>
                        <Link to="/know-us" className={`${styles.link} ${location.pathname === '/know-us' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Conócenos</p>
                        </Link>
                        <Link to="/work-with-us" className={`${styles.link} ${location.pathname === '/work-with-us' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Trabaja con nosotros</p>
                        </Link>
                        <Link to="/alliances-and-programs" className={`${styles.link} ${location.pathname === '/alliances-and-programs' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Alianzas y programas</p>
                        </Link>
                    </div>
                    <div className={`${styles.column__Section} d-flex flex-column align-items-start justify-content-center`}>
                        <h6 className={`${styles.title__Section} `}>LEGAL</h6>
                        <Link to="/terms-and-conditions" className={`${styles.link} ${location.pathname === '/terms-and-conditions' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Términos y condiciones</p>
                        </Link>
                        <Link to="/data-processing" className={`${styles.link} ${location.pathname === '/data-processing' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Tratamiento de datos</p>
                        </Link>
                        <Link to="/habeas-data" className={`${styles.link} ${location.pathname === '/habeas-data' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Habeas data</p>
                        </Link>
                        <Link to="/membership-agreement" className={`${styles.link} ${location.pathname === '/membership-agreement' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Contrato de membresía</p>
                        </Link>
                    </div>
                    <div className={`${styles.column__Section} d-flex flex-column align-items-start justify-content-center`}>
                        <h6 className={`${styles.title__Section} `}>SOPORTE</h6>
                        <Link to="/help" className={`${styles.link} ${location.pathname === '/help' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Ayuda</p>
                        </Link>
                        <Link to="/trainings" className={`${styles.link} ${location.pathname === '/trainings' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Capacitaciones</p>
                        </Link>
                        <Link to="/api-documentation" className={`${styles.link} ${location.pathname === '/api-documentation' ? styles.active : ''} text-decoration-none`}>
                            <p className="mt-1 mb-1">Documentación de nuestra API</p>
                        </Link>
                    </div>
                </div>
            
                <div className={`${styles.container_Social_Media} p-4 d-flex flex-wrap align-items-center justify-content-center gap-4`}>
                    <Link to="https://www.linkedin.com/company/ecopcion/">
                        <div className={`${styles.social__Media} d-flex align-items-center justify-content-center`}>
                            <FaLinkedin className={`${styles.linkedin} `}/>
                        </div>
                    </Link>
                    <Link to="https://www.instagram.com/">
                        <div className={`${styles.social__Media} d-flex align-items-center justify-content-center`}>
                            <FaInstagram className={`${styles.instagram} `}/>
                        </div>
                    </Link>
                    <Link to="https://www.facebook.com/">
                        <div className={`${styles.social__Media} d-flex align-items-center justify-content-center`}>
                            <FaFacebookSquare className={`${styles.facebook} `}/>
                        </div>
                    </Link>
                    <Link to="https://twitter.com/">
                        <div className={`${styles.social__Media} d-flex align-items-center justify-content-center`}>
                            <FaXTwitter className={`${styles.xTwitter} `}/>
                        </div>
                    </Link>
                    <Link to="https://web.whatsapp.com/">
                        <div className={`${styles.social__Media} d-flex align-items-center justify-content-center`}>
                            <IoLogoWhatsapp className={`${styles.whatsapp} `}/>
                        </div>
                    </Link>
                    <Link to="https://web.whatsapp.com/">
                        <div className={`${styles.social__Media} d-flex align-items-center justify-content-center`}>
                            <BiLogoTelegram  className={`${styles.telegram} `}/>
                        </div>
                    </Link>
                </div>
                <div className={`${styles.copyright} p-3 m-auto`}>
                    <p className='m-0 text-center'>Copyright © 2024, Ecopción SAS BIC NIT 901.714.110-5</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;