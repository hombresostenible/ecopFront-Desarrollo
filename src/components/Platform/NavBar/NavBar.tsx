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
    const menuQuestionRef = useRef<HTMLDivElement | null>(null);
    const [menuQuestionVisible, setMenuQuestionVisible] = useState(false);
    const handleQuestionClick = () => {
        setMenuQuestionVisible(!menuQuestionVisible);
    };

    const menuServiceRef = useRef<HTMLDivElement | null>(null);
    const [menuServiceVisible, setMenuServiceVisible] = useState(false);
    const handleServiceClick = () => {
        setMenuServiceVisible(!menuServiceVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuQuestionRef.current && !menuQuestionRef.current.contains(event.target as Node)) {
                setMenuQuestionVisible(false);
            }
            if (menuServiceRef.current && !menuServiceRef.current.contains(event.target as Node)) {
                setMenuServiceVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuQuestionRef, menuServiceRef ]);

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
                <div className={`${styles.container__Services} d-flex align-items-center justify-content-center position-relative`}>
                <SlQuestion className={`${styles.icon__Question}`} onClick={handleQuestionClick} />
                    {menuQuestionVisible && (
                        <div ref={menuQuestionRef} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                            <Link to='/questions/information-manage-your-business' className={`${styles.link__Service} text-decoration-none`}>Información clave para gerenciar tu negocio</Link>
                            <Link to='/questions/activate-new-memberships' className={`${styles.link__Service} text-decoration-none`}>Activa nuevos planes</Link>
                            <Link to='/questions/accounts-and-inventories' className={`${styles.link__Service} text-decoration-none`}>Cuentas e inventarios</Link>
                            <Link to='/questions/invoicing-and-pos' className={`${styles.link__Service} text-decoration-none`}>Facturación y POS</Link>
                            <Link to='/questions/electronic-payroll' className={`${styles.link__Service} text-decoration-none`}>Nómina electrónica</Link>
                            <Link to='/questions/crm' className={`${styles.link__Service} text-decoration-none`}>CRM Clientes y Proveedores</Link>
                            <Link to='/questions/sustainability' className={`${styles.link__Service} text-decoration-none`}>Sostenibilidad</Link>
                            <Link to='/questions/consultancies' className={`${styles.link__Service} text-decoration-none`}>Asesorías</Link>
                            <Link to='/questions/strategic-notifications' className={`${styles.link__Service} text-decoration-none`}>Notifcaciones estratégicas</Link>
                        </div>
                    )}
                </div>

                <div className={`${styles.container__Services} d-flex align-items-center justify-content-center position-relative`}>
                    <CgMenuGridO className={styles.icon__Services} onClick={handleServiceClick} />
                    {menuServiceVisible && (
                        <div ref={menuServiceRef} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                            <Link to='/services/support-contact' className={`${styles.link__Service} text-decoration-none`}>Contacto con soporte para PQRF</Link>
                            <Link to='/services/activate-new-plans' className={`${styles.link__Service} text-decoration-none`}>Activa nuevos planes</Link>
                            <Link to='/services/platform-functionality' className={`${styles.link__Service} text-decoration-none`}>Funcionamiento de la plataforma</Link>
                            <Link to='/services/inventories' className={`${styles.link__Service} text-decoration-none`}>Inventarios</Link>
                            <Link to='/services/accounts' className={`${styles.link__Service} text-decoration-none`}>Cuentas</Link>
                            <Link to='/services/billing-and-pos' className={`${styles.link__Service} text-decoration-none`}>Facturación y POS</Link>
                            <Link to='/services/electronic-payroll' className={`${styles.link__Service} text-decoration-none`}>Nómina electrónica</Link>
                            <Link to='/services/crm-client' className={`${styles.link__Service} text-decoration-none`}>CRM CLientes</Link>
                            <Link to='/services/crm-supplier' className={`${styles.link__Service} text-decoration-none`}>CRM Proveedores</Link>
                            <Link to='/services/sustainability' className={`${styles.link__Service} text-decoration-none`}>Sostenibilidad</Link>
                            <Link to='/services/strategy-and-decision-making' className={`${styles.link__Service} text-decoration-none`}>Estrategia y toma de decisiones</Link>
                        </div>
                    )}
                </div>

                <Link to="/notifications" className={`${styles.container__Notification} d-flex align-items-center justify-content-center position-relative text-decoration-none`}>
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