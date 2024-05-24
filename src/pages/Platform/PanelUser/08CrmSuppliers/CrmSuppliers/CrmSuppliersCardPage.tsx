import { Link } from 'react-router-dom';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function CrmSuppliersCardPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h2>CRM Proveedores</h2>
                        <p>Explicación sobre lo que se puede hacer en esta sección</p>
                        <div className='d-flex flex-column'>
                            <h4>Proveedores</h4>
                            <Link to='/inventories/consult-assets' >Consulta tus proveedores</Link>
                            <Link to='/inventories/create-assets' >Crea tus proveedores</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4>Seguimiento</h4>
                            <Link to='/inventories/create-assets' >Seguimiento de tus compras</Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CrmSuppliersCardPage;