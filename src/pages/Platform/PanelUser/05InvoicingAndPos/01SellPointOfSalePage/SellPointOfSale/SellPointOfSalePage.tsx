/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import POSComponent from '../../../../../../components/Platform/05InvoicingAndPos/01SellPointOfSalePage/POSComponent';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import { LiaFileInvoiceSolid } from "react-icons/lia";
import styles from './styles.module.css';

function SellPointOfSalePage() {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('');

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    // Manejar cambio de la sede
    const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedBranch(selectedId);
    };

    // Efecto para establecer la fecha actual
    const [registrationDate, setRegistrationDate] = useState<Date>();
    useEffect(() => {
        const currentDate = new Date();
        setRegistrationDate(currentDate);
    }, []);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <div className="d-flex align-items-center justify-content-between">
                            <h1 className={`${styles.title} mb-4 mt-4`}>POS</h1>
                            <div className={styles.link__Head_Navigate}>
                                <LiaFileInvoiceSolid className={`${styles.icon__Plus} `}/>
                                <Link to='/invoicing-and-pos/electronic-invoicing' className={`${styles.link} text-decoration-none`}>Facturación</Link>
                            </div>
                        </div>

                        <div className="mb-1 p-3 border d-flex align-items-center justify-content-between">
                            <div className="d-flex justify-content-between">
                                <select
                                    className={`${styles.input} p-2 border `}
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

                            <div className={`${styles.container__Calendars} d-flex align-items-center justify-content-between gap-4`}>
                                <div className="d-flex flex-column align-items-start justify-content-center">
                                    <p className="mb-1">Fecha de registro</p>
                                    <div>
                                        <DatePicker
                                            selected={registrationDate || undefined}
                                            onChange={(date) => setRegistrationDate(date || undefined)}
                                            className={`${styles.input} p-2 border `}
                                            calendarClassName={styles.custom__Calendar}
                                            dayClassName={(date) =>
                                                date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                            }
                                            placeholderText='Fecha de registro'
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <POSComponent
                            // user={user}
                            token={token}
                            selectedBranch={selectedBranch}
                            defaultDates={registrationDate}
                        />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default SellPointOfSalePage;