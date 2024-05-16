/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { NavLink, useLocation } from 'react-router-dom';
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
            <div className={`${styles.container__Component} position-fixed`}>
                <div className="overflow-y-auto">
                    <NavLink to="/home" className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/home' ? styles.active : ''} mb-2`}>
                        <IoHome className={`${styles.icon} `}/>
                        <div className={`${styles.section} p-1 d-flex align-items-center justify-content-start`}>Home</div>
                    </NavLink>

                    <NavLink to="/branches" className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/branches' ? styles.active : ''} mb-2`}>
                        <IoStorefrontSharp className={`${styles.icon} `}/>
                        <div className={`${styles.section} p-1 d-flex align-items-center justify-content-start`}>Tus Sedes</div>
                    </NavLink>

                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${location.pathname === '/your-registers' ? styles.active : ''} mb-2`}>
                        <div className='d-flex items-center justify-content-center'>
                            <MdAppRegistration className={`${styles.icon} `}/>
                            <NavLink to="/your-registers" className={styles.section}>Inventarios</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${(location.pathname === '/accountBook' || location.pathname === '/accountBook/incomePage' || location.pathname === '/accountBook/expensesPage' || location.pathname === '/accountBook/accountingRecords') ? styles.active : ''} mb-2`}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaFileInvoiceDollar className={`${styles.icon} `}/>
                            <NavLink to="/accountBook" className={styles.section}>Cuentas</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${location.pathname === '/transactions' ? styles.active : ''}`}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaCashRegister className={`${styles.icon} `}/>
                            <NavLink to="/transactions" className={styles.section}>Facturación y POS</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                        {/* 
                            DEBE DE SALIR UNAS OPCIONES LA DAR CLIC:
                            -EMITIR FACTURAS Y POS
                            -NOTAS CREDITO  --> DEBE DE SALIR UNA FACTURA PARA REGISTRAR LA NOTA CREDITO
                            -NOTAS DEBITO   --> DEBE DE SALIR UNA FACTURA PARA REGISTRAR LA NOTA DEBITO
                        */}
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${location.pathname === '/transactions' ? styles.active : ''}`}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaCashRegister className={`${styles.icon} `}/>
                            <NavLink to="/transactions" className={styles.section}>Nómina electrónica</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${location.pathname === '/crm-clients' ? styles.active : ''} mb-2`}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `} />
                            <NavLink to="/crm-clients" className={styles.section}>CRM Clientes</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                    <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `} />
                            <NavLink to="/crm-suppliers" className={styles.section}>CRM Proveedores</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `} />
                            <NavLink to="/crm-suppliers" className={styles.section}>Sostenibilidad</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `} />
                            <NavLink to="/crm-suppliers" className={styles.section}>Reportes e indicadores</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `} />
                            <NavLink to="/crm-suppliers" className={styles.section}>Notificaciones estratégicas</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-between ${location.pathname === '/crm-suppliers' ? styles.active : ''} mb-2`}>
                        <div className='d-flex items-center justify-content-center'>
                            <FaUsers className={`${styles.icon} `} />
                            <NavLink to="/crm-suppliers" className={styles.section}>Asesoría para toma de decisiones</NavLink>
                        </div>
                        <IoChevronDownOutline className={styles.icon__Plus} />
                    </li>
                    
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