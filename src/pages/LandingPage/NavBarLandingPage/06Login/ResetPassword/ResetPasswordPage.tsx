/* eslint-disable react-hooks/exhaustive-deps */
import Logo from '../../../../../assets/LogoEcopcion.svg';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function ResetPasswordPage() {

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={`${styles.container} d-flex align-items-center justify-content-center vh-100`}>
                <div className={`${styles.container__Component} d-flex flex-column align-items-center justify-content-center`}>
                    <Link to="/home" >
                        <img src={Logo} alt="Ecopcion" className={`${styles.logo} mb-2`}/>
                    </Link>

                    <div className='p-4 position-relative'>
                        <h1 className={`${styles.title} text-center`}>Restablecer contraseña</h1>
                        <form>
                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    placeholder='Nueva contraseña'
                                />
                            </div>

                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    placeholder='Repetir nueva contraseña'
                                />
                            </div>

                            <div className="d-flex mb-4">
                                <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;