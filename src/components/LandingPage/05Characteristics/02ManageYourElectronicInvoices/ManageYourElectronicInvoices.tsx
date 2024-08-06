import NavBarLandingPage from '../../01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../Footer/Footer';
import styles from './styles.module.css';

function ManageYourElectronicInvoices() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} p-4`}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                <h2 className={`${styles.subtitle} m-5 text-center`}>Gestionar tus facturas electrónicas</h2>
                    <p className='mb-5'>Dependiendo de las obligaciones tributarias de tu negocio y en función del tipo de membresía que adquieras, a través de ecopción, podrás hacer todo el proceso de facturación electrónica. Una vez des click en “enviar” o “registrar transacción”, ecopción hará todo el proceso de solicitud de aprobación ante la DIAN y te regresará la factura aprobada. Una vez aprobada, quedará guardada en tu perfil y además, podrás descargarla, imprimirla o enviarla por correo electrónico a tus clientes.</p>
                    <p className='mb-5'>Igualmente, cuando requieras hacer cambios a tus facturas, podrás hacer notas crédito o débito. También podrás hacer y enviar cotizaciones, automatizar facturas recurrentes, gestionar tus pagos recibidos y hacer órdenes de compra, entre otros asuntos.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ManageYourElectronicInvoices;