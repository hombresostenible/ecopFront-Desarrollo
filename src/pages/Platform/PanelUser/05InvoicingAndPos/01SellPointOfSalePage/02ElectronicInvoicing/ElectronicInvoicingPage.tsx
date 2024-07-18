/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from 'react';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../../../../../redux/User/userSlice/actions';
// import { getItemByBarCode } from '../../../../../redux/User/itemBybarCodeOrName/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../../types/User/crmClient.types';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import SearchClientCrm from '../../../../../../helpers/SearchClientCrm/SearchClientCrm';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa";
import styles from './styles.module.css';

function ElectronicInvoicingPage() {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const user = useSelector((state: RootState) => state.user.user);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
            dispatch(getBranches(token))
        }
    }, [token]);

    const [selectedBranch, setSelectedBranch] = useState('');

    // Setea la sede escogida
    const handleBranchChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedBranch(value);
    };

    // useEffect para establecer la fecha actual
    const [currentDate, setCurrentDate] = useState<Date>();
    useEffect(() => {
        const currentDate = new Date();
        setCurrentDate(currentDate);
    }, []);

    //Setea el cliente cuando se busca o se crea
    const [selectedClient, setSelectedClient] = useState<ICrmClient | null>(null);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Facturación</h1>
                        <div className={`${styles.branch} mb-1 p-3 border`}>
                            <div className="d-flex justify-content-between ">
                                <select
                                    className="border-0 p-1 text-center"
                                    value={selectedBranch}
                                    onChange={handleBranchChange}
                                >
                                    <option value=''>Selecciona una Sede</option>
                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={`${styles.container__Invoice} mt-4 p-5`}>
                            <div className={`${styles.container__Header} mb-4 d-flex align-items-center justify-content-between`}>
                                <div className={`${styles.container__Logo} d-flex align-items-center justify-content-center`}>
                                    <img src={user?.logo} alt="Logo" className={`${styles.logo} `}/>
                                </div>
                                <div className={`${styles.container__General_Information_Invoincing} d-flex`}>
                                    <div className={`${styles.container_Dates_Invoicing} d-flex flex-column align-items-center justify-content-center`}>
                                        <h4 className='text-center m-0'>Factura de venta N°</h4>
                                        <h4 className='text-center m-0'>9593122DFDF-1</h4>
                                        <h4 className='text-center m-0'>FECHA: {currentDate  && currentDate.toLocaleDateString()}</h4>
                                        <h4 className='text-center m-0'>FECHA DE VENCIMIENTO:</h4>
                                        <div className={`${styles.container__Calendars} d-flex align-items-center justify-content-between gap-4`}>
                                        <div className="d-flex flex-column align-items-start justify-content-center">
                                            <DatePicker
                                                selected={currentDate || undefined}
                                                onChange={(date) => setCurrentDate(date || undefined)}
                                                className={`${styles.input} p-2 border text-center`}
                                                calendarClassName={styles.custom__Calendar}
                                                dayClassName={(date) =>
                                                    date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                                }
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </div>
                                    </div>
                                    </div>                                    
                                    <div className={`${styles.container_Qr_Invoicing} d-flex align-items-center justify-content-center`}>
                                        <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/1200px-Codigo_QR.svg.png'} alt="Logo" className={`${styles.qr__Code} `}/>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.container__Dates} mb-4 P-2 d-flex`}>
                                <div className={`${styles.container__Issuer_Data} `}>
                                    <div className={styles.title__Section}>Datos del Emisor</div>
                                    <div className="px-2">
                                        <div className="d-flex align-items-center justify-content-start">
                                            <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Razón social/Nombre</h4>
                                            <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.name ? `${user.name} ${user.lastName}` : user?.corporateName}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>NIT/CC</h4>
                                            <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.verificationDigit ? `${user.documentId}-${user.verificationDigit}` : user?.documentId}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Dirección:</h4>
                                            <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.address}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Teléfono:</h4>
                                            <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.container__Issuer_Data}>
                                    <div className={`${styles.title__Section} d-flex align-items-center justify-content-start`}>Datos del Adquiriente</div>
                                    <div className="px-2">
                                        <div className="d-flex align-items-center justify-content-start">
                                            <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>NIT/CC</h4>
                                            <div>
                                                <SearchClientCrm
                                                    token={token}
                                                    onDataClientSelect={(client) => setSelectedClient(client)}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Razón social/Nombre</h4>
                                            <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{selectedClient?.name ? `${selectedClient?.name} ${selectedClient.lastName}` : selectedClient?.corporateName}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Dirección:</h4>
                                            <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{selectedClient?.address ? selectedClient?.address : 'No asignada aún'}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Teléfono:</h4>
                                            <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{selectedClient?.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                                <div className={`${styles.container__Head} `}>
                                    <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                        <div className={`${styles.number} d-flex align-items-center justify-content-center text-center`}>#</div>
                                        <div className={`${styles.code} d-flex align-items-center justify-content-center text-center`}>Código</div>
                                        <div className={`${styles.product__Service} d-flex align-items-center justify-content-center text-center`}>Producto/Servicio</div>
                                        <div className={`${styles.unit__Value} d-flex align-items-center justify-content-center text-center`}>Valor Unitario</div>
                                        <div className={`${styles.quantity} d-flex align-items-center justify-content-center text-center`}>Cant.</div>
                                        <div className={`${styles.discount} d-flex align-items-center justify-content-center text-center`}>Descuento</div>
                                        <div className={`${styles.discount__Value} d-flex align-items-center justify-content-center text-center`}>Valor Descuento</div>
                                        <div className={`${styles.total__Value} d-flex align-items-center justify-content-center text-center`}>Valor Total</div>
                                        <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}></div>
                                    </div>
                                </div>

                                <div className={`${styles.container__Body} `}>
                                    <div className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                        <div className={`${styles.number} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>9999</span>
                                        </div>
                                        <div className={`${styles.code} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>7701024000016</span>
                                        </div>
                                        <div className={`${styles.product__Service} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>Arroz Supremo</span>
                                        </div>
                                        <div className={`${styles.unit__Value} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ 2.100</span>
                                        </div>
                                        <div className={`${styles.quantity} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>10</span>
                                        </div>
                                        <div className={`${styles.discount} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>18%</span>
                                        </div>
                                        <div className={`${styles.discount__Value} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>$200</span>
                                        </div>
                                        <div className={`${styles.total__Value} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ 21.000</span>
                                        </div>
                                        <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <RiDeleteBin6Line
                                                    className={`${styles.button__Delete} `}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>CADA PRODUCTO SE DEBE DE AGREGAR CON CODIGO DE BARRAS O POR NOMBRE EN EL SELECT</div>

                            <div className={`${styles.container__Button__Add} mb-4 pt-2 pb-2 px-4  d-flex`}>
                                <FaPlus className={styles.icon__Plus}/>
                                <p className='m-0'>Agregar</p>
                            </div>
                            
                            <div className={`${styles.container__Taxes_And_Values} d-flex align-items-start justify-content-between`}>
                                <div className={`${styles.container__Taxes} d-flex flex-column gap-4`}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="m-0">Medio de pago</p>
                                        <div>
                                            <select
                                                className={`${styles.input} p-2 border `}
                                            >
                                                <option value="">CONTADO</option>
                                                <option value="">CREDITO</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={`${styles.container__Retention} d-flex flex-column`}>
                                        <div className={`${styles.continer__Retention_Titles} d-flex`}>
                                            <div className={`${styles.retention} d-flex align-items-center justify-content-center`}>Retención</div>
                                            <div className={`${styles.percentage__Value} d-flex align-items-center justify-content-center`}>Valor Porcentual (%)</div>
                                            <div className={`${styles.retention__Value} d-flex align-items-center justify-content-center`}>Importe</div>
                                        </div>

                                        <div className={`${styles.container__Retention_Values} d-flex flex-column`}>
                                            <div className={`${styles.retention__Values} d-flex align-items-center justify-content-center`}>
                                                <div className={`${styles.retention} px-2 d-flex align-items-center justify-content-start`}>Retefuente</div>
                                                <div className={`${styles.percentage__Value} d-flex align-items-center justify-content-center`}>10%</div>
                                                <div className={`${styles.retention__Value} d-flex align-items-center justify-content-center`}>$ 2.100</div>
                                            </div>
                                            <div className={`${styles.retention__Values} d-flex align-items-center justify-content-center`}>
                                                <div className={`${styles.retention} px-2 d-flex align-items-center justify-content-start`}>Rete IVA</div>
                                                <div className={`${styles.percentage__Value} d-flex align-items-center justify-content-center`}>10%</div>
                                                <div className={`${styles.retention__Value} d-flex align-items-center justify-content-center`}>$ 2.100</div>
                                            </div>
                                            <div className={`${styles.retention__Values} d-flex align-items-center justify-content-center`}>
                                                <div className={`${styles.retention} px-2 d-flex align-items-center justify-content-start`}>Rete ICA</div>
                                                <div className={`${styles.percentage__Value} d-flex align-items-center justify-content-center`}>10%</div>
                                                <div className={`${styles.retention__Value} d-flex align-items-center justify-content-center`}>$ 2.100</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.container__Totales}>
                                    <div className={`${styles.title__Container_Totales} text-center`}>Totales</div>
                                    <div className={`${styles.ffffffffff} d-flex`}>
                                        <div className={styles.container__Column_Totals}>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>Base antes de descuentos:</p>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>Descuentos:</p>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>Total Base Imponible:</p>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>IVA:</p>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>Total Impuestos:</p>
                                        </div>
                                        <div className={styles.container__Values_Totals}>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>XXXXXXX</p>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>XXXXXXX</p>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>XXXXXXX</p>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>XXXXXXX</p>
                                            <p className={`${styles.column__Totals} m-0 text-end`}>XXXXXXX</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.totals} d-flex align-items-center justify-content-end`}>XXXXXXXXXX</div>
                                    <div className={`${styles.letter__Amount} d-flex align-items-center justify-content-center`}>
                                        MONTO EN LETRAS PERO NUESTRO CLIENTE LO DEBE DE ESCRIBIR
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ElectronicInvoicingPage;