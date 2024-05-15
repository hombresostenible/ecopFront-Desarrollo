/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import Logo from '../../../assets/LogoEcopcion.svg';
import styles from './styles.module.css';

function NavBar () {

    return (
        <div className={`${styles.containerNavBar} position-fixed`}>
            <div className="text-center">
                <Link to="/home">
                    <img src={Logo} alt="Ecopcion" className={`${styles.logo} m-auto`} />
                </Link>
            </div>
            <div>
                <Link to="/configuration">
                    Buscador
                </Link>
            </div>
            <div>
                <Link to="/configuration">
                    {/* 
                        Diagnostico es gratis
                    */}
                    Los puntos son los productos (
                        {/* Plan básico */}
                        Cuentas e inventarios
                        Facturación y POS
                        Nómina
                        CRM Clientes y Proveedores
                        Sostenibilidad
                        Asesorías
                        Notifcaciones estratégicas
                        

                        {/* Plan básico */}
                    )
                </Link>
            </div>
            <div>
                <Link to="/configuration">
                    Notificaciones
                </Link>
            </div>
            <div>
                <Link to="/configuration">
                    La foto es la Configuración
                </Link>
            </div>
        </div>
    );
}

export default NavBar;