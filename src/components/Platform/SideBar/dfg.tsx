/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { logoutUser } from '../../../redux/User/userSlice/actions';
import { FaAngleLeft } from "react-icons/fa";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdAppRegistration } from "react-icons/md";
import { FaFileInvoiceDollar, FaCashRegister } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import styles from './styles.module.css';

const setItemInLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getItemFromLocalStorage = (key: string, initialValue: any) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
};

function SideBar() {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();

    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [showTitles, setShowTitles] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
        setShowTitles(!showTitles);
    };

    // Estados y referencias para controlar los submenús
    const [subMenuBranches, setSubMenuBranches] = useState(() => getItemFromLocalStorage('branches', false));
    const [subMenuInventory, setSubMenuInventory] = useState(() => getItemFromLocalStorage('inventory', false));
    const [subMenuAccounts, setSubMenuAccounts] = useState(() => getItemFromLocalStorage('accounts', false));
    const [subMenuInvoicingAndPos, setSubMenuInvoicingAndPos] = useState(() => getItemFromLocalStorage('invoicingAndPos', false));

    // Referencias para cada submenú
    const subMenuBranchesRef = useRef<HTMLDivElement>(null);
    const subMenuInventoryRef = useRef<HTMLDivElement>(null);
    const subMenuAccountsRef = useRef<HTMLDivElement>(null);
    const subMenuInvoicingAndPosRef = useRef<HTMLDivElement>(null);

    // Handlers para mostrar/ocultar submenús
    const handleSubMenuBranches = () => {
        setSubMenuBranches((prev: any) => {
            setItemInLocalStorage('branches', !prev);
            return !prev;
        });
    };

    const handleSubMenuInventory = () => {
        setSubMenuInventory((prev: any) => {
            setItemInLocalStorage('inventory', !prev);
            return !prev;
        });
    };

    const handleSubMenuAccounts = () => {
        setSubMenuAccounts((prev: any) => {
            setItemInLocalStorage('accounts', !prev);
            return !prev;
        });
    };

    const handleSubMenuInvoicingAndPos = () => {
        setSubMenuInvoicingAndPos((prev: any) => {
            setItemInLocalStorage('invoicingAndPos', !prev);
            return !prev;
        });
    };

    // Efecto para cerrar submenús al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                subMenuBranches.current && !subMenuBranches.current.contains(event.target as Node) &&
                subMenuInventoryRef.current && !subMenuInventoryRef.current.contains(event.target as Node) &&
                subMenuAccountsRef.current && !subMenuAccountsRef.current.contains(event.target as Node) &&
                subMenuInvoicingAndPosRef.current && !subMenuInvoicingAndPosRef.current.contains(event.target as Node)
            ) {
                setSubMenuBranches(false);
                setSubMenuInventory(false);
                setSubMenuAccounts(false);
                setSubMenuInvoicingAndPos(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const signout = async () => {
        try {
            dispatch(logoutUser());
        } catch (error) {
            throw new Error('Error al hacer el cierre de sesión');
        }
    };

    return (
        <div className={`${styles.container} position-relative overflow-y-auto`}>
            <div className={`${styles.container__Component} p-2 `}>
                <FaAngleLeft onClick={toggleSidebar} />

                <NavLink to="/home" className={`${styles.section} mb-2 mx-1 p-1 d-flex align-items-center justify-content-start text-decoration-none ${location.pathname === '/home' ? styles.active : ''} `}>
                    <div className="d-flex align-items-center">
                        {showTitles ? (
                            <>
                                <IoHome className={`${styles.icon} `} />
                                <div className={`${styles.link__Sidebar} p-1 px-4 text-decoration-none`}>Home</div>
                            </>
                        ) : (
                            <IoHome className={`${styles.icon} `} />
                        )}
                    </div>
                </NavLink>

                <div ref={subMenuBranchesRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <IoStorefrontSharp className={`${styles.icon} `}/>
                            {showTitles ? (
                                <Link to={'/branches/consult-branches'} className={`${styles.link__Sidebar} p-1 text-decoration-none`}>Tus Sedes</Link>
                            ) : (
                                <></>
                            )}
                        </div>
                        {subMenuBranches ? (
                            <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuBranches} />
                        ) : (
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuBranches} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuBranches ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/branches/consult-branches' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/branches/consult-branches' ? styles.active : ''} `}>Consulta tus sedes</Link>
                            <Link to='/branches/create-branches' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/branches/create-branches' ? styles.active : ''}`}>Crea tus sedes</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuInventoryRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <MdAppRegistration className={`${styles.icon} `}/>
                            {showTitles ? (
                                <Link to={'/inventories'} className={`${styles.link__Sidebar} p-1 text-decoration-none`}>Inventarios</Link>
                            ) : (
                                <></>
                            )}
                        </div>
                        {subMenuInventory ? (
                            <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuInventory} />
                        ) : (
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuInventory} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuInventory ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/inventories/consult-assets' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/inventories/consult-assets' || location.pathname === '/inventories/create-assets') ? styles.active : ''} `}>Activos</Link>
                            <Link to='/inventories/consult-merchandises' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/inventories/consult-merchandises' || location.pathname === '/inventories/create-merchandises') ? styles.active : ''} `}>Mercancías</Link>
                            <Link to='/inventories/consult-products' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/inventories/consult-products'|| location.pathname === '/inventories/create-products' ) ? styles.active : ''} `}>Productos</Link>
                            <Link to='/inventories/consult-raw-materals' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/inventories/consult-raw-materals' || location.pathname === '/inventories/create-raw-materals') ? styles.active : ''}`}>Materias primas</Link>
                            <Link to='/inventories/consult-services' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/inventories/consult-services' || location.pathname === '/inventories/create-services') ? styles.active : ''}`}>Servicios</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuAccountsRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <FaFileInvoiceDollar className={`${styles.icon} `}/>
                            {showTitles ? (
                                <Link to={'/accounts'} className={`${styles.link__Sidebar} p-1 text-decoration-none`}>Cuentas</Link>
                            ) : (
                                <></>
                            )}
                        </div>
                        {subMenuAccounts ? (
                            <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuAccounts} />
                        ) : (
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuAccounts} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuAccounts ? 'show' : ''} `}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/accounts/see-records' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/accounts/see-records') ? styles.active : ''} `}>Ver registros</Link>
                            <Link to='/accounts/create-incomes' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/accounts/create-incomes' || location.pathname === '/accounts/create-incomes') ? styles.active : ''} `}>Crea Ingresos y Cuentas por Cobrar</Link>
                            <Link to='/accounts/create-expenses' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/accounts/create-expenses' || location.pathname === '/accounts/create-expenses') ? styles.active : ''} `}>Crea Gastos y Cuentas por Pagar</Link>
                            <Link to='/accounts/consult-pending-approval' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/accounts/consult-pending-approval') ? styles.active : ''} `}>Transacciones pendientes de aprobación</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuInvoicingAndPosRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <FaCashRegister className={`${styles.icon} `} />
                            {showTitles ? (
                                <Link to={'/invoicing-and-pos'} className={`${styles.link__Sidebar} p-1 text-decoration-none`}>Facturación y POS</Link>
                            ) : (
                                <></>
                            )}
                        </div>
                        {subMenuInvoicingAndPos ? (
                            <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuInvoicingAndPos} />
                        ) : (
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuInvoicingAndPos} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuInvoicingAndPos ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/invoicing-and-pos/pos' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/invoicing-and-pos/electronic-invoicing' || location.pathname === '/invoicing-and-pos/pos') ? styles.active : ''} `}>Facturas y POS</Link>
                            <Link to='/invoicing-and-pos/credit-notes' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/invoicing-and-pos/credit-notes' ? styles.active : ''} `}>Notas Credito</Link>
                            <Link to='/invoicing-and-pos/debit-notes' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/invoicing-and-pos/debit-notes' ? styles.active : ''} `}>Notas débito</Link>
                            <Link to='/invoicing-and-pos/recurring-invoices' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/invoicing-and-pos/recurring-invoices' ? styles.active : ''} `}>Facturas recurrentes</Link>
                            <Link to='/invoicing-and-pos/received-payments' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/invoicing-and-pos/received-payments' ? styles.active : ''} `}>Pagos recibidos</Link>
                            <Link to='/invoicing-and-pos/quotes' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/invoicing-and-pos/quotes' ? styles.active : ''} `}>Cotizaciones</Link>
                        </div>
                    </div>
                </div>

                <NavLink to="/login" onClick={() => { signout() }} className={`${styles.section} p-1 d-flex align-items-center justify-content-start rounded text-decoration-none`}>
                    <GoSignOut className={`${styles.icon} `}/>
                    <div>Salir</div>
                </NavLink>
            </div>
        </div>
    );
}

export default SideBar;