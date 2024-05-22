import { Link } from 'react-router-dom';
import NavBar from '../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function ElectronicPayrollPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h2>Nómina electrónica</h2>
                        <p>Explicación sobre lo que se puede hacer en esta sección</p>
                        <div className='d-flex flex-column'>
                            <h4>Pagos de nómina</h4>
                            <Link to='/inventories/consult-assets' >Pagos de nómina</Link>
                            <Link to='/inventories/create-assets' >Crea tus pagos de nómina</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4>Certificaciones</h4>
                            <Link to='/inventories/create-assets' >Crea certificaciones para tus colaboradores</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4>liquidación de nómina</h4>
                            <Link to='/inventories/consult-assets' >Liquida la nómina de tus colaboradores</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4>Colaboradores</h4>
                            <Link to='/inventories/consult-assets' >Consulta todos tus colaboradores</Link>
                            <Link to='/inventories/consult-assets' >Crea colaboradores</Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ElectronicPayrollPage;