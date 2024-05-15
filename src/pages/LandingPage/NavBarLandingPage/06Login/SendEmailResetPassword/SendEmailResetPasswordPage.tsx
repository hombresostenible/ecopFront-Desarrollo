import { Link } from 'react-router-dom';
import NavBarLandingPage from '../../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function SendEmailResetPasswordPage() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.container}>
                <div className={` d-flex flex-column align-items-center justify-content-center`}>
                    <div>
                        <h2 className={`${styles.subtitle} text-center mt-4`}>Restablece tu contraseña</h2>
                        <p className='text-center'>Introduce la dirección de correo que usaste en el registro. Te enviaremos un correo con el link de verificación para que puedas restablecer tu contraseña.</p>

                        <div className=" d-flex flex-column align-items-center justify-content-center position-relative">
                            {/* 
                            {success === false && (
                             */}
                                <div className="mb-3 d-flex flex-column align-items-center justify-content-center">
                                    <h5 className='text-center'>Introduce tu dirección de correo electrónico</h5>
                                    <div className={` d-flex align-items-center justify-content-center gap-3`}>
                                        <input
                                            type="text"
                                            placeholder="Tu email aquí"
                                            // value={emailResetPassword}
                                            className={`${styles.input} p-2 border rounded`}
                                            // onChange={(e) => setEmailResetPassword(e.target.value)}
                                        />
                                        {/* 
                                         */}
                                        {/* 
                                         */}
                                        <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} >Enviar</button>
                                        {/* <button className={`${styles.buttonSubmit} border-0`} onClick={handleSend}>Enviar</button> */}
                                    </div>
                                </div>
                            {/* 
                            )}
                            */}

                            {/* 
                            {success === true && (
                             */}
                                <div className="mb-4 d-flex flex-column">
                                    <h5>Excelente, hemos enviado a tu correo un link para que recuperes tu contraseña</h5>
                                    <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} >¿Te equivocaste con el correo electrónico?</button>
                                    {/* <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} onClick={handleReturnSuccess} >¿Te equivocaste con el correo electrónico?</button> */}
                                </div>
                            {/* 
                            )}
                             */}

                            {/* {error && <div className={`${styles.text__Danger} text-danger position-absolute`}>{error}</div>} */}

                            {/* {sendEmailErrors.length > 0 && (
                                <div className='bg-danger p-2 text-white text-center my-2 border'>
                                    {sendEmailErrors.map((error, i) => (
                                        <p className='m-4' key={i}> {error}</p>
                                    ))}
                                </div>
                            )} */}
                            <p className='m-4'>Si necesitas más ayuda, consulta nuestros medios de comunicación  <Link to="/ecoptionAssistance" className={`${styles.link} text-sky-500 text-decoration-none`} >Ecopción.</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SendEmailResetPasswordPage;