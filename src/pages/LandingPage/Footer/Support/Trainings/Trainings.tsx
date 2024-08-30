import NavBarLandingPage from '../../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../../components/LandingPage/Footer/Footer';
import Construction from '../../../../../assets/Construction.svg';
import styles from './styles.module.css';

function Trainings () {

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.container}>
                <div className={`${styles.container__Component} d-flex flex-column align-items-center justify-content-center`}>
                    <img src={Construction} alt="Ecopcion" className={styles.image} />
                    <h1 className='text-center'>Capacitaciones</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Trainings;