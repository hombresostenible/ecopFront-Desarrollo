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
import { FaFileInvoiceDollar, FaCashRegister, FaUsers } from "react-icons/fa";
import { TbCoin } from "react-icons/tb";
import { BiSolidLeaf } from "react-icons/bi";
import { PiChartLineUp } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
import { TfiHeadphoneAlt } from "react-icons/tfi";
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
    const [subMenuInvoicingAndPos, setSubMenuInvoicingAndPos] = useState(() => getItemFromLocalStorage('invoicingAndPos', false));                          //FACTURACION Y POS
    const [subMenuElectronicPayroll, setSubMenuElectronicPayroll] = useState(() => getItemFromLocalStorage('electronicPayroll', false));                    //NOMINA ELECTRONICA
    const [subMenuCrmClients, setSubMenuCrmClients] = useState(() => getItemFromLocalStorage('crmClients', false));                                         //CRM CLIENTES
    const [subMenuCrmSuppliers, setSubMenuCrmSuppliers] = useState(() => getItemFromLocalStorage('crmSuppliers', false));                                   //CRM PROVEEDORES
    const [subMenuSustainability, setSubMenuSustainability] = useState(() => getItemFromLocalStorage('sustainability', false));                             //SOSTENIBILIDAD
    const [subMenuReportsAndIndicators, setSubMenuReportsAndIndicators] = useState(() => getItemFromLocalStorage('reportsAndIndicators', false));           //REPORTES E INDICADORES
    const [subMenuStrategicNotifications, setSubMenuStrategicNotifications] = useState(() => getItemFromLocalStorage('strategicNotifications', false));     //NOTIFICACIONES ESTRATEGICAS
    const [subMenuConsultancies, setSubMenuConsultancies] = useState(() => getItemFromLocalStorage('consultancies', false));                                //ASESORIAS


    //DECLARAR LAS REFERENCIAS PARA CADA SUBMENU
    const subMenuBranchesRef = useRef<HTMLDivElement>(null);
    const subMenuInventoryRef = useRef<HTMLDivElement>(null);
    const subMenuAccountsRef = useRef<HTMLDivElement>(null);
    const subMenuInvoicingAndPosRef = useRef<HTMLDivElement>(null);
    const subMenuElectronicPayrollRef = useRef<HTMLDivElement>(null);
    const subMenuCrmClientsRef = useRef<HTMLDivElement>(null);
    const subMenuCrmSuppliersRef = useRef<HTMLDivElement>(null);
    const subMenuSustainabilityRef = useRef<HTMLDivElement>(null);
    const subMenuReportsAndIndicatorsRef = useRef<HTMLDivElement>(null);
    const subMenuStrategicNotificationsRef = useRef<HTMLDivElement>(null);
    const subMenuConsultanciesRef = useRef<HTMLDivElement>(null);
    
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

    //FACTURACION Y POS
    const handleSubMenuInvoicingAndPos = () => {
        setSubMenuInvoicingAndPos((prev: any) => {
            setItemInLocalStorage('invoicingAndPos', !prev);
            return !prev;
        });
    };

    //NOMINA ELECTRONICA
    const handleSubMenuElectronicPayroll = () => {
        setSubMenuElectronicPayroll((prev: any) => {
            setItemInLocalStorage('electronicPayroll', !prev);
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

    //SOSTENIBILIDAD
    const handleSubMenuSustainability = () => {
        setSubMenuSustainability((prev: any) => {
            setItemInLocalStorage('sustainability', !prev);
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

    //REPORTES E INDICADORES
    const handleSubMenuStrategicNotifications = () => {
        setSubMenuStrategicNotifications((prev: any) => {
            setItemInLocalStorage('strategicNotifications', !prev);
            return !prev;
        });
    };

    //ASESORIAS PARA TOMA DE DECISIONES
    const handleSubMenuConsultancies = () => {
        setSubMenuConsultancies((prev: any) => {
            setItemInLocalStorage('consultancies', !prev);
            return !prev;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                subMenuBranches.current && !subMenuBranches.current.contains(event.target as Node) &&
                subMenuInventoryRef.current && !subMenuInventoryRef.current.contains(event.target as Node) &&
                subMenuAccountsRef.current && !subMenuAccountsRef.current.contains(event.target as Node) &&
                subMenuInvoicingAndPosRef.current && !subMenuInvoicingAndPosRef.current.contains(event.target as Node) &&
                subMenuElectronicPayrollRef.current && !subMenuElectronicPayrollRef.current.contains(event.target as Node) &&
                subMenuCrmClientsRef.current && !subMenuCrmClientsRef.current.contains(event.target as Node) &&
                subMenuCrmSuppliersRef.current && !subMenuCrmSuppliersRef.current.contains(event.target as Node) &&
                subMenuSustainabilityRef.current && !subMenuSustainabilityRef.current.contains(event.target as Node) &&
                subMenuReportsAndIndicatorsRef.current && !subMenuReportsAndIndicatorsRef.current.contains(event.target as Node) &&
                subMenuStrategicNotificationsRef.current && !subMenuStrategicNotificationsRef.current.contains(event.target as Node) &&
                subMenuConsultanciesRef.current && !subMenuConsultanciesRef.current.contains(event.target as Node)
            ) {
                setSubMenuBranches(false);
                setSubMenuInventory(false);
                setSubMenuAccounts(false);
                setSubMenuInvoicingAndPos(false);
                setSubMenuElectronicPayroll(false);
                setSubMenuCrmClients(false);
                setSubMenuCrmSuppliers(false);
                setSubMenuSustainability(false);
                setSubMenuReportsAndIndicators(false);
                setSubMenuStrategicNotifications(false);
                setSubMenuConsultancies(false);
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
                <NavLink to="/home" className={`${styles.section} mb-2 p-1 d-flex align-items-center justify-content-start text-decoration-none ${location.pathname === '/home' ? styles.active : ''} `}>
                    <IoHome className={`${styles.icon} `}/>
                    <div className={` p-1 d-flex align-items-center justify-content-start`}>Home</div>
                </NavLink>

                <div ref={subMenuBranchesRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <IoStorefrontSharp className={`${styles.icon} `}/>
                            <div className={`p-1`}>Tus Sedes</div>
                        </div>
                        {subMenuBranches ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuBranches} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuBranches} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuBranches ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/branches/consult-branches' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/branches/consult-branches' ? styles.active : ''} `} >Consulta tus sedes</Link>
                            <Link to='/branches/create-branches' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/branches/create-branches' ? styles.active : ''}`}>Crea tus sedes</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuInventoryRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <MdAppRegistration className={`${styles.icon} `}/>
                            <div className={`p-1`}>Inventarios</div>
                        </div>
                        {subMenuInventory ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuInventory} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuInventory} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuInventory ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/inventories/consult-assets' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/inventories/consult-assets' || location.pathname === '/inventories/create-assets') ? styles.active : ''} `}>Activos</Link>
                            <Link to='/inventories/consult-merchadises' className={`${styles.link__Service} text-decoration-none ${(location.pathname === '/inventories/consult-merchadises' || location.pathname === '/inventories/create-merchadises') ? styles.active : ''} `}>Mercancías</Link>
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
                            <div className={`p-1`}>Cuentas</div>
                        </div>
                        {subMenuAccounts ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuAccounts} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuAccounts} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuAccounts ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/accounts/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/accounts/assets' ? styles.active : ''}`}>Ingresos</Link>
                            <Link to='/accounts/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/accounts/assets' ? styles.active : ''}`}>Gastos</Link>
                            <Link to='/accounts/merchadises' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/accounts/merchadises' ? styles.active : ''}`}>Transacciones pendientes de aprobar</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuInvoicingAndPosRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <FaCashRegister className={`${styles.icon} `} />
                            <div className={`p-1`}>Facturación y POS</div>
                        </div>
                        {subMenuInvoicingAndPos ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuInvoicingAndPos} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuInvoicingAndPos} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuInvoicingAndPos ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/services' className={`${styles.link__Service} text-decoration-none`}>Notas crédito</Link>    {/* Visualizar notas crédito - Enviar notas crédito - Convertit notas crédito */}
                            <Link to='/services' className={`${styles.link__Service} text-decoration-none`}>Notas débito</Link>     {/* Visualizar notas débito - Enviar notas débito - Convertit notas débito */}
                            <Link to='/services' className={`${styles.link__Service} text-decoration-none`}>Facturas recurrentes</Link>
                            <Link to='/services' className={`${styles.link__Service} text-decoration-none`}>Pagos recibidos</Link>
                            <Link to='/inventories/quote-products' className={`${styles.link__Service} text-decoration-none`}>Cotizaciones</Link> {/* Visualizar cotizaciones - Enviar cotizaciones - Convertit cotizaciones en facturas */}
                        </div>
                    </div>
                </div>

                <div ref={subMenuElectronicPayrollRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <FaFileInvoiceDollar className={`${styles.icon} `}/>
                            <div className={`p-1`}>Nómina electrónica</div>
                        </div>
                        {subMenuElectronicPayroll ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuElectronicPayroll} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuElectronicPayroll} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuElectronicPayroll ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/electronic-payroll/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/electronic-payroll/assets' ? styles.active : ''}`}>Pagos de nómina</Link>
                            <Link to='/electronic-payroll/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/electronic-payroll/assets' ? styles.active : ''}`}>Certificaciones</Link>
                            <Link to='/electronic-payroll/merchadises' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/electronic-payroll/merchadises' ? styles.active : ''}`}>Liquidación de nómina</Link>
                            <Link to='/electronic-payroll/merchadises' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/electronic-payroll/merchadises' ? styles.active : ''}`}>Colaboradores</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuCrmClientsRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <TbCoin className={`${styles.icon} `}/>
                            <div className={`p-1`}>CRM Clientes</div>
                        </div>
                        {subMenuCrmClients ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuCrmClients} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuCrmClients} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuCrmClients ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/crm-clients/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/crm-clients/assets' ? styles.active : ''}`}>Clientes</Link>
                            <Link to='/crm-clients/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/crm-clients/assets' ? styles.active : ''}`}>Seguimiento</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuCrmSuppliersRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <FaUsers className={`${styles.icon} `}/>
                            <div className={`p-1`}>CRM Proveedores</div>
                        </div>
                        {subMenuCrmSuppliers ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuCrmSuppliers} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuCrmSuppliers} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuCrmSuppliers ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/crm-suppliers/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/crm-suppliers/assets' ? styles.active : ''}`}>Proveedores</Link>
                            <Link to='/crm-suppliers/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/crm-suppliers/assets' ? styles.active : ''}`}>Seguimiento de tus compras</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuSustainabilityRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <BiSolidLeaf className={`${styles.icon} `}/>
                            <div className={`p-1`}>Sostenibilidad</div>
                        </div>
                        {subMenuSustainability ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuSustainability} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuSustainability} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuSustainability ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/sustainability/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/sustainability/assets' ? styles.active : ''}`}>Consulta normas ambientales</Link>
                            <Link to='/sustainability/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/sustainability/assets' ? styles.active : ''}`}>Diseño de planes</Link>
                            <Link to='/sustainability/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/sustainability/assets' ? styles.active : ''}`}>Informes ASG</Link>
                            <Link to='/sustainability/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/sustainability/assets' ? styles.active : ''}`}>Historias de sostenibilidad</Link>
                            <Link to='/sustainability/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/sustainability/assets' ? styles.active : ''}`}>Diagnósticos</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuReportsAndIndicatorsRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <PiChartLineUp className={`${styles.icon} `}/>
                            <div className={`p-1`}>Reportes e indicadores</div>
                        </div>
                        {subMenuReportsAndIndicators ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuReportsAndIndicators} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuReportsAndIndicators} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuReportsAndIndicators ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/reports-and-indicators/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/reports-and-indicators/assets' ? styles.active : ''}`}>Indicadores financieros</Link>
                            <Link to='/reports-and-indicators/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/reports-and-indicators/assets' ? styles.active : ''}`}>Indicadores de mercadeo</Link>
                            <Link to='/reports-and-indicators/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/reports-and-indicators/assets' ? styles.active : ''}`}>Indicadores de sostenibilidad</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuStrategicNotificationsRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <IoIosNotifications className={`${styles.icon} `}/>
                            <div className={`p-1`}>Notificaciones estratégicas</div>
                        </div>
                        {subMenuStrategicNotifications ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuStrategicNotifications} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuStrategicNotifications} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuStrategicNotifications ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/strategic-notifications/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/strategic-notifications/assets' ? styles.active : ''}`}>Vencimiento de productos</Link>
                            <Link to='/strategic-notifications/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/strategic-notifications/assets' ? styles.active : ''}`}>Calendario tributario</Link>
                        </div>
                    </div>
                </div>

                <div ref={subMenuConsultanciesRef} className={`${styles.section} mb-2 p-1 d-flex flex-column align-items-start text-decoration-none`}>
                    <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="d-flex align-items-center">
                            <TfiHeadphoneAlt className={`${styles.icon} `}/>
                            <div className={`p-1`}>Asesoría para toma de decisiones</div>
                        </div>
                        {subMenuConsultancies ?  ( <IoChevronUpOutline className={styles.icon__Plus} onClick={handleSubMenuConsultancies} />
                        ) : ( 
                            <IoChevronDownOutline className={styles.icon__Plus} onClick={handleSubMenuConsultancies} />
                        )}
                    </div>
                    <div className={`collapse ${subMenuConsultancies ? 'show' : ''}`}>
                        <div className={`${styles.menu} d-flex flex-column align-items-start w-100`}>
                            <Link to='/consultancies/assets' className={`${styles.link__Service} text-decoration-none ${location.pathname === '/consultancies/assets' ? styles.active : ''}`}>Contacta a un asesor</Link>
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