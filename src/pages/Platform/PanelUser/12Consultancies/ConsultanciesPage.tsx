import { Link } from 'react-router-dom';
import NavBar from '../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../components/Platform/SideBar/SideBarCompact.tsx';
import Footer from '../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function ConsultanciesPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Asesoría para toma de decisiones</h1>
                        <p>Podrás contactarte con uno de nuestros especialistas para recibir asesoría sobre la gerencia de tu negocio, queremos que tu emprendimiento llegue al siguient enivel</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Consulta con un asesor</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Agenda cita con un asesor</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Novedades</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ConsultanciesPage;