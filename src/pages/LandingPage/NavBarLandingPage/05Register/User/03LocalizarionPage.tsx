import { IUser } from "../../../../../types/User/user.types";
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

interface UserInfoSectionProps {
    register: UseFormRegister<IUser>;
    errors: FieldErrors<IUser>;
    onSelect: (department: string, city: string, codeDane: string, subregionCodeDane: string) => void;
    reset: boolean;
}

function LocalizarionPage({ register, errors, onSelect, reset }: UserInfoSectionProps) {

    return (
        <div>
            <h4 className={`${styles.tertiary__Title } text-center`}>Tus datos de contacto</h4>
            <DepartmenAndCity
                onSelect={(department, city, codeDane, subregionCodeDane) => onSelect(department, city, codeDane, subregionCodeDane)}
                reset={reset}
            />

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Dirección</h6>
                <div className={styles.container__Input}>
                    <input
                        type="text"
                        {...register('address', { required: true })}
                        className={`${styles.input} p-2 border `}
                        placeholder='¿Cuál es tu dirección?'
                    />
                    {errors.address && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>La dirección de tu oficina es requerida</p>
                    )}
                </div>
            </div>

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Código postal</h6>
                <div className={styles.container__Input}>
                    <input
                        type="postalCode"
                        {...register('postalCode', { required: true })}
                        className={`${styles.input} p-2 border `}
                        placeholder='¿Cuál es el celular o teléfono fijo de tu oficina principal?'
                        min={0}
                    />
                    {errors.postalCode && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El código postal del usuario es requerido</p>
                    )}
                </div>
            </div>

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Celular o teléfono fijo</h6>
                <div className={styles.container__Input}>
                    <input
                        type="phone"
                        {...register('phone', { required: true })}
                        className={`${styles.input} p-2 border `}
                        placeholder='¿Cuál es el celular o teléfono fijo de tu oficina principal?'
                        min={0}
                    />
                    {errors.phone && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El celular del usuario es requerido</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LocalizarionPage;