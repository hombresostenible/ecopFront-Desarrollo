import { Link } from 'react-router-dom';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function SustainabilityIndicatorsPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <div>
                            <h1 className={styles.title}>Elige la familia de Indicadores de Sostenibilidad que quieres calcular</h1>
                        </div>
                        <div>
                            <div className={`${styles.containerIndicators} gap-4`} >
                                <Link to="/indicators/sustainability-indicators/asg-indicators" className={`${styles.linkIndicators} p-2 text-decoration-none text-center d-flex align-items-center justify-content-center`} >
                                    <div className={`${styles.cardIndicatorASG} p-3`} >
                                        <h4 className={`${styles.titleIndicator} text-center`}>Indicadores ASG – ambientales, sociales y gobernanza </h4>
                                    </div>
                                </Link>
                                <Link to="/indicators/sustainability-indicators/circular-economy" className={`${styles.linkIndicators} p-2 text-decoration-none text-center d-flex align-items-center justify-content-center`} >
                                    <div className={`${styles.cardIndicatorCircularEconomy} p-3`} >
                                        <h4 className={`${styles.titleIndicator} text-center`}>Economía circular</h4>
                                    </div>
                                </Link>
                                <Link to="/indicators/sustainability-indicators/climate-change" className={`${styles.linkIndicators} p-2 text-decoration-none text-center d-flex align-items-center justify-content-center`} >
                                    <div className={`${styles.cardIndicatorClimateChange} p-3`} >
                                        <h4 className={`${styles.titleIndicator} text-center`}>Cambio climático</h4>
                                    </div>
                                </Link>
                                <Link to="/indicators/sustainability-indicators/carbon-footprint" className={`${styles.linkIndicators} p-2 text-decoration-none text-center d-flex align-items-center justify-content-center`} >
                                    <div className={`${styles.cardIndicatorCarbonFootprint} p-3`} >
                                        <h4 className={`${styles.titleIndicator} text-center`}>Huella de carbono</h4>
                                    </div>
                                </Link>
                                <Link to="/indicators/sustainability-indicators/green-business-bioeconomy" className={`${styles.linkIndicators} p-2 text-decoration-none text-center d-flex align-items-center justify-content-center`} >
                                    <div className={`${styles.cardIndicatorGreenBusinessBioeconomy} p-3`} >
                                        <h4 className={`${styles.titleIndicator} text-center`}>Negocios verdes y bioeconomía</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default SustainabilityIndicatorsPage;