import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../../redux/store';
import { getMerchandises, putMerchandise } from '../../../../../../redux/User/merchandiseSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IMerchandise } from '../../../../../../types/User/merchandise.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ModalEditMerchandiseProps {
    token: string;
    idItem: string;
    merchandise: IMerchandise;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditMerchandise({ token, idItem, merchandise, branches, onCloseModal }: ModalEditMerchandiseProps) {
    const dispatch: AppDispatch = useDispatch();

    const [editedMerchandise, setEditedMerchandise] = useState<IMerchandise>({ ...merchandise });
    const [editedUnitMeasure, setEditedUnitMeasure] = useState(merchandise?.unitMeasure);
    const [editedInventoryIncrease, setEditedInventoryIncrease] = useState(merchandise?.inventoryIncrease || 'No');
    const [editedPeriodicityAutomaticIncrease, setEditedPeriodicityAutomaticIncrease] = useState(merchandise?.periodicityAutomaticIncrease);
    const [editedIVA, setEditedIVA] = useState<'No aplica' | 0 | 5 | 19>(merchandise?.IVA);
    const [editedPackaged, setEditedPackaged] = useState(merchandise?.packaged || 'No');
    const [editedPrimaryPackageType, setEditedPrimaryPackageType] = useState(merchandise?.primaryPackageType);    
    const [editedExpirationDate, setEditedExpirationDate] = useState<Date | undefined>(merchandise?.expirationDate ? new Date(merchandise.expirationDate) : undefined);
    const currentDate = new Date().toISOString().split('T')[0];
    const [editedReturnablePackaging, setEditedReturnablePackaging] = useState(merchandise?.returnablePackaging);
    const [editedIndividualPackaging, setEditedIndividualPackaging] = useState(merchandise?.individualPackaging);
    const [editedSecondaryPackageType, setEditedSecondaryPackageType] = useState(merchandise?.secondaryPackageType);
    const [editedIsDiscounted, setEditedIsDiscounted] = useState(merchandise?.isDiscounted);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IMerchandise,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedMerchandise((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedMerchandise((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedMerchandise: IMerchandise) => {
        try {
            editedMerchandise.unitMeasure = editedUnitMeasure;
            editedMerchandise.inventoryIncrease = editedInventoryIncrease;
            editedMerchandise.periodicityAutomaticIncrease = editedPeriodicityAutomaticIncrease;
            editedMerchandise.IVA = editedIVA;
            editedMerchandise.packaged = editedPackaged;
            editedMerchandise.primaryPackageType = editedPrimaryPackageType;
            editedMerchandise.expirationDate = editedExpirationDate;
            editedMerchandise.returnablePackaging = editedReturnablePackaging;
            editedMerchandise.individualPackaging = editedIndividualPackaging;
            editedMerchandise.secondaryPackageType = editedSecondaryPackageType;
            editedMerchandise.isDiscounted = editedIsDiscounted;
            if (editedInventoryIncrease === 'No') {
                editedMerchandise.periodicityAutomaticIncrease = undefined;
                editedMerchandise.automaticInventoryIncrease = 0;
            }
            if (editedPackaged === 'No') editedMerchandise.primaryPackageType = undefined;
            if (editedIndividualPackaging === 'No') editedMerchandise.secondaryPackageType = undefined;

            await dispatch(putMerchandise(idItem, editedMerchandise, token));
            dispatch(getMerchandises(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = (id: string) => {
        onCloseModal();
        setEditedMerchandise({ ...editedMerchandise, [id]: { ...merchandise } });
    };

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Edita la información de la mercancía</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada a la mercancía</h6>
                <select
                    value={editedMerchandise.branchId}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => handleEditField(e, 'branchId')}
                >
                    {branches && branches.map((merchandise, index) => (
                        <option key={index} value={merchandise.id}>
                            {merchandise.nameBranch}
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
                        value={editedMerchandise.barCode || ''}
                        onChange={(e) => handleEditField(e, 'barCode', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre de la mercancía</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedMerchandise.nameItem}
                        onChange={(e) => handleEditField(e, 'nameItem', 'text')}
                    />
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Marca de la mercancía</h6>
                <input
                    type="text"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedMerchandise.brandItem}
                    onChange={(e) => handleEditField(e, 'brandItem', 'text')}
                />
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empacado?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedPackaged}
                        onChange={(e) => setEditedPackaged(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedPackaged === 'Si' && (
                   <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque principal</h6>
                        <select
                            className={`${styles.input} mb-3 p-2 border`}
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
                )}                
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene empaques individuales?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedIndividualPackaging}
                        onChange={(e) => setEditedIndividualPackaging(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedIndividualPackaging === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque secundario</h6>
                        <select
                            className={`${styles.input} mb-3 p-2 border`}
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
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad por paquete</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedMerchandise.quantityPerPackage || 1}
                        onChange={(e) => handleEditField(e, 'quantityPerPackage', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empaque retornable?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedReturnablePackaging}
                        onChange={(e) => setEditedReturnablePackaging(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedMerchandise.inventory}
                        onChange={(e) => handleEditField(e, 'inventory', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidad de medida</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
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

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Autoincremento?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedInventoryIncrease}
                        onChange={(e) => setEditedInventoryIncrease(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedInventoryIncrease === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Periodicidad del Autoincremento</h6>
                        <select
                            className={`${styles.input} mb-3 p-2 border`}
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
                )}
            </div>

            {editedInventoryIncrease === 'Si' && (
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad del autoincremento</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedMerchandise.automaticInventoryIncrease || 1}
                        onChange={(e) => handleEditField(e, 'automaticInventoryIncrease', 'text')}
                    />
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedMerchandise.purchasePriceBeforeTax}
                        onChange={(e) => handleEditField(e, 'purchasePriceBeforeTax', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedMerchandise.sellingPrice || ''}
                        onChange={(e) => handleEditField(e, 'sellingPrice', 'text')}
                    />
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
                            value={editedMerchandise.discountPercentage || ''}
                            onChange={(e) => handleEditField(e, 'discountPercentage', 'text')}
                        />
                    </div>
                )}
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Fecha de expiración</h6>
                <input
                    type="date"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedExpirationDate ? editedExpirationDate.toISOString().split('T')[0] : currentDate}
                    onChange={(e) => setEditedExpirationDate(new Date(e.target.value))}
                />
            </div>

            <div className="w-100">
                <h6 className={styles.label}>IVA de la mercancía</h6>
                <select
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedMerchandise.IVA}
                    onChange={(e) => setEditedIVA(Number(e.target.value) as 0 | 5 | 19)}
                    >
                        <option value={0}>0 %</option>
                        <option value={5}>5 %</option>
                        <option value={19}>19 %</option>
                </select>
            </div>

            <div className="d-flex align-items-center justify-content-center">
                <button className={`${styles.button__Submit} border-0`} onClick={() => handleSaveChanges(editedMerchandise)}>Guardar</button>
                <button className={`${styles.button__Cancel} border-0`} onClick={() => cancelEditing(merchandise.id)}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditMerchandise;