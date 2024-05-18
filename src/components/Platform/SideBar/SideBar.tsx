/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { NavLink, useLocation } from 'react-router-dom';
//REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { logoutUser } from '../../../redux/User/userSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IoChevronDownOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaUsers, FaFileInvoiceDollar, FaCashRegister } from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import styles from './styles.module.css';

function SideBar() {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();

    const signout = async () => {
        try {
            dispatch(logoutUser());
        } catch (error) {
            throw new Error('Error al hacer el cierre de sesión');
        }
    };

    return (
        <div className={`${styles.container} position-relative`}>
            <div className={`${styles.container__Component} p-2 position-fixed`}>
                <div className="overflow-y-auto">
                    <NavLink to="/home" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-start text-decoration-none ${location.pathname === '/home' ? styles.active : ''} `}>
                        <IoHome className={`${styles.icon} `}/>
                        <div className={` p-1 d-flex align-items-center justify-content-start`}>Home</div>
                    </NavLink>

                    <NavLink to="/branches" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-start text-decoration-none ${location.pathname === '/branches' ? styles.active : ''} `}>
                        <IoStorefrontSharp className={`${styles.icon} `}/>
                        <div className={` p-1 d-flex align-items-center justify-content-start`}>Tus Sedes</div>
                    </NavLink>

                    <NavLink to="/inventories" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/inventories' ? styles.active : ''} `}>
                        <div className='d-flex items-center justify-content-center'>
                            <MdAppRegistration className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>Inventarios</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </NavLink>

                    <NavLink to="/accounts" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/accounts' ? styles.active : ''} `}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaFileInvoiceDollar className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>Cuentas</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </NavLink>

                    <NavLink to="/invoicing-and-pos" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/invoicing-and-pos' ? styles.active : ''} `}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaCashRegister className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>Facturación y POS</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                        {/* 
                            DEBE DE SALIR UNAS OPCIONES LA DAR CLIC:
                            -EMITIR FACTURAS Y POS
                            -NOTAS CREDITO  --> DEBE DE SALIR UNA FACTURA PARA REGISTRAR LA NOTA CREDITO
                            -NOTAS DEBITO   --> DEBE DE SALIR UNA FACTURA PARA REGISTRAR LA NOTA DEBITO
                        */}
                    </NavLink>

                    <NavLink to="/electronic-payroll" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/electronic-payroll' ? styles.active : ''} `}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaCashRegister className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>Nómina electrónica</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </NavLink>

                    <NavLink to="/crm-clients" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/crm-clients' ? styles.active : ''} `}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>CRM Clientes</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </NavLink>

                    <NavLink to="/crm-suppliers" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/crm-suppliers' ? styles.active : ''} `}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>CRM Proveedores</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </NavLink>

                    <NavLink to="/sustainability" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/sustainability' ? styles.active : ''} `}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>Sostenibilidad</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </NavLink>

                    <NavLink to="/reports-and-indicators" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/reports-and-indicators' ? styles.active : ''} `}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>Reportes e indicadores</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </NavLink>

                    <NavLink to="/strategic-notifications" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/strategic-notifications' ? styles.active : ''} `}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>Notificaciones estratégicas</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </NavLink>

                    <NavLink to="/consultancies" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-between text-decoration-none ${location.pathname === '/consultancies' ? styles.active : ''} mb-2`}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `}/>
                            <div className={` p-1 d-flex align-items-center justify-content-start`}>Asesoría para toma de decisiones</div>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </NavLink>

                    <NavLink to="/login" onClick={() => { signout() }}  className={`${styles.section} p-1 d-flex align-items-center justify-content-start rounded `}>
                        <GoSignOut className={`${styles.icon} `}/>
                        <div>Salir</div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default SideBar;