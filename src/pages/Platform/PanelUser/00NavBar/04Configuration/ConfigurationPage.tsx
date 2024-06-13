import { SetStateAction, useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../../../../redux/User/userSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import UserCard from './UserCard/UserCard';
import BillingConfiguration from './Profile/BillingConfiguration';
import YourPlan from './Profile/YourPlan';
import RoleInformation from './Profile/RoleInformation';
import UseYourEmail from './Profile/UseYourEmail';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function ConfigurationPage() {
    const token = jsCookie.get("token");
    const dispatch: AppDispatch = useDispatch();

    // Estado de Redux
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
        }
    }, [token, dispatch]);

    const [selectedComponent, setSelectedComponent] = useState('general');

    const handleComponentChange = (component: SetStateAction<string>) => {
        setSelectedComponent(component);
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-2 overflow-hidden overflow-y-auto`}>
                        <div className='d-flex gap-2'>
                            <div
                                className={` ${styles.component} d-flex align-items-center justify-content-center ${selectedComponent === 'general' ? styles.active : ''}`}
                                onClick={() => handleComponentChange('general')}
                            >
                                Perfil
                            </div>
                            <div className={` ${styles.component} d-flex align-items-center justify-content-center ${selectedComponent === 'yourPlan' ? styles.active : ''}`}
                                onClick={() => handleComponentChange('yourPlan')}
                            >
                                Tu plan actual
                            </div>
                            <div className={` ${styles.component} d-flex align-items-center justify-content-center ${selectedComponent === 'billingConfiguration' ? styles.active : ''}`}
                                onClick={() => handleComponentChange('billingConfiguration')}
                            >
                                Configuración de facturación
                            </div>
                            <div className={` ${styles.component} d-flex align-items-center justify-content-center ${selectedComponent === 'roleInformation' ? styles.active : ''}`}
                                onClick={() => handleComponentChange('roleInformation')}
                            >
                                Información de roles
                            </div>
                            <div className={` ${styles.component} d-flex align-items-center justify-content-center ${selectedComponent === 'useYourEmail' ? styles.active : ''}`}
                                onClick={() => handleComponentChange('useYourEmail')}
                            >
                                Envío de correos
                            </div>
                        </div>

                        {selectedComponent === 'general' && (
                            user ? <UserCard user={user} /> : <p>Loading...</p>
                        )}

                        {selectedComponent === 'yourPlan' && (
                            <YourPlan />
                        )}
                        {selectedComponent === 'billingConfiguration' && (
                            <BillingConfiguration />
                        )}
                        {selectedComponent === 'roleInformation' && (
                            <RoleInformation />
                        )}
                        {selectedComponent === 'useYourEmail' && (
                            <UseYourEmail />
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ConfigurationPage;