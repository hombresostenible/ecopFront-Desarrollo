import { Link } from 'react-router-dom';
// REDUX
// ELEMENTOS DEL COMPONENTE
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function CreateCreditNotesPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus notas crédito</h1>

                        <Link to='/credit-notes/consult-credit-notes' className={styles.link__Back}>Consulta tu notas crédito</Link>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CreateCreditNotesPage;