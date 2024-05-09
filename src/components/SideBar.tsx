/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/LogoEcopcion.svg';
// import { GiFlatPlatform } from "react-icons/gi";
import { BsPlus } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaUsers, FaFileInvoiceDollar, FaCashRegister, FaPlay } from "react-icons/fa";
import { AiFillFunnelPlot } from "react-icons/ai";
import { MdAppRegistration, MdDangerous } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import styles from './styles.module.css';

function SideBar () {
    const token = Cookies.get("token");

    const { signout, profile, getProfile } = useAuth();
    const [ userLogo, setUserLogo ] = useState<string | null>(null);
    const location = useLocation();

    // const [isCrmOpen, setIsCrmOpen] = useState(false);

    useEffect(() => {
        if (token && !profile) {
            getProfile(token);
        }
    
        if (profile) {
            setUserLogo(profile.profilePicture ?? null);
        }
    }, [token, profile]);

    // const toggleCrmMenu = () => {
    //     setIsCrmOpen(!isCrmOpen);
    // };

    // const stopPropagation = (event: { stopPropagation: () => void; }) => {
    //     event.stopPropagation();
    // };

    return (
        <div className={`${styles.containerSideBar} position-relative`}>
            <div className={`${styles.sideBar} position-fixed`}>
                <div className="text-center">
                    <NavLink to="/home">
                        <img src={Logo} alt="Ecopcion" className={`${styles.logo} m-auto`} />
                    </NavLink>
                </div>

                <div className={`${styles.containerProfile} mt-3 d-flex flex-column align-items-center justify-content-center`}>
                    <div className={`${styles.containerProfilePicture} mb-1 d-flex align-items-center justify-content-center rounded-circle overflow-hidden`}>
                        {userLogo && (
                            <img className={`${styles.profilePicture} rounded-circle`} src={userLogo} alt="Logo del usuario" />
                        )}
                        {!userLogo && (
                            <div>
                                <p className="m-0 text-center">No tienes un Logo para mostrar</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.containerInfo}`}>
                        {profile?.userType === 'User' ? (
                            <div>
                                <h5 className="m-0 text-center">{profile?.name} {profile?.lastName}</h5>
                                <h5 className="m-0 text-center">{profile?.typeRole}</h5>
                            </div>
                        ) : (
                            <div>
                                <h5 className="m-0 text-center">{profile?.nameCompanyLeader} {profile?.lastNameCompanyLeader}</h5>
                                <h5 className="m-0 text-center">{profile?.typeRole}</h5>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`${styles.containerOptions} mt-2 overflow-y-auto`}>
                    {/* <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/ecopcionApp' ? styles.activeSideBar : ''} mb-2`}>
                        <GiFlatPlatform className={`${styles.icon} m-2`}/>
                        <NavLink to="/ecopcionApp" className={`${styles.option} nav-link`}>EcopcionApp</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li> */}
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/home' ? styles.activeSideBar : ''} mb-2`}>
                        <IoHome className={`${styles.icon} m-2`}/>
                        <NavLink to="/home" className={`${styles.option} nav-link`}>Home</NavLink>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${(location.pathname === '/configuration' || location.pathname === '/configuration/profile') ? styles.activeSideBar : ''} mb-2`}>
                        <IoSettingsSharp className={`${styles.icon} m-2`}/>
                        <NavLink to="/configuration" className={`${styles.option} nav-link`}>Configuración</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/branches' ? styles.activeSideBar : ''} mb-2`}>
                        <IoStorefrontSharp className={`${styles.icon} m-2`}/>
                        <NavLink to="/branches" className={`${styles.option} nav-link`}>Tus Sedes</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/users-platform' ? styles.activeSideBar : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`}/>
                        <NavLink to="/users-platform" className={`${styles.option} nav-link`}>Tus Usuarios</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li>
                    {/* <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start mb-2`} onClick={toggleCrmMenu}> */}
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-clients' ? styles.activeSideBar : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-clients" className={`${styles.option} nav-link`}>CRM Clientes</NavLink>
                        <BsPlus className={styles.iconPlus} />
                        {/* {isCrmOpen && (
                            <ul className='d-flex flex-column'>
                                <li>
                                    <Link to="/crm-clients" className={`${styles.option} nav-link`} onClick={stopPropagation}>CRM Clientes</Link>
                                </li>
                                <li>
                                    <Link to="/crm-suppliers" className={`${styles.option} nav-link`} onClick={stopPropagation}>CRM Proveedores</Link>
                                </li>
                            </ul>
                        )} */}
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/crm-suppliers' ? styles.activeSideBar : ''} mb-2`}>
                        <FaUsers className={`${styles.icon} m-2`} />
                        <NavLink to="/crm-suppliers" className={`${styles.option} nav-link`}>CRM Proveedores</NavLink>
                        <BsPlus className={styles.iconPlus} />
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/transactions' ? styles.activeSideBar : ''}`}>
                        <FaCashRegister className={`${styles.icon} m-2`}/>
                        <NavLink to="/transactions" className={`${styles.option} nav-link`}>Transacciones</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${(location.pathname === '/accountBook' || location.pathname === '/accountBook/incomePage' || location.pathname === '/accountBook/expensesPage' || location.pathname === '/accountBook/accountingRecords') ? styles.activeSideBar : ''} mb-2`}>
                        <FaFileInvoiceDollar className={`${styles.icon} m-2`}/>
                        <NavLink to="/accountBook" className={`${styles.option} nav-link`}>Libro diario</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/your-registers' ? styles.activeSideBar : ''} mb-2`}>
                        <MdAppRegistration className={`${styles.icon} m-2`}/>
                        <NavLink to="/your-registers" className={`${styles.option} nav-link`}>Tus registros</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/salesFunnel' ? styles.activeSideBar : ''} mb-2`}>
                        <AiFillFunnelPlot className={`${styles.icon} m-2`}/>
                        <NavLink to="/salesFunnel" className={`${styles.option} nav-link`}>Embudo de Ventas</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/tutorial-videos' ? styles.activeSideBar : ''} mb-2`}>
                        <FaPlay className={`${styles.icon} m-2`}/>
                        <NavLink to="/tutorial-videos" className={`${styles.option} nav-link`}>Video tutoriales</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li>
                    <li className={`${styles.section} p-1 d-flex align-items-center justify-content-start ${location.pathname === '/report-errors' ? styles.activeSideBar : ''} mb-2`}>
                        <MdDangerous className={`${styles.icon} m-2`}/>
                        <NavLink to="/report-errors" className={`${styles.option} nav-link`}>Reportar errores o mejoras</NavLink>
                        <BsPlus className={styles.iconPlus}/>
                    </li>                    
                    <li className={`${styles.sectionLogout} p-1 d-flex align-items-center justify-content-start rounded`}>
                        <TbLogout2 className={`${styles.icon} m-2`}/>
                        <NavLink to="/login" onClick={() => { signout() }} className={`${styles.option} nav-link`}>Logout</NavLink>
                    </li>
                </div>
            </div>
        </div>
    );
}

export default SideBar;