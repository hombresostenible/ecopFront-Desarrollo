/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import { getServices, putService } from '../../../../../redux/User/serviceSlice/actions';
import type { AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IService } from '../../../../../types/User/services.types';
import { IBranch } from '../../../../../types/User/branch.types';
import { formatNumberWithCommas } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface ModalServiceProps {
    token: string;
    idItem: string;
    service: IService;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalService({ token, idItem, service, branches, onCloseModal }: ModalServiceProps) {
    const dispatch: AppDispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedService, setEditedService] = useState<IService>({ ...service });
    const [editedIVA, setEditedIVA] = useState(service?.IVA);
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
            setIsEditing(false);
            dispatch(getServices(token));
            onCloseModal();
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    const cancelEditing = (id: string) => {
        setIsEditing(false);
        setEditedService({ ...editedService, [id]: { ...service } });
    };

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información del servicio</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al servicio</h6>
                <div className={styles.containerInput}>
                    {isEditing ? (
                        <select
                            value={editedService.branchId}
                            className={`${styles.inputEdit} p-2 border w-100`}
                            onChange={(e) => handleEditField(e, 'branchId')}
                            
                        >
                            {branches && branches.map((service, index) => (
                                <option key={index} value={service.id}>
                                    {service.nameBranch}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span>
                            {branches && branches.map((branch, index) => (
                                service.branchId === branch.id && (
                                    <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                                )
                            ))}
                        </span>
                    )}
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del servicio</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedService.nameItem}
                                onChange={(e) => handleEditField(e, 'nameItem', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{service?.nameItem}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedService.barCode || ''}
                                onChange={(e) => handleEditField(e, 'barCode', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{service?.barCode ? service.barCode : 'No asignado'}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedService.sellingPrice || ''}
                                onChange={(e) => handleEditField(e, 'sellingPrice', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>
                                {service?.sellingPrice !== null && service?.sellingPrice !== undefined
                                    ? `$ ${formatNumberWithCommas(service.sellingPrice)}`
                                    : 'Precio no asignado'}
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>IVA del servicio</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <select
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedIVA}
                                onChange={(e) => setEditedIVA(parseInt(e.target.value))}
                                >
                                <option value='0'>0</option>
                                <option value='5'>5</option>
                                <option value='19'>19</option>
                            </select>                                
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{service?.IVA}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <select
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedIsDiscounted}
                                onChange={(e) => setEditedIsDiscounted(e.target.value as 'Si' | 'No')}
                            >
                                <option value='Si'>Si</option>
                                <option value='No'>No</option>
                            </select>
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{service?.isDiscounted}</p>
                        )}
                    </div>
                </div>
                {editedIsDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <div className={styles.containerInput}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.inputEdit} p-2 border w-100`}
                                    value={editedService.discountPercentage || ''}
                                    onChange={(e) => handleEditField(e, 'discountPercentage', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{service?.discountPercentage}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>      

            <div className="w-100">
                {isEditing ? (
                    <div className="d-flex align-items-center justify-content-center">
                        <button className={`${styles.buttonSave} border-0`} onClick={() => handleSaveChanges(editedService)}>Guardar</button>
                        <button className={`${styles.buttonCancel} border-0`} onClick={() => cancelEditing(service.id)}>Cancelar</button>
                    </div>
                ) : (
                    <div
                        className={`${styles.divButtonEdit} d-flex align-items-center justify-content-center`}
                        onClick={() => {
                            setEditedService({ ...service });
                            setIsEditing(true);
                        }}
                    >
                        <h6 className="m-0">Edita la información del servicio</h6>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalService;