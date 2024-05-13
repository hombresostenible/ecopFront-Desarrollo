/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { NavLink } from 'react-router-dom';
import { BsPlus } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaUsers, FaFileInvoiceDollar, FaCashRegister, FaPlay } from "react-icons/fa";
import { AiFillFunnelPlot } from "react-icons/ai";
import { MdAppRegistration, MdDangerous } from "react-icons/md";
import styles from './styles.module.css';

function SideBar () {

    return (
        <div className={`${styles.container} position-relative`}>
            <div className={`${styles.sideBar} position-fixed`}>
                <div className={`${styles.options} mt-2 overflow-y-auto`}>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/home' ? styles.active : ''} mb-2`}>
                        <IoHome className={`${styles.icon} m-2`}/>
                        <NavLink to="/home" className={`${styles.option} nav-link`}>Home</NavLink>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${(location.pathname === '/configuration' || location.pathname === '/configuration/profile') ? styles.active : ''} mb-2`}>
                        <IoSettingsSharp className={`${styles.icon} m-2`}/>
                        <NavLink to="/configuration" className={`${styles.option} nav-link`}>Configuración</NavLink>
                        <BsPlus className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/branches' ? styles.active : ''} mb-2`}>
                        <IoStorefrontSharp className={`${styles.icon} m-2`}/>
                        <NavLink to="/branches" className={`${styles.option} nav-link`}>Tus Sedes</NavLink>
                        <BsPlus className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/users-platform' ? styles.active : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`}/>
                        <NavLink to="/users-platform" className={`${styles.option} nav-link`}>Tus Usuarios</NavLink>
                        <BsPlus className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-clients' ? styles.active : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-clients" className={`${styles.option} nav-link`}>CRM Clientes</NavLink>
                        <BsPlus className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-suppliers" className={`${styles.option} nav-link`}>CRM Proveedores</NavLink>
                        <BsPlus className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/transactions' ? styles.active : ''}`}>
                        <FaCashRegister className={`${styles.icon} m-2`}/>
                        <NavLink to="/transactions" className={`${styles.option} nav-link`}>Transacciones</NavLink>
                        <BsPlus className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${(location.pathname === '/accountBook' || location.pathname === '/accountBook/incomePage' || location.pathname === '/accountBook/expensesPage' || location.pathname === '/accountBook/accountingRecords') ? styles.active : ''} mb-2`}>
                        <FaFileInvoiceDollar className={`${styles.icon} m-2`}/>
                        <NavLink to="/accountBook" className={`${styles.option} nav-link`}>Libro diario</NavLink>
                        <BsPlus className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/your-registers' ? styles.active : ''} mb-2`}>
                        <MdAppRegistration className={`${styles.icon} m-2`}/>
                        <NavLink to="/your-registers" className={`${styles.option} nav-link`}>Tus registros</NavLink>
                        <BsPlus className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/salesFunnel' ? styles.active : ''} mb-2`}>
                        <AiFillFunnelPlot className={`${styles.icon} m-2`}/>
                        <NavLink to="/salesFunnel" className={`${styles.option} nav-link`}>Embudo de Ventas</NavLink>
                        <BsPlus className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/tutorial-videos' ? styles.active : ''} mb-2`}>
                        <FaPlay className={`${styles.icon} m-2`}/>
                        <NavLink to="/tutorial-videos" className={`${styles.option} nav-link`}>Video tutoriales</NavLink>
                        <BsPlus className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/report-errors' ? styles.active : ''} mb-2`}>
                        <MdDangerous className={`${styles.icon} m-2`}/>
                        <NavLink to="/report-errors" className={`${styles.option} nav-link`}>Reportar errores o mejoras</NavLink>
                        <BsPlus className={styles.icon__Plus}/>
                    </li>
                </div>
            </div>
        </div>
    );
}

export default SideBar;