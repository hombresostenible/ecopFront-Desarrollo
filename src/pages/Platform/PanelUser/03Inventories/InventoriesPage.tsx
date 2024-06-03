import { Link } from 'react-router-dom';
import NavBar from '../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function InventoriesPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} m-4 text-center`}>Inventarios</h1>
                        <p className='text-center'>Bienvenido a Inventarios, aqui puedes controlar y gestionar los inventarios de tu negocio. Selecciona la opción que queires trabajar:</p>
                        <div className='d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Equipos, herramientas o máquinas</h4>
                            <Link to='/inventories/consult-assets' className={`${styles.aaaa} `}>Consulta tus equipos, herramientas o máquinas</Link>
                            <Link to='/inventories/create-assets' >Crea tus equipos, herramientas o máquinas</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Mercancías</h4>
                            <Link to='/inventories/consult-merchandises' >Consulta tus mercancías</Link>
                            <Link to='/inventories/create-merchandises' >Crea tus mercancías</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Productos</h4>
                            <Link to='/inventories/consult-products' >Consulta tus productos</Link>
                            <Link to='/inventories/create-products' >Crea tus productos</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Materias primas</h4>
                            <Link to='/inventories/consult-raw-materals' >Consulta tus materias primas</Link>
                            <Link to='/inventories/create-raw-materals' >Crea tus materias primas</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Servicios</h4>
                            <Link to='/inventories/consult-services' >Consulta tus servicios</Link>
                            <Link to='/inventories/create-services' >Crea tus servicios</Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default InventoriesPage;