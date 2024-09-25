import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { putCrmClient, getCrmClients } from '../../../../../redux/User/07CrmClientSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../types/User/crmClient.types';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

interface ModalEditCrmClientProps {
    token: string;
    idCrmClient: string;
    crmClient: ICrmClient;
    onCloseModal: () => void;
}

function ModalEditCrmClient({ token, idCrmClient, crmClient, onCloseModal }: ModalEditCrmClientProps) {
    const dispatch: AppDispatch = useDispatch();

    const [editedCrmClient, setEditedCrmClient] = useState<ICrmClient>({ ...crmClient });
    const [editedTypeDocumentId, setEditedTypeDocumentId] = useState(crmClient?.typeDocumentId);

    const [selectedDepartment, setSelectedDepartment] = useState(crmClient?.department);
    const [selectedCity, setSelectedCity] = useState(crmClient?.city); 
    const [selectedCodeDane, setSelectedCodeDane] = useState(crmClient?.codeDane);
    const [selectedSubregionCodeDane, setSelectedSubregionCodeDane] = useState(crmClient?.subregionCodeDane);
    const [resetDepartmenAndCity, setResetDepartmenAndCity] = useState(false);
    
    const handleSelectDepartmentAndCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        // Asegurar que el valor de department es un valor válido de la lista o undefined
        const validDepartment = department as 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada' | undefined;
    
        setSelectedDepartment(validDepartment);
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

            await dispatch(putCrmClient(idCrmClient, formData, token));
            dispatch(getCrmClients(token));
            setResetDepartmenAndCity(true);
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = (id: string) => {
        onCloseModal();
        setEditedCrmClient({ ...editedCrmClient, [id]: { ...crmClient } });
    };
   
    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información del cliente</h1>

            <div className="w-100">
                <h6 className={styles.label}>Tipo de identificación del cliente</h6>
                <select
                    value={editedTypeDocumentId}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => setEditedTypeDocumentId(e.target.value as 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte')}
                >
                    <option value='NIT' translate="no">NIT</option>
                    <option value='Cedula de Ciudadania'>Cedula de Ciudadania</option>
                    <option value='Cedula de Extranjeria'>Cedula de Extranjeria</option>
                    <option value='Pasaporte'>Pasaporte</option>
                </select>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identificación del cliente</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedCrmClient.documentId}
                        onChange={(e) => handleEditField(e, 'documentId', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Dígito de verificación del cliente</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedCrmClient.verificationDigit}
                        onChange={(e) => handleEditField(e, 'verificationDigit', 'text')}
                        placeholder='Dígito de verificación'
                    />
                </div>
            </div>

            {(editedTypeDocumentId === 'Cedula de Ciudadania' || editedTypeDocumentId ==='Cedula de Extranjeria' || editedTypeDocumentId === 'Pasaporte')  && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre del cliente</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedCrmClient.name}
                            onChange={(e) => handleEditField(e, 'name', 'text')}
                            placeholder='Nombre del cliente'
                        />
                    </div>
                    <div className="w-100">
                        <h6 className={styles.label}>Apellido del cliente</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedCrmClient.lastName}
                            onChange={(e) => handleEditField(e, 'lastName', 'text')}
                            placeholder='Apellido del cliente'
                        />
                    </div>
                </div>
            )}

            {editedTypeDocumentId === 'NIT'  && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre de la empresa</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedCrmClient.corporateName}
                            onChange={(e) => handleEditField(e, 'corporateName', 'text')}
                            placeholder='Nombre de la empresa'
                        />
                    </div>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Email del cliente</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedCrmClient.email}
                        onChange={(e) => handleEditField(e, 'email', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono del cliente</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedCrmClient.phone}
                        onChange={(e) => handleEditField(e, 'phone', 'text')}
                    />
                </div>
            </div>

            <DepartmenAndCity
                onSelect={handleSelectDepartmentAndCity}
                reset={resetDepartmenAndCity}
                initialDepartment={selectedDepartment}
                initialCity={selectedCity}
            />

            <div className="w-100">
                <h6 className={styles.label}>Dirección del cliente</h6>
                <input
                    type="text"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedCrmClient.address}
                    onChange={(e) => handleEditField(e, 'address', 'text')}
                />
            </div>

            <div className="d-flex align-items-center justify-content-center">
                <button className={`${styles.button__Submit} border-0`} onClick={() => handleSaveChanges(editedCrmClient)}>Guardar</button>
                <button className={`${styles.button__Cancel} border-0`} onClick={() => cancelEditing(idCrmClient)}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditCrmClient;