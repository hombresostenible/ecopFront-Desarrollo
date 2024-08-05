import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../assets/LogoEcopcion.svg';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './styles.module.css';

function NavBarLandingPage() {
    const location = useLocation();
    const [menu, setMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenu(false);
            }
        };
        if (menu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menu]);

    return (
        <div className={`${styles.container} position-fixed top-0`} ref={menuRef}>
            <div className={`${styles.container__Navbar} px-2 m-auto d-flex align-items-center justify-content-between`}>
                <Link to="/">
                    <img src={Logo} alt="Ecopcion" className={styles.logo} />
                </Link>

                <div className={`${styles.menu} ${menu ? styles.active__Menu_Hamburguer : ''} d-flex align-items-center justify-content-center`}>
                    <Link to="/" className={`${styles.nav__Link} ${location.pathname === '/' ? styles.active : ''} text-center d-flex align-items-center justify-content-center text-decoration-none`}>Inicio</Link>
                    <Link to="/payment-plans" className={`${styles.nav__Link} ${location.pathname === '/payment-plans' ? styles.active : ''} text-center d-flex align-items-center justify-content-center text-decoration-none`}>Planes</Link>
                    <Link to="/contactUs" className={`${styles.nav__Link} ${location.pathname === '/contactUs' ? styles.active : ''} text-center d-flex align-items-center justify-content-center text-decoration-none`}>Contáctanos</Link>
                    <Link to="/fast-simulator" className={`${styles.nav__Link} ${location.pathname === '/fast-simulator' ? styles.active : ''} text-center d-flex align-items-center justify-content-center text-decoration-none`}>Prueba tu demo</Link>
                    <Link to="/register" className={`${styles.nav__Platform} d-flex align-items-center justify-content-center text-decoration-none`}>Regístrate</Link>
                    <Link to="/login" className={`${styles.nav__Platform} d-flex align-items-center justify-content-center text-decoration-none`}>Ingresa</Link>
                </div>

                <button onClick={toggleMenu} className={`${styles.button__Hamburguer} border-0`}>
                    <GiHamburgerMenu className={styles.icon__Hamburguer} />
                </button>
            </div>
        </div>
    );
}

export default NavBarLandingPage;