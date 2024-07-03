/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import IncomeCash from '../../../../../../components/Platform/04Accounts/01Income/IncomeCash/IncomeCash';
import IncomeCredit from '../../../../../../components/Platform/04Accounts/01Income/IncomeCredit/IncomeCredit';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function CreateIncomePage () {
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

    // Cambio de la sede
    const handleBranchChange = (e: any) => {
        const selectedId = e.target.value;
        setSelectedBranch(selectedId);
    };

    //Fechas de registrationDate y transactionDate con el checkout
    const [checkDatesRegisterTx, setCheckDatesRegisterTx] = useState(true);
    const [registrationDate, setRegistrationDate] = useState<Date | undefined>(undefined);
    const [transactionDate, setTransactionDate] = useState<Date | undefined>(undefined);
    const [defaultDates, setDefaultDates] = useState<boolean>(true);

    //Es el check para las fechas de registro y de transacción
    const handleCheckDatesRegisterTx = () => {
        setCheckDatesRegisterTx((prevCheckDatesRegisterTx) => !prevCheckDatesRegisterTx);
        // Si el checkbox está seleccionado, establecer las fechas por defecto
        if (!checkDatesRegisterTx) {
            const currentDate = new Date();
            setRegistrationDate(currentDate);
            setTransactionDate(currentDate);
            setDefaultDates(true);
        } else {
            // Si el checkbox no está seleccionado, permitir que el usuario seleccione manualmente
            setRegistrationDate(undefined);
            setTransactionDate(undefined);
            setDefaultDates(false);
        }
    };

    //Setea si el Gasto o la Venta fue a Contado o a Credito
    const [creditCashOption, setCreditCashOption] = useState('Contado');
    const handleCreditCashChange = (event: { target: { value: SetStateAction<string> }}) => {
        setCreditCashOption(event.target.value);
    };

    // PERMITE SELECCIONAR SI SE VENDIERON ARTICULOS O SI EL INGRESO FUE POR CREDITOS, GOTA GOTA, ETC
    const [typeIncome, setTypeIncome] = useState<string>('Venta de articulos');
    const handleTypeIncomeChange = (incomeType: string) => {
        setTypeIncome(incomeType);
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus Ingresos</h1>

                        <div className="mb-1 p-3 border">
                            <div className="d-flex justify-content-between">
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

                        <div className="mb-1 p-3 position-relative">
                            <div className="d-flex justify-content-start">
                                <p className="mb-0 p-2">Selecciona el check si la fecha de registro es la fecha de la transacción</p>
                                <div className={`${styles.container__Check} `}>
                                    <input
                                        type="checkbox"
                                        onChange={handleCheckDatesRegisterTx}
                                        className={`${styles.checkbox} `}
                                        defaultChecked={true}
                                    />
                                </div>
                            </div>

                            {checkDatesRegisterTx === false && (
                                <div className={`${styles.container__Calendars} d-flex align-items-center justify-content-between gap-4 position-absolute`}>
                                    <div className="mb-3 p-2 d-flex flex-column align-items-start justify-content-center">
                                        <p className="mb-1">Fecha de registro de la información</p>
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
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 p-2 d-flex flex-column align-items-start justify-content-center">
                                        <p className="mb-1">Fecha en que se realizó la transacción</p>
                                        <div>
                                            <DatePicker
                                                selected={transactionDate || undefined}
                                                onChange={(date) => setTransactionDate(date || undefined)}
                                                className={`${styles.input} p-2 border `}
                                                calendarClassName={styles.custom__Calendar}
                                                dayClassName={(date) =>
                                                    date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                                }
                                                placeholderText='Fecha de transacción'
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-1 p-3 d-flex align-items-center justify-content-between border position-relative">
                            <div className="d-flex justify-content-start">
                                <p className="mb-0 p-2">La venta ¿Es de contado o a crédito?</p>
                                <div>
                                    <select
                                        className={`${styles.input} p-2 border `}
                                        onChange={handleCreditCashChange}
                                    >
                                        <option value='Contado'>Contado</option>
                                        <option value='Credito'>A cuotas</option>
                                    </select>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start">
                                <p className="mb-0 p-2">Tipo de ingreso</p>
                                <div className="d-flex align-items-center justify-content-center gap-4">
                                    <div
                                        className={`${styles.type__Income} ${typeIncome === 'Venta de articulos' ? styles.active : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => handleTypeIncomeChange('Venta de articulos')}
                                    >
                                        Venta de artículos
                                    </div>
                                    <div
                                        className={`${styles.type__Income} ${typeIncome === 'Otros ingresos' ? styles.active : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => handleTypeIncomeChange('Otros ingresos')}
                                    >
                                        Otros ingresos
                                    </div>
                                </div>
                            </div>
                        </div>

                        {creditCashOption === 'Contado' && (
                            <IncomeCash
                                token={token}
                                selectedBranch={selectedBranch}
                                defaultDates={defaultDates}
                                registrationDate={registrationDate}
                                transactionDate={transactionDate}
                                typeIncome={typeIncome}
                            />
                        )}

                        {creditCashOption === 'Credito' && (
                            <IncomeCredit
                                token={token}
                                selectedBranch={selectedBranch}
                                defaultDates={defaultDates}
                                registrationDate={registrationDate}
                                transactionDate={transactionDate}
                            />
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CreateIncomePage;