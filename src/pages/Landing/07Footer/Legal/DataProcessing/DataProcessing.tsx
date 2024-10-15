import NavBar from '../../../../../components/Landing/01NavBar/NavBar';
import Footer from '../../../../../components/Landing/07Footer/Footer';
import Construction from '../../../../../assets/Construction.svg';
import styles from './styles.module.css';

function DataProcessing () {

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={`${styles.container__Component} d-flex flex-column align-items-center justify-content-center`}>
                    <img src={Construction} alt="Ecopcion" className={styles.image} />
                    <h1 className='text-center'>Tratamiento de datos</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DataProcessing;