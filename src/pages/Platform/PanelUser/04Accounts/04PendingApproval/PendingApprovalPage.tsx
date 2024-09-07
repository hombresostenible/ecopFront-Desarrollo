/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback, useRef } from 'react';
import jsCookie from 'js-cookie';
import { format } from 'date-fns';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getIncomesNotApproved, getIncomesNotApprovedByBranch } from '../../../../../redux/User/accountsBookSlice/actions';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from '../../../../../types/User/accountsBook.types';
import ColumnSelector from '../../../../../helpers/ColumnSelector/ColumnSelector';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import NavBar from '../../../../../components/Platform/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../components/Platform/PanelUser/Footer/Footer';
import SeeRegisterAccountsBook from '../../../../../components/Platform/PanelUser/04Accounts/05PendingApproval/01SeeRegisterAccountsBook/SeeRegisterAccountsBook';
import ApprovalRegister from '../../../../../components/Platform/PanelUser/04Accounts/05PendingApproval/04ApprovalRegister/ApprovalRegister';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import styles from './styles.module.css';

function PendingApprovalPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const accountsBook = useSelector((state: RootState) => state.accountsBook.accountsBook);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getIncomesNotApproved(token));
        }
    }, [token]);

    const [selectedBranch, setSelectedBranch] = useState('');

    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                dispatch(getIncomesNotApprovedByBranch(selectedBranch, token));
            } else {
                dispatch(getIncomesNotApproved(token));
            }
        }
    }, [selectedBranch, token, dispatch]);

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [filteredTransactions, setFilteredTransactions] = useState<IAccountsBook[] | null>(null);

    const handleFilter = () => {
        if (!startDate || !endDate) {
            setFilteredTransactions(null);
            return;
        }
        if (accountsBook === null) return;
        const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
        const endDateForFilter = new Date(endDate);
        endDateForFilter.setDate(endDateForFilter.getDate() + 1);
        const formattedEndDate = format(endDateForFilter, 'yyyy-MM-dd');
        const filtered = Array.isArray(accountsBook)
            ? accountsBook.filter((accountsBook) => {
                const transactionDate = format(new Date(accountsBook.transactionDate), 'yyyy-MM-dd');
                return (
                    transactionDate >= formattedStartDate &&
                    transactionDate <= formattedEndDate &&
                    (!selectedBranch || accountsBook.branchId === selectedBranch)
                );
            }) : [];
        setFilteredTransactions(filtered);
    };

    const clearFilterDate = () => {
        setStartDate(null);
        setEndDate(null);
        setFilteredTransactions(null);
    };

    const menuColumnSelector = useRef<HTMLDivElement | null>(null);
    const [menuColumnSelectorVisible, setMenuColumnSelectorVisible] = useState(false);
    const handleColumnSelector = () => {
        setMenuColumnSelectorVisible(!menuColumnSelectorVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuColumnSelector.current && !menuColumnSelector.current.contains(event.target as Node)) {
                setMenuColumnSelectorVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuColumnSelector ]);

    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        'Fecha de transacción',
        'Sede',
        'Tipo de transacción',
        'Medio de pago',
        'Valor total',
        'Comprador',
    ]);

    const handleColumnChange = (column: string) => {
        const updatedColumns = selectedColumns.includes(column)
            ? selectedColumns.filter((col) => col !== column)
            : [...selectedColumns, column];
        setSelectedColumns(updatedColumns);
    };

    const [idRegisterAccount, setIdRegisterAccount] = useState('');
    const [selectedRegisterAccount, setSelectedRegisterAccount] = useState<IAccountsBook>();
    const [showSeeRegisterAccount, setShowSeeRegisterAccount] = useState(false);
    const [showApproval, setShowApproval] = useState(false);

    const handleSeeItem = useCallback((accountsBook: IAccountsBook) => {
        setSelectedRegisterAccount(accountsBook);
        setShowSeeRegisterAccount(true);
    }, []);

    const handleAddInventory = useCallback((accountsBook: IAccountsBook) => {
        setSelectedRegisterAccount(accountsBook);
        setShowApproval(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeRegisterAccount(false);
        setShowApproval(false);
    }, []);

    const branchesArray = Array.isArray(branches) ? branches : [];
    const transactionsToShow = filteredTransactions && filteredTransactions.length > 0 ? filteredTransactions : accountsBook;

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Transacciones pendientes de aprobar</h1>

                        <div className='d-flex align-items-center justify-content-between'>
                            <div className={`${styles.container__Filter_Branch} mb-4 d-flex align-items-center`}>
                                <h3 className='m-0'>Filtra por sede</h3>
                                <select
                                    className="mx-2 p-2 border rounded"
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                >
                                    <option value=''>Todas</option>
                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <input
                                    type="date"
                                    className={`${styles.input__Date} border p-1 text-secondary`}
                                    value={startDate || ''}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className={`${styles.input__Date} border p-1 text-secondary`}
                                    value={endDate || ''}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                <button className={`${styles.handle__Filter} border-0 text-decoration-none`} onClick={handleFilter}>Filtrar</button>
                                <button className={`${styles.clear__Filter} border-0 text-decoration-none`} onClick={clearFilterDate}>Borrar filtro de fechas</button>
                            </div>
                        </div>

                        <div className={`${styles.container__Services} mb-3 d-flex align-items-center justify-content-end position-relative`} >
                            <span className={`${styles.span__Menu} p-2`} onClick={handleColumnSelector}>Escoge las columnas que deseas ver</span>
                            {menuColumnSelectorVisible && (
                                <div ref={menuColumnSelector} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                                    <ColumnSelector
                                        selectedColumns={selectedColumns}
                                        onChange={handleColumnChange}
                                        minSelectedColumns={3}
                                        availableColumns={[
                                            'Fecha de transacción',
                                            'Sede',
                                            'Tipo de transacción',
                                            'Medio de pago',
                                            'Valor total',
                                            'Comprador',
                                        ]}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    {selectedColumns.includes('Fecha de transacción') && (
                                        <div className={`${styles.transaction__Date} text-center d-flex align-items-center justify-content-center`}>Fecha de TX</div>
                                    )}
                                    {selectedColumns.includes('Sede') && (
                                        <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>Sede</div>
                                    )}
                                    {selectedColumns.includes('Tipo de transacción') && (
                                        <div className={`${styles.transaction__Type} text-center d-flex align-items-center justify-content-center`}>Tipo de TX</div>
                                    )}
                                    {selectedColumns.includes('Medio de pago') && (
                                        <div className={`${styles.mean__Payment} text-center d-flex align-items-center justify-content-center`}>Medio de pago</div>
                                    )}
                                    {selectedColumns.includes('Valor total') && (
                                        <div className={`${styles.total__Value} text-center d-flex align-items-center justify-content-center`}>Total</div>
                                    )}
                                    {selectedColumns.includes('Comprador') && (
                                        <div className={`${styles.transaction__Counterpart} text-center d-flex align-items-center justify-content-center`}>Comprador</div>
                                    )}
                                    <div className={`${styles.transaction__Approved} text-center d-flex align-items-center justify-content-center`}>Aprobada</div>
                                    <div className={`${styles.action} text-center d-flex align-items-center justify-content-center`}>Acciones</div>
                                </div>
                            </div>

                            <div className={styles.container__Body}>
                                {Array.isArray(transactionsToShow) && transactionsToShow.length > 0 ? (
                                    transactionsToShow.map((accountsBook) => (
                                        <div key={accountsBook.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            {selectedColumns.includes('Fecha de transacción') && (
                                                <div className={`${styles.transaction__Date} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{new Date(accountsBook.transactionDate).toLocaleDateString('en-GB')}</span>
                                                </div>
                                            )}
                                            {selectedColumns.includes('Sede') && (
                                                <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                    <span>
                                                        {Array.isArray(branches) && branches.map((branch, index) => (
                                                            accountsBook.branchId === branch.id && (
                                                                <span className={`${styles.text__Ellipsis} overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                            )
                                                        ))}
                                                    </span>
                                                </div>
                                            )}
                                            {selectedColumns.includes('Tipo de transacción') && (
                                                <div className={`${styles.transaction__Type} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsBook.transactionType}</span>
                                                </div>
                                            )}
                                            {selectedColumns.includes('Medio de pago') && (
                                                <div className={`${styles.mean__Payment} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsBook.creditCash}</span>
                                                </div>
                                            )}
                                            {selectedColumns.includes('Valor total') && (
                                                <div className={`${styles.total__Value} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsBook.totalValue? `$ ${formatNumber(accountsBook.totalValue)}` : 'N/A'}</span>
                                                </div>
                                            )}
                                            {selectedColumns.includes('Comprador') && (
                                                <div className={`${styles.transaction__Counterpart} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsBook.transactionCounterpartId}</span>
                                                </div>
                                            )}
                                            <div className={`${styles.transaction__Approved} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsBook.transactionApproved === true ? 'Si' : 'No'}</span>
                                            </div>

                                            <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Action} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRegisterAccount(accountsBook.id);
                                                            handleSeeItem(accountsBook);
                                                        }}
                                                    />
                                                </div>

                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <FaCheck
                                                        className={`${styles.button__Action} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRegisterAccount(accountsBook.id);
                                                            handleAddInventory(accountsBook)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                        No tienes transacciones pendientes de aprobar
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <Modal show={showSeeRegisterAccount} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Registro</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedRegisterAccount &&
                                    <SeeRegisterAccountsBook
                                        accountsBook={selectedRegisterAccount}
                                        branches={branchesArray}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showApproval} onHide={() => setShowApproval(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Aprobación de registros</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ApprovalRegister
                                    token={token}
                                    idItem={idRegisterAccount}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default PendingApprovalPage;