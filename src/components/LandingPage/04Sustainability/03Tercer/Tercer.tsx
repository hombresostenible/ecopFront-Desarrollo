import NavBarLandingPage from '../../01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../Footer/Footer';
import styles from './styles.module.css';

function Tercer() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} text-center`}>Porque en un (1) solo software puedes gestionar tus facturas, tus clientes y hacer inteligencia de negocios</h2>
                    <p className='mb-5'>EcopcionApp te permite gestionar tres asuntos a través de un (1) solo software: tus facturas, tus clientes y tus decisiones. </p>
                    <p className='mb-5'>Con respecto a tus facturas, en alianza con proveedores de facturación electrónica, a través de ecopcionApp puedes emitir y enviar facturas, hacer notas débito y notas crédito. Con relación a la gestión de tus clientes, contamos con un CRM propio que te permite consolidar lista de clientes, segmentar, enviar comunicaciones y cotizaciones, hacer seguimiento al proceso de venta y medir el rendimiento de tus vendedores. Con referencia a la inteligencia de negocios, ecopcionApp te permite tomar decisiones informadas. Para ello, puedes calcular indicadores sobre tres temas estratégicos del negocio – mercadeo, finanzas y sostenibilidad-, descargar informes y agendar citas de veinte (20) minutos con asesores empresariales para recibir recomendaciones y luego, tomar de decisiones sobre tu negocio.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Tercer;