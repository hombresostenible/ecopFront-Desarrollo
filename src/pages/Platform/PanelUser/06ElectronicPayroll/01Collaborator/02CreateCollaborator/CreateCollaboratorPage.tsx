/* eslint-disable react-hooks/exhaustive-deps */
// REDUX
// ELEMENTOS DEL COMPONENTE
import NavBar from '../../../../../../components/Platform/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../../components/Platform/PanelUser/Footer/Footer.tsx';
import styles from './styles.module.css';

function CreateCollaboratorPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus colaboradores</h1>

                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CreateCollaboratorPage;