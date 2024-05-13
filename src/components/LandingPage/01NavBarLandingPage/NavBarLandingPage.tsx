/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../assets/LogoEcopcion.svg';
import styles from './styles.module.css';

function NavBarLandingPage() {
    const location = useLocation();
    const currentPath = useLocation().pathname;
    const navBarRef = useRef(null);


    return (
        <div className={`${styles.container} position-fixed w-100`}>
            <div className={`${styles.containerNavbar} d-flex align-items-center justify-content-between position-relative`} ref={navBarRef}>
                <Link to="/">
                    <img src={Logo} alt="Ecopcion" className={styles.logo} />
                </Link>
                <div className={`${styles.navBar} `}>
                    <div className="d-flex">
                        <Link to="/" className={`${styles.navTitle} ${location.pathname === '/' ? styles.activeLink : ''} text-center d-flex align-items-center justify-content-center text-decoration-none`} >Inicio</Link>
                        <Link to="/paymentPlans" className={`${styles.navTitle} ${location.pathname === '/paymentPlans' ? styles.activeLink : ''} text-center d-flex align-items-center justify-content-center text-decoration-none`}>Planes</Link>
                        <Link to="/contactUs" className={`${styles.navTitle} ${location.pathname === '/contactUs' ? styles.activeLink : ''} text-center d-flex align-items-center justify-content-center text-decoration-none`}>Contáctanos</Link>
                        <Link to="/fastSimulator" className={`${styles.navTitle} ${location.pathname === '/fastSimulator' ? styles.activeLink : ''} text-center d-flex align-items-center justify-content-center text-decoration-none`}>Haz una simulación</Link>
                        <Link to="/appointment" className={`${styles.navTitle} ${currentPath.includes('/appointment') ? styles.activeLink : ''} text-center d-flex align-items-center justify-content-center text-decoration-none`}>Agenda una cita</Link>
                        <Link to="/register" className={`${styles.navSignIn} d-flex align-items-center justify-content-center text-decoration-none`}>
                            Regístrate
                        </Link>
                        <Link to="/login" className={`${styles.navSignIn} d-flex align-items-center justify-content-center text-decoration-none`}>
                            Ingresa
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBarLandingPage;