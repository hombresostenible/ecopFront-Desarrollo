import NavBarLandingPage from '../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../components/LandingPage/Footer/Footer';
import Construction from '../../../../assets/Construction.svg';
import styles from './styles.module.css';

function FastSimulatorPage() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.container}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <img src={Construction} alt="Ecopcion" className={styles.image} />   
                    <h1>Simulación Rápida</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FastSimulatorPage;
