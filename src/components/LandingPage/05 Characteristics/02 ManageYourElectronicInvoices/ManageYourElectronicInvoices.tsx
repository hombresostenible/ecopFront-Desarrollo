import NavBarLandingPage from '../../../../components/LandingPage/01 NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function ManageYourElectronicInvoices () {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} text-center`}>Gestionar tus facturas electrónicas</h2>
                    <p className='mb-5'>Dependiendo de las obligaciones tributarias de tu negocio y en función del tipo de membresía que adquieras, a través de ecopcionApp, podrás hacer todo el proceso de facturación electrónica. Una vez des click en “enviar” o “registrar transacción”, ecopcionApp se conectará a través de APIS con aliados comerciales quienes nos ayudarán a realizar todo el proceso de solicitud de aprobación ante la DIAN y nos regresarán la factura aprobada. Una vez aprobada, quedará guardada en tu perfil y además, podrás descargarla, imprimirla o enviarla por correo electrónico a tus clientes. </p>
                    <p className='mb-5'>Igualmente, cuando requieras hacer notas débito para reversar tu factura ya generada, deberás suministrar la información exigida por la DIAN para este propósito y a través de nuestros aliados, haremos todo el proceso de gestión de tu solicitud. </p>
                    <p className='mb-5'>Así mismo, cuando requieras hacer notas crédito para anular tu factura ya generada, deberás suministrar la información exigida por la DIAN para este propósito y a través de nuestros aliados, haremos todo el proceso de gestión de tu solicitud.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ManageYourElectronicInvoices;