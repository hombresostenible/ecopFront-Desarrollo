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
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Cuentas</h1>
                        <p>Bienvendo al espacio del Libro Diario de cuentas, aquí podrás registrar tus ingresos, gastos, cuentas por cobrar y cuentas por pagar.</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Ingresos</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta tus ingresos</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Crea tus ingresos</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Gastos</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta tus gastos</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Crea tus gastos</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Cuentas por cobrar</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta tus cuentas por cobrar</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Crea tus cuentas por cobrar</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Cuentas por pagar</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta tus cuentas por pagar</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Crea tus cuentas por pagar</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Transacciones pendientes de aprobar</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `}>Consulta tus transacciones pendientes de aprobación</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AccountsPage;