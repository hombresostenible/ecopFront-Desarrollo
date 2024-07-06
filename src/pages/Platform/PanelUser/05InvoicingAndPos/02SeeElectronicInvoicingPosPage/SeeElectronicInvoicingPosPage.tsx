// ELEMENTOS DEL COMPONENTE
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
// import { MdOutlineRemoveRedEye } from "react-icons/md";
import styles from './styles.module.css';

function SeeElectronicInvoicingPosPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Ver Facturación y POS</h1>

                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default SeeElectronicInvoicingPosPage;