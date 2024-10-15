import NavBar from '../../01NavBar/NavBar';
import Footer from '../../07Footer/Footer';
import styles from './styles.module.css';

function ManageYourCustomers() {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                <h2 className={`${styles.subtitle} m-5 text-center`}>Gestionar tus clientes y mejorar las ventas</h2>
                    <p className='mb-5'>A través de nuestro CRM propio, podrás hacer una lista o base de datos de clientes, enviar mensajes masivos y cotizaciones personalizadas y podrás avanzar hacia la segmentación o clasificación de tus clientes, con base en sus características específicas. Esta información será muy valiosa para tu equipo de ventas, ya que te servirá para personalizar ofertas, capturar o retener más clientes. </p>
                    <p className='mb-5'>Igualmente, usando nuestro embudo de ventas digital, podrás hacer seguimiento a todo el proceso de ventas, iniciando desde la publicación de la campaña hasta el cierre de la venta. Esto te permitirá conocer qué haces bien, qué debes mejorar y además, podrás medir el desempeño de tu equipo comercial.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ManageYourCustomers;