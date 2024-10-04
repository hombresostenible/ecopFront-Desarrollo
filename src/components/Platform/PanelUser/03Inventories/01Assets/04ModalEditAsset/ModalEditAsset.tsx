import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../../redux/store';
import { getAssets, putAsset } from '../../../../../../redux/User/03Inventories/01InventoryAssetsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../../types/User/assets.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ModalEditAssetProps {
    token: string;
    idItem: string;
    asset: IAssets;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditAsset({ token, idItem, asset, branches, onCloseModal }: ModalEditAssetProps) {
    const dispatch: AppDispatch = useDispatch();

    const [editedAsset, setEditedAsset] = useState<IAssets>({ ...asset });

    const [editedCondition, setEditedCondition] = useState(asset?.conditionAssets);
    const [editedStateAssets, setEditedStateAssets] = useState(asset?.stateAssets);
    const [editedIVA, setEditedIVA] = useState<'No aplica' | 0 | 5 | 19>(asset?.IVA);
    const [editedIsDiscounted, setEditedIsDiscounted] = useState(asset?.isDiscounted);

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
            editedAsset.conditionAssets = editedCondition;
            editedAsset.stateAssets = editedStateAssets;
            editedAsset.isDiscounted = editedIsDiscounted;
            editedAsset.IVA = editedIVA;
            await dispatch(putAsset(idItem, editedAsset, token));
            dispatch(getAssets(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = () => {
        onCloseModal();
        setEditedAsset({ ...asset });
    };

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Edita la información del equipo, herramienta o máquina</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al activo</h6>
                <select
                    value={editedAsset.branchId || ''}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => handleEditField(e, 'branchId')}
                >
                    {branches && branches.map((branch, index) => (
                        <option key={index} value={branch.id}>
                            {branch.nameBranch}
                        </option>
                    ))}
                </select>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.barCode || ''}
                        onChange={(e) => handleEditField(e, 'barCode', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del activo</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.nameItem}
                        onChange={(e) => handleEditField(e, 'nameItem', 'text')}
                    />
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Marca del activo</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.brandItem}
                        onChange={(e) => handleEditField(e, 'brandItem', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Referencia del activo</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.referenceItem}
                        onChange={(e) => handleEditField(e, 'referenceItem', 'text')}
                    />
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Estado del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.stateAssets || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'Funciona correctamente' | 'Funciona requiere mantenimiento' | 'Dañada requiere cambio' | 'Dañada requiere reparacion';
                            setEditedStateAssets(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                stateAssets: value,
                            }));
                        }}
                    >
                        <option value=''>Selecciona una opción</option>
                        <option value='Funciona correctamente'>Funciona correctamente</option>
                        <option value='Funciona requiere mantenimiento'>Funciona requiere mantenimiento</option>
                        <option value='Dañada requiere cambio'>Dañada requiere cambio</option>
                        <option value='Dañada requiere reparacion'>Dañada requiere reparacion</option>
                    </select>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Condición del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.conditionAssets || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'Nuevo' | 'Usado';
                            setEditedCondition(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                conditionAssets: value,
                            }));
                        }}
                    >
                        <option value='Nuevo'>Nuevo</option>
                        <option value='Usado'>Usado</option>
                    </select>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Inventario</h6>
                <input
                    type="number"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedAsset.inventory}
                    onChange={(e) => handleEditField(e, 'inventory', 'number')}
                />
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.purchasePriceBeforeTax}
                        onChange={(e) => handleEditField(e, 'purchasePriceBeforeTax', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.sellingPrice}
                        onChange={(e) => handleEditField(e, 'sellingPrice', 'text')}
                    />
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Equipo con descuento?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.isDiscounted || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'Si' | 'No';
                            setEditedIsDiscounted(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                isDiscounted: value,
                            }));
                        }}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedIsDiscounted && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentaje de descuento</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedAsset.discountPercentage}
                            onChange={(e) => handleEditField(e, 'discountPercentage', 'text')}
                        />
                    </div>
                )}
            </div>

            <div className="w-100">
                <h6 className={styles.label}>IVA del activo</h6>
                <select
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedAsset.IVA || 'No aplica'}
                    onChange={(e) => {
                        const value = e.target.value as 'No aplica' | 0 | 5 | 19;
                        setEditedIVA(value);
                        setEditedAsset((prevEdited) => ({
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

            <div className="d-flex align-items-center justify-content-center">
                <button className={`${styles.button__Submit} border-0`} onClick={() => handleSaveChanges(editedAsset)}>Guardar</button>
                <button className={`${styles.button__Cancel} border-0`} onClick={cancelEditing}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditAsset;