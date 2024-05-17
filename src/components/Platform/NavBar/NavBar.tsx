/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
//REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { logoutUser } from '../../../redux/User/userSlice/actions';
//ELEMENTOS DEL COMPONENTE
import Logo from '../../../assets/LogoEcopcion.svg';
import { SlQuestion } from "react-icons/sl";
import { CgMenuGridO } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import styles from './styles.module.css';

function NavBar() {
    const dispatch: AppDispatch = useDispatch();
    const [ menuVisible, setMenuVisible ] = useState(false);

    const handleServiceClick = () => {
        setMenuVisible(!menuVisible);
    };

    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuRef ]);


    const signout = async () => {
        try {
            dispatch(logoutUser());
        } catch (error) {
            throw new Error('Error al hacer el cierre de sesión');
        }
    };

    return (
        <div className={`${styles.container} pt-0 pb-0 px-4 d-flex align-items-center justify-content-between`}>
            <Link to="/home" className="text-center">
                <img src={Logo} alt="Ecopcion" className={`${styles.logo} m-auto`} />
            </Link>

            <div className={`${styles.container__Navigation} d-flex`}>
                <Link to='/qustions' className={`${styles.container__Question} d-flex align-items-center justify-content-center`}>
                    <SlQuestion className={`${styles.icon__Question}`}/>
                </Link>

                <div className={`${styles.container__Services} d-flex align-items-center justify-content-center position-relative`}>
                    <CgMenuGridO className={styles.icon__Services} onClick={handleServiceClick} />
                    {menuVisible && (
                        <div ref={menuRef} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                            <Link to='/' className={`${styles.link__Service} text-decoration-none`}>Cuentas e inventarios</Link>
                            <Link to='/' className={`${styles.link__Service} text-decoration-none`}>Facturación y POS</Link>
                            <Link to='/' className={`${styles.link__Service} text-decoration-none`}>Nómina</Link>
                            <Link to='/' className={`${styles.link__Service} text-decoration-none`}>CRM Clientes y Proveedores</Link>
                            <Link to='/' className={`${styles.link__Service} text-decoration-none`}>Sostenibilidad</Link>
                            <Link to='/' className={`${styles.link__Service} text-decoration-none`}>Asesorías</Link>
                            <Link to='/' className={`${styles.link__Service} text-decoration-none`}>Notifcaciones estratégicas</Link>
                        </div>
                    )}
                </div>

                <Link to="/configuration" className={`${styles.container__Notification} d-flex align-items-center justify-content-center position-relative text-decoration-none`}>
                    <IoNotificationsOutline className={`${styles.icon__Notification} `}/>
                    <div className={`${styles.notification} d-flex align-items-center justify-content-center position-absolute`}>
                        5
                    </div>
                </Link>

                <div className={`${styles.container__Configuration} d-flex align-items-center justify-content-center`}>
                    <Link to="/configuration" className={styles.icon__Configuration}>
                    
                    </Link>
                </div>

                <Link to="/login" onClick={() => { signout() }} className={`${styles.container__Logout} d-flex align-items-center justify-content-center`}>
                    <GoSignOut className={`${styles.icon__Logout} m-2`}/>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;