/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import { putBranch } from '../../../../redux/User/branchSlice/actions';
import type { AppDispatch } from '../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ModalBranchProps {
    branch: IBranch;
    token: string;
    onUpdateBranch: () => void;
}

function ModalBranch({ branch, token, onUpdateBranch }: ModalBranchProps) {
    const dispatch: AppDispatch = useDispatch();


    const [isEditing, setIsEditing] = useState(false);
    const [editedBranch, setEditedBranch] = useState<IBranch>({ ...branch });
    const [editedTypeDocumentIdManager, setEditedTypeDocumentIdManager] = useState<string>(branch.typeDocumentIdManager);

    const handleEditField = (e: React.ChangeEvent<HTMLInputElement>, field: keyof IBranch, type: string) => {
        const value = type === 'number' ? parseInt(e.target.value) : e.target.value;
        setEditedBranch({ ...editedBranch, [field]: value });
    };

    const handleSaveChanges = async (values: IBranch) => {
        try {
            const formData = {
                ...values,
            }
            dispatch(putBranch(formData.id, formData, token));
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 1000));
            onUpdateBranch();
        } catch (error) {
            throw new Error('Error al eliminar la sede');
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedBranch({ ...branch });
        setEditedTypeDocumentIdManager(branch.typeDocumentIdManager);
    };

    return (
        <div>
            <div className="d-flex gap-3">
                <div className="w-100">
                    <h6 className={styles.label}>Nombre de la sede</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedBranch.nameBranch}
                                onChange={(e) => handleEditField(e, 'nameBranch', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.nameBranch}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Departamento</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedBranch.department}
                                onChange={(e) => handleEditField(e, 'department', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.department}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-flex gap-3">
                <div className="w-100">
                    <h6 className={styles.label}>Ciudad</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedBranch.city}
                                onChange={(e) => handleEditField(e, 'city', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.city}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Dirección de la sede</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedBranch.addressBranch}
                                onChange={(e) => handleEditField(e, 'addressBranch', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.addressBranch}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-flex gap-3">
                <div className="w-100">
                    <h6 className={styles.label}>Email de la sede</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedBranch.contactEmailBranch}
                                onChange={(e) => handleEditField(e, 'contactEmailBranch', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.contactEmailBranch}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono de la sede</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedBranch.contactPhoneBranch}
                                onChange={(e) => handleEditField(e, 'contactPhoneBranch', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.contactPhoneBranch}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-flex gap-3">
                <div className="w-100">
                    <h6 className={styles.label}>Nombres del lider de la sede</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedBranch.nameManagerBranch}
                                onChange={(e) => handleEditField(e, 'nameManagerBranch', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.nameManagerBranch}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Apellidos del lider de la sede</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedBranch.lastNameManagerBranch}
                                onChange={(e) => handleEditField(e, 'lastNameManagerBranch', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.lastNameManagerBranch}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-flex gap-3">
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de identificación</h6>
                    <div>
                        {isEditing ? (
                            <select
                                value={editedTypeDocumentIdManager}
                                className={`${styles.inputEdit} p-2 border form-control`}
                                onChange={(e) => setEditedTypeDocumentIdManager(e.target.value as 'Cédula de Ciudadanía' | 'Cédula de Extranjería' | 'Pasaporte')}
                            >
                                <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </select>
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.typeDocumentIdManager}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identificación del lider de la sede</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedBranch.documentIdManager}
                                onChange={(e) => handleEditField(e, 'documentIdManager', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.documentIdManager}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-100">
                {isEditing ? (
                    <div className="d-flex justify-content-center gap-2 mt-4">
                        <button
                            className={`${styles.buttonCancel} p-2`}
                            onClick={cancelEditing}
                        >
                            Cancelar
                        </button>
                        <button
                            className={`${styles.buttonSave} p-2`}
                            onClick={() => handleSaveChanges(editedBranch)}
                        >
                            Guardar
                        </button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center gap-2 mt-4">
                        <button
                            className={`${styles.buttonEdit} p-2`}
                            onClick={() => setIsEditing(true)}
                        >
                            Editar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalBranch;