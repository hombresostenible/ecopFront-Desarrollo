/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
// Redux imports...
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { logoutUser } from '../../../redux/User/userSlice/actions';
// Icons...
import { GiHamburgerMenu } from "react-icons/gi";
import { IoChevronDownOutline, IoChevronUpOutline, IoHome, IoStorefrontSharp } from "react-icons/io5";
import { FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
// import { FaFileInvoiceDollar, FaUsers, FaCashRegister } from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";
import { TbCoin } from "react-icons/tb";
import { PiChartLineUp } from "react-icons/pi";
import { GoSignOut } from "react-icons/go";
import styles from './styles.module.css';

const setItemInLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getItemFromLocalStorage = (key: string, initialValue: any) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
};

function SideBarCompact() {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();

    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);
    const [subMenuVisible, setSubMenuVisible] = useState<string | null>(null);

    //DECLARAR LOS ESTADOS PARA CADA SUBMENU
    const [subMenuBranches, setSubMenuBranches] = useState<boolean>(() => getItemFromLocalStorage('branch', false));
    const [subMenuInventory, setSubMenuInventory] = useState<boolean>(() => getItemFromLocalStorage('inventory', false));
    const [subMenuAccounts, setSubMenuAccounts] = useState(() => getItemFromLocalStorage('account', false));
    // const [subMenuInvoicingAndPos, setSubMenuInvoicingAndPos] = useState(() => getItemFromLocalStorage('invoicingAndPos', false));
    const [subMenuCrmClients, setSubMenuCrmClients] = useState(() => getItemFromLocalStorage('crmClient', false));
    const [subMenuCrmSuppliers, setSubMenuCrmSuppliers] = useState(() => getItemFromLocalStorage('crmSupplier', false));
    const [subMenuReportsAndIndicators, setSubMenuReportsAndIndicators] = useState(() => getItemFromLocalStorage('reportsAndIndicator', false)); 

    const sidebarRef = useRef<HTMLDivElement>(null);
    const subMenuRef = useRef<HTMLDivElement>(null);

    //DECLARAR LAS REFERENCIAS PARA CADA SUBMENU
    const subMenuBranchesRef = useRef<HTMLDivElement>(null);
    const subMenuInventoryRef = useRef<HTMLDivElement>(null);
    const subMenuAccountsRef = useRef<HTMLDivElement>(null);
    // const subMenuInvoicingAndPosRef = useRef<HTMLDivElement>(null);
    const subMenuCrmClientsRef = useRef<HTMLDivElement>(null);
    const subMenuCrmSuppliersRef = useRef<HTMLDivElement>(null);
    const subMenuReportsAndIndicatorsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedMenuVisible = localStorage.getItem('menuVisible') === 'true';
        setMenuVisible(savedMenuVisible);
    }, []);

    const toggleMenuVisible = () => {
        setMenuVisible(prevVisible => {
            const newVisible = !prevVisible;
            localStorage.setItem('menuVisible', newVisible.toString());
            return newVisible;
        });
        setSubMenuOpen(null);
        setSubMenuVisible(null);
    };

    const toggleSubMenu = (section: string) => {
        setSubMenuOpen(prevSection => (prevSection === section ? null : section));
    };

    const handleIconClick = (section: string) => {
        if (menuVisible) {
            toggleSubMenu(section);
        } else {
            setSubMenuVisible(prevSection => (prevSection === section ? null : section));
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            sidebarRef.current && !sidebarRef.current.contains(event.target as Node)
        ) {
            setSubMenuVisible(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //HANDLE PARA SEDES
    const handleSubMenuBranches = () => {
        setSubMenuBranches((prev: boolean) => {
            const newState = !prev;
            setItemInLocalStorage('branch', newState);
            return newState;
        });
    };

    // HANDLE PARA INVENTARIOS
    const handleSubMenuInventory = () => {
        setSubMenuInventory((prev: boolean) => {
            const newState = !prev;
            setItemInLocalStorage('inventory', newState);
            return newState;
        });
    };

    //FACTURACION Y POS
    // const handleSubMenuInvoicingAndPos = () => {
    //     setSubMenuInvoicingAndPos((prev: any) => {
    //         setItemInLocalStorage('invoicingAndPos', !prev);
    //         return !prev;
    //     });
    // };

    //CUENTAS
    const handleSubMenuAccounts = () => {
        setSubMenuAccounts((prev: any) => {
            setItemInLocalStorage('account', !prev);
            return !prev;
        });
    };

    //CMR CLIENTES
    const handleSubMenuCrmClients = () => {
        setSubMenuCrmClients((prev: any) => {
            setItemInLocalStorage('crmClient', !prev);
            return !prev;
        });
    };

    //CMR PROVEEDORES
    const handleSubMenuCrmSuppliers = () => {
        setSubMenuCrmSuppliers((prev: any) => {
            setItemInLocalStorage('crmSupplier', !prev);
            return !prev;
        });
    };

    //REPORTES E INDICADORES
    const handleSubMenuReportsAndIndicators = () => {
        setSubMenuReportsAndIndicators((prev: any) => {
            setItemInLocalStorage('reportsAndIndicator', !prev);
            return !prev;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                subMenuBranchesRef.current && !subMenuBranchesRef.current.contains(event.target as Node) &&
                subMenuInventoryRef.current && !subMenuInventoryRef.current.contains(event.target as Node) &&
                subMenuAccountsRef.current && !subMenuAccountsRef.current.contains(event.target as Node) &&
                // subMenuInvoicingAndPosRef.current && !subMenuInvoicingAndPosRef.current.contains(event.target as Node) &&
                subMenuCrmClientsRef.current && !subMenuCrmClientsRef.current.contains(event.target as Node) &&
                subMenuCrmSuppliersRef.current && !subMenuCrmSuppliersRef.current.contains(event.target as Node) &&
                subMenuReportsAndIndicatorsRef.current && !subMenuReportsAndIndicatorsRef.current.contains(event.target as Node)
            ) {
                setSubMenuBranches(false);
                setSubMenuInventory(false);
                setSubMenuAccounts(false);
                // setSubMenuInvoicingAndPos(false);
                setSubMenuCrmClients(false);
                setSubMenuCrmSuppliers(false);
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
        <div className={`${styles.container} ${menuVisible ? styles.container__Small : styles.container__Large}`} ref={sidebarRef}>
            <div className={`${styles.container__SideBar} d-flex flex-column align-items-start justify-content-center`}>
                <div className={`${styles.container__Icon_Hamburger} `}>
                    <GiHamburgerMenu className={`${styles.icon__Hamburger} `} onClick={toggleMenuVisible} />
                </div>

                <div className={`${styles.container__Sections} `}>
                    <div className={`${styles.section} d-flex flex-column align-items-start justify-content-center`}>
                        <NavLink to="/home" className={`${styles.link} d-flex position-relative text-decoration-none`}>
                            <div className={`${styles.container__Icon_Section} d-flex align-items-center justify-content-center`} >
                                <IoHome className={`${styles.icon__Section} `} />
                            </div>
                            <div className={`${styles.container__Section} d-flex align-items-center justify-content-start`}>
                                {menuVisible &&
                                    <div className={`${styles.container__Section_Interactive} d-flex align-items-center justify-content-between`} >
                                        <span className="m-0">Home</span>
                                    </div>
                                }
                            </div>
                        </NavLink>
                    </div>

                    {/* SEDES */}
                    <div ref={subMenuBranchesRef} className={`${styles.section} d-flex flex-column align-items-start justify-content-center`}>
                        <div className="d-flex position-relative">
                            <div className={`${styles.container__Icon_Section} d-flex align-items-center justify-content-center`} onClick={() => handleIconClick('branch')}>
                                <IoStorefrontSharp className={`${styles.icon__Section} `} />
                            </div>
                            <div className={`${styles.container__Section} d-flex align-items-center justify-content-start`}>
                                {menuVisible &&
                                    <div className={`${styles.container__Section_Interactive} d-flex align-items-center justify-content-between`} onClick={() => toggleSubMenu('branches')}>
                                        <span className="m-0">Tus sedes</span>
                                        {subMenuOpen === 'branches' ? <IoChevronUpOutline onClick={handleSubMenuBranches}/> : <IoChevronDownOutline onClick={handleSubMenuBranches}/>}
                                    </div>
                                }
                            </div>
                            {subMenuVisible === 'branch' && !menuVisible && (
                                <div ref={subMenuRef} className={`${styles.subMenu__Compact} d-flex flex-column position-absolute`}>
                                    <div className={`${styles.signaling1} position-absolute`}></div>
                                    <h5 className={`${styles.title__Compact} `}>Sedes</h5>
                                    <Link to='/branches/consult-branches' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/branches/consult-branches' ? styles.active__Compact : ''} `} >Consulta tus sedes</Link>
                                    <Link to='/branches/create-branches' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/branches/create-branches' ? styles.active__Compact : ''}`}>Crea tus sedes</Link>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.subMenu} ${subMenuBranches ? styles.show : styles.hide} d-flex flex-column`}>
                            <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                                <Link to='/branches/consult-branches' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/branches/consult-branches' ? styles.active : ''} `} >Consulta tus sedes</Link>
                                <Link to='/branches/create-branches' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/branches/create-branches' ? styles.active : ''}`}>Crea tus sedes</Link>
                            </div>
                        </div>
                    </div>

                    {/* INVENTARIO */}
                    <div ref={subMenuInventoryRef} className={`${styles.section} d-flex flex-column align-items-start justify-content-center`}>
                        <div className="d-flex position-relative">
                            <div className={`${styles.container__Icon_Section} d-flex align-items-center justify-content-center`} onClick={() => handleIconClick('inventory')}>
                                <MdAppRegistration className={`${styles.icon__Section} `} />
                            </div>
                            <div className={`${styles.container__Section} d-flex align-items-center justify-content-start`}>
                                {menuVisible &&
                                    <div className={`${styles.container__Section_Interactive} d-flex align-items-center justify-content-between`} onClick={() => toggleSubMenu('inventories')}>
                                        <span className="m-0">Inventario</span>
                                        {subMenuOpen === 'inventories' ? <IoChevronUpOutline onClick={handleSubMenuInventory}/> : <IoChevronDownOutline onClick={handleSubMenuInventory}/>}
                                    </div>
                                }
                            </div>
                            {subMenuVisible === 'inventory' && !menuVisible && (
                                <div ref={subMenuRef} className={`${styles.subMenu__Compact} d-flex flex-column position-absolute`}>
                                    <div className={`${styles.signaling1} position-absolute`}></div>
                                    <h5 className={`${styles.title__Compact} `}>Inventario</h5>
                                    <Link to='/inventories/consult-assets' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/inventories/consult-assets' || location.pathname === '/inventories/create-assets') ? styles.active__Compact : ''} `}>Activos</Link>
                                    <Link to='/inventories/consult-merchandises' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/inventories/consult-merchandises' || location.pathname === '/inventories/create-merchandises') ? styles.active__Compact : ''} `}>Mercancías</Link>
                                    <Link to='/inventories/consult-products' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/inventories/consult-products'|| location.pathname === '/inventories/create-products' ) ? styles.active__Compact : ''} `}>Productos</Link>
                                    <Link to='/inventories/consult-raw-materals' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/inventories/consult-raw-materals' || location.pathname === '/inventories/create-raw-materals') ? styles.active__Compact : ''}`}>Materias primas</Link>
                                    <Link to='/inventories/consult-services' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/inventories/consult-services' || location.pathname === '/inventories/create-services') ? styles.active__Compact : ''}`}>Servicios</Link>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.subMenu} ${subMenuInventory ? styles.show : styles.hide} d-flex flex-column`}>
                            <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                                <Link to='/inventories/consult-assets' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/inventories/consult-assets' || location.pathname === '/inventories/create-assets') ? styles.active : ''} `}>Activos</Link>
                                <Link to='/inventories/consult-merchandises' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/inventories/consult-merchandises' || location.pathname === '/inventories/create-merchandises') ? styles.active : ''} `}>Mercancías</Link>
                                <Link to='/inventories/consult-products' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/inventories/consult-products'|| location.pathname === '/inventories/create-products' ) ? styles.active : ''} `}>Productos</Link>
                                <Link to='/inventories/consult-raw-materals' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/inventories/consult-raw-materals' || location.pathname === '/inventories/create-raw-materals') ? styles.active : ''}`}>Materias primas</Link>
                                <Link to='/inventories/consult-services' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/inventories/consult-services' || location.pathname === '/inventories/create-services') ? styles.active : ''}`}>Servicios</Link>
                            </div>
                        </div>
                    </div>

                    {/* CUENTAS */}
                    <div ref={subMenuAccountsRef} className={`${styles.section} d-flex flex-column align-items-start justify-content-center`}>
                        <div className="d-flex position-relative">
                            <div className={`${styles.container__Icon_Section} d-flex align-items-center justify-content-center`} onClick={() => handleIconClick('account')}>
                                <FaFileInvoiceDollar className={`${styles.icon__Section} `} />
                            </div>
                            <div className={`${styles.container__Section} d-flex align-items-center justify-content-start`}>
                                {menuVisible &&
                                    <div className={`${styles.container__Section_Interactive} d-flex align-items-center justify-content-between`} onClick={() => toggleSubMenu('accounts')}>
                                        <span className="m-0">Cuentas</span>
                                        {subMenuOpen === 'accounts' ? <IoChevronUpOutline onClick={handleSubMenuAccounts}/> : <IoChevronDownOutline onClick={handleSubMenuAccounts}/>}
                                    </div>
                                }
                            </div>
                            {subMenuVisible === 'account' && !menuVisible && (
                                <div ref={subMenuRef} className={`${styles.subMenu__Compact} d-flex flex-column position-absolute`}>
                                    <div className={`${styles.signaling1} position-absolute`}></div>
                                    <h5 className={`${styles.title__Compact} `}>Cuentas</h5>                               
                                    <Link to='/accounts/see-records' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/accounts/see-records') ? styles.active__Compact : ''} `}>Ver registros</Link>
                                    <Link to='/accounts/create-incomes' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/accounts/create-incomes' || location.pathname === '/accounts/create-incomes') ? styles.active__Compact : ''} `}>Crea Ingresos y CXC</Link>
                                    <Link to='/accounts/create-expenses' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/accounts/create-expenses' || location.pathname === '/accounts/create-expenses') ? styles.active__Compact : ''} `}>Crea Gastos y CXP</Link>
                                    <Link to='/accounts/consult-pending-approval' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/accounts/consult-pending-approval') ? styles.active__Compact : ''} `}>Transacciones pendientes de aprobación</Link>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.subMenu} ${subMenuAccounts ? styles.show : styles.hide} d-flex flex-column`}>
                            <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                                <Link to='/accounts/see-records' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/accounts/see-records') ? styles.active : ''} `}>Ver registros</Link>
                                <Link to='/accounts/create-incomes' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/accounts/create-incomes' || location.pathname === '/accounts/create-incomes') ? styles.active : ''} `}>Crea Ingresos y CXC</Link>
                                <Link to='/accounts/create-expenses' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/accounts/create-expenses' || location.pathname === '/accounts/create-expenses') ? styles.active : ''} `}>Crea Gastos y CXP</Link>
                                <Link to='/accounts/consult-pending-approval' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/accounts/consult-pending-approval') ? styles.active : ''} `}>Transacciones pendientes de aprobación</Link>
                            </div>
                        </div>
                    </div>

                    {/* POS */}
                    {/* <div ref={subMenuInvoicingAndPosRef} className={`${styles.section} d-flex flex-column align-items-start justify-content-center`}>
                        <div className="d-flex position-relative">
                            <div className={`${styles.container__Icon_Section} d-flex align-items-center justify-content-center`} onClick={() => handleIconClick('invoicingAndPos')}>
                                <FaCashRegister className={`${styles.icon__Section} `} />
                            </div>
                            <div className={`${styles.container__Section} d-flex align-items-center justify-content-start`}>
                                {menuVisible &&
                                    <div className={`${styles.container__Section_Interactive} d-flex align-items-center justify-content-between`} onClick={() => toggleSubMenu('invoicing-and-pos')}>
                                        <span className="m-0">Facturación y POS</span>
                                        {subMenuOpen === 'invoicing-and-pos' ? <IoChevronUpOutline onClick={handleSubMenuInvoicingAndPos}/> : <IoChevronDownOutline onClick={handleSubMenuInvoicingAndPos}/>}
                                    </div>
                                }
                            </div>
                            {subMenuVisible === 'invoicingAndPos' && !menuVisible && (
                                <div ref={subMenuRef} className={`${styles.subMenu__Compact} d-flex flex-column position-absolute`}>
                                    <div className={`${styles.signaling1} position-absolute`}></div>
                                    <h5 className={`${styles.title__Compact} `}>Facturación y POS</h5>
                                    <Link to='/invoicing-and-pos/pos' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/invoicing-and-pos/electronic-invoicing' || location.pathname === '/invoicing-and-pos/pos') ? styles.active__Compact : ''} `}>Emitir Facturas y POS</Link>
                                    <Link to='/invoicing-and-pos/see-electronic-invoicing-pos' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/invoicing-and-pos/see-electronic-invoicing-pos' || location.pathname === '/see-electronic-invoicing-pos/electronic-invoicing' || location.pathname === '/see-electronic-invoicing-pos/pos') ? styles.active__Compact : ''} `}>Gestión de Facturas y POS</Link>
                                    <Link to='/credit-notes/consult-credit-notes' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/credit-notes/consult-credit-notes' || location.pathname === '/credit-notes/create-credit-notes') ? styles.active__Compact : ''} `}>Notas Credito</Link>
                                    <Link to='/debit-notes/consult-debit-notes' className={`${styles.subMenu__Item_Compact} text-decoration-none ${(location.pathname === '/debit-notes/consult-debit-notes' || location.pathname === '/debit-notes/create-debit-notes') ? styles.active__Compact : ''} `}>Notas Débito</Link>
                                    <Link to='/invoicing-and-pos/recurring-invoices' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/invoicing-and-pos/recurring-invoices' ? styles.active__Compact : ''} `}>Facturas recurrentes</Link>
                                    <Link to='/invoicing-and-pos/received-payments' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/invoicing-and-pos/received-payments' ? styles.active__Compact : ''} `}>Pagos recibidos</Link>
                                    <Link to='/invoicing-and-pos/quotes' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/invoicing-and-pos/quotes' ? styles.active__Compact : ''} `}>Cotizaciones</Link>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.subMenu} ${subMenuInvoicingAndPos ? styles.show : styles.hide} d-flex flex-column`}>
                            <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                                <Link to='/invoicing-and-pos/pos' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/invoicing-and-pos/electronic-invoicing' || location.pathname === '/invoicing-and-pos/pos') ? styles.active : ''} `}>Emitir Facturas y POS</Link>
                                <Link to='/invoicing-and-pos/see-electronic-invoicing-pos' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/invoicing-and-pos/see-electronic-invoicing-pos' || location.pathname === '/see-electronic-invoicing-pos/electronic-invoicing' || location.pathname === '/see-electronic-invoicing-pos/pos') ? styles.active : ''} `}>Gestión de Facturas y POS</Link>
                                <Link to='/credit-notes/consult-credit-notes' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/credit-notes/consult-credit-notes' || location.pathname === '/credit-notes/create-credit-notes') ? styles.active : ''} `}>Notas Credito</Link>
                                <Link to='/debit-notes/consult-debit-notes' className={`${styles.subMenu__Item} text-decoration-none ${(location.pathname === '/debit-notes/consult-debit-notes' || location.pathname === '/debit-notes/create-debit-notes') ? styles.active : ''} `}>Notas Débito</Link>
                                <Link to='/invoicing-and-pos/recurring-invoices' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/invoicing-and-pos/recurring-invoices' ? styles.active : ''} `}>Facturas recurrentes</Link>
                                <Link to='/invoicing-and-pos/received-payments' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/invoicing-and-pos/received-payments' ? styles.active : ''} `}>Pagos recibidos</Link>
                                <Link to='/invoicing-and-pos/quotes' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/invoicing-and-pos/quotes' ? styles.active : ''} `}>Cotizaciones</Link>
                            </div>
                        </div>
                    </div> */}

                    {/* CRM CLIENTES */}
                    <div ref={subMenuCrmClientsRef} className={`${styles.section} d-flex flex-column align-items-start justify-content-center`}>
                        <div className="d-flex position-relative">
                            <div className={`${styles.container__Icon_Section} d-flex align-items-center justify-content-center`} onClick={() => handleIconClick('crmClient')}>
                                <TbCoin className={`${styles.icon__Section} `} />
                            </div>
                            <div className={`${styles.container__Section} d-flex align-items-center justify-content-start`}>
                                {menuVisible &&
                                    <div className={`${styles.container__Section_Interactive} d-flex align-items-center justify-content-between`} onClick={() => toggleSubMenu('crmClients')}>
                                        <span className="m-0">CRM Clientes</span>
                                        {subMenuOpen === 'crmClients' ? <IoChevronUpOutline onClick={handleSubMenuCrmClients}/> : <IoChevronDownOutline onClick={handleSubMenuCrmClients}/>}
                                    </div>
                                }
                            </div>
                            {subMenuVisible === 'crmClient' && !menuVisible && (
                                <div ref={subMenuRef} className={`${styles.subMenu__Compact} d-flex flex-column position-absolute`}>
                                    <div className={`${styles.signaling1} position-absolute`}></div>
                                    <h5 className={`${styles.title__Compact} `}>CRM Clientes</h5>
                                    <Link to='/crm-clients/consult-crm-clients' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/crm-clients/consult-crm-clients' ? styles.active__Compact : ''}`}>Clientes</Link>
                                    <Link to='/crm-clients/customer-tracking' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/crm-clients/customer-tracking' ? styles.active__Compact : ''}`}>Seguimiento</Link>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.subMenu} ${subMenuCrmClients ? styles.show : styles.hide} d-flex flex-column`}>
                            <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                                <Link to='/crm-clients/consult-crm-clients' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/crm-clients/consult-crm-clients' ? styles.active : ''}`}>Clientes</Link>
                                <Link to='/crm-clients/customer-tracking' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/crm-clients/customer-tracking' ? styles.active : ''}`}>Seguimiento</Link>
                            </div>
                        </div>
                    </div>

                    {/* CRM PROVEEDORES */}
                    <div ref={subMenuCrmSuppliersRef} className={`${styles.section} d-flex flex-column align-items-start justify-content-center`}>
                        <div className="d-flex position-relative">
                            <div className={`${styles.container__Icon_Section} d-flex align-items-center justify-content-center`} onClick={() => handleIconClick('crmSupplier')}>
                                <FaUsers className={`${styles.icon__Section} `} />
                            </div>
                            <div className={`${styles.container__Section} d-flex align-items-center justify-content-start`}>
                                {menuVisible &&
                                    <div className={`${styles.container__Section_Interactive} d-flex align-items-center justify-content-between`} onClick={() => toggleSubMenu('crmSuppliers')}>
                                        <span className="m-0">CRM Proveedores</span>
                                        {subMenuOpen === 'crmSuppliers' ? <IoChevronUpOutline onClick={handleSubMenuCrmSuppliers}/> : <IoChevronDownOutline onClick={handleSubMenuCrmSuppliers}/>}
                                    </div>
                                }
                            </div>
                            {subMenuVisible === 'crmSupplier' && !menuVisible && (
                                <div ref={subMenuRef} className={`${styles.subMenu__Compact} d-flex flex-column position-absolute`}>
                                    <div className={`${styles.signaling1} position-absolute`}></div>
                                    <h5 className={`${styles.title__Compact} `}>CRM Proveedores</h5>
                                    <Link to='/crm-suppliers/consult-crm-suppliers' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/crm-suppliers/consult-crm-suppliers' ? styles.active__Compact : ''}`}>Proveedores</Link>
                                    <Link to='/crm-suppliers/tracking-your-purchases' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/crm-suppliers/tracking-your-purchases' ? styles.active__Compact : ''}`}>Seguimiento de tus compras</Link>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.subMenu} ${subMenuCrmSuppliers ? styles.show : styles.hide} d-flex flex-column`}>
                            <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                                <Link to='/crm-suppliers/consult-crm-suppliers' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/crm-suppliers/consult-crm-suppliers' ? styles.active : ''}`}>Proveedores</Link>
                                <Link to='/crm-suppliers/tracking-your-purchases' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/crm-suppliers/tracking-your-purchases' ? styles.active : ''}`}>Seguimiento de tus compras</Link>
                            </div>
                        </div>
                    </div>

                    {/* REPORTES E INDICADORES */}
                    <div ref={subMenuReportsAndIndicatorsRef} className={`${styles.section} d-flex flex-column align-items-start justify-content-center`}>
                        <div className="d-flex position-relative">
                            <div className={`${styles.container__Icon_Section} d-flex align-items-center justify-content-center`} onClick={() => handleIconClick('reportsAndIndicator')}>
                                <PiChartLineUp className={`${styles.icon__Section} `} />
                            </div>
                            <div className={`${styles.container__Section} d-flex align-items-center justify-content-start`}>
                                {menuVisible &&
                                    <div className={`${styles.container__Section_Interactive} d-flex align-items-center justify-content-between`} onClick={() => toggleSubMenu('reportsAndIndicators')}>
                                        <span className="m-0">Reportes e indicadores</span>
                                        {subMenuOpen === 'reportsAndIndicators' ? <IoChevronUpOutline onClick={handleSubMenuReportsAndIndicators}/> : <IoChevronDownOutline onClick={handleSubMenuReportsAndIndicators}/>}
                                    </div>
                                }
                            </div>
                            {subMenuVisible === 'reportsAndIndicator' && !menuVisible && (
                                <div ref={subMenuRef} className={`${styles.subMenu__Compact} d-flex flex-column position-absolute`}>
                                    <div className={`${styles.signaling1} position-absolute`}></div>
                                    <h5 className={`${styles.title__Compact} `}>Reportes e indicadores</h5>
                                    <Link to='/reports-and-indicators/accounts-and-inventory-indicators' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/reports-and-indicators/accounts-and-inventory-indicators' ? styles.active__Compact : ''}`}>Indicadores cuentas e inventarios</Link>
                                    <Link to='/reports-and-indicators/marketing-indicators' className={`${styles.subMenu__Item_Compact} text-decoration-none ${location.pathname === '/reports-and-indicators/marketing-indicators' ? styles.active__Compact : ''}`}>Indicadores de mercadeo</Link>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.subMenu} ${subMenuReportsAndIndicators ? styles.show : styles.hide} d-flex flex-column`}>
                            <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                                <Link to='/reports-and-indicators/accounts-and-inventory-indicators' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/reports-and-indicators/accounts-and-inventory-indicators' ? styles.active : ''}`}>Indicadores cuentas e inventarios</Link>
                                <Link to='/reports-and-indicators/marketing-indicators' className={`${styles.subMenu__Item} text-decoration-none ${location.pathname === '/reports-and-indicators/marketing-indicators' ? styles.active : ''}`}>Indicadores de mercadeo</Link>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.section} d-flex flex-column align-items-start justify-content-center`}>
                        <div className="d-flex position-relative">
                            <div className={`${styles.container__Icon_Section} d-flex align-items-center justify-content-center`}>
                                <GoSignOut className={`${styles.icon__Section} `} />
                            </div>
                            <div className={`${styles.container__Section} d-flex align-items-center justify-content-start`}>
                                {menuVisible &&
                                    <div className={`${styles.container__Section_Interactive} d-flex align-items-center justify-content-between`} onClick={signout}>
                                        <span className="m-0">Cerrar sesión</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBarCompact;