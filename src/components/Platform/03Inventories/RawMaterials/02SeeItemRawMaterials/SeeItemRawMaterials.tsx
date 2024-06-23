/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
import { IBranch } from '../../../../../types/User/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemRawMaterialsProps {
    rawMaterial: IRawMaterial;
    branches: IBranch[] | null;
}

function SeeItemRawMaterials({ rawMaterial, branches }: SeeItemRawMaterialsProps) {

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información de la meteria prima</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada a la materia prima</h6>
                <div className={styles.containerInput}>
                    <span>
                        {branches && branches.map((branch, index) => (
                            rawMaterial.branchId === branch.id && (
                                <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                            )
                        ))}
                    </span>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre de la materia prima</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.nameItem}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.barCode ? rawMaterial.barCode : 'No asignado'}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.inventory}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidad de medida</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.unitMeasure}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Autoincremento?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.inventoryIncrease}</p>
                    </div>
                </div>
                {rawMaterial.inventoryIncrease === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Periodicidad del Autoincremento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.periodicityAutomaticIncrease ? rawMaterial.periodicityAutomaticIncrease : 'No asignado'}</p>
                        </div>
                    </div>
                )}
            </div>

            {rawMaterial.inventoryIncrease === 'Si' && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Cantidad del autoincremento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.automaticInventoryIncrease}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA de la materia prima</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.IVA}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra antes de impuestos</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {rawMaterial?.purchasePriceBeforeTax !== null && rawMaterial?.purchasePriceBeforeTax !== undefined
                                ? `$ ${formatNumber(rawMaterial.purchasePriceBeforeTax)}`
                                : 'Precio no asignado'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Precio de venta</h6>
                <div className={styles.containerInput}>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {rawMaterial?.sellingPrice !== null && rawMaterial?.sellingPrice !== undefined
                            ? `$ ${formatNumber(rawMaterial.sellingPrice)}`
                            : 'Precio no asignado'}
                    </p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de expiración</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {rawMaterial?.expirationDate ? new Date(rawMaterial.expirationDate).toLocaleDateString() : 'Fecha no asignada'}
                        </p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Retornable?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.returnablePackaging}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad por paquete</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {rawMaterial?.quantityPerPackage !== null && rawMaterial?.quantityPerPackage !== undefined
                                ? rawMaterial.quantityPerPackage
                                : 'Cantidad no asignada'}
                        </p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empacado?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.packaged}</p>
                    </div>
                </div>
                {rawMaterial.packaged === 'Si' && (
                   <div className="w-100">
                    <h6 className={styles.label}>Tipo de empaque principal</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.primaryPackageType}</p>
                    </div>
                </div>
                )}
            </div>
            
            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene empaques individuales?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.individualPackaging}</p>
                    </div>
                </div>
                {rawMaterial.individualPackaging === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque secundario</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.secondaryPackageType}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SeeItemRawMaterials;