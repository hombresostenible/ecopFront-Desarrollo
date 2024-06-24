/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
// ELEMENTOS DEL COMPONENTE
import { IMerchandise } from '../../../../../types/User/merchandise.types';
import { IBranch } from '../../../../../types/User/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemMerchandiseProps {
    merchandise: IMerchandise;
    branches: IBranch[] | null;
}

function SeeItemMerchandise({ merchandise, branches }: SeeItemMerchandiseProps) {

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información de la mercancía</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada a la mercancía</h6>
                <div className={styles.containerInput}>
                    <span>
                        {branches && branches.map((branch, index) => (
                            merchandise.branchId === branch.id && (
                                <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                            )
                        ))}
                    </span>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre de la mercancía</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.nameItem}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.barCode ? merchandise.barCode : 'No asignado'}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.inventory}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidad de medida</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.unitMeasure}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Autoincremento?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.inventoryIncrease}</p>
                    </div>
                </div>
                {merchandise.inventoryIncrease === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Periodicidad del Autoincremento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{merchandise?.periodicityAutomaticIncrease ? merchandise.periodicityAutomaticIncrease : 'No asignado'}</p>
                        </div>
                    </div>
                )}
            </div>

            {merchandise.inventoryIncrease === 'Si' && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Cantidad del autoincremento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{merchandise?.automaticInventoryIncrease}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {merchandise?.purchasePriceBeforeTax !== null && merchandise?.purchasePriceBeforeTax !== undefined
                                ? `$ ${formatNumber(merchandise.purchasePriceBeforeTax)}`
                                : 'Precio no asignado'}
                        </p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>IVA de la mercancía</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.IVA}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {merchandise?.sellingPrice !== null && merchandise?.sellingPrice !== undefined
                                ? `$ ${formatNumber(merchandise.sellingPrice)}`
                                : 'Precio no asignado'}
                        </p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de expiración</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {merchandise?.expirationDate ? new Date(merchandise.expirationDate).toLocaleDateString() : 'Fecha no asignada'}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Retornable?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.returnablePackaging}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad por paquete</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {merchandise?.quantityPerPackage !== null && merchandise?.quantityPerPackage !== undefined
                                ? merchandise.quantityPerPackage
                                : 'Cantidad no asignada'}
                        </p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empacado?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.packaged}</p>
                    </div>
                </div>
                {merchandise.packaged === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque principal</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{merchandise?.primaryPackageType}</p>
                        </div>
                    </div>
                )}                
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene empaques individuales?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.individualPackaging}</p>
                    </div>
                </div>

                {merchandise.individualPackaging === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque secundario</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{merchandise?.secondaryPackageType}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.isDiscounted}</p>
                    </div>
                </div>
                {merchandise.isDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{merchandise?.discountPercentage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SeeItemMerchandise;