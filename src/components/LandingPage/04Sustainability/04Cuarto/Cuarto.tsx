import NavBarLandingPage from '../../01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../Footer/Footer';
import styles from './styles.module.css';

function Cuarto() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} text-center`}>Porque hacemos las cosas fáciles</h2>
                    <p className='mb-5'>En ecopcionApp es fácil cargar información, registrar los movimientos de tu negocio, calcular indicadores, visualizar y descargar informes. </p>
                    <p className='mb-5'>Gestionar nuestro software es fácil. Hay información específica de los inventarios de tu negocio que debes cargar por una sola vez y lo puedes hacer desde un documento Excel. Una vez cargados los inventarios, debes suministrar unos datos adicionales que nos permitirán entender mejor tu situación y ofrecerte indicadores que evidencien el estado exacto de tu negocio. Tú mismo puedes suministrar esta información adicional o lo podemos hacer por ti, por un costo adicional. </p>
                    <p className='mb-5'>Para registrar las ventas o compras hemos hecho un gran esfuerzo por solicitar la información mínima que nos permita calcular los indicadores. Cuando tu venta o tu compra es de contado, debes registrar información sobre qué vendiste, cuánto vendiste y a qué precio. Cuando tu venta o tu compra es a Credito, debes registrar unos datos adicionales. </p>
                    <p className='mb-5'>Finalmente, para calcular los indicadores y visualizar los informes, simplemente debes elegir el tema y el indicador que quieres calcular y listo. Para descargar los informes, debes elegir entre descarga en Excel o PDF y obtendrás tu información para mostrarla a tus clientes, inversionistas, socios, proveedores o aliados.  </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cuarto;