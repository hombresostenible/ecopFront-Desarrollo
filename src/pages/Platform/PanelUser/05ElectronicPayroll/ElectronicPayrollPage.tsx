import { Link } from 'react-router-dom';
import NavBar from '../../../../components/Platform/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../components/Platform/PanelUser/Footer/Footer';
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
                        <p>Bienvenido a Nómina Electrónica, aqui puedes crear y gestionar los colaboradores de tu negocio, Selecciona la opción que queires trabajar:</p>

                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} text-center`}>Equipos, herramientas o máquinas</h4>
                            <div className={`${styles.container__Link_Section} d-flex align-items-center justify-content-center gap-4`}>
                                <Link to='/electronic-payroll/consult-collaborators' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`}>Consulta tus colaboradores</Link>
                                <Link to='/electronic-payroll/customer-collaborators' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Crea tus colaboradores</Link>
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