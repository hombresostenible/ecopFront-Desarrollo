/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { getCrmClients, putCrmClient } from '../../../../../redux/User/crmClientSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../types/User/crmClient.types';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

interface ModalCrmClientProps {
    token: string;
    idCrmClient: string;
    crmClient: ICrmClient;
    onCloseModal: () => void;
}

function ModalCrmClient({ token, idCrmClient, crmClient, onCloseModal }: ModalCrmClientProps) {
    const dispatch: AppDispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedCrmClient, setEditedCrmClient] = useState<ICrmClient>({ ...crmClient });
    const [editedTypeDocumentId, setEditedTypeDocumentId] = useState(crmClient?.typeDocumentId);
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
        field: keyof ICrmClient,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedCrmClient((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedCrmClient((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (formData: ICrmClient) => {
        try {
            formData.typeDocumentId = editedTypeDocumentId;         
            formData.department = selectedDepartment as ICrmClient['department'];
            formData.city = selectedCity;
            formData.codeDane = selectedCodeDane;
            formData.subregionCodeDane = selectedSubregionCodeDane;
            dispatch(putCrmClient(idCrmClient, formData, token));
            setResetDepartmenAndCity(true);
            setIsEditing(false);
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getCrmClients(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = (id: string) => {
        setIsEditing(false);
        setEditedCrmClient({ ...editedCrmClient, [id]: { ...crmClient } });
    };

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información del cliente</h1>
            </div>

            {(crmClient.typeDocumentId === 'Cedula de Ciudadania' || crmClient.typeDocumentId ==='Cedula de Extranjeria' || crmClient.typeDocumentId === 'Pasaporte')  && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre del cliente</h6>
                        <div className={styles.containerInput}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.inputEdit} p-2 border form-control`}
                                    value={editedCrmClient.name}
                                    onChange={(e) => handleEditField(e, 'name', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{crmClient?.name}</p>
                            )}
                        </div>
                    </div>
                    <div className="w-100">
                        <h6 className={styles.label}>Apellido del cliente</h6>
                        <div className={styles.containerInput}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.inputEdit} p-2 border form-control`}
                                    value={editedCrmClient.lastName}
                                    onChange={(e) => handleEditField(e, 'lastName', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{crmClient?.lastName}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {crmClient.typeDocumentId === 'NIT'  && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre de la empresa</h6>
                        <div className={styles.containerInput}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.inputEdit} p-2 border form-control`}
                                    value={editedCrmClient.corporateName}
                                    onChange={(e) => handleEditField(e, 'corporateName', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{crmClient?.corporateName}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de identificación del cliente</h6>
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
                            <p className={`${styles.input} p-2 text-start border`}>{crmClient?.typeDocumentId}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identificación del cliente</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedCrmClient.documentId}
                                onChange={(e) => handleEditField(e, 'documentId', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{crmClient?.documentId}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Email del cliente</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedCrmClient.email}
                                onChange={(e) => handleEditField(e, 'email', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{crmClient?.email}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono del cliente</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedCrmClient.phone}
                                onChange={(e) => handleEditField(e, 'phone', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{crmClient?.phone}</p>
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
                            <p className={`${styles.input} p-2 text-start border`}>{crmClient?.department}</p>
                        </div>
                    </div>
                    <div className="w-100">
                        <h6 className={styles.label}>Ciudad</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{crmClient?.city}</p>
                        </div>
                    </div>
                </div>               
            }

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Dirección del cliente</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border form-control`}
                                value={editedCrmClient.address}
                                onChange={(e) => handleEditField(e, 'address', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{crmClient?.address}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-100">
                {isEditing ? (
                    <div className="d-flex align-items-center justify-content-center">
                        <button className={`${styles.buttonSave} border-0`} onClick={() => handleSaveChanges(editedCrmClient)}>Guardar</button>
                        <button className={`${styles.buttonCancel} border-0`} onClick={() => cancelEditing(idCrmClient)}>Cancelar</button>
                    </div>
                ) : (
                    <div
                        className={`${styles.divButtonEdit} d-flex align-items-center justify-content-center`}
                        onClick={() => {
                            setEditedCrmClient({ ...crmClient });
                            setIsEditing(true);
                        }}
                    >
                        <h6 className="m-0">Edita la información del cliente</h6>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalCrmClient;