/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { NavLink } from 'react-router-dom';
//REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { logoutUser } from '../../../redux/userSlice/actions';
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

    const signout = async () => {
        try {
            dispatch(logoutUser());
        } catch (error) {
            throw new Error('Error al hacer el cierre de sesión');
        }
    };

    return (
        <div className={`${styles.container} position-relative`}>
            <div className={`${styles.sideBar} position-fixed`}>
                <div className={`${styles.options} mt-2 overflow-y-auto`}>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/home' ? styles.active : ''} mb-2`}>
                        <IoHome className={`${styles.icon} m-2`}/>
                        <NavLink to="/home" className={`${styles.option} nav-link`}>Home</NavLink>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/branches' ? styles.active : ''} mb-2`}>
                        <IoStorefrontSharp className={`${styles.icon} m-2`}/>
                        <NavLink to="/branches" className={`${styles.option} nav-link`}>Tus Sedes</NavLink>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/your-registers' ? styles.active : ''} mb-2`}>
                        <MdAppRegistration className={`${styles.icon} m-2`}/>
                        <NavLink to="/your-registers" className={`${styles.option} nav-link`}>Inventarios</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${(location.pathname === '/accountBook' || location.pathname === '/accountBook/incomePage' || location.pathname === '/accountBook/expensesPage' || location.pathname === '/accountBook/accountingRecords') ? styles.active : ''} mb-2`}>
                        <FaFileInvoiceDollar className={`${styles.icon} m-2`}/>
                        <NavLink to="/accountBook" className={`${styles.option} nav-link`}>Cuentas</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/transactions' ? styles.active : ''}`}>
                        <FaCashRegister className={`${styles.icon} m-2`}/>
                        <NavLink to="/transactions" className={`${styles.option} nav-link`}>Facturación y POS</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                        {/* 
                            DEBE DE SALIR UNAS OPCIONES LA DAR CLIC:
                            -EMITIR FACTURAS Y POS
                            -NOTAS CREDITO  --> DEBE DE SALIR UNA FACTURA PARA REGISTRAR LA NOTA CREDITO
                            -NOTAS DEBITO   --> DEBE DE SALIR UNA FACTURA PARA REGISTRAR LA NOTA DEBITO
                        */}
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/transactions' ? styles.active : ''}`}>
                        <FaCashRegister className={`${styles.icon} m-2`}/>
                        <NavLink to="/transactions" className={`${styles.option} nav-link`}>Nómina electrónica</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-clients' ? styles.active : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-clients" className={`${styles.option} nav-link`}>CRM Clientes</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-suppliers" className={`${styles.option} nav-link`}>CRM Proveedores</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-suppliers" className={`${styles.option} nav-link`}>Sostenibilidad</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-suppliers" className={`${styles.option} nav-link`}>Reportes e indicadores</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-suppliers" className={`${styles.option} nav-link`}>Notificaciones estratégicas</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-suppliers" className={`${styles.option} nav-link`}>Asesorías empresariales</NavLink>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section__Logout} p-1 d-flex align-items-center justify-content-start rounded`}>
                        <GoSignOut className={`${styles.icon} m-2`}/>
                        <NavLink to="/login" onClick={() => { signout() }} className={`${styles.option} nav-link`}>Salir</NavLink>
                    </li>
                </div>
            </div>
        </div>
    );
}

export default SideBar;