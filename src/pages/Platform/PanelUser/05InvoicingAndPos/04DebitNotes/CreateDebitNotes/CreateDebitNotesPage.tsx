/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../../../../../redux/User/userSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../../types/User/crmClient.types';
import SearchClientCrm from '../../../../../../helpers/SearchClientCrm/SearchClientCrm';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import { IoMdSettings } from "react-icons/io";
import styles from './styles.module.css';

function CreateDebitNotesPage() {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    // Estado de Redux
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
        }
    }, [token, dispatch]);

    //Selecciona el cliente al que se le vende
    const [idSelectedClient, setIdSelectedClient] = useState<number | null>(null);
    console.log('idSelectedClient: ', idSelectedClient)

    //Setea el cliente cuando se busca o se crea
    const [selectedClient, setSelectedClient] = useState<ICrmClient | null>(null);

    // Estados para las fechas de registro y transacción
    const [registrationDate, setRegistrationDate] = useState<Date>();

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus notas débito</h1>

                        <Link to='/debit-notes/consult-debit-notes' className={`${styles.link__Back} border-0 text-decoration-none`}>Consulta tus notas débito</Link>

                        <div className={`${styles.container__Debit_Note} mt-4 p-4 d-flex flex-column align-items-center justify-content-center`}>
                            <div className={`${styles.container__Header_Debit_Note} mt-4 pb-4 d-flex align-items-center justify-content-between`}>
                                <div className={`${styles.container__Logo} d-flex align-items-center justify-content-center`}>
                                    <img src={user?.logo} alt="Logo" className={`${styles.logo__User} `}/>
                                </div>
                                <div className={`${styles.container__Info_User} d-flex flex-column align-items-center justify-content-center`}>
                                    <h4 className={`${styles.name__User} m-0`}>
                                        {user?.name && user?.lastName
                                            ? `${String(user?.name).toUpperCase()} ${String(user?.lastName).toUpperCase()}`
                                            : String(user?.corporateName).toUpperCase()}
                                    </h4>
                                    <div className={`${styles.container__Identification} d-flex gap-1`}>
                                        <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'NIT' && ('NIT:')}</p>
                                        <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'Cedula de Ciudadania' && ('CC:')}</p>
                                        <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'Cedula de Extranjeria' && ('CE:')}</p>
                                        <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'Pasaporte' && ('PS:')}</p>
                                        <p className={`${styles.document__Id} m-0`}>{user?.documentId}</p>
                                    </div>
                                    <p className={`${styles.email} m-0`}>{user?.email}</p>
                                </div>
                                <div className={`${styles.container__Number_Debit_Note} d-flex`}>
                                    <span className={`${styles.numerator} d-flex align-items-center justify-content-center`}>No.</span>
                                    <div className={`${styles.invoice__Number} p-2 d-flex align-items-center justify-content-start`}>1</div>
                                    <div className={`${styles.container__Icon_setting} d-flex align-items-center justify-content-center`}>
                                        <IoMdSettings className={`${styles.icon__Setting} `}/>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.container__Dates_Client} pt-4 pb-4 d-flex align-items-center justify-content-between`}>
                                <div className={`${styles.dates_Client} `}>
                                    <div className={`${styles.container__Info} mb-2 d-flex gap-2`}>
                                        <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Cliente</p>
                                        <SearchClientCrm
                                            token={token}
                                            onClientSelect={(client) => setIdSelectedClient(client)}
                                            onDataClientSelect={(client) => setSelectedClient(client)}
                                        />
                                    </div>
                                    <div className={`${styles.container__Info} mb-2 d-flex gap-2`}>
                                        <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Identificación</p>
                                        <div className={`${styles.data} px-3 d-flex align-items-center justify-content-start`}>{idSelectedClient}</div>
                                    </div>
                                    <div className={`${styles.container__Info} mb-2 d-flex gap-2`}>
                                        <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Teléfono</p>
                                        <div className={`${styles.data} px-3 d-flex align-items-center justify-content-start`}>{selectedClient?.phone}</div>
                                    </div>
                                    <div className={`${styles.container__Info_Reason} mb-2 d-flex gap-2`}>
                                        <p className={`${styles.label__Reason} m-0 d-flex align-items-center justify-content-end`}>Razón</p>
                                        <textarea name="" id="" className={`${styles.textarea} p-3`}></textarea>
                                    </div>
                                </div>

                                <div className={`${styles.dates__Debit_Note} `}>
                                    <div className={`${styles.container__Info} mb-2 d-flex gap-2`}>
                                        <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Fecha</p>
                                        <DatePicker
                                            selected={registrationDate || undefined}
                                            onChange={(date) => setRegistrationDate(date || undefined)}
                                            className={`${styles.calendar} p-2 border`}
                                            dayClassName={(date) =>
                                                date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                            }
                                            placeholderText='Fecha de registro'
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                    </div>
                                    <div className={`${styles.container__Info} mb-2 d-flex gap-2`}>
                                        <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Factura</p>
                                        <div className={`${styles.data} px-3 d-flex align-items-center justify-content-start`}>
                                            Hacer ruta del back para traer el # de factura
                                        </div>
                                    </div>
                                    <div className={`${styles.container__Info} mb-2 d-flex gap-2`}>
                                        <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Tipo</p>
                                        <select
                                            className={`${styles.select} px-3 d-flex align-items-center justify-content-start`}
                                        >
                                            <option value="">Tipo 1</option>
                                            <option value="">Tipo 2</option>
                                            <option value="">Tipo 3</option>
                                            <option value="">Tipo 4</option>
                                            <option value="">Tipo 5</option>
                                        </select>
                                    </div>
                                    <div className={`${styles.container__Info_Reason} mb-2 d-flex gap-2`}>
                                        <p className={`${styles.label__Reason} m-0 d-flex align-items-center justify-content-end`}>Notas</p>
                                        <textarea name="" id="" className={`${styles.textarea} `}></textarea>
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

export default CreateDebitNotesPage;