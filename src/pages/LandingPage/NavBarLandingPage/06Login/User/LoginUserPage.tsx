/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import Logo from '../../../assets/LogoEcopcion.svg';
import styles from './styles.module.css';

function LoginUserPage() {
    
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={`${styles.containerLogin} d-flex align-items-center justify-content-center vh-100`}>
                <div className={`${styles.login} d-flex flex-column align-items-center justify-content-center`}>
                    <Link to="/login">
                        <img src={Logo} alt="Ecopcion" className={`${styles.logo} mb-5`}/>
                    </Link>
                    
                    <div className='p-4 position-relative'>
                        <h1 className={`${styles.title} text-center`}>Inicio de Sesión para Usuarios</h1>
                        <form>
                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type="email"
                                    className="p-2 mb-3 form-control border"
                                    placeholder='Email del usuario'
                                />
                            </div>

                            <div className='mb-3'>
                                <div className={`${styles.password} d-flex align-items-center justify-content-center position-relative`}>
                                    <input
                                        className="p-2 mb-3 form-control border"
                                        placeholder='Contraseña'
                                    />
                                </div>
                            </div>
                            
                            <div className="d-flex mb-4">
                                <button className={`${styles.buttonLogin} border-0 rounded m-auto text-decoration-none`} type='submit' >Login</button>
                            </div>  
                        </form>
                        <p className='m-0 text-center'>No tienes cuenta? <Link to="/register-user" className={`${styles.link} text-sky-500 text-decoration-none`}>Regístrate acá</Link></p>
                        <p className='text-center'><Link to="/reset-password-user" className={`${styles.link} text-sky-500 text-decoration-none`}>¿Has olvidado la contraseña?</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginUserPage;