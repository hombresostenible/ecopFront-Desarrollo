import { Link } from 'react-router-dom';
import Logo from '../../../../assets/LogoEcopcion.svg';
import styles from './styles.module.css';

function RegisterPage() {

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-center`}>
            <div className={`${styles.containerRegister} d-flex align-items-center justify-content-center`}>
                <div className={`${styles.register} d-flex flex-column align-items-center justify-content-center`}>
                    <Link to="/" >
                        <img src={Logo} alt="Ecopcion" className={`${styles.logo}`} />
                    </Link>

                    <div>
                        <h1 className={`${styles.title} text-center mb-2`}>Regístrate</h1>
                        <div className='d-flex justify-content-around'>
                            <div className=''>
                                <Link to="/register-user">
                                    <button
                                        className={`${styles.buttonRegister} m-2 border-0`}
                                    >
                                        Personas
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.registerProgramFunder}`} >
                        <p className='text-center mb-2'>Si eres una Cámara de Comercio, Gremio empresarial, Agencia de Cooperación Internacional, ONG, Entidad Pública o Entidad Territorial, regístrate dando clic acá</p>
                        <Link to="/register-programFunder">
                            <button
                                className={`${styles.buttonRegisterProgramFunder} border-0`}
                            >
                                Financiadores de proyectos
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;