/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
//REDUX
import { useDispatch } from 'react-redux';
import { putBranch, getBranches } from '../../../../redux/branchSlice/actions';
import type { AppDispatch } from '../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ModalBranchProps {
    branch: IBranch;
}

function ModalBranch ({ branch }: ModalBranchProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const [ idBranch, setIdBranch ] = useState('');

    useEffect(() => {
        if (branch) setIdBranch(branch.id);
    }, [ branch ]);

    const [ isEditing, setIsEditing ] = useState(false);
    const [ editedBranch, setEditedBranch ] = useState<IBranch>({ ...branch });
    const [ editedTypeDocumentIdManager, setEditedTypeDocumentIdManager ] = useState(branch?.typeDocumentIdManager);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedBranch((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedBranch((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = (editedBranch: IBranch) => {
        try {
            editedBranch.typeDocumentIdManager = editedTypeDocumentIdManager;
            dispatch(putBranch(idBranch, editedBranch, token));
            setIsEditing(false);
            dispatch(getBranches(token));
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = (id: string) => {
        setIsEditing(false);
        setEditedBranch({ ...editedBranch, [id]: { ...branch } });
    };


    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información de la Sede</h1>
            </div>

            <div className='d-flex gap-3'>
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

            <div className='d-flex gap-3'>
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

            <div className='d-flex gap-3'>
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

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de identificación</h6>
                    <div>
                        {isEditing ? (
                            <select
                                value={editedTypeDocumentIdManager}
                                className={`${styles.inputEdit} p-2 border form-control`}
                                onChange={(e) => setEditedTypeDocumentIdManager(e.target.value as 'Cédula de Ciudadanía' | 'Cédula de Extranjería' | 'Pasaporte')}
                            >
                                <option value='Cédula de Ciudadanía'>Cédula de Ciudadanía</option>
                                <option value='Cédula de Extranjería'>Cédula de Extranjería</option>
                                <option value='Pasaporte'>Pasaporte</option>
                            </select>
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{branch?.typeDocumentIdManager}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identiicación del lIder de la sede</h6>
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
                    <div className="d-flex align-items-center justify-content-center">
                        <button className={`${styles.buttonSave} border-0`} onClick={() => handleSaveChanges(editedBranch)}>Guardar</button>
                        <button className={`${styles.buttonCancel} border-0`} onClick={() => cancelEditing(idBranch)}>Cancelar</button>
                    </div>
                ) : (
                    <div
                        className={`${styles.divButtonEdit} d-flex align-items-center justify-content-center`}
                        onClick={() => {
                            setEditedBranch({ ...branch });
                            setIsEditing(true);
                        }}
                    >
                        <h6 className="m-0">Edita la información de la sede</h6>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalBranch;