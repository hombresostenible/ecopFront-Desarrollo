/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { format } from 'date-fns';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsBooksIncomes, putAccountsBook, deleteAccountsBook } from '../../../../../../redux/User/accountsBookSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from '../../../../../../types/User/accountsBook.types';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import ColumnSelector from '../../../../../../helpers/ColumnSelector/ColumnSelector';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

function ConsultIncomePage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const accountsBooks = useSelector((state: RootState) => state.accountsBook.accountsBook);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [editingTransactions, setEditingTransactions] = useState<Record<string, any>>({});
    const [isSaving, setIsSaving] = useState(false);

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [filteredTransactions, setFilteredTransactions] = useState<IAccountsBook[] | null>(null);

    const [selectedBranch, setSelectedBranch] = useState('');
    
    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getAccountsBooksIncomes(token));
        }
    }, [token]);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, 
        accountsBook: IAccountsBook,
        field: string
    ) => {
        const newValue = e.target.value;
        setEditingTransactions((prevEditingTransactions) => ({
            ...prevEditingTransactions,
            [accountsBook.id]: { ...prevEditingTransactions[accountsBook.id], [field]: newValue },
        }));
    };

    const handleSaveChanges = async (accountsBook: IAccountsBook) => {
        try {
            setIsSaving(true);
            const updatedTransaction = {
                ...editingTransactions[accountsBook.id],
                unitValue: parseFloat(editingTransactions[accountsBook.id].unitValue),
                quantity: parseFloat(editingTransactions[accountsBook.id].quantity),
                totalValue: parseFloat(editingTransactions[accountsBook.id].totalValue),
                numberOfPayments: parseFloat(editingTransactions[accountsBook.id].numberOfPayments),
                paymentValue: parseFloat(editingTransactions[accountsBook.id].paymentValue),
                iDTransactionCounterpart: parseFloat(editingTransactions[accountsBook.id].iDTransactionCounterpart),
            };
            await dispatch(putAccountsBook(accountsBook.id, updatedTransaction, token));
            delete editingTransactions[accountsBook.id];
            dispatch(getAccountsBooksIncomes(token));
        } catch (error) {
            throw new Error('Error al guardar cambios');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = (idAccountsBook: string) => {
        try {
            dispatch(deleteAccountsBook(idAccountsBook, token));
            dispatch(getAccountsBooksIncomes(token));
        } catch (error) {
            throw new Error('Error al eliminar el registro');
        }
    };

    const handleFilter = () => {
        if (!startDate || !endDate) {
            setFilteredTransactions(null);
            return;
        }    
        if (accountsBooks === null) return;    
        const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
        const endDateForFilter = new Date(endDate);
        endDateForFilter.setDate(endDateForFilter.getDate() + 1);
        const formattedEndDate = format(endDateForFilter, 'yyyy-MM-dd');    
        const filtered = Array.isArray(accountsBooks)
            ? accountsBooks.filter((accountsBook) => {
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

    const clearFilterBranch = () => {
        setSelectedBranch('');
    };

    const clearFilterAll = () => {
        setStartDate(null);
        setEndDate(null);
        setFilteredTransactions(null);
        setSelectedBranch('');
    };

    const transactionsToDisplay = filteredTransactions !== null ? filteredTransactions : accountsBooks;
    const [sortedTransactions, setSortedTransactions] = useState<IAccountsBook[]>([]);

    useEffect(() => {
        if (Array.isArray(transactionsToDisplay)) {
            const sorted = [...transactionsToDisplay].sort((a, b) => {
                const dateA = a ? new Date(a.registrationDate) : null;
                const dateB = b ? new Date(b.registrationDate) : null;
                if (dateA && dateB) {
                    return dateB.getTime() - dateA.getTime();
                } else if (dateA) {
                    return -1;
                } else if (dateB) {
                    return 1;
                } else {
                    return 0;
                }
            });
            setSortedTransactions(sorted);
        }
    }, [transactionsToDisplay]);

    const cancelEditing = (accountsBookId: string) => {
        setEditingTransactions((prevEditingTransactions) => {
            const updatedTransactions = { ...prevEditingTransactions };
            delete updatedTransactions[accountsBookId];
            return updatedTransactions;
        });
    };

    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        'transactionDate',
        'registrationDate',
        'branch',
        'transactionType',
        'meanPayment',
        'incomeCategory',
        'nameItem',
        'unitValue',
        'quantity',
        'totalValue',
        'creditCash',
        'transactionCounterpartId',
        'seller',
    ]);

    const handleColumnChange = (column: string) => {
        const updatedColumns = selectedColumns.includes(column)
            ? selectedColumns.filter((col) => col !== column)
            : [...selectedColumns, column];
        setSelectedColumns(updatedColumns);
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                    <h1 className={`${styles.title} mb-4 mt-4`}>Registros de cuentas</h1>

                        <Link to='/accounts/create-incomes' className={styles.ddddddd}>Crea tus ingresos</Link>
                        <div className="mb-4 p-4 d-flex align-items-center justify-content-between border rounded">
                            <button className={`${styles.buttonClearFilterAll} border-0 text-decoration-none`} onClick={clearFilterAll}>Borrar todos los Filtros</button>
                            <div>
                                <input
                                    type="date"
                                    className={`${styles.inputDate} border p-1 text-secondary`}
                                    value={startDate || ''}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className={`${styles.inputDate} border p-1 text-secondary`}
                                    value={endDate || ''}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                <button className={`${styles.handleFilter} border-0 text-decoration-none`} onClick={handleFilter}>Filtrar</button>
                                <button className={`${styles.clearFilter} border-0 text-decoration-none`} onClick={clearFilterDate}>Borrar Filtro de fechas</button>
                            </div>
                        </div>

                        <div className={`${styles.branch} m-auto p-3 border`}>
                            <h4 className={`${styles.h4} text-center`}>Filtra por sede</h4>
                            <div className="d-flex justify-content-between ">
                                <select
                                    className="border-0 p-1 text-center"
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                >
                                    <option value=''>Selecciona una Sede</option>
                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                                <button className={`${styles.clearFilter} border-0 text-decoration-none`} onClick={clearFilterBranch}>Borrar Filtro de sedes</button>
                            </div>
                        </div>

                        <div className="mb-4 mt-4 p-4 border rounded d-flex justify-content-end align-items-center">
                            <Link to='/accounts/consult-incomes' className={styles.ddddddd}>Ver tus Ingresos</Link>
                            <Link to='/accounts/consult-expenses' className={styles.ddddddd}>Ver tus Gastos</Link>
                            <Link to='/accounts/consult-account-receivable' className={styles.ddddddd}>Ver tus Cuentas por cobrar</Link>
                            <Link to='/accounts/consult-accounts-payable' className={styles.ddddddd}>Ver tus Cuentas por Pagar</Link>
                            <ColumnSelector
                                selectedColumns={selectedColumns}
                                onChange={handleColumnChange}
                                minSelectedColumns={3}
                                availableColumns={[
                                    'transactionDate',
                                    'registrationDate',
                                    'branch',
                                    'transactionType',
                                    'meanPayment',
                                    'incomeCategory',
                                    'nameItem',
                                    'unitValue',
                                    'quantity',
                                    'totalValue',
                                    'creditCash',
                                    'transactionCounterpartId',
                                    'seller',
                                ]}
                            />
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                        {Array.isArray(sortedTransactions) && sortedTransactions.length > 0 ? (
                            <div>
                                <div className={styles.container__Head}>
                                    <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                        {selectedColumns.includes('transactionDate') && (
                                            <div className={`${styles.column__Transaction_Date} text-center d-flex align-items-center justify-content-center`}>Fecha de TX</div>
                                        )}
                                        {selectedColumns.includes('registrationDate') && (
                                            <div className={`${styles.column__Registration_Date} d-flex align-items-center justify-content-center`}>Fecha de Registro</div>
                                        )}
                                        {selectedColumns.includes('branch') && (
                                            <div className={`${styles.column__Branch} d-flex align-items-center justify-content-center`}>Sede</div>
                                        )}
                                        {selectedColumns.includes('transactionType') && (
                                            <div className={`${styles.column__Transaction_Type} d-flex align-items-center justify-content-center`}>Tipo de TX</div>
                                        )}
                                        {selectedColumns.includes('meanPayment') && (
                                            <div className={`${styles.column__Mean_Payment} d-flex align-items-center justify-content-center`}>Medio de pago</div>
                                        )}
                                        {selectedColumns.includes('incomeCategory') && (
                                            <div className={`${styles.column__Income_Category} d-flex align-items-center justify-content-center`}>Categoría</div>
                                        )}
                                        {selectedColumns.includes('nameItem') && (
                                            <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-center`}>Nombre de Item</div>
                                        )}
                                        {selectedColumns.includes('unitValue') && (
                                            <div className={`${styles.column__Unit_Value} d-flex align-items-center justify-content-center`}>Valor unitario</div>
                                        )}
                                        {selectedColumns.includes('quantity') && (
                                            <div className={`${styles.column__Quantity} d-flex align-items-center justify-content-center`}>Cantidad</div>
                                        )}
                                        {selectedColumns.includes('totalValue') && (
                                            <div className={`${styles.column__Total_Value} d-flex align-items-center justify-content-center`}>Total</div>
                                        )}
                                        {selectedColumns.includes('creditCash') && (
                                            <div className={`${styles.column__Credit_Cash} d-flex align-items-center justify-content-center`}>Tipo de pago</div>
                                        )}
                                        {selectedColumns.includes('transactionCounterpartId') && (
                                            <div className={`${styles.column__Transaction_Counterpart} d-flex align-items-center justify-content-center`}>Comprador</div>
                                        )}
                                        {selectedColumns.includes('seller') && (
                                            <div className={`${styles.column__Seller} d-flex align-items-center justify-content-center`}>Vendedor</div>
                                        )}
                                        <div className={`${styles.column__Transaction_Approved} d-flex align-items-center justify-content-center`}>Aprobada</div>
                                        <div className={`${styles.column__Action} d-flex align-items-center justify-content-center`}>Acciones</div>
                                    </div>
                                </div>

                                <div className={`${styles.container__Body} d-flex flex-column align-items-center justify-content-between`}>
                                {Array.isArray(accountsBooks) && accountsBooks.map((accountsBook) => (
                                    <div key={accountsBook.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                        {selectedColumns.includes('transactionDate') && (
                                            <div className={`${styles.column__Transaction_Date} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <input
                                                        className={`${styles.text__Ellipsis} overflow-hidden`}
                                                        type="date"
                                                        value={editingTransactions[accountsBook.id].transactionDate}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'transactionDate')}
                                                    />
                                                ) : (
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{new Date(accountsBook.transactionDate).toLocaleDateString('en-GB')}</span>
                                                )}
                                            </div>
                                        )}

                                        {selectedColumns.includes('registrationDate') && (
                                            <div className={`${styles.column__Registration_Date} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <input
                                                        type="date"
                                                        value={editingTransactions[accountsBook.id].registrationDate}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'registrationDate')}
                                                    />
                                                ) : (
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{new Date(accountsBook.registrationDate).toLocaleDateString('en-GB')}</span>
                                                )}
                                            </div>
                                        )}

                                        {selectedColumns.includes('branch') && (
                                            <div className={`${styles.column__Branch} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <select
                                                        value={editingTransactions[accountsBook.id].branchId}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'branchId')}
                                                    >
                                                        {Array.isArray(branches) && branches.map((branch, index) => (
                                                            <option key={index} value={branch.id}>
                                                                {branch.nameBranch}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span>
                                                        {Array.isArray(branches) && branches.map((branch, index) => (
                                                            accountsBook.branchId === branch.id && (
                                                                <span className={`${styles.text__Ellipsis} text-center overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                            )
                                                        ))}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {selectedColumns.includes('transactionType') && (
                                            <div className={`${styles.column__Transaction_Type} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <select
                                                        value={editingTransactions[accountsBook.id].transactionType}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'transactionType')}
                                                    >
                                                        <option value='Venta'>Venta</option>
                                                        <option value='Gasto'>Gasto</option>
                                                    </select>
                                                ) : (
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.transactionType}</span>
                                                )}
                                            </div>
                                        )}

                                        {selectedColumns.includes('meanPayment') && (
                                            <div className={`${styles.column__Mean_Payment} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <select
                                                        value={editingTransactions[accountsBook.id].creditCash}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'creditCash')}
                                                    >
                                                        <option value='Contado'>Contado</option>
                                                        <option value='Credito'>Crédito</option>
                                                    </select>
                                                ) : (
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.creditCash}</span>
                                                )}
                                            </div>
                                        )}

                                        {selectedColumns.includes('incomeCategory') && (
                                            <div className={`${styles.column__Income_Category} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.incomeCategory}</span>
                                            </div>
                                        )}

                                        {selectedColumns.includes('nameItem') && (
                                            <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.nameItem}</span>
                                            </div>
                                        )}

                                        {selectedColumns.includes('unitValue') && (
                                            <div className={`${styles.column__Unit_Value} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <input
                                                        type="number"
                                                        value={editingTransactions[accountsBook.id].unitValue}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'unitValue')}
                                                    />
                                                ) : (
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>$ {accountsBook.unitValue? formatNumber(accountsBook.unitValue) : 'N/A'}</span>
                                                )}
                                            </div>
                                        )}

                                        {selectedColumns.includes('quantity') && (
                                            <div className={`${styles.column__Quantity} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <input
                                                        type="number"
                                                        value={editingTransactions[accountsBook.id].quantity}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'quantity')}
                                                    />
                                                ) : (
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.quantity? formatNumber(accountsBook.quantity) : 'N/A'}</span>
                                                )}
                                            </div>
                                        )}

                                        {selectedColumns.includes('totalValue') && (
                                            <div className={`${styles.column__Total_Value} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <input
                                                        type="number"
                                                        value={editingTransactions[accountsBook.id].totalValue}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'totalValue')}
                                                    />
                                                ) : (
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.totalValue? `$ ${formatNumber(accountsBook.totalValue)}` : 'N/A'}</span>
                                                )}
                                            </div>
                                        )}

                                        {selectedColumns.includes('creditCash') && (
                                            <div className={`${styles.column__Credit_Cash} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <input
                                                        type="number"
                                                        value={editingTransactions[accountsBook.id].creditCash}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'creditCash')}
                                                    />
                                                ) : (
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.creditCash}</span>
                                                )}
                                            </div>
                                        )}

                                        {selectedColumns.includes('transactionCounterpartId') && (
                                            <div className={`${styles.column__Transaction_Counterpart} d-flex align-items-center justify-content-center`}>
                                                {editingTransactions[accountsBook.id] ? (
                                                    <input
                                                        type="number"
                                                        value={editingTransactions[accountsBook.id].totalValue}
                                                        onChange={(e) => handleEditField(e, accountsBook, 'transactionCounterpartId')}
                                                    />
                                                ) : (
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.transactionCounterpartId}</span>
                                                )}
                                            </div>
                                        )}

                                        <div className={`${styles.column__Seller} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.seller}</span>
                                        </div>

                                        <div className={`${styles.column__Transaction_Approved} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} text-center text-center overflow-hidden`}>{accountsBook.transactionApproved === true ? 'Si' : 'No'}</span>
                                        </div>

                                        <div className={`${styles.column__Action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <RiDeleteBin6Line
                                                className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    handleDelete(accountsBook.id);
                                                }}
                                            />
                                            {editingTransactions[accountsBook.id] ? (
                                                <div>
                                                    <button className="btn btn-primary" onClick={() => handleSaveChanges(accountsBook)}>Guardar</button>
                                                    <button className="btn btn-secondary" onClick={() => cancelEditing(accountsBook.id)}>Cancelar</button>
                                                </div>
                                            ) : (
                                                <BsPencil
                                                    className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                    onClick={() => {
                                                        setEditingTransactions({
                                                            ...editingTransactions,
                                                            [accountsBook.id]: { ...accountsBook }
                                                        });
                                                    }}
                                                />
                                            )}

                                        </div>
                                    </div>
                                ))}
                            </div>
                            </div>
                        ): (
                            !isSaving && (
                                <div className="text-center">
                                    <h3>No hay transacciones disponibles.</h3>
                                </div>
                            )
                        )}

                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ConsultIncomePage;