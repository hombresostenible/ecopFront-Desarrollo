/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../../../types/User/branch.types';
import CashExpense from '../../../../../../components/Platform/04Accounts/02Expenses/CashExpense/CashExpense';
import CreditExpense from '../../../../../../components/Platform/04Accounts/02Expenses/CreditExpense/CreditExpense';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function CreateExpensesPage() {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const branches = useSelector((state: RootState) => state.branch.branch);
    
    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    //Setea la sede seleccionada
    const [selectedBranch, setSelectedBranch] = useState<IBranch | null>(null);

    const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchId = e.target.value;
        if (Array.isArray(branches)) {
            const branch = branches.find(branch => branch.id === selectedBranchId) || null;
            setSelectedBranch(branch);
        } else setSelectedBranch(null);
    };

    // Estado para manejar el checkbox de fechas automáticas
    const [checkDatesRegisterTx, setCheckDatesRegisterTx] = useState(true);

    // Estados para las fechas de registro y transacción
    const [registrationDate, setRegistrationDate] = useState<Date>();
    const [transactionDate, setTransactionDate] = useState<Date>();
    const [defaultDates, setDefaultDates] = useState<boolean>(true);

    // Manejar cambio en el checkbox de fechas automáticas
    const handleCheckDatesRegisterTx = () => {
        setCheckDatesRegisterTx(prevCheckDatesRegisterTx => !prevCheckDatesRegisterTx);
    };

    // Manejar cambio en el tipo de pago (contado o crédito)
    const handleCreditCashChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCreditCashOption(event.target.value);
    };

    // Manejar cambio en el tipo de gasto (venta de artículos u otros gastos)
    const handleTypeExpenseChange = (incomeType: string) => {
        setTypeIncome(incomeType);
    };

    // Estado para seleccionar contado o crédito
    const [creditCashOption, setCreditCashOption] = useState('Contado');

    // Estado para seleccionar tipo de ingreso
    const [typeExpense, setTypeIncome] = useState<string>('Compra de articulos');

    // Efecto para establecer las fechas por defecto o manualmente
    useEffect(() => {
        if (checkDatesRegisterTx) {
            const currentDate = new Date();
            setRegistrationDate(currentDate);
            setTransactionDate(currentDate);
            setDefaultDates(true);
        } else {
            setRegistrationDate(undefined);
            setTransactionDate(undefined);
            setDefaultDates(false);
        }
    }, [checkDatesRegisterTx]);

    // Formatear las fechas para pasarlas como props
    const formattedRegistrationDate = registrationDate ? format(registrationDate, 'yyyy-MM-dd HH:mm:ss') : undefined;
    const formattedTransactionDate = transactionDate ? format(transactionDate, 'yyyy-MM-dd HH:mm:ss') : undefined;

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus Gastos</h1>

                        <div className="mb-1 p-3 border">
                            <div className="d-flex justify-content-between">
                                <select
                                    className={`${styles.input} p-2 border `}
                                    value={selectedBranch ? selectedBranch.id : ''}
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

                        <div className="mb-4 mt-4 d-flex align-items-center justify-content-between position-relative">
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

                            <div className={`${styles.container__Calendars} d-flex align-items-center justify-content-between gap-4`}>
                                <div className="d-flex flex-column align-items-start justify-content-center">
                                    <p className="mb-1">Fecha de registro</p>
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
                                        disabled={checkDatesRegisterTx}
                                    />
                                </div>
                                <div className="d-flex flex-column align-items-start justify-content-center">
                                    <p className="mb-1">Fecha de transacción</p>
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
                                        disabled={checkDatesRegisterTx}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 p-3 d-flex align-items-center justify-content-between border position-relative">
                            <div className="d-flex justify-content-start">
                                <p className="mb-0 p-2">El gasto ¿Es de contado o a crédito?</p>
                                <select
                                    className={`${styles.input} p-2 border `}
                                    onChange={handleCreditCashChange}
                                >
                                    <option value='Contado'>Contado</option>
                                    <option value='Credito'>A cuotas</option>
                                </select>
                            </div>

                            <div className="d-flex justify-content-start">
                                <p className="mb-0 p-2">Tipo de gasto</p>
                                <div className="d-flex align-items-center justify-content-center gap-4">
                                    <div
                                        className={`${styles.type__Income} ${typeExpense === 'Compra de articulos' ? styles.active : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => handleTypeExpenseChange('Compra de articulos')}
                                    >
                                        Compra de artículos
                                    </div>

                                    <div
                                        className={`${styles.type__Income} ${typeExpense === 'Otros gastos' ? styles.active : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => handleTypeExpenseChange('Otros gastos')}
                                    >
                                        Otros gastos
                                    </div>
                                </div>
                            </div>
                        </div>

                        {creditCashOption === 'Contado' && (
                            <CashExpense
                                token={token}
                                branch={selectedBranch}
                                defaultDates={defaultDates}
                                registrationDate={formattedRegistrationDate}
                                transactionDate={formattedTransactionDate}
                                typeExpense={typeExpense}
                            />
                        )}

                        {creditCashOption === 'Credito' && (
                            <CreditExpense
                                token={token}
                                branch={selectedBranch}
                                defaultDates={defaultDates}
                                registrationDate={formattedRegistrationDate}
                                transactionDate={formattedTransactionDate}
                            />
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CreateExpensesPage;