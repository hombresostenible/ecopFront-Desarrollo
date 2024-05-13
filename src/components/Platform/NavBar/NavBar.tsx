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
        </div>
    );
}

export default NavBar;