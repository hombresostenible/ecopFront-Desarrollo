/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
// ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../../types/User/products.types';
import { IBranch } from '../../../../../types/User/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemProductProps {
    product: IProduct;
    branches: IBranch[] | null;
}

function SeeItemProduct({ product, branches }: SeeItemProductProps) {

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información del producto</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al producto</h6>
                <div className={styles.containerInput}>
                    <span>
                        {branches && branches.map((branch, index) => (
                            product.branchId === branch.id && (
                                <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                            )
                        ))}
                    </span>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del producto</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.nameItem}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.barCode ? product.barCode : 'No asignado'}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.inventory}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidad de medida</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.unitMeasure}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Autoincremento?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.inventoryIncrease}</p>
                    </div>
                </div>
                {product.inventoryIncrease === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Periodicidad del Autoincremento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{product?.periodicityAutomaticIncrease ? product.periodicityAutomaticIncrease : 'No asignado'}</p>
                        </div>
                    </div>
                )}
            </div>

            {product.inventoryIncrease === 'Si' && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Cantidad del autoincremento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{product?.automaticInventoryIncrease}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA del producto</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.IVA}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {product?.sellingPrice !== null && product?.sellingPrice !== undefined
                                ? `$ ${formatNumber(product.sellingPrice)}`
                                : 'Precio no asignado'}
                        </p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de expiración</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {product?.expirationDate ? new Date(product.expirationDate).toLocaleDateString() : 'Fecha no asignada'}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Retornable?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.returnablePackaging}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad por paquete</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {product?.quantityPerPackage !== null && product?.quantityPerPackage !== undefined
                                ? product.quantityPerPackage
                                : 'Precio no asignado'}
                        </p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empacado?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.packaged}</p>
                    </div>
                </div>
                {product.packaged === 'Si' && (
                   <div className="w-100">
                    <h6 className={styles.label}>Tipo de empaque principal</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.primaryPackageType}</p>
                    </div>
                </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene empaques individuales?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.individualPackaging}</p>
                    </div>
                </div>
                {product.individualPackaging === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque secundario</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{product?.secondaryPackageType}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.isDiscounted}</p>
                    </div>
                </div>
                {product.isDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{product?.discountPercentage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SeeItemProduct;