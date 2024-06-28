import NavBarLandingPage from '../../01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../Footer/Footer';
import styles from './styles.module.css';

function ViewDownloadReports() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} text-center`}>Calcula + de 100 indicadores y genera reportes</h2>
                    <p className='mb-5'>Con base en los inventarios que hayas cargado, y en la facturación o el registro permanente de tus transacciones, podrás calcular +-80 indicadores de finanzas, mercadeo y sostenibilidad de tu negocio y generar reportes</p>
                    <p className='mb-5'>Puedes calcular indicadores de finanzas - cuentas, inventarios y facturación-, gestión de clientes y ventas y sostenibilidad o impacto.  Podrás hacer filtros temporales -por año, mes, día- por ítem -producto, servicio o mercancía- y además, podrás ver detalles o información específica de cada indicador para mejorar su entendimiento.</p>
                    <p className='mb-5'>Podrás generar informes en PDF o excel a tu medida, diarios, de cierre de mes o sugeridos para públicos específicos como bancos, clientes, proveedores o inversionistas.  Los informes los podrás utilizar para tomar decisiones clave que harán más competitivo y sostenible tu negocio.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ViewDownloadReports;