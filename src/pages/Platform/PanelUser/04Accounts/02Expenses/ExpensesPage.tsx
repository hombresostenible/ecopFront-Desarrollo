/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import CashExpense from '../../../../../components/Platform/04Accounts/02Expenses/CashExpense/CashExpense';
import CreditExpense from '../../../../../components/Platform/04Accounts/02Expenses/CreditExpense/CreditExpense';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function ExpensesPage() {
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

    const branchesArray = Array.isArray(branches) ? branches : [];

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

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <Link to='/inventories/create-assets'>Registros</Link>{/* CREAR EL COMPONENTE QUE VISUALIZA LOS REGITROS CREADOS DEL LIBRO DIARIO */}
                        <div className='mt-4 border d-flex flex-column align-items-center justify-content-center'>
                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div className="px-3">
                                    <p className={`${styles.text} mb-0 p-2`}>Selecciona una Sede</p>
                                </div>
                                <div>
                                    <select
                                        className={`${styles.info} p-2 border rounded border-secundary`}
                                        onChange={handleBranchChange}
                                    >
                                        <option value=''>Selecciona una Sede</option>
                                        {branchesArray && branchesArray.map((branch, index) => (
                                            <option key={index} value={branch.id}>
                                                {branch.nameBranch}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div className="px-3">
                                    <p className={`${styles.text} mb-0 p-2`}>Selecciona el check si la fecha de registro es la fecha de la transacción</p>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        onChange={handleCheckDatesRegisterTx}
                                        className={`${styles.checkbox} border`}
                                        defaultChecked={true}
                                    />
                                </div>
                            </div>
                        
                            {checkDatesRegisterTx === false && (
                                <div>
                                    <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                        <div className="px-3">
                                            <p className={`${styles.text} mb-0 p-2`}>Fecha de registro de la información</p>
                                        </div>
                                        <div>
                                            <DatePicker
                                                selected={registrationDate || undefined}
                                                onChange={(date) => setRegistrationDate(date || undefined)}
                                                className={`${styles.info} p-2 border rounded border-secundary`}
                                                placeholderText='Fecha de registro'
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                        <div className="px-3">
                                            <p className={`${styles.text} mb-0 p-2`}>Fecha en que se realizó la transacción</p>
                                        </div>
                                        <div>
                                            <DatePicker
                                                selected={transactionDate || undefined}
                                                onChange={(date) => setTransactionDate(date || undefined)}
                                                className={`${styles.info} p-2 border rounded border-secundary`}
                                                placeholderText='Fecha de transacción'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-5 p-2 d-flex align-items-center justify-content-center  border rounded">
                                <div>
                                    <select
                                        className={`${styles.info} p-2 border rounded border-secundary`}
                                        onChange={handleCreditCashChange}
                                    >
                                        <option value='Contado'>Contado</option>
                                        <option value='Credito'>A cuotas</option>
                                    </select>
                                </div>
                            </div>

                            {creditCashOption === 'Contado' && (
                                <CashExpense
                                    token={token}
                                    selectedBranch={selectedBranch}
                                    defaultDates={defaultDates}
                                    registrationDate={registrationDate}
                                    transactionDate={transactionDate}
                                />
                            )}
                            {creditCashOption === 'Credito' && (
                                <CreditExpense
                                    token={token}
                                    selectedBranch={selectedBranch}
                                    defaultDates={defaultDates}
                                    registrationDate={registrationDate}
                                    transactionDate={transactionDate}
                                />
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ExpensesPage;