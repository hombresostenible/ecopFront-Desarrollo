/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../../redux/store';
import { getServices, putService } from '../../../../../../redux/User/03Inventories/05InventoryServicesSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IService } from '../../../../../../types/User/services.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ModalEditServiceProps {
    token: string;
    idItem: string;
    service: IService;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditService({ token, idItem, service, branches, onCloseModal }: ModalEditServiceProps) {
    const dispatch: AppDispatch = useDispatch();

    const [editedService, setEditedService] = useState<IService>({ ...service });

    const [editedIVA, setEditedIVA] = useState<'No aplica' | 0 | 5 | 19>(service?.IVA);
    const [ editedIsDiscounted, setEditedIsDiscounted ] = useState(service?.isDiscounted);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string,
        dataType: 'text' | 'number' | 'date' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedService((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else if (dataType === 'date') {
            const formattedDate = new Date(newValue).toISOString().split('T')[0];
            setEditedService((prevEdited) => ({
                ...prevEdited,
                [field]: formattedDate,
            }));
        } else {
            setEditedService((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedService: IService) => {
        try {
            editedService.IVA = editedIVA;
            editedService.isDiscounted = editedIsDiscounted;
            await dispatch(putService(idItem, editedService, token));
            dispatch(getServices(token));
            onCloseModal();
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    const cancelEditing = (id: string) => {
        onCloseModal();
        setEditedService({ ...editedService, [id]: { ...service } });
    };

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Edita la información del servicio</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al servicio</h6>
                <select
                    value={editedService.branchId}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => handleEditField(e, 'branchId')}
                    
                >
                    {branches && branches.map((service, index) => (
                        <option key={index} value={service.id}>
                            {service.nameBranch}
                        </option>
                    ))}
                </select>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del servicio</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.nameItem}
                        onChange={(e) => handleEditField(e, 'nameItem', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.barCode || ''}
                        onChange={(e) => handleEditField(e, 'barCode', 'text')}
                    />
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.sellingPrice || ''}
                        onChange={(e) => handleEditField(e, 'sellingPrice', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>IVA del servicio</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.IVA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 0 | 5 | 19;
                            setEditedIVA(value);
                            setEditedService((prevEdited) => ({
                                ...prevEdited,
                                IVA: value,
                            }));
                        }}
                    >
                        <option value='No aplica'>No aplica</option>
                        <option value={0}>0 %</option>
                        <option value={5}>5 %</option>
                        <option value={19}>19 %</option>
                    </select>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedIsDiscounted}
                        onChange={(e) => setEditedIsDiscounted(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedIsDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedService.discountPercentage || ''}
                            onChange={(e) => handleEditField(e, 'discountPercentage', 'text')}
                        />
                    </div>
                )}
            </div>

            <div className="d-flex align-items-center justify-content-center">
                <button className={`${styles.button__Submit} border-0`} onClick={() => handleSaveChanges(editedService)}>Guardar</button>
                <button className={`${styles.button__Cancel} border-0`} onClick={() => cancelEditing(service.id)}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditService;