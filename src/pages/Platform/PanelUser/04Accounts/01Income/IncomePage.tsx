/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import Cash from '../../../../../components/Platform/04Accounts/01Income/Cash/Cash';
import Credit from '../../../../../components/Platform/04Accounts/01Income/Credit/Credit';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function IncomePage () {
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

    //Setea si el Gasto o la Venta fue a Contado o a Crédito
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
                        <div className="col-md-9 col-12 p-3 pb-6 border rounded mt-4 m-auto">
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
                                    {/* <div className="px-3">
                                        <p className={`${styles.text} mb-0 p-2`}>¿Tu {tipeTransaction === 'Ingreso' ? 'venta o ingreso' : 'gasto'} fue a contado o a cuotas?</p>
                                    </div> */}
                                    <div>
                                        <select
                                            className={`${styles.info} p-2 border rounded border-secundary`}
                                            onChange={handleCreditCashChange}
                                        >
                                            <option value='Contado'>Contado</option>
                                            <option value='Crédito'>A cuotas</option>
                                        </select>
                                    </div>
                                </div>

                                {creditCashOption === 'Contado' && (
                                    <Cash
                                        token={token}
                                        selectedBranch={selectedBranch}
                                        defaultDates={defaultDates}
                                        registrationDate={registrationDate}
                                        transactionDate={transactionDate}
                                    />
                                )}
                                {creditCashOption === 'Crédito' && (
                                    <Credit
                                        selectedBranch={selectedBranch}
                                        defaultDates={defaultDates}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default IncomePage;
// import Cash from '../../../../../components/Platform/04Accounts/01Income/Cash/BuyOnCash';
// import Credit from '../../../../../components/Platform/04Accounts/01Income/Credit/BuyOnCredit';
// import NavBar from '../../../../../components/Platform/NavBar/NavBar';
// import SideBar from '../../../../../components/Platform/SideBar/SideBar';
// import Footer from '../../../../../components/Platform/Footer/Footer';
// import styles from './styles.module.css';

// interface SellProps {
//     selectedBranch: string;
//     defaultDates: boolean;
//     registrationDate: Date | undefined;
//     transactionDate: Date | undefined;
//     creditCashOption: string;
//     onCreateComplete: () => void;
// }


// function IncomePage({ selectedBranch, defaultDates, registrationDate, transactionDate, creditCashOption, onCreateComplete }: SellProps) {
//     // Utiliza una variable para determinar qué componente se debe renderizar
//     const componentToRender = creditCashOption === 'Contado' ?
//         <Cash
//             selectedBranch={selectedBranch}
//             defaultDates={defaultDates}
//             registrationDate={registrationDate}
//             transactionDate={transactionDate}
//             onCreateComplete={onCreateComplete}
//         /> 
//         :
//         creditCashOption === 'Crédito' ?
//         <Credit
//             selectedBranch={selectedBranch}
//             defaultDates={defaultDates}
//             onCreateComplete={onCreateComplete}
//         /> : null;
        
//     return (
//         <div className='d-flex flex-column'>
//             <NavBar />
//             <div className='d-flex'>
//                 <SideBar />
//                 <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
//                     <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
//                         {componentToRender}
//                     </div>
//                     <Footer />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default IncomePage;

// import { useState, useEffect, SetStateAction } from 'react';
// import Cookies from 'js-cookie';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


// import { useBranches } from '../../context/BranchContext';
// import Sell from '../../components/07 AccountsBook/Sell/Sell';
// import Buy from '../../components/07 AccountsBook/Buy/Buy';
// import Pay from '../../components/07 AccountsBook/Pay/Pay';
// import Obligation from '../../components/07 AccountsBook/Obligation/Obligation';



// import NavBar from '../../../../../components/Platform/NavBar/NavBar';
// import SideBar from '../../../../../components/Platform/SideBar/SideBar';
// import Footer from '../../../../../components/Platform/Footer/Footer';
// import styles from './styles.module.css';

// interface CreateAccountsBookProps {
//     onCreateComplete: () => void;
// }

// function IncomePage ({ onCreateComplete }: CreateAccountsBookProps) {
//     const token = Cookies.get("token") || '';
//     const { branches, getBranches } = useBranches();

//     const [ selectedBranch, setSelectedBranch ] = useState('');

//     useEffect(() => {
//         getBranches(token);
//     }, [ token ]);

//     //Cambio de la sede
//     const handleBranchChange = (e: any) => {
//         const selectedId = e.target.value;
//         setSelectedBranch(selectedId);
//     };

//     //Fechas de registrationDate y transactionDate con el checkout
//     const [ checkDatesRegisterTx, setCheckDatesRegisterTx ] = useState(true);
//     const [ registrationDate, setRegistrationDate ] = useState<Date | undefined>(undefined);
//     const [ transactionDate, setTransactionDate ] = useState<Date | undefined>(undefined);
//     const [ defaultDates, setDefaultDates ] = useState<boolean>(true);

//     //Es el check para las fechas de registro y de transacción
//     const handleCheckDatesRegisterTx = () => {
//         setCheckDatesRegisterTx((prevCheckDatesRegisterTx) => !prevCheckDatesRegisterTx);
//         // Si el checkbox está seleccionado, establecer las fechas por defecto
//         if (!checkDatesRegisterTx) {
//             const currentDate = new Date();
//             setRegistrationDate(currentDate);
//             setTransactionDate(currentDate);
//             setDefaultDates(true);
//         } else {
//             // Si el checkbox no está seleccionado, permitir que el usuario seleccione manualmente
//             setRegistrationDate(undefined);
//             setTransactionDate(undefined);
//             setDefaultDates(false);
//         }
//     };

//     //Setea si se hace un Gasto o un Ingreso
//     const [ tipeTransaction, setTipeTransaction ] = useState('Ingreso');
//     const handleSellingBuyingOption = (value: 'Ingreso' | 'Gasto' | 'Pago' | 'Obligación') => {
//         setTipeTransaction(value);
//     };

//     //Setea si el Gasto o la Venta fue a Contado o a Crédito
//     const [ creditCashOption, setCreditCashOption ] = useState('Contado');
//     const handleCreditCashChange = (event: { target: { value: SetStateAction<string> }}) => {
//         setCreditCashOption(event.target.value);
//     };
    

//     return (
//         <div className="d-flex w-100">
//             <SideBar />
//             <div>
//                 <NavBar />
//                 <div className={`${styles.container} w-100 overflow-hidden overflow-y-auto`}>
//                     <div className="m-auto">
//                         <div className="col-md-9 col-12 p-3 pb-6 border rounded mt-4 m-auto">
//                             <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                                 <div className="px-3">
//                                     <p className={`${styles.text} mb-0 p-2`}>Selecciona una Sede</p>
//                                 </div>
//                                 <div>
//                                     <select
//                                         className={`${styles.info} p-2 border rounded border-secundary`}
//                                         onChange={handleBranchChange}
//                                     >
//                                         <option value=''>Selecciona una Sede</option>
//                                         {branches && branches.map((branch, index) => (
//                                             <option key={index} value={branch.id}>
//                                                 {branch.nameBranch}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                                 <div className="px-3">
//                                     <p className={`${styles.text} mb-0 p-2`}>Selecciona el check si la fecha de registro es la fecha de la transacción</p>
//                                 </div>
//                                 <div>
//                                     <input
//                                         type="checkbox"
//                                         onChange={handleCheckDatesRegisterTx}
//                                         className={`${styles.checkbox} border`}
//                                         defaultChecked={true}
//                                     />
//                                 </div>
//                             </div>
//                             {checkDatesRegisterTx === false && (
//                                 <div>
//                                     <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                                         <div className="px-3">
//                                             <p className={`${styles.text} mb-0 p-2`}>Fecha de registro de la información</p>
//                                         </div>
//                                         <div>
//                                             <DatePicker
//                                                 selected={registrationDate || undefined}
//                                                 onChange={(date) => setRegistrationDate(date || undefined)}
//                                                 className={`${styles.info} p-2 border rounded border-secundary`}
//                                                 placeholderText='Fecha de registro'
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                                         <div className="px-3">
//                                             <p className={`${styles.text} mb-0 p-2`}>Fecha en que se realizó la transacción</p>
//                                         </div>
//                                         <div>
//                                             <DatePicker
//                                                 selected={transactionDate || undefined}
//                                                 onChange={(date) => setTransactionDate(date || undefined)}
//                                                 className={`${styles.info} p-2 border rounded border-secundary`}
//                                                 placeholderText='Fecha de transacción'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             <div className="mb-3 p-2 d-flex flex-column justify-content-center align-items-center border rounded">
//                                 <div className="px-3">
//                                     <p className="mb-0 p-2">¿Qué vas a registrar?</p>
//                                 </div>
//                                 <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center w-100`}>
//                                     <div
//                                         className={`${styles.conditionOption} ${tipeTransaction === 'Ingreso' ? styles.selected : ''} rounded m-1 p-2 text-center`}
//                                         onClick={() => handleSellingBuyingOption('Ingreso')}
//                                     >
//                                         Nueva Venta
//                                     </div>
//                                     <div
//                                         className={`${styles.conditionOption} ${tipeTransaction === 'Gasto' ? styles.selected : ''} rounded m-1 p-2 text-center`}
//                                         onClick={() => handleSellingBuyingOption('Gasto')}
//                                     >
//                                         Nuevo Gastos
//                                     </div>
//                                     <div
//                                         className={`${styles.conditionOption} ${tipeTransaction === 'Pago' ? styles.selected : ''} rounded m-1 p-2 text-center`}
//                                         onClick={() => handleSellingBuyingOption('Pago')}
//                                     >
//                                         Cuentas por cobrar
//                                     </div>
//                                     <div
//                                         className={`${styles.conditionOption} ${tipeTransaction === 'Obligación' ? styles.selected : ''} rounded m-1 p-2 text-center`}
//                                         onClick={() => handleSellingBuyingOption('Obligación')}
//                                     >
//                                         Cuentas por pagar
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mb-5 p-2 d-flex align-items-center justify-content-center  border rounded">
//                                 <div className="px-3">
//                                     <p className={`${styles.text} mb-0 p-2`}>¿Tu {tipeTransaction === 'Ingreso' ? 'venta o ingreso' : 'gasto'} fue a contado o a cuotas?</p>
//                                 </div>
//                                 <div>
//                                     <select
//                                         className={`${styles.info} p-2 border rounded border-secundary`}
//                                         onChange={handleCreditCashChange}
//                                     >
//                                         <option value='Contado'>Contado</option>
//                                         <option value='Crédito'>A cuotas</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             {tipeTransaction === 'Ingreso' && (
//                                 <Sell
//                                     selectedBranch={selectedBranch}
//                                     defaultDates={defaultDates}
//                                     registrationDate={registrationDate}
//                                     transactionDate={transactionDate}
//                                     creditCashOption={creditCashOption}
//                                     onCreateComplete={onCreateComplete}
//                                 />
//                             )}
//                             {tipeTransaction === 'Gasto' && (
//                                 <Buy
//                                     selectedBranch={selectedBranch}
//                                     defaultDates={defaultDates}
//                                     registrationDate={registrationDate}
//                                     transactionDate={transactionDate}
//                                     creditCashOption={creditCashOption}
//                                     onCreateComplete={onCreateComplete}
//                                 />
//                             )}
//                             {tipeTransaction === 'Pago' && (
//                                 <Pay
//                                     selectedBranch={selectedBranch}
//                                     defaultDates={defaultDates}
//                                     // registrationDate={registrationDate}
//                                     // transactionDate={transactionDate}
//                                     onCreateComplete={onCreateComplete}
//                                 />
//                             )}
//                             {tipeTransaction === 'Obligación' && (
//                                 <Obligation
//                                     selectedBranch={selectedBranch}
//                                     defaultDates={defaultDates}
//                                     // registrationDate={registrationDate}
//                                     // transactionDate={transactionDate}
//                                     // onCreateComplete={onCreateComplete}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         </div>
//     );
// }

// export default IncomePage;