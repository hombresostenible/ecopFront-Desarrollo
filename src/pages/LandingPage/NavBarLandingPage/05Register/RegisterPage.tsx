import { Link } from 'react-router-dom';
import Logo from '../../../../assets/LogoEcopcion.svg';
import styles from './styles.module.css';

function RegisterPage() {

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-center`}>
            <div className={`${styles.container__Register} d-flex flex-column align-items-center justify-content-center gap-4`}>
                <Link to="/" >
                    <img src={Logo} alt="Ecopcion" className={`${styles.logo}`} />
                </Link>

                <Link to="/register-user" className='d-flex justify-content-around text-decoration-none'>
                    <div className="d-flex text-decoration-none">
                        <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} >Personas</button>
                    </div>
                </Link>

                <div className={`${styles.program__Funder} d-flex flex-column align-items-center justify-content-center gap-2`} >
                    <p className='m-0 text-center'>Si eres una Cámara de Comercio, Gremio empresarial, Agencia de Cooperación Internacional, ONG, Entidad Pública o Entidad Territorial, regístrate dando clic acá</p>
                    <Link to="/register-program-funder">
                        <button className={`${styles.button__Program_Funder} border-0`} >Financiadores de proyectos</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;