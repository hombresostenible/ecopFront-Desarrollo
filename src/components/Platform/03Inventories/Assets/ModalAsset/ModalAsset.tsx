/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAssets, putAsset } from '../../../../../redux/User/assetsSlice/actions';
import type { AppDispatch } from '../../../../../redux/store';
import { IAssets } from '../../../../../types/User/assets.types';
import { IBranch } from '../../../../../types/User/branch.types';
import { formatNumberWithCommas } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface ModalAssetProps {
    token: string;
    idItem: string;
    asset: IAssets;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

const ModalAsset: React.FC<ModalAssetProps> = ({ token, idItem, asset, branches, onCloseModal }) => {
    const dispatch: AppDispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedAsset, setEditedAsset] = useState<IAssets>({ ...asset });

    const [editedConditionAssets, setEditedConditionAssets] = useState(asset?.conditionAssets);
    const [editedStateAssets, setEditedStateAssets] = useState(asset?.stateAssets);
    const [editedIVA, setEditedIVA] = useState(asset?.IVA);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IAssets,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedAsset((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedAsset((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedAsset: IAssets) => {
        try {
            editedAsset.conditionAssets = editedConditionAssets;
            editedAsset.stateAssets = editedStateAssets;
            editedAsset.IVA = editedIVA;
            await dispatch(putAsset(idItem, editedAsset, token));
            setIsEditing(false);
            dispatch(getAssets(token));
            onCloseModal();
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedAsset({ ...asset });
    };

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información del equipo, herramienta o máquina</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al activo</h6>
                <div className={styles.containerInput}>
                    {isEditing ? (
                        <select
                            value={editedAsset.branchId || ''}
                            className={`${styles.inputEdit} p-2 border w-100`}
                            onChange={(e) => handleEditField(e, 'branchId')}
                        >
                            {branches && branches.map((branch, index) => (
                                <option key={index} value={branch.id}>
                                    {branch.nameBranch}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span>
                            {branches && branches.map((branch, index) => (
                                asset.branchId === branch.id && (
                                    <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                                )
                            ))}
                        </span>
                    )}
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del activo</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedAsset.nameItem}
                                onChange={(e) => handleEditField(e, 'nameItem', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{asset?.nameItem}</p>
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
                                value={editedAsset.barCode || ''}
                                onChange={(e) => handleEditField(e, 'barCode', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{asset?.barCode ? asset.barCode : 'No asignado'}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedAsset.inventory}
                                onChange={(e) => handleEditField(e, 'inventory', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{asset?.inventory}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Marca del activo</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedAsset.brandAssets}
                                onChange={(e) => handleEditField(e, 'brandAssets', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{asset?.brandAssets}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Referencia del activo</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedAsset.referenceAssets}
                                onChange={(e) => handleEditField(e, 'referenceAssets', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{asset?.referenceAssets}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Condición del activo</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <select
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedAsset.conditionAssets}
                                onChange={(e) => setEditedConditionAssets(e.target.value as 'Nuevo' | 'Usado')}
                            >
                                <option value='Nuevo'>Nuevo</option>
                                <option value='Usado'>Usado</option>
                            </select>
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{asset?.conditionAssets}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Estado del activo</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <select
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedAsset.stateAssets}
                                onChange={(e) => setEditedStateAssets(e.target.value as 'Funciona correctamente' | 'Funciona requiere mantenimiento' | 'Dañada requiere cambio' | 'Dañada requiere reparación')}
                            >
                                <option value='Funciona correctamente'>Funciona correctamente</option>
                                <option value='Funciona requiere mantenimiento'>Funciona requiere mantenimiento</option>
                                <option value='Dañada requiere cambio'>Dañada requiere cambio</option>
                                <option value='Dañada requiere reparación'>Dañada requiere reparación</option>
                            </select>
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{asset?.stateAssets}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <input
                                type="text"
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedAsset.purchasePriceBeforeTax}
                                onChange={(e) => handleEditField(e, 'purchasePriceBeforeTax', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>$ {formatNumberWithCommas(asset?.purchasePriceBeforeTax)}</p>
                        )}
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>IVA del activo</h6>
                    <div className={styles.containerInput}>
                        {isEditing ? (
                            <select
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedAsset.IVA ? editedAsset.IVA.toString() : ''}
                                onChange={(e) => setEditedIVA(parseInt(e.target.value))}
                            >
                                <option value='0'>0</option>
                                <option value='5'>5</option>
                                <option value='19'>19</option>
                            </select>
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>{asset?.IVA}</p>
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
                                value={editedAsset.sellingPrice}
                                onChange={(e) => handleEditField(e, 'sellingPrice', 'text')}
                            />
                        ) : (
                            <p className={`${styles.input} p-2 text-start border`}>$ {formatNumberWithCommas(asset?.sellingPrice)}</p> 
                        )}
                    </div>
                </div>
            </div>

            <div className="w-100">
                {isEditing ? (
                    <div className="d-flex align-items-center justify-content-center">
                        <button className={`${styles.buttonSave} border-0`} onClick={() => handleSaveChanges(editedAsset)}>Guardar</button>
                        <button className={`${styles.buttonCancel} border-0`} onClick={cancelEditing}>Cancelar</button>
                    </div>
                ) : (
                    <div
                        className={`${styles.divButtonEdit} d-flex align-items-center justify-content-center`}
                        onClick={() => {
                            setEditedAsset({ ...asset });
                            setIsEditing(true);
                        }}
                    >
                        <h6 className="m-0">Edita la información de la sede</h6>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalAsset;