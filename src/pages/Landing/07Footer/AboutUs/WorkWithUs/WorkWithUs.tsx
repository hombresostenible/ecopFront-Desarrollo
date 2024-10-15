import NavBar from '../../../../../components/Landing/01NavBar/NavBar';
import Footer from '../../../../../components/Landing/07Footer/Footer';
import Construction from '../../../../../assets/Construction.svg';
import styles from './styles.module.css';

function WorkWithUs () {

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={`${styles.containerRegisterYourTransactions} `}>
                    <img src={Construction} alt="Ecopcion" className={styles.image} />
                    <h1 className='text-center'>Trabaja con nosotros</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default WorkWithUs;