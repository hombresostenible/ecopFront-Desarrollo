import { useEffect } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
import jsCookie from 'js-cookie';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../../../../../redux/User/userSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function ProfilePage() {
    const token = jsCookie.get("token");
    const dispatch: AppDispatch = useDispatch();

    // Estado de Redux
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
        }
    }, [token]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.main__Title} mb-3 text-center`}>Tu información de perfil</h1>
                        <div className={`${styles.container__Info_User} d-flex align-items-center justify-content-center gap-4`}>
                            <div className={`${styles.container__Logo_Client} overflow-hidden rounded-circle`} >
                                <img src={user?.logo} alt="Logo del cliente" className={`${styles.logo__Client} `}/>
                            </div>
                            <div className={`${styles.container__Info_Client} d-flex flex-column align-items-start justify-content-center`}>
                                <div className="m-2">
                                    <h6 className='m-0'>Nombres</h6>
                                    <div className={styles.containerInput}>
                                        <p className='m-0'>{user?.name}</p>
                                    </div>
                                </div>
                                <div className="m-2">
                                    <h6 className='m-0'>Apellidos</h6>
                                    <div>
                                        <p className='m-0'>{user?.lastName}</p>
                                    </div>
                                </div>
                                <div className="m-2">
                                    <h6 className='m-0'>Tipo de identificación</h6>
                                    <div>
                                        <p className='m-0'>{user?.typeDocumentId}</p>
                                    </div>
                                </div>
                                <div className="m-2">
                                    <h6 className='m-0'>Identificación</h6>
                                    <div>
                                        <p className='m-0'>{user?.documentId}</p>
                                    </div>
                                </div>
                                <div className="m-2">
                                    <h6 className='m-0'>Email</h6>
                                        <p className='m-0'>{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;