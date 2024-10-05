import { useState } from 'react';
import { Link } from 'react-router-dom';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { clearUserErrors } from '../../../../../redux/User/userSlice/userSlice';
import { sendEmailByResetPassword } from '../../../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import NavBarLandingPage from '../../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function SendEmailResetPasswordPage() {
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorUser = useSelector((state: RootState) => state.user.errorUser);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // VALIDA EL FORMATO DEL EMAIL
    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError('El formato del email no es válido');
        } else {
            setEmailError('');
        }
    };

    const handleReturn = async () => {
        try {
            dispatch(clearUserErrors());
            setEmail('');
            setSuccess(false);
            setLoading(false);
        } catch (error) {
            throw new Error('Error en la solicitud de cambio de contraseña');
        }
    };

    const onSubmit = async () => {
        if (!emailError) {
            setLoading(true);
            try {
                await dispatch(sendEmailByResetPassword(email));
                setSuccess(true);
            } catch (error) {
                throw new Error('Error en la solicitud de cambio de contraseña');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <header><NavBarLandingPage /></header>
            <main className={styles.container}>
                <section className={`d-flex flex-column align-items-center justify-content-center`}>
                    <h2 className={`${styles.subtitle} text-center mt-4`}>Restablece tu contraseña</h2>
                    <p className='text-center'>Introduce la dirección de correo que usaste en el registro. Te enviaremos un correo con el link de verificación para que puedas restablecer tu contraseña.</p>

                    <form className="d-flex flex-column align-items-center justify-content-center position-relative" onSubmit={(e) => e.preventDefault()}>
                        <fieldset className="mb-3 d-flex flex-column align-items-center justify-content-center">
                            <legend className='text-center'>Introduce tu dirección de correo electrónico</legend>
                            <div className={`d-flex align-items-center justify-content-center gap-3`}>
                                <input
                                    type="email"
                                    placeholder="Tu email aquí"
                                    value={email}
                                    className={`${styles.input} p-2 border rounded ${emailError ? 'is-invalid' : ''}`}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateEmail(e.target.value);
                                    }}
                                    required
                                />
                                {loading ? 
                                    <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} disabled>
                                        <span className="spinner-border spinner-border-sm" role="status"></span> Enviando...
                                    </button>
                                :
                                    <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} onClick={onSubmit} disabled={!!emailError}>Enviar</button>
                                }
                            </div>
                            {emailError && (
                                <div className="text-danger">{emailError}</div>
                            )}
                        </fieldset>

                        {Array.isArray(errorUser) && errorUser.map((error, i) => (
                            <article key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</article>
                        ))}

                        {success && !errorUser && (
                            <article className={`${styles.info} d-flex flex-column align-items-center justify-content-center`}>
                                <p>Excelente, hemos enviado a tu correo {email} un link para que recuperes tu contraseña</p>
                            </article>
                        )}

                        {errorUser && (
                            <article className="d-flex flex-column align-items-center justify-content-center">
                                <p className='text-danger'>{errorUser}</p>
                                <p>¡Te equivocaste con el correo electrónico?</p>
                                <button className={`${styles.button__Return} border-0 rounded`} onClick={handleReturn}>Clic acá para intentar de nuevo</button>
                            </article>
                        )}

                        <p className='m-4'>Si necesitas más ayuda, consulta nuestros medios de comunicación <Link to="/ecoptionAssistance" className={`${styles.link} text-sky-500 text-decoration-none`}>Ecopción.</Link></p>
                    </form>
                </section>
            </main>

            <footer><Footer /></footer>
        </div>
    );
}

export default SendEmailResetPasswordPage;