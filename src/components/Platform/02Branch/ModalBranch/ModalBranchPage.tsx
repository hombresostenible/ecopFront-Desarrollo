/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../redux/store';
import { putBranch, getBranches } from '../../../../redux/User/branchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../types/User/branch.types';
import DepartmenAndCity from '../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

interface ModalBranchProps {
    idBranch: string;
    branch: IBranch | undefined;
    token: string;
    onCloseModal: () => void;
}

function ModalBranch({ idBranch, branch, token, onCloseModal }: ModalBranchProps) {
    const dispatch: AppDispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedBranch, setEditedBranch] = useState<IBranch | null>(null);
    const [editedTypeDocumentIdManager, setEditedTypeDocumentIdManager] = useState<string>(branch?.typeDocumentIdManager || 'Cedula de Ciudadania');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState(''); 
    const [selectedCodeDane, setSelectedCodeDane] = useState('');
    const [selectedSubregionCodeDane, setSelectedSubregionCodeDane] = useState('');
    const [resetDepartmenAndCity, setResetDepartmenAndCity] = useState(false);
    const handleSelectDepartmentAndCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        setSelectedDepartment(department);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedSubregionCodeDane(subregionCodeDane);
    };

    useEffect(() => {
        if (branch) {
            setEditedBranch({ ...branch });
            setEditedTypeDocumentIdManager(branch.typeDocumentIdManager || 'Cedula de Ciudadania');
            setSelectedDepartment(branch.department);
            setSelectedCity(branch.city);
        }
    }, [branch]);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IBranch,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (editedBranch) {
            setEditedBranch((prevEdited) => ({
                ...prevEdited!,
                [field]: dataType === 'number' ? parseFloat(newValue) : newValue,
            }));
        }
    };

    const handleSaveChanges = async () => {
        if (editedBranch) {
            try {
                editedBranch.typeDocumentIdManager = editedTypeDocumentIdManager as 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
                editedBranch.department = selectedDepartment as IBranch['department'];
                editedBranch.city = selectedCity;
                editedBranch.codeDane = selectedCodeDane;
                editedBranch.subregionCodeDane = selectedSubregionCodeDane;
                dispatch(putBranch(idBranch, editedBranch, token));
                // Simulamos un delay de la API
                await new Promise(resolve => setTimeout(resolve, 500));
                setResetDepartmenAndCity(true);
                dispatch(getBranches(token));
                setIsEditing(false);
                onCloseModal();
            } catch (error) {
                throw new Error('Error al guardar cambios');
            }
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedBranch(branch ? { ...branch } : null);
    };

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información de la Sede</h1>
            </div>

            {editedBranch && (
                <>
                    <div className='d-flex gap-3'>
                        <div className="w-100">
                            <h6 className={styles.label}>Nombre de la sede</h6>
                            <div className={styles.containerInput}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.inputEdit} p-2 border`}
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
                                        className={`${styles.inputEdit} p-2 border`}
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
                        {isEditing ? (
                            <DepartmenAndCity
                                onSelect={handleSelectDepartmentAndCity}
                                reset={resetDepartmenAndCity}
                                initialDepartment={selectedDepartment}
                                initialCity={selectedCity}
                            />
                        ) : (
                            <div className='d-flex gap-3 w-100'>
                                <div className="w-100">
                                    <h6 className={styles.label}>Departamento</h6>
                                    <div className={styles.containerInput}>
                                        <p className={`${styles.input} p-2 text-start border`}>{branch?.department}</p>
                                    </div>
                                </div>
                                <div className="w-100">
                                    <h6 className={styles.label}>Ciudad</h6>
                                    <div className={styles.containerInput}>
                                        <p className={`${styles.input} p-2 text-start border`}>{branch?.city}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='d-flex gap-3'>
                        <div className="w-100">
                            <h6 className={styles.label}>Email de la sede</h6>
                            <div className={styles.containerInput}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.inputEdit} p-2 border`}
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
                                        className={`${styles.inputEdit} p-2 border`}
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
                            <h6 className={styles.label}>Nombres del líder de la sede</h6>
                            <div className={styles.containerInput}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.inputEdit} p-2 border`}
                                        value={editedBranch.nameManagerBranch}
                                        onChange={(e) => handleEditField(e, 'nameManagerBranch', 'text')}
                                    />
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{branch?.nameManagerBranch}</p>
                                )}
                            </div>
                        </div>
                        <div className="w-100">
                            <h6 className={styles.label}>Apellidos del líder de la sede</h6>
                            <div className={styles.containerInput}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.inputEdit} p-2 border`}
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
                                        className={`${styles.inputEdit} p-2 border`}
                                        onChange={(e) => setEditedTypeDocumentIdManager(e.target.value as 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte')}
                                    >
                                        <option value='Cedula de Ciudadania'>Cédula de Ciudadanía</option>
                                        <option value='Cedula de Extranjeria'>Cédula de Extranjería</option>
                                        <option value='Pasaporte'>Pasaporte</option>
                                    </select>
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{branch?.typeDocumentIdManager}</p>
                                )}
                            </div>
                        </div>
                        <div className="w-100">
                            <h6 className={styles.label}>Número de identificación del líder de la sede</h6>
                            <div className={styles.containerInput}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.inputEdit} p-2 border`}
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
                                <button className={`${styles.buttonSave} border-0`} onClick={handleSaveChanges}>Guardar</button>
                                <button className={`${styles.buttonCancel} border-0`} onClick={cancelEditing}>Cancelar</button>
                            </div>
                        ) : (
                            <div
                                className={`${styles.divButtonEdit} d-flex align-items-center justify-content-center`}
                                onClick={() => {
                                    setEditedBranch(branch ? { ...branch } : null);
                                    setIsEditing(true);
                                }}
                            >
                                <h6 className="m-0">Edita la información de la sede</h6>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default ModalBranch;