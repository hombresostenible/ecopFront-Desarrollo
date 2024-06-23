/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/User/assets.types';
import { IBranch } from '../../../../../types/User/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemAssetProps {
    asset: IAssets;
    branches: IBranch[] | null;
}

function SeeItemAsset({ asset, branches }: SeeItemAssetProps) {

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información del equipo, herramienta o máquina</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al activo</h6>
                <div className={styles.containerInput}>
                    <span>
                        {branches && branches.map((branch, index) => (
                            asset.branchId === branch.id && (
                                <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                            )
                        ))}
                    </span>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del activo</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{asset?.nameItem}</p>
                    </div>
                </div>

                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{asset?.barCode ? asset.barCode : 'No asignado'}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{asset?.inventory}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Marca del activo</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{asset?.brandItem}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Referencia del activo</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{asset?.referenceAssets}</p>
                    </div>
                </div>
                <div className="w-100">
                <h6 className={styles.label}>Condición del activo</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{asset?.conditionAssets}</p>
                    </div>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Estado del activo</h6>
                <div className={styles.containerInput}>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.stateAssets}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>$ {formatNumber(asset?.purchasePriceBeforeTax)}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>IVA del activo</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{asset?.IVA}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>$ {formatNumber(asset?.sellingPrice)}</p> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeeItemAsset;