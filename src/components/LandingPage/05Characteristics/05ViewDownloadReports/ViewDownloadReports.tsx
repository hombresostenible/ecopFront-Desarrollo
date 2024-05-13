import NavBarLandingPage from '../../01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../Footer/Footer';
import styles from './styles.module.css';

function ViewDownloadReports() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} text-center`}>Visualizar y descargar informes para gerentes, socios, inversionistas o clientes</h2>
                    <p className='mb-5'>Con base en los indicadores calculados, podrás descargar informes en dos versiones PDF y excel. EL PDF te servirá para compartirlo con clientes, proveedores, inversionistas. El excel te servirá como herramienta de apoyo para el equipo de trabajo. </p>
                    <p className='mb-5'>En un principio podrás   por indicador y además a futuro, podrás personalizar tus informes incluyendo los indicadores que deseas mostrar a tus clientes, proveedores, inversionistas o equipo de trabajo. </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ViewDownloadReports;