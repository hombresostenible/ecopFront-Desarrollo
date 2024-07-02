/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback } from 'react';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getIncomesNotApproved, getIncomesNotApprovedByBranch } from '../../../../../redux/User/accountsBookSlice/actions';
import { getBranches } from '../../../../..//redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from '../../../../../types/User/accountsBook.types';
import ColumnSelector from '../../../../../helpers/ColumnSelector/ColumnSelector';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import SeeRegisterPendingApproval from '../../../../../components/Platform/04Accounts/05PendingApproval/01SeeRegisterPendingApproval/SeeRegisterPendingApproval';
import ConfirmDeleteRegister from '../../../../../components/Platform/ConfirmDeleteRegister/ConfirmDeleteRegister';
import ModalEdit from '../../../../../components/Platform/04Accounts/05PendingApproval/03ModalEdit/ModalEdit';
import ApprovalRegister from '../../../../../components/Platform/04Accounts/05PendingApproval/04ApprovalRegister/ApprovalRegister';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
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

    const [idRegisterAccount, setIdRegisterAccount] = useState('');
    const [selectedRegisterAccount, setSelectedRegisterAccount] = useState<IAccountsBook>();
    const [showSeeRegisterAccount, setShowSeeRegisterAccount] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showApproval, setShowApproval] = useState(false);

    const handleSeeItem = useCallback((accountsBook: IAccountsBook) => {
        setSelectedRegisterAccount(accountsBook);
        setShowSeeRegisterAccount(true);
    }, []);

    const handleDelete = useCallback((accountsBook: IAccountsBook) => {
        setSelectedRegisterAccount(accountsBook);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((accountsBook: IAccountsBook) => {
        setSelectedRegisterAccount(accountsBook);
        setShowModalEdit(true);
    }, []);

    const handleAddInventory = useCallback((accountsBook: IAccountsBook) => {
        setSelectedRegisterAccount(accountsBook);
        setShowApproval(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeRegisterAccount(false);
        setShowDeleteConfirmation(false);
        setShowModalEdit(false);
        setShowApproval(false);
    }, []);
    
    const branchesArray = Array.isArray(branches) ? branches : [];
    
    
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
                                    className="mx-2 p-1 border rounded"
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

                            {/* <div>
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
                            </div> */}
                        </div>
    
                        <div className="mb-4 mt-4 p-4 border rounded d-flex justify-content-end align-items-center">
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
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    {selectedColumns.includes('transactionDate') && (
                                        <div className={`${styles.column__Transaction_Date} d-flex align-items-center justify-content-center`}>Fecha de TX</div>
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

                            <div className={`${styles.container__Body}`}>
                                {Array.isArray(accountsBook) && accountsBook.length > 0 ? (
                                    accountsBook.map((accountsBook) => (
                                        <div key={accountsBook.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            {selectedColumns.includes('transactionDate') && (
                                                <div className={`${styles.column__Transaction_Date} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{new Date(accountsBook.transactionDate).toLocaleDateString('en-GB')}</span>
                                                </div>
                                            )}

                                            {selectedColumns.includes('branch') && (
                                                <div className={`${styles.column__Branch} d-flex align-items-center justify-content-center`}>
                                                    <span>
                                                        {Array.isArray(branches) && branches.map((branch, index) => (
                                                            accountsBook.branchId === branch.id && (
                                                                <span className={`${styles.text__Ellipsis} text-center overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                            )
                                                        ))}
                                                    </span>
                                                </div>
                                            )}

                                            {selectedColumns.includes('transactionType') && (
                                                <div className={`${styles.column__Transaction_Type} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.transactionType}</span>
                                                </div>
                                            )}

                                            {selectedColumns.includes('meanPayment') && (
                                                <div className={`${styles.column__Mean_Payment} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.creditCash}</span>
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
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>$ {accountsBook.unitValue? formatNumber(accountsBook.unitValue) : 'N/A'}</span>
                                                </div>
                                            )}

                                            {selectedColumns.includes('quantity') && (
                                                <div className={`${styles.column__Quantity} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.quantity? formatNumber(accountsBook.quantity) : 'N/A'}</span>
                                                </div>
                                            )}

                                            {selectedColumns.includes('totalValue') && (
                                                <div className={`${styles.column__Total_Value} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.totalValue? `$ ${formatNumber(accountsBook.totalValue)}` : 'N/A'}</span>
                                                </div>
                                            )}

                                            {selectedColumns.includes('transactionCounterpartId') && (
                                                <div className={`${styles.column__Transaction_Counterpart} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.transactionCounterpartId}</span>
                                                </div>
                                            )}

                                            <div className={`${styles.column__Seller} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{accountsBook.seller}</span>
                                            </div>

                                            <div className={`${styles.column__Transaction_Approved} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} text-center text-center overflow-hidden`}>{accountsBook.transactionApproved === true ? 'Si' : 'No'}</span>
                                            </div>

                                            <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRegisterAccount(accountsBook.id);
                                                            handleSeeItem(accountsBook);
                                                        }}
                                                    />
                                                </div>

                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <RiDeleteBin6Line
                                                        className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRegisterAccount(accountsBook.id);
                                                            handleDelete(accountsBook);
                                                        }}
                                                    />
                                                </div>

                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <BsPencil
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRegisterAccount(accountsBook.id);
                                                            handleEdit(accountsBook)
                                                        }}
                                                    />
                                                </div>

                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <FaCheck
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
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
                                    <div className={`${styles.noAssetsMessage} d-flex align-items-center justify-content-center`}>
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
                                    <SeeRegisterPendingApproval
                                        accountsBook={selectedRegisterAccount}
                                        branches={branchesArray}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el registro pendiente de aprobar</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteRegister
                                    typeRegisterDelete={'AccountsBook'}
                                    idItem={idRegisterAccount}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showModalEdit} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del registro</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedRegisterAccount &&
                                    <ModalEdit
                                        token={token}
                                        idItem={idRegisterAccount}
                                        registerAccount={selectedRegisterAccount}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showApproval} onHide={() => setShowApproval(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Aprueba el registro</Modal.Title>
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