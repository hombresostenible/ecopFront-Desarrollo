import { IUser } from "../../../../../types/User/user.types";
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from './styles.module.css';

interface UserInfoSectionProps {
    register: UseFormRegister<IUser>;
    errors: FieldErrors<IUser>;
}

function UserInformationPage({ register, errors }: UserInfoSectionProps) {

    return (
        <div>
            <h5 className="text-dark text-center">Tu información personal</h5>
            <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                    <h6 className={styles.label}>Nombres</h6>
                    <div className={styles.container__Input}>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className={`${styles.input} p-2 border form-control`}
                            placeholder='¿Cuáles son tus nombres?'
                        />
                        {errors.name && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Tus nombres son requeridos</p>
                        )}
                    </div>
                </div>
                <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                    <h6 className={styles.label}>Apellidos</h6>
                    <div className={styles.container__Input}>
                        <input
                            type="text"
                            {...register('lastName', { required: true })}
                            className={`${styles.input} p-2 border form-control`}
                            placeholder='¿Cuáles son tu apellidos?'
                        />
                        {errors.lastName && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Tus apellidos son requeridos</p>
                        )}
                    </div>
                </div>
            </div>

                

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Tipo de identificación</h6>
                <div className={styles.container__Input}>
                    <select
                        {...register('typeDocumentId', { required: true })}
                        className={`${styles.input} p-2 border form-control`}
                    >
                        <option value='NIT'>NIT</option>
                        <option value='Cedula de Ciudadania'>Cédula de Ciudadanía</option>
                        <option value='Cedula de Extranjeria'>Cédula de Extranjería</option>
                        <option value='Pasaporte'>Pasaporte</option>
                    </select>
                    {errors.typeDocumentId && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de documento del usuario es requerido</p>
                    )}
                </div>
            </div>

            <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                    <h6 className={styles.label}>Número de identificación</h6>
                    <div className={styles.container__Input}>
                        <input
                            type="number"
                            {...register('documentId', { 
                                required: true,
                                pattern: /^\d{1,10}$/ // Expresión regular para hasta 10 dígitos
                            })}
                            className={`${styles.input} p-2 border form-control`}
                            placeholder='¿Cuál es tu número de identificación?'
                            min={0}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {errors.documentId && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad es requerido</p>
                        )}
                    </div>
                </div>
                
                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                    <h6 className={styles.label}>Dígito de verificación</h6>
                    <div className={styles.container__Input}>
                        <input
                            type="number"
                            {...register('verificationDigit', {
                                required: true,
                                pattern: /^\d{1}$/ // Expresión regular para 9 dígitos exactos
                            })}
                            className={`${styles.input} p-2 border form-control`}
                            placeholder='¿Cuál es el dígito de verificación de tu empresa?'
                            min={0}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {errors.verificationDigit && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El dígito de verificación es requerido</p>
                        )}
                    </div>
                </div>
            </div>

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>¿Tu negocio tiene nombre comercial?</h6>
                <div className={styles.container__Input}>
                    <input
                        type="text"
                        {...register('commercialName')}
                        className={`${styles.input} p-2 border form-control`}
                        placeholder='Nombre comercial de tu negocio si lo tiene'
                    />
                </div>
            </div>
        </div>
    );
}

export default UserInformationPage;