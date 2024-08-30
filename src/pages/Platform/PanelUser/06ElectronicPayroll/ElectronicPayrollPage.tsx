import { Link } from 'react-router-dom';
import NavBar from '../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../components/Platform/SideBar/SideBarCompact.tsx';
import Footer from '../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function ElectronicPayrollPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Nómina electrónica</h1>
                        <p>Espacio reservado para el pago de la nómina de tus colaboradores</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Pagos de nómina</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Pagos de nómina</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Crea tus pagos de nómina</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Certificaciones</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Crea certificaciones para tus colaboradores</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>liquidación de nómina</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Liquida la nómina de tus colaboradores</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Colaboradores</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta todos tus colaboradores</Link>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Crea colaboradores</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ElectronicPayrollPage;