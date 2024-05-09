import NavBarLandingPage from '../../01 NavBarLandingPage/NavBarLandingPage';
import Footer from '../../Footer/Footer';
import styles from './styles.module.css';

function Primer () {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} text-center`}>Porque hacemos más sostenible tu negocio</h2>
                    <p className='mb-5'>EcopcionApp considera que la sostenibilidad es fundamental para el éxito de tú negocio. EcopcionApp entiende la sostenibilidad como un tema que genera valor a tus clientes, potencia tus ventas, mejora tus finanzas y permite aumentar el impacto positivo que tu negocio tiene en la sociedad, el ambiente y la economía de la ciudad o el municipio donde funciona la empresa. </p>
                    <p className='mb-5'>A través de ecopcionApp, puedes medir el desempeño que tiene tu empresa en asuntos críticos como el mercadeo y las finanzas y además, tienes la posibilidad medir asuntos novedosos e importantes para clientes e inversionistas como los temas sociales, de gobernanza, ambientales (ASG), huella de carbono, cambio climático, economía circular y bioeconomía. </p>
                    <p className='mb-5'>Finalmente, ecopcionApp te permite calcular +-50 indicadores de sostenibilidad, descargar informes y recibir asesoría para tomar decisiones que mejoren el impacto de tu negocio en el mundo. </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Primer;