/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { getCrmSuppliers, putCrmSupplier } from '../../../../../redux/User/crmSupplierSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../../types/User/crmSupplier.types';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

interface ModalAssetProps {
    token: string;
    idCrmSupplier: string;
    crmSupplier: ICrmSupplier;
    onCloseModal: () => void;
}

function ModalCrmSuppliers({ token, idCrmSupplier, crmSupplier, onCloseModal }: ModalAssetProps) {
    const dispatch: AppDispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedCrmSupplier, setEditedCrmSupplier] = useState<ICrmSupplier>({ ...crmSupplier });
    const [editedTypeDocumentId, setEditedTypeDocumentId] = useState(crmSupplier?.typeDocumentId);
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
   
    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof ICrmSupplier,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedCrmSupplier((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedCrmSupplier((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (formData: ICrmSupplier) => {
        try {
            formData.typeDocumentId = editedTypeDocumentId;         
            formData.department = selectedDepartment as ICrmSupplier['department'];
            formData.city = selectedCity;
            formData.codeDane = selectedCodeDane;
            formData.subregionCodeDane = selectedSubregionCodeDane;
            dispatch(putCrmSupplier(idCrmSupplier, formData, token));
            setResetDepartmenAndCity(true);
            setIsEditing(false);
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getCrmSuppliers(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = (id: string) => {
        setIsEditing(false);
        setEditedCrmSupplier({ ...editedCrmSupplier, [id]: { ...crmSupplier } });
    };

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información del proveedor</h1>
            </div>

            {(crmSupplier.typeDocumentId === 'Cedula de Ciudadania' || crmSupplier.typeDocumentId ==='Cedula de Extranjeria' || crmSupplier.typeDocumentId === 'Pasaporte')  && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre del proveedor</h6>
                        <div className={styles.containerInput}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.inputEdit} p-2 border form-control`}
                                    value={editedCrmSupplier.name}
                                    onChange={(e) => handleEditField(e, 'name', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.name}</p>
                            )}
                        </div>
                    </div>
                    <div className="w-100">
                        <h6 className={styles.label}>Apellido del proveedor</h6>
                        <div className={styles.containerInput}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.inputEdit} p-2 border form-control`}
                                    value={editedCrmSupplier.lastName}
                                    onChange={(e) => handleEditField(e, 'lastName', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.lastName}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {crmSupplier.typeDocumentId === 'NIT'  && (
                <div className='d-flex'>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre de la empresa</h6>
                        <div className={styles.containerInput}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.inputEdit} p-2 border form-control`}
                                    value={editedCrmSupplier.corporateName}
                                    onChange={(e) => handleEditField(e, 'corporateName', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.corporateName}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="w-100">
                <h6 className={styles.label}>Tipo de identificación del proveedor</h6>
                <div>
                    {isEditing ? (
                        <select
                            value={editedTypeDocumentId}
                            className={`${styles.inputEdit} p-2 border form-control`}
                            onChange={(e) => setEditedTypeDocumentId(e.target.value as 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte')}
                        >
                            <option value='NIT'>NIT</option>
                            <option value='Cedula de Ciudadania'>Cedula de Ciudadania</option>
                            <option value='Cedula de Extranjeria'>Cedula de Extranjeria</option>
                            <option value='Pasaporte'>Pasaporte</option>
                        </select>
                    ) : (
                        <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.typeDocumentId}</p>
                    )}
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identificación del proveedor</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedCrmSupplier.documentId}
                                onChange={(e) => handleEditField(e, 'documentId', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.documentId}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Dígito de verificación del proveedor</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedCrmSupplier.verificationDigit}
                                onChange={(e) => handleEditField(e, 'verificationDigit', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.verificationDigit}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Email del proveedor</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedCrmSupplier.email}
                                onChange={(e) => handleEditField(e, 'email', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.email}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono del proveedor</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedCrmSupplier.phone}
                                onChange={(e) => handleEditField(e, 'phone', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.phone}</p>
                        )}
                    </div>
                </div>
            </div>

            {isEditing ? (
                <div className={styles.container__Deparment_City}>
                    <DepartmenAndCity
                        onSelect={handleSelectDepartmentAndCity}
                        reset={resetDepartmenAndCity}
                    />
                </div>
            )
                :
                <div className='mb-3 d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Departamento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.department}</p>
                        </div>
                    </div>
                    <div className="w-100">
                        <h6 className={styles.label}>Ciudad</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.city}</p>
                        </div>
                    </div>
                </div>               
            }

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Dirección del proveedor</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedCrmSupplier.address}
                                onChange={(e) => handleEditField(e, 'address', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{crmSupplier?.address}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-100">
                {isEditing ? (
                    <div className="d-flex align-items-center justify-content-center">
                        <button className={`${styles.buttonSave} border-0`} onClick={() => handleSaveChanges(editedCrmSupplier)}>Guardar</button>
                        <button className={`${styles.buttonCancel} border-0`} onClick={() => cancelEditing(idCrmSupplier)}>Cancelar</button>
                    </div>
                ) : (
                    <div
                        className={`${styles.divButtonEdit} d-flex align-items-center justify-content-center`}
                        onClick={() => {
                            setEditedCrmSupplier({ ...crmSupplier });
                            setIsEditing(true);
                        }}
                    >
                        <h6 className="m-0">Edita la información del proveedor</h6>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalCrmSuppliers;