/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import { getIncomesNotApproved, putAccountsBook } from '../../../../../redux/User/accountsBookSlice/actions';
import type { AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from '../../../../../types/User/accountsBook.types';
import { IBranch } from '../../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ModalEditProps {
    token: string;
    idItem: string;
    registerAccount: IAccountsBook;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEdit({ token, idItem, registerAccount, branches, onCloseModal }: ModalEditProps) {
    const dispatch: AppDispatch = useDispatch();

    const [editedAccountsBook, setEditedAccountsBook] = useState<IAccountsBook>({ ...registerAccount });

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
                <h1 className={`${styles.title} text-center`}>Edita la información del registro pendiente de aprobar</h1>
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

            <div className="w-100">
                <div className="d-flex align-items-center justify-content-center">
                    <button className={`${styles.buttonSave} border-0`} onClick={() => handleSaveChanges(editedAccountsBook)}>Guardar</button>
                    <button className={`${styles.buttonCancel} border-0`} onClick={cancelEditing}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEdit;
