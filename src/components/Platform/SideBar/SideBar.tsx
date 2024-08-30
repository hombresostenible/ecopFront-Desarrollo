/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { logoutUser } from '../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdAppRegistration } from "react-icons/md";
import { FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
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

function SideBar() {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();

    //DECLARAR LOS ESTADOS PARA CADA SUBMENU
    const [subMenuBranches, setSubMenuBranches] = useState(() => getItemFromLocalStorage('branches', false));                                               //SEDES
    const [subMenuInventory, setSubMenuInventory] = useState(() => getItemFromLocalStorage('inventory', false));                                            //INENTARIO
    const [subMenuAccounts, setSubMenuAccounts] = useState(() => getItemFromLocalStorage('accounts', false));                                               //CUENTAS
    const [subMenuCrmClients, setSubMenuCrmClients] = useState(() => getItemFromLocalStorage('crmClients', false));                                         //CRM CLIENTES
    const [subMenuCrmSuppliers, setSubMenuCrmSuppliers] = useState(() => getItemFromLocalStorage('crmSuppliers', false));                                   //CRM PROVEEDORES
    const [subMenuReportsAndIndicators, setSubMenuReportsAndIndicators] = useState(() => getItemFromLocalStorage('reportsAndIndicators', false));           //REPORTES E INDICADORES


    //DECLARAR LAS REFERENCIAS PARA CADA SUBMENU
    const subMenuBranchesRef = useRef<HTMLDivElement>(null);
    const subMenuInventoryRef = useRef<HTMLDivElement>(null);
    const subMenuAccountsRef = useRef<HTMLDivElement>(null);
    const subMenuCrmClientsRef = useRef<HTMLDivElement>(null);
    const subMenuCrmSuppliersRef = useRef<HTMLDivElement>(null);
    const subMenuReportsAndIndicatorsRef = useRef<HTMLDivElement>(null);
    
    //DECLARAR LOS HANDLES PARA CADA SUBMENU
    //SEDES
    const handleSubMenuBranches = () => {
        setSubMenuBranches((prev: any) => {
            setItemInLocalStorage('branches', !prev);
            return !prev;
        });
    };

    //INVENTARIOS
    const handleSubMenuInventory = () => {
        setSubMenuInventory((prev: any) => {
            setItemInLocalStorage('inventory', !prev);
            return !prev;
        });
    };
    
    //CUENTAS
    const handleSubMenuAccounts = () => {
        setSubMenuAccounts((prev: any) => {
            setItemInLocalStorage('accounts', !prev);
            return !prev;
        });
    };

    //CMR CLIENTES
    const handleSubMenuCrmClients = () => {
        setSubMenuCrmClients((prev: any) => {
            setItemInLocalStorage('crmClients', !prev);
            return !prev;
        });
    };

    //CMR PROVEEDORES
    const handleSubMenuCrmSuppliers = () => {
        setSubMenuCrmSuppliers((prev: any) => {
            setItemInLocalStorage('crmSuppliers', !prev);
            return !prev;
        });
    };

    //REPORTES E INDICADORES
    const handleSubMenuReportsAndIndicators = () => {
        setSubMenuReportsAndIndicators((prev: any) => {
            setItemInLocalStorage('reportsAndIndicators', !prev);
            return !prev;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                subMenuBranchesRef.current && !subMenuBranchesRef.current.contains(event.target as Node) &&
                subMenuInventoryRef.current && !subMenuInventoryRef.current.contains(event.target as Node) &&
                subMenuAccountsRef.current && !subMenuAccountsRef.current.contains(event.target as Node) &&
                subMenuCrmClientsRef.current && !subMenuCrmClientsRef.current.contains(event.target as Node) &&
                subMenuCrmSuppliersRef.current && !subMenuCrmSuppliersRef.current.contains(event.target as Node) &&
                subMenuReportsAndIndicatorsRef.current && !subMenuReportsAndIndicatorsRef.current.contains(event.target as Node)
            ) {
                setSubMenuBranches(false);
                setSubMenuInventory(false);
                setSubMenuAccounts(false);
                setSubMenuCrmClients(false);
                setSubMenuCrmSuppliers(false);
                setSubMenuReportsAndIndicators(false);
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
                <NavLink to="/home" className={`${styles.section} mb-3 p-1 d-flex align-items-center justify-content-start text-decoration-none `}>
                    <div className="d-flex align-items-center">
                        <IoHome className={`${styles.icon} `}/>
                        <div className={`${styles.link__SideBar} p-1 px-4text-decoration-none`}>Home</div>
                    </div>
                </NavLink>

                <div ref={subMenuBranchesRef} className={`${styles.section} mb-3 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <IoStorefrontSharp className={`${styles.icon} `}/>
                            <Link to={'/branches/consult-branches'} className={`${styles.link__SideBar} p-1 text-decoration-none`}>Tus Sedes</Link>
                        </div>
                        {subMenuBranches ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuBranches} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuBranches} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuBranches ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/branches/consult-branches' className={`${styles.link__Sidebar} text-decoration-none ${location.pathname === '/branches/consult-branches' ? styles.active : ''} `} >Consulta tus sedes</Link>
                            <Link to='/branches/create-branches' className={`${styles.link__Sidebar} text-decoration-none ${location.pathname === '/branches/create-branches' ? styles.active : ''}`}>Crea tus sedes</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuInventoryRef} className={`${styles.section} mb-3 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <MdAppRegistration className={`${styles.icon} `}/>
                            <Link to={'/inventories'} className={`${styles.link__SideBar} p-1 text-decoration-none`}>Inventarios</Link>
                        </div>
                        {subMenuInventory ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuInventory} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuInventory} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuInventory ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/inventories/consult-assets' className={`${styles.link__Sidebar} text-decoration-none ${(location.pathname === '/inventories/consult-assets' || location.pathname === '/inventories/create-assets') ? styles.active : ''} `}>Activos</Link>
                            <Link to='/inventories/consult-merchandises' className={`${styles.link__Sidebar} text-decoration-none ${(location.pathname === '/inventories/consult-merchandises' || location.pathname === '/inventories/create-merchandises') ? styles.active : ''} `}>Mercancías</Link>
                            <Link to='/inventories/consult-products' className={`${styles.link__Sidebar} text-decoration-none ${(location.pathname === '/inventories/consult-products'|| location.pathname === '/inventories/create-products' ) ? styles.active : ''} `}>Productos</Link>
                            <Link to='/inventories/consult-raw-materals' className={`${styles.link__Sidebar} text-decoration-none ${(location.pathname === '/inventories/consult-raw-materals' || location.pathname === '/inventories/create-raw-materals') ? styles.active : ''}`}>Materias primas</Link>
                            <Link to='/inventories/consult-services' className={`${styles.link__Sidebar} text-decoration-none ${(location.pathname === '/inventories/consult-services' || location.pathname === '/inventories/create-services') ? styles.active : ''}`}>Servicios</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuAccountsRef} className={`${styles.section} mb-3 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <FaFileInvoiceDollar className={`${styles.icon} `}/>
                            <Link to={'/accounts'} className={`${styles.link__SideBar} p-1 text-decoration-none`}>Cuentas</Link>
                        </div>
                        {subMenuAccounts ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuAccounts} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuAccounts} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuAccounts ? 'show' : ''} `}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/accounts/see-records' className={`${styles.link__Sidebar} text-decoration-none ${(location.pathname === '/accounts/see-records') ? styles.active : ''} `}>Ver registros</Link>
                            <Link to='/accounts/create-incomes' className={`${styles.link__Sidebar} text-decoration-none ${(location.pathname === '/accounts/create-incomes' || location.pathname === '/accounts/create-incomes') ? styles.active : ''} `}>Crea Ingresos y CXC</Link>
                            <Link to='/accounts/create-expenses' className={`${styles.link__Sidebar} text-decoration-none ${(location.pathname === '/accounts/create-expenses' || location.pathname === '/accounts/create-expenses') ? styles.active : ''} `}>Crea Gastos y CXP</Link>
                            <Link to='/accounts/consult-pending-approval' className={`${styles.link__Sidebar} text-decoration-none ${(location.pathname === '/accounts/consult-pending-approval') ? styles.active : ''} `}>Transacciones pendientes de aprobación</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuCrmClientsRef} className={`${styles.section} mb-3 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <TbCoin className={`${styles.icon} `}/>
                            <Link to={'/crm-clients/consult-crm-clients'} className={`${styles.link__SideBar} p-1 text-decoration-none`}>CRM Clientes</Link>
                        </div>
                        {subMenuCrmClients ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuCrmClients} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuCrmClients} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuCrmClients ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/crm-clients/consult-crm-clients' className={`${styles.link__Sidebar} text-decoration-none ${location.pathname === '/crm-clients/consult-crm-clients' ? styles.active : ''}`}>Clientes</Link>
                            <Link to='/crm-clients/customer-tracking' className={`${styles.link__Sidebar} text-decoration-none ${location.pathname === '/crm-clients/customer-tracking' ? styles.active : ''}`}>Seguimiento</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuCrmSuppliersRef} className={`${styles.section} mb-3 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <FaUsers className={`${styles.icon} `}/>
                            <Link to={'/crm-suppliers/consult-crm-suppliers'} className={`${styles.link__SideBar} p-1 text-decoration-none`}>CRM Proveedores</Link>
                        </div>
                        {subMenuCrmSuppliers ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuCrmSuppliers} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuCrmSuppliers} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuCrmSuppliers ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/crm-suppliers/consult-crm-suppliers' className={`${styles.link__Sidebar} text-decoration-none ${location.pathname === '/crm-suppliers/consult-crm-suppliers' ? styles.active : ''}`}>Proveedores</Link>
                            <Link to='/crm-suppliers/tracking-your-purchases' className={`${styles.link__Sidebar} text-decoration-none ${location.pathname === '/crm-suppliers/tracking-your-purchases' ? styles.active : ''}`}>Seguimiento de tus compras</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuReportsAndIndicatorsRef} className={`${styles.section} mb-3 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <PiChartLineUp className={`${styles.icon} `}/>
                            <Link to={'/reports-and-indicators'} className={`${styles.link__SideBar} p-1 text-decoration-none`}>Reportes e indicadores</Link>
                        </div>
                        {subMenuReportsAndIndicators ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuReportsAndIndicators} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuReportsAndIndicators} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuReportsAndIndicators ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/reports-and-indicators/accounts-and-inventory-indicators' className={`${styles.link__Sidebar} text-decoration-none ${location.pathname === '/reports-and-indicators/accounts-and-inventory-indicators' ? styles.active : ''}`}>Indicadores cuentas e inventarios</Link>
                            <Link to='/reports-and-indicators/marketing-indicators' className={`${styles.link__Sidebar} text-decoration-none ${location.pathname === '/reports-and-indicators/marketing-indicators' ? styles.active : ''}`}>Indicadores de mercadeo</Link>
                        </div>
                    </div>
                </div>

                <NavLink to="/login" onClick={() => { signout() }} className={`${styles.section} p-1 d-flex align-items-center justify-content-start text-decoration-none`}>
                    <GoSignOut className={`${styles.sign__Out} `}/>
                    <div>Salir</div>
                </NavLink>
            </div>
        </div>
    );
}

export default SideBar;