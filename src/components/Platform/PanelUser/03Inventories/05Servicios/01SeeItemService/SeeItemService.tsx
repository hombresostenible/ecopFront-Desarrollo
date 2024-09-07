/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
// ELEMENTOS DEL COMPONENTE
import { IService } from '../../../../../../types/User/services.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemServiceProps {
    service: IService;
    branches: IBranch[] | null;
}

function SeeItemService({ service, branches }: SeeItemServiceProps) {

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información del servicio</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al servicio</h6>
                <div className={styles.containerInput}>
                    <span>
                        {branches && branches.map((branch, index) => (
                            service.branchId === branch.id && (
                                <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                            )
                        ))}
                    </span>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del servicio</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{service?.nameItem}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{service?.barCode ? service.barCode : 'No asignado'}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>
                            {service?.sellingPrice !== null && service?.sellingPrice !== undefined
                                ? `$ ${formatNumber(service.sellingPrice)}`
                                : 'Precio no asignado'}
                        </p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>IVA del servicio</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{service?.IVA}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{service?.isDiscounted}</p>
                    </div>
                </div>
                {service.isDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <div className={styles.containerInput}>
                            <p className={`${styles.input} p-2 text-start border`}>{service?.discountPercentage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SeeItemService;