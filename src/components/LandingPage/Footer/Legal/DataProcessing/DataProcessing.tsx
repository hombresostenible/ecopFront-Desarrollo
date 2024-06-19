import NavBarLandingPage from '../../../01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../../components/LandingPage/Footer/Footer';
import Construction from '../../../../../assets/Construction.svg';
import styles from './styles.module.css';

function DataProcessing () {

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.container}>
                <div className={`${styles.containerRegisterYourTransactions} `}>
                    <img src={Construction} alt="Ecopcion" className={styles.image} />
                    <h1>Tratamiento de datos</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DataProcessing;