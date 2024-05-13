import NavBarLandingPage from '../../01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../Footer/Footer';
import styles from './styles.module.css';

function CalculateIndicatorsPlus() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} text-center`}>Calcular + de 50 indicadores de finanzas, mercadeo y sostenibilidad de tu negocio</h2>
                    <p className='mb-5'>Con base en los inventarios que hayas cargado, en los datos adicionales que hayas suministrado y en el registro permanente de tus transacciones en el libro diario digital, podrás calcular +-80 indicadores de finanzas, mercadeo y sostenibilidad de tu negocio. </p>
                    <p className='mb-5'>En materia de finanzas tenemos indicadores generales como ventas, gastos, utilidad, cuentas por pagar, cuentas por pagar e inventarios de productos, servicios, mercancías y materias primas. En materia de mercadeo tenemos indicadores relacionados con todo el proceso de la venta y además, se incluyen indicadores clave para inversionistas como costos de adquisición y retención de clientes y el valor promedio de las ventas. En materia de sostenibilidad, en la actualidad se pueden calcular indicadores ambientales, sociales y de gobernanza (ASG). En el futuro tendremos una batería más amplia, incluyendo  indicadores en cuatro temas adicionales: huella de carbono, cambio climático, economía circular, bioeconomía o negocios verdes. </p>
                    <p className='mb-5'>Dependiendo del indicador que desees calcular, podrás hacer filtros temporales -por año, mes, día- por item -producto, servicio o mercancía- y además, podrás ver detalles o información específica de cada indicador para mejorar su entendimiento.  </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CalculateIndicatorsPlus;