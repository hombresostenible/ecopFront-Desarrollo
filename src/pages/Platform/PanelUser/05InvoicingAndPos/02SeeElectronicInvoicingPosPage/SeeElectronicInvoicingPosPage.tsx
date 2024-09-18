/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import jsCookie from 'js-cookie';
import { format } from 'date-fns';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAccountsBooksApproved, getAccountsBooksApprovedByBranch } from '../../../../../redux/User/04AccountsSlice/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from '../../../../../types/User/accountsBook.types';
import ColumnSelector from '../../../../../helpers/ColumnSelector/ColumnSelector';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import NavBar from '../../../../../components/Platform/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../components/Platform/PanelUser/Footer/Footer';
import { BsCloudDownload } from "react-icons/bs";
import { FaPrint } from "react-icons/fa";
import styles from './styles.module.css';

function SeeElectronicInvoicingPosPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const accountsBook = useSelector((state: RootState) => state.accountsBook.accountsBook);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getAccountsBooksApproved(token));
        }
    }, [token]);

    const [selectedBranch, setSelectedBranch] = useState('');

    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                dispatch(getAccountsBooksApprovedByBranch(selectedBranch, token));
            } else {
                dispatch(getAccountsBooksApproved(token));
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
        'Emisión',
        'Vencimiento',
        'Sede',
        'Comprador',
        'Valor total',
        'Estado Dian',
        'Estado',
    ]);

    const handleColumnChange = (column: string) => {
        const updatedColumns = selectedColumns.includes(column)
            ? selectedColumns.filter((col) => col !== column)
            : [...selectedColumns, column];
        setSelectedColumns(updatedColumns);
    };

    const transactionsToShow = filteredTransactions && filteredTransactions.length > 0 ? filteredTransactions : accountsBook;

    // Función para manejar la impresión
    const handlePrint = () => {
        window.print();
    };

    // Función para manejar la descarga del PDF
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'https://www.uaeh.edu.mx/investigacion/productos/4774/ecologia.pdf';
        link.download = 'ecologia.pdf';
        link.target = '_blank';                 // Abrir en una nueva pestaña
        link.rel = 'noopener noreferrer';       // Añadir noreferrer y noopener
        link.click();
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Gestión de Facturas y POS</h1>
                        <p>Poner la funcionalidad de convertir un POS a Factua electrónica y viceverza</p>

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
                                            'Emisión',
                                            'Vencimiento',
                                            'Sede',
                                            'Comprador',
                                            'Valor total',
                                            'Estado Dian',
                                            'Estado',
                                        ]}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    {selectedColumns.includes('Emisión') && (
                                        <div className={`${styles.issue__Date} text-center d-flex align-items-center justify-content-center`}>Emisión</div>
                                    )}
                                    {selectedColumns.includes('Vencimiento') && (
                                        <div className={`${styles.expiration__Date} text-center d-flex align-items-center justify-content-center`}>Vencimiento</div>
                                    )}
                                    {selectedColumns.includes('Sede') && (
                                        <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>Sede</div>
                                    )}
                                    {selectedColumns.includes('Comprador') && (
                                        <div className={`${styles.transaction__Counterpart} text-center d-flex align-items-center justify-content-center`}>Comprador</div>
                                    )}
                                    {selectedColumns.includes('Valor total') && (
                                        <div className={`${styles.total__Value} text-center d-flex align-items-center justify-content-center`}>Total</div>
                                    )}
                                    {selectedColumns.includes('Estado Dian') && (
                                        <div className={`${styles.dian__State} text-center d-flex align-items-center justify-content-center`}>Estado Dian</div>
                                    )}
                                    {selectedColumns.includes('Estado') && (
                                        <div className={`${styles.state} text-center d-flex align-items-center justify-content-center`}>Estado</div>
                                    )}
                                    <div className={`${styles.action} text-center d-flex align-items-center justify-content-center`}>Acciones</div>
                                </div>
                            </div>

                            <div className={styles.container__Body}>
                                {Array.isArray(transactionsToShow) && transactionsToShow.length > 0 ? (
                                    transactionsToShow.map((accountsBook) => (
                                        <div key={accountsBook.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            {selectedColumns.includes('Emisión') && (
                                                <div className={`${styles.issue__Date} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{new Date(accountsBook.transactionDate).toLocaleDateString('en-GB')}</span>
                                                </div>
                                            )}
                                            {selectedColumns.includes('Vencimiento') && (
                                                <div className={`${styles.expiration__Date} d-flex align-items-center justify-content-center`}>
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
                                            {selectedColumns.includes('Comprador') && (
                                                <div className={`${styles.transaction__Counterpart} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsBook.transactionCounterpartId}</span>
                                                </div>
                                            )}
                                            {selectedColumns.includes('Valor total') && (
                                                <div className={`${styles.total__Value} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsBook.totalValue? `$ ${formatNumber(accountsBook.totalValue)}` : 'N/A'}</span>
                                                </div>
                                            )}
                                            {selectedColumns.includes('Estado Dian') && (
                                                <div className={`${styles.dian__State} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>Pendiente</span>
                                                </div>
                                            )}
                                            {selectedColumns.includes('Estado') && (
                                                <div className={`${styles.state} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>Pendiente</span>
                                                </div>
                                            )}
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div
                                                    className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}
                                                    onClick={handlePrint}
                                                >
                                                    <FaPrint
                                                        className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                    />
                                                </div>
                                                <div
                                                    className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}
                                                    onClick={handleDownload}
                                                >
                                                    <BsCloudDownload
                                                        className={`${styles.button__Action} d-flex align-items-center justify-content-center`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                        No tienes transacciones registradas
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default SeeElectronicInvoicingPosPage;