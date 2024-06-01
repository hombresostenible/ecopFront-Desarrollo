import { Link } from 'react-router-dom';
import NavBar from '../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function InvoicingAndPosPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h2>Facturación y POS</h2>
                        <p>Explicación sobre lo que se puede hacer en esta sección</p>
                        <div className='d-flex flex-column'>
                            <h4>Nota Credito</h4>
                            <Link to='/inventories/consult-assets' >Consulta tus notas Credito</Link>
                            <Link to='/inventories/create-assets' >Crea notas Credito</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4>Nota débito</h4>
                            <Link to='/inventories/consult-assets' >Consulta tus notas débito</Link>
                            <Link to='/inventories/create-assets' >Crea notas débito</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4>Facturas frecuentes</h4>
                            <Link to='/inventories/consult-assets' >Consulta tus clientes con facturas frecuentes</Link>
                            <Link to='/inventories/consult-assets' >Crea facturas frecuentes</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4>Cotizaciones</h4>
                            <Link to='/inventories/consult-assets' >Consulta todas tus cotizaciones enviadas</Link>
                            <Link to='/inventories/consult-assets' >Crea una cotización</Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default InvoicingAndPosPage;