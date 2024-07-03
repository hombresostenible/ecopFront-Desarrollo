/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import { getIncomesNotApproved, putAccountsBook } from '../../../../redux/User/accountsBookSlice/actions';
import type { AppDispatch } from '../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from '../../../../types/User/accountsBook.types';
import { IBranch } from '../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ModalEditAccountsBookProps {
    token: string;
    idItem: string;
    registerAccount: IAccountsBook;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditAccountsBook({ token, idItem, registerAccount, branches, onCloseModal }: ModalEditAccountsBookProps) {
    const dispatch: AppDispatch = useDispatch();

    const [editedAccountsBook, setEditedAccountsBook] = useState<IAccountsBook>({ ...registerAccount });
    const [editedTransactionType, setEditedTransactionType] = useState(registerAccount?.transactionType);
    const [editedCreditCash, setEditedCreditCash] = useState(registerAccount?.creditCash);
    const [editedMeanPayment, setEditedMeanPayment] = useState(registerAccount?.meanPayment);
    const [editedIncomeCategory, setEditedIncomeCategory] = useState(registerAccount?.incomeCategory);
    const [editedExpenseCategory, setEditedExpenseCategory] = useState(registerAccount?.expenseCategory);
    const [editedPeriodicityPayService, setEditedPeriodicityPayService] = useState(registerAccount?.periodicityPayService);
    const [editedPeriodPayService, setEditedPeriodPayService] = useState(registerAccount?.periodPayService);
    const [editedCreditWithInterest, setEditedCreditWithInterest] = useState(registerAccount?.creditWithInterest);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IAccountsBook,
        dataType: 'text' | 'number' | 'date' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedAccountsBook((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedAccountsBook((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedAccountsBook: IAccountsBook) => {
        try {
            editedAccountsBook.transactionType = editedTransactionType;
            editedAccountsBook.creditCash = editedCreditCash;
            editedAccountsBook.meanPayment = editedMeanPayment;
            editedAccountsBook.incomeCategory = editedIncomeCategory;
            editedAccountsBook.expenseCategory = editedExpenseCategory;
            editedAccountsBook.periodicityPayService = editedPeriodicityPayService;
            editedAccountsBook.periodPayService = editedPeriodPayService;
            editedAccountsBook.creditWithInterest = editedCreditWithInterest;
            await dispatch(putAccountsBook(idItem, editedAccountsBook, token));
            dispatch(getIncomesNotApproved(token));
            onCloseModal();
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    const cancelEditing = () => {
        onCloseModal();
        setEditedAccountsBook({ ...registerAccount });
    };

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Edita la información del registro</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al registro</h6>
                <div className={styles.containerInput}>
                    <select
                        value={editedAccountsBook.branchId || ''}
                        className={`${styles.inputEdit} p-2 border w-100`}
                        onChange={(e) => handleEditField(e, 'branchId')}
                    >
                        {branches && branches.map((branch, index) => (
                            <option key={index} value={branch.id}>
                                {branch.nameBranch}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de registro</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="date"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.registrationDate ? new Date(editedAccountsBook.registrationDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => handleEditField(e, 'registrationDate', 'date')}
                        />
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de transacción</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="date"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.transactionDate ? new Date(editedAccountsBook.transactionDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => handleEditField(e, 'transactionDate', 'date')}
                        />
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de transacción</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.transactionType || ''}
                            onChange={(e) => {
                                const value = e.target.value as 'Ingreso' | 'Gasto';
                                setEditedTransactionType(value);
                                setEditedAccountsBook((prevEdited) => ({
                                    ...prevEdited,
                                    transactionType: value,
                                }));
                            }}
                        >
                            <option value='Ingreso'>Ingreso</option>
                            <option value='Gasto'>Gasto</option>
                        </select>
                    </div>
                </div>

                <div className="w-100">
                    <h6 className={styles.label}>Tipo de ingreso</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.creditCash || ''}
                            onChange={(e) => {
                                const value = e.target.value as 'Contado' | 'Credito';
                                setEditedCreditCash(value);
                                setEditedAccountsBook((prevEdited) => ({
                                    ...prevEdited,
                                    creditCash: value,
                                }));
                            }}
                        >
                            <option value='Contado'>Contado</option>
                            <option value='Credito'>Credito</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Medio de pago</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.meanPayment || ''}
                            onChange={(e) => {
                                const value = e.target.value as 'Efectivo' | 'Tarjeta de Credito/Debito' | 'Transferencia bancaria (PSE)'  | 'Daviplata' | 'Nequi' | 'Movii' | 'Tuya Pay' | 'Dale' | 'Nubank' | 'Uala' | 'Lulo Bank' | 'Tpaga' | 'Powwi' | 'BBVA Wallet' | 'Ahorro a la mano' | 'Apple Pay' | 'Rappipay' | 'Claro Pay' | 'Baloto' | 'Giro' |'Cheque';
                                setEditedMeanPayment(value);
                                setEditedAccountsBook((prevEdited) => ({
                                    ...prevEdited,
                                    meanPayment: value,
                                }));
                            }}
                        >
                            <option value='Efectivo'>Efectivo</option>
                            <option value='Tarjeta de Credito/Debito'>Tarjeta de Credito/Debito</option>
                            <option value='Transferencia bancaria (PSE)'>Transferencia bancaria (PSE)</option>
                            <option value='Daviplata'>Daviplata</option>
                            <option value='Nequi'>Nequi</option>
                            <option value='Movii'>Movii</option>
                            <option value='Tuya Pay'>Tuya Pay</option>
                            <option value='Dale'>Dale</option>
                            <option value='Nubank'>Nubank</option>
                            <option value='Uala'>Uala</option>
                            <option value='Lulo Bank'>Lulo Bank</option>
                            <option value='Tpaga'>Tpaga</option>
                            <option value='Powwi'>Powwi</option>
                            <option value='BBVA Wallet'>BBVA Wallet</option>
                            <option value='Ahorro a la mano'>Ahorro a la mano</option>
                            <option value='Apple Pay'>Apple Pay</option>
                            <option value='Rappipay'>Rappipay</option>
                            <option value='Claro Pay'>Claro Pay</option>
                            <option value='Baloto'>Baloto</option>
                            <option value='Giro'>Giro</option>
                            <option value='Cheque'>Cheque</option>
                        </select>
                    </div>
                </div>

                <div className="w-100">
                    <h6 className={styles.label}>Categoría de ingreso</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.incomeCategory || ''}
                            onChange={(e) => {
                                const value = e.target.value as 'Producto' | 'Materia Prima' | 'Mercancia' | 'Servicio' | 'Activo' | 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos';
                                setEditedIncomeCategory(value);
                                setEditedAccountsBook((prevEdited) => ({
                                    ...prevEdited,
                                    incomeCategory: value,
                                }));
                            }}
                        >
                            <option value='Producto'>Producto</option>
                            <option value='Materia Prima'>Materia Prima</option>
                            <option value='Mercancia'>Mercancia</option>
                            <option value='Servicio'>Servicio</option>
                            <option value='Activo'>Activo</option>
                            <option value='Credito del Banco'>Credito del Banco</option>
                            <option value='Credito en Cooperativa'>Credito en Cooperativa</option>
                            <option value='Gota gota'>Gota gota</option>
                            <option value='Credito de almacen'>Credito de almacen</option>
                            <option value='Credito de servicios publicos'>Credito de servicios publicos</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Categoría de gasto</h6>
                    <div className={styles.containerInput}>
                        <select
                        className={`${styles.inputEdit} p-2 border w-100`}
                        value={editedAccountsBook.expenseCategory || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'Materia Prima' | 'Mercancia' | 'Activo' | 'Arriendo' | 'Mantenimiento de equipos, maquinaria, herramientas' | 'Reparaciones locativas' | 'Transporte' | 'Combustible' | 'Nomina' | 'Seguridad Social y/o parafiscales' | 'Acueducto' | 'Energia' | 'Gas' | 'Internet' | 'Celular/Plan de datos' | 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos' | 'IVA' | 'ICA' | 'Declaracion de Renta' | 'Retencion en la Fuente' | 'Predial' | 'Vehiculos y motos' | 'Asesoria Contable' | 'Renovacion Camara de Comercio' | 'Licencias y permisos' | 'Asesoria Juridica' | 'Honorarios de contratista';
                            setEditedExpenseCategory(value);
                            setEditedAccountsBook((prevEdited) => ({
                            ...prevEdited,
                            expenseCategory: value,
                            }));
                        }}
                        >
                        <option value='Materia Prima'>Materia Prima</option>
                        <option value='Mercancia'>Mercancia</option>
                        <option value='Activo'>Activo</option>
                        <option value='Arriendo'>Arriendo</option>
                        <option value='Mantenimiento de equipos, maquinaria, herramientas'>Mantenimiento de equipos, maquinaria, herramientas</option>
                        <option value='Reparaciones locativas'>Reparaciones locativas</option>
                        <option value='Transporte'>Transporte</option>
                        <option value='Combustible'>Combustible</option>
                        <option value='Nomina'>Nomina</option>
                        <option value='Seguridad Social y/o parafiscales'>Seguridad Social y/o parafiscales</option>
                        <option value='Acueducto'>Acueducto</option>
                        <option value='Energia'>Energia</option>
                        <option value='Gas'>Gas</option>
                        <option value='Internet'>Internet</option>
                        <option value='Celular/Plan de datos'>Celular/Plan de datos</option>
                        <option value='Credito del Banco'>Credito del Banco</option>
                        <option value='Credito en Cooperativa'>Credito en Cooperativa</option>
                        <option value='Gota gota'>Gota gota</option>
                        <option value='Credito de almacen'>Credito de almacen</option>
                        <option value='Credito de servicios publicos'>Credito de servicios publicos</option>
                        <option value='IVA'>IVA</option>
                        <option value='ICA'>ICA</option>
                        <option value='Declaracion de Renta'>Declaracion de Renta</option>
                        <option value='Retencion en la Fuente'>Retencion en la Fuente</option>
                        <option value='Predial'>Predial</option>
                        <option value='Vehiculos y motos'>Vehiculos y motos</option>
                        <option value='Asesoria Contable'>Asesoria Contable</option>
                        <option value='Renovacion Camara de Comercio'>Renovacion Camara de Comercio</option>
                        <option value='Licencias y permisos'>Licencias y permisos</option>
                        <option value='Asesoria Juridica'>Asesoria Juridica</option>
                        <option value='Honorarios de contratista'>Honorarios de contratista</option>
                        </select>
                    </div>
                </div>

                <div className="w-100">
                    <h6 className={styles.label}>Categoría de gasto</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.periodicityPayService || ''}
                            onChange={(e) => {
                                const value = e.target.value as 'Mensual' | 'Bimestral';
                                setEditedPeriodicityPayService(value);
                                setEditedAccountsBook((prevEdited) => ({
                                    ...prevEdited,
                                    periodicityPayService: value,
                                }));
                            }}
                        >
                            <option value='Mensual'>Mensual</option>
                            <option value='Bimestral'>Bimestral</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Categoría de gasto</h6>
                    <div className={styles.containerInput}>
                        <select
                        className={`${styles.inputEdit} p-2 border w-100`}
                        value={editedAccountsBook.periodPayService || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'Enero de 2024' | 'Febrero de 2024' | 'Marzo de 2024' | 'Abril de 2024' | 'Mayo de 2024' | 'Junio de 2024' | 'Julio de 2024' | 'Agosto de 2024' | 'Septiembre de 2024' | 'Octubre de 2024' | 'Noviembre de 2024' | 'Diciembre de 2024' | 'Julio - Agosto de 2024' | 'Marzo - Abril de 2024' | 'Mayo - Junio de 2024' | 'Julio - Agosto de 2024' | 'Septiembre - Octubre de 2024' | 'Noviembre - Diciembre de 2024';
                            setEditedPeriodPayService(value);
                            setEditedAccountsBook((prevEdited) => ({
                            ...prevEdited,
                            periodPayService: value,
                            }));
                        }}
                        >
                        <option value='Enero de 2024'>Enero de 2024</option>
                        <option value='Febrero de 2024'>Febrero de 2024</option>
                        <option value='Marzo de 2024'>Marzo de 2024</option>
                        <option value='Abril de 2024'>Abril de 2024</option>
                        <option value='Mayo de 2024'>Mayo de 2024</option>
                        <option value='Junio de 2024'>Junio de 2024</option>
                        <option value='Julio de 2024'>Julio de 2024</option>
                        <option value='Agosto de 2024'>Agosto de 2024</option>
                        <option value='Septiembre de 2024'>Septiembre de 2024</option>
                        <option value='Octubre de 2024'>Octubre de 2024</option>
                        <option value='Noviembre de 2024'>Noviembre de 2024</option>
                        <option value='Diciembre de 2024'>Diciembre de 2024</option>
                        <option value='Julio - Agosto de 2024'>Julio - Agosto de 2024</option>
                        <option value='Marzo - Abril de 2024'>Marzo - Abril de 2024</option>
                        <option value='Mayo - Junio de 2024'>Mayo - Junio de 2024</option>
                        <option value='Septiembre - Octubre de 2024'>Septiembre - Octubre de 2024</option>
                        <option value='Noviembre - Diciembre de 2024'>Noviembre - Diciembre de 2024</option>
                        </select>
                    </div>
                </div>

                <div className="w-100">
                    <h6 className={styles.label}>Valor unitario</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="number"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.unitValue}
                            readOnly
                        />
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="number"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.quantity}
                            onChange={(e) => handleEditField(e, 'quantity', 'number')}
                        />
                    </div>
                </div>
                
                <div className="w-100">
                    <h6 className={styles.label}>Valor total</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="number"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.totalValue}
                        />
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Dewscripción del crédito</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="text"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.creditDescription}
                            onChange={(e) => handleEditField(e, 'creditDescription', 'text')}
                        />
                    </div>
                </div>
                
                <div className="w-100">
                    <h6 className={styles.label}>Categoría de gasto</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.creditWithInterest || ''}
                            onChange={(e) => {
                                const value = e.target.value as 'Si' | 'No';
                                setEditedCreditWithInterest(value);
                                setEditedAccountsBook((prevEdited) => ({
                                ...prevEdited,
                                creditWithInterest: value,
                                }));
                            }}
                            >
                            <option value='Si'>Si</option>
                            <option value='No'>No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-100">
                <div className="d-flex align-items-center justify-content-center">
                    <button className={`${styles.buttonSave} border-0`} onClick={() => handleSaveChanges(editedAccountsBook)}>Guardar</button>
                    <button className={`${styles.buttonCancel} border-0`} onClick={cancelEditing}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditAccountsBook;