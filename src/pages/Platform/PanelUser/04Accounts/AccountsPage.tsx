import { Link } from 'react-router-dom';
import NavBar from '../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function AccountsPage() {
    
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h2>Cuentas</h2>
                        <p>Explicación sobre lo que se puede hacer en esta sección</p>
                        <div className='d-flex flex-column'>
                            <h4>Ingresos</h4>
                            <Link to='/inventories/consult-assets' >Consulta tus ingresos</Link>
                            <Link to='/inventories/create-assets' >Crea tus ingresos</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4>Gastos</h4>
                            <Link to='/inventories/consult-assets' >Consulta tus gastos</Link>
                            <Link to='/inventories/create-assets' >Crea tus gastos</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4>Transacciones pendientes de aprobar</h4>
                            <Link to='/inventories/consult-assets' >Consulta tus transacciones pendientes de aprobar</Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AccountsPage;