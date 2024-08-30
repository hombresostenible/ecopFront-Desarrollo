import { useState } from 'react';
import { Link } from 'react-router-dom';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { sendEmailByResetPassword } from '../../../../../redux/User/userSlice/actions';
//ELEMENTOS DEL COMPONENTE
import NavBarLandingPage from '../../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function SendEmailResetPasswordPage() {
    const dispatch: AppDispatch = useDispatch();
    const errorUser = useSelector((state: RootState) => state.user.errorUser);

    const [ email, setEmail ] = useState('');
    const [ success, setSuccess ] = useState(false);

    const handleReturnSuccess = async () => {
        try {
            setEmail('');
        } catch (error) {
            throw new Error('Error en la solicitud de cambio de contraseña');
        }
    };

    const onSubmit = async () => {
        try {
            await dispatch(sendEmailByResetPassword(email));
            setSuccess(true);
        } catch (error) {
            throw new Error('Error en la solicitud de cambio de contraseña');
        }
    };

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.container}>
                <div className={` d-flex flex-column align-items-center justify-content-center`}>
                    <h2 className={`${styles.subtitle} text-center mt-4`}>Restablece tu contraseña</h2>
                    <p className='text-center'>Introduce la dirección de correo que usaste en el registro. Te enviaremos un correo con el link de verificación para que puedas restablecer tu contraseña.</p>

                    <div className=" d-flex flex-column align-items-center justify-content-center position-relative">
                        {Array.isArray(errorUser) && errorUser.map((error, i) => (
                            <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                        ))}
                        <div className="mb-3 d-flex flex-column align-items-center justify-content-center">
                            <h5 className='text-center'>Introduce tu dirección de correo electrónico</h5>
                            <div className={` d-flex align-items-center justify-content-center gap-3`}>
                                <input
                                    type="text"
                                    placeholder="Tu email aquí"
                                    value={email}
                                    className={`${styles.input} p-2 border rounded`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} onClick={onSubmit} >Enviar</button>
                            </div>
                        </div>

                        {success && !errorUser && (
                            <div className={`${styles.info} d-flex flex-column align-items-center justify-content-center`}>
                                <h5>Excelente, hemos enviado a tu correo {email} un link para que recuperes tu contraseña</h5>
                                <button className={`${styles.button__Submit} border-0`} onClick={handleReturnSuccess}>¡Te equivocaste con el correo electrónico? Clic acá para intentar de nuevo</button>
                            </div>
                        )}

                        {errorUser &&
                        <div className={`${styles.errorMessage} d-flex flex-column align-items-center justify-content-center`}>
                            <p className='text-danger'>{errorUser}</p>
                            <p>¡Te equivocaste con el correo electrónico?</p>
                            <button className={`${styles.button__Submit} border-0`} onClick={handleReturnSuccess}>Clic acá para intentar de nuevo</button>
                        </div>
                        }

                        <p className='m-4'>Si necesitas más ayuda, consulta nuestros medios de comunicación  <Link to="/ecoptionAssistance" className={`${styles.link} text-sky-500 text-decoration-none`} >Ecopción.</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SendEmailResetPasswordPage;