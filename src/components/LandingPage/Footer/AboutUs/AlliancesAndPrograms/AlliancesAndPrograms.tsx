import NavBarLandingPage from '../../../01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../../components/LandingPage/Footer/Footer';
import Construction from '../../../../../assets/Construction.svg';
import styles from './styles.module.css';

function AlliancesAndPrograms () {

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.container}>
                <div className={`${styles.containerRegisterYourTransactions} `}>
                    <img src={Construction} alt="Ecopcion" className={styles.image} />
                    <h1>Alianzas y programas</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AlliancesAndPrograms;