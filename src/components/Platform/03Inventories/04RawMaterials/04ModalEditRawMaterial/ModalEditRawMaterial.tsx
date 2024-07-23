/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import { getRawMaterials, putRawMaterial } from '../../../../../redux/User/rawMaterialSlice/actions';
import type { AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
import { IBranch } from '../../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ModalEditRawMaterialProps {
    token: string;
    idItem: string;
    rawMaterial: IRawMaterial;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditRawMaterial({ token, idItem, rawMaterial, branches, onCloseModal }: ModalEditRawMaterialProps) {
    const dispatch: AppDispatch = useDispatch();

    const [editedRawMaterial, setEditedRawMaterial] = useState<IRawMaterial>({ ...rawMaterial });
    const [editedUnitMeasure, setEditedUnitMeasure] = useState(rawMaterial?.unitMeasure);
    const [editedInventoryIncrease, setEditedInventoryIncrease] = useState(rawMaterial?.inventoryIncrease || 'No');
    const [editedPeriodicityAutomaticIncrease, setEditedPeriodicityAutomaticIncrease] = useState(rawMaterial?.periodicityAutomaticIncrease);
    const [editedIVA, setEditedIVA] = useState<0 | 5 | 19>(rawMaterial?.IVA);
    const [editedPackaged, setEditedPackaged] = useState(rawMaterial?.packaged || 'No');
    const [editedPrimaryPackageType, setEditedPrimaryPackageType] = useState(rawMaterial?.primaryPackageType);    
    const [editedExpirationDate, setEditedExpirationDate] = useState<Date | undefined>(rawMaterial?.expirationDate ? new Date(rawMaterial.expirationDate) : undefined);
    const currentDate = new Date().toISOString().split('T')[0];
    const [editedReturnablePackaging, setEditedReturnablePackaging] = useState(rawMaterial?.returnablePackaging);
    const [editedIndividualPackaging, setEditedIndividualPackaging] = useState(rawMaterial?.individualPackaging);
    const [editedSecondaryPackageType, setEditedSecondaryPackageType] = useState(rawMaterial?.secondaryPackageType);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IRawMaterial,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedRawMaterial((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedRawMaterial((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedRawMaterial: IRawMaterial) => {
        try {
            editedRawMaterial.unitMeasure = editedUnitMeasure;
            editedRawMaterial.inventoryIncrease = editedInventoryIncrease;
            editedRawMaterial.periodicityAutomaticIncrease = editedPeriodicityAutomaticIncrease;
            editedRawMaterial.IVA = editedIVA;
            editedRawMaterial.packaged = editedPackaged;
            editedRawMaterial.primaryPackageType = editedPrimaryPackageType;
            editedRawMaterial.expirationDate = editedExpirationDate;
            editedRawMaterial.returnablePackaging = editedReturnablePackaging;
            editedRawMaterial.individualPackaging = editedIndividualPackaging;
            editedRawMaterial.secondaryPackageType = editedSecondaryPackageType;
            if (editedInventoryIncrease === 'No') {
                editedRawMaterial.periodicityAutomaticIncrease = undefined;
                editedRawMaterial.automaticInventoryIncrease = 0;
            }
            if (editedPackaged === 'No') editedRawMaterial.primaryPackageType = undefined;
            if (editedIndividualPackaging === 'No') editedRawMaterial.secondaryPackageType = undefined;

            await dispatch(putRawMaterial(idItem, editedRawMaterial, token));
            dispatch(getRawMaterials(token));
            onCloseModal();
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    const cancelEditing = (id: string) => {
        setEditedRawMaterial({ ...editedRawMaterial, [id]: { ...rawMaterial } });
    };

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Edita la información de la meteria prima</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada a la materia prima</h6>
                <div className={styles.containerInput}>
                    <select
                        value={editedRawMaterial.branchId}
                        className={`${styles.inputEdit} p-2 border w-100`}
                        onChange={(e) => handleEditField(e, 'branchId')}
                        
                    >
                        {branches && branches.map((rawMaterial, index) => (
                            <option key={index} value={rawMaterial.id}>
                                {rawMaterial.nameBranch}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre de la materia prima</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="text"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedRawMaterial.nameItem}
                            onChange={(e) => handleEditField(e, 'nameItem', 'text')}
                        />
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="text"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedRawMaterial.barCode || ''}
                            onChange={(e) => handleEditField(e, 'barCode', 'text')}
                        />
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="number"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedRawMaterial.inventory}
                            onChange={(e) => handleEditField(e, 'inventory', 'number')}
                            min={0}
                        />
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidad de medida</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedUnitMeasure}
                            onChange={(e) => setEditedUnitMeasure(e.target.value as 'Unidades' | 'Ristra' | 'Decena' | 'Docena' | 'Miligramo' | 'Gramo' | 'Media libra' | 'Libra' | 'Kilogramo' | 'Caja' | 'Paca' | 'Arroba' | 'Bulto' | 'Saco' | 'Tonelada' | 'Mililitro' | 'Onza' | 'Litro' | 'Galon' | 'Pimpina' | 'Metro cubico' | 'Milimetro' | 'Centrimetro' | 'Pulgada' | 'Metro' | 'Centimetro cuadrado' | 'Metro cuadrado')}
                        >
                            <option value='Unidades'>Unidades</option>
                            <option value='Ristra'>Ristra</option>
                            <option value='Decena'>Decena</option>
                            <option value='Docena'>Docena</option>
                            <option value='Miligramo'>Miligramo </option>
                            <option value='Gramo'>Gramo </option>
                            <option value='Media libra'>Media libra</option>
                            <option value='Libra'>Libra</option>
                            <option value='Kilogramo'>Kilogramo</option>
                            <option value='Caja'>Caja</option>
                            <option value='Paca'>Paca</option>
                            <option value='Arroba'>Arroba</option>
                            <option value='Bulto'>Bulto</option>
                            <option value='Saco'>Saco</option>
                            <option value='Tonelada'>Tonelada</option>
                            <option value='Mililitro'>Mililitro</option>
                            <option value='Onza'>Onza</option>
                            <option value='Litro'>Litro</option>
                            <option value='Galon'>Galón</option>
                            <option value='Pimpina'>Pimpina</option>
                            <option value='Metro cubico'>Metro cíbico</option>
                            <option value='Milimetro'>Milimetro</option>
                            <option value='Centrimetro'>Centrimetro</option>
                            <option value='Pulgada'>Pulgada</option>
                            <option value='Metro'>Metro</option>
                            <option value='Centimetro cuadrado'>Centímetro cuadrado</option>
                            <option value='Metro cuadrado'>Metro cuadrado</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Autoincremento?</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedInventoryIncrease}
                            onChange={(e) => setEditedInventoryIncrease(e.target.value as 'Si' | 'No')}
                        >
                            <option value='Si'>Si</option>
                            <option value='No'>No</option>
                        </select>
                    </div>
                </div>
                {editedInventoryIncrease === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Periodicidad del Autoincremento</h6>
                        <div className={styles.containerInput}>
                            <select
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedPeriodicityAutomaticIncrease || ''}
                                onChange={(e) => setEditedPeriodicityAutomaticIncrease(e.target.value as 'Diario' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral')}
                            >
                                <option value='Diario'>Diario</option>
                                <option value='Semanal'>Semanal</option>
                                <option value='Quincenal'>Quincenal</option>
                                <option value='Mensual'>Mensual</option>
                                <option value='Bimestral'>Bimestral</option>
                                <option value='Trimestral'>Trimestral</option>
                                <option value='Semestral'>Semestral</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {editedInventoryIncrease === 'Si' && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Cantidad del autoincremento</h6>
                        <div className={styles.containerInput}>
                            <input
                                type="number"
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedRawMaterial.automaticInventoryIncrease}
                                onChange={(e) => handleEditField(e, 'automaticInventoryIncrease', 'number')}
                                min={0}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA de la materia prima</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedIVA}
                            onChange={(e) => setEditedIVA(Number(e.target.value) as 0 | 5 | 19)}
                        >
                            <option value={0}>0 %</option>
                            <option value={5}>5 %</option>
                            <option value={19}>19 %</option>
                        </select>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra antes de impuestos</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="number"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedRawMaterial.purchasePriceBeforeTax || ''}
                            onChange={(e) => handleEditField(e, 'purchasePriceBeforeTax', 'number')}
                            min={0}
                        />
                    </div>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Precio de venta</h6>
                <div className={styles.containerInput}>
                    <input
                        type="number"
                        className={`${styles.inputEdit} p-2 border w-100`}
                        value={editedRawMaterial.sellingPrice || ''}
                        onChange={(e) => handleEditField(e, 'sellingPrice', 'number')}
                        min={0}
                    />
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de expiración</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="date"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedExpirationDate ? editedExpirationDate.toISOString().split('T')[0] : currentDate}
                            onChange={(e) => setEditedExpirationDate(new Date(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Retornable?</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedReturnablePackaging}
                            onChange={(e) => setEditedReturnablePackaging(e.target.value as 'Si' | 'No')}
                        >
                            <option value='Si'>Si</option>
                            <option value='No'>No</option>
                        </select>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad por paquete</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="number"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedRawMaterial.quantityPerPackage || ''}
                            onChange={(e) => handleEditField(e, 'quantityPerPackage', 'number')}
                            min={0}
                        />
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empacado?</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedPackaged}
                            onChange={(e) => setEditedPackaged(e.target.value as 'Si' | 'No')}
                        >
                            <option value='Si'>Si</option>
                            <option value='No'>No</option>
                        </select>
                    </div>
                </div>
                {editedPackaged === 'Si' && (
                   <div className="w-100">
                    <h6 className={styles.label}>Tipo de empaque principal</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedPrimaryPackageType || ''}
                            onChange={(e) => setEditedPrimaryPackageType(e.target.value as 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas')}
                        >
                            <option value='Papel'>Papel</option>
                            <option value='Papel de archivo'>Papel de archivo</option>
                            <option value='Carton'>Cartón</option>
                            <option value='Aluminio'>Aluminio</option>
                            <option value='Plegadiza'>Plegadiza</option>
                            <option value='Vidrio'>Vidrio</option>
                            <option value='PET / PETE Polietileno Tereftalato'>PET / PETE Polietileno Tereftalato</option>
                            <option value='HDPE Polietileno de alta densidad'>HDPE Polietileno de alta densidad</option>
                            <option value='PVC Policloruro de Vinilo'>PVC Policloruro de Vinilo</option>
                            <option value='LDPE Polietileno de baja densidad'>LDPE Polietileno de baja densidad</option>
                            <option value='PP Polipropileno'>PP Polipropileno</option>
                            <option value='PS Poliestireno'>PS Poliestireno</option>
                            <option value='Otros plasticos (Policarbonato, estireno, nylon)'>Otros plásticos (Policarbonato, estireno, nylon)</option>
                            <option value='Hierro'>Hierro</option>
                            <option value='Icopor'>Icopor</option>
                            <option value='Biodegradable'>Biodegradable</option>
                            <option value='Plastico de burbujas'>Plástico de burbujas</option>
                        </select>
                    </div>
                </div>
                )}
            </div>
            
            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene empaques individuales?</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedIndividualPackaging}
                            onChange={(e) => setEditedIndividualPackaging(e.target.value as 'Si' | 'No')}
                        >
                            <option value='Si'>Si</option>
                            <option value='No'>No</option>
                        </select>
                    </div>
                </div>
                {editedIndividualPackaging === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque secundario</h6>
                        <div className={styles.containerInput}>
                            <select
                                className={`${styles.inputEdit} p-2 border w-100`}
                                value={editedSecondaryPackageType || ''}
                                onChange={(e) => setEditedSecondaryPackageType(e.target.value as 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas')}
                            >
                                <option value='Papel'>Papel</option>
                                <option value='Papel de archivo'>Papel de archivo</option>
                                <option value='Carton'>Cartón</option>
                                <option value='Aluminio'>Aluminio</option>
                                <option value='Plegadiza'>Plegadiza</option>
                                <option value='Vidrio'>Vidrio</option>
                                <option value='PET / PETE Polietileno Tereftalato'>PET / PETE Polietileno Tereftalato</option>
                                <option value='HDPE Polietileno de alta densidad'>HDPE Polietileno de alta densidad</option>
                                <option value='PVC Policloruro de Vinilo'>PVC Policloruro de Vinilo</option>
                                <option value='LDPE Polietileno de baja densidad'>LDPE Polietileno de baja densidad</option>
                                <option value='PP Polipropileno'>PP Polipropileno</option>
                                <option value='PS Poliestireno'>PS Poliestireno</option>
                                <option value='Otros plasticos (Policarbonato, estireno, nylon)'>Otros plásticos (Policarbonato, estireno, nylon)</option>
                                <option value='Hierro'>Hierro</option>
                                <option value='Icopor'>Icopor</option>
                                <option value='Biodegradable'>Biodegradable</option>
                                <option value='Plastico de burbujas'>Plástico de burbujas</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-100">
                <div className="d-flex align-items-center justify-content-center">
                    <button className={`${styles.buttonSave} border-0`} onClick={() => handleSaveChanges(editedRawMaterial)}>Guardar</button>
                    <button className={`${styles.buttonCancel} border-0`} onClick={() => cancelEditing(rawMaterial.id)}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditRawMaterial;