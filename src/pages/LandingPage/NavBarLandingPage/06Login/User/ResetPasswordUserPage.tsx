/* eslint-disable react-hooks/exhaustive-deps */
import Logo from '../../../../../assets/LogoEcopcion.svg';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function ResetPasswordUserPage() {

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={`${styles.containerLogin} d-flex align-items-center justify-content-center vh-100`}>
                <div className={`${styles.login} d-flex flex-column align-items-center justify-content-center`}>
                    <Link to="/home" >
                        <img src={Logo} alt="Ecopcion" className={`${styles.logo} mb-2`}/>
                    </Link>

                    <div className='p-4 position-relative'>
   
                        <h1 className={`${styles.title} text-center`}>Restablecer contraseña para Usuarios</h1>
                        <form>
                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    className="p-2 mb-3 form-control border"
                                    placeholder='Nueva contraseña'
                                />
                            </div>

                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    className="p-2 mb-3 form-control border"
                                    placeholder='Repetir nueva contraseña'
                                />
                            </div>

                            <div className="d-flex mb-4">
                                <button className={`${styles.buttonLogin} border-0 rounded m-auto text-decoration-none`} type='submit' >Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordUserPage;