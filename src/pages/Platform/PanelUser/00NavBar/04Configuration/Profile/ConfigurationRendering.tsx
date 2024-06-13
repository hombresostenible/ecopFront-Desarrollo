/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { SetStateAction, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/AuthContext';
import UserCard from './User/UserCard';
import CompanyCard from './Company/CompanyCard';
import BillingConfiguration from './BillingConfiguration';
import YourPlan from './YourPlan';
import RoleInformation from './RoleInformation';
import UseYourEmail from './UseYourEmail';
import styles from './styles.module.css';

function ConfigurationRendering () {
    const token = Cookies.get("token");
    const { profile, getProfile } = useAuth();

    useEffect(() => {
        if (token && !profile) {
            getProfile(token);
        }
    }, [ token, profile ]);

    const [ selectedComponent, setSelectedComponent ] = useState('general');

    const handleComponentChange = (component: SetStateAction<string>) => {
        setSelectedComponent(component);
    };
    

    return (
        <div className="d-flex w-100">
            <div className={`${styles.containerBranchPage} m-auto`}>
                <div className="d-flex">
                    <div
                        className={` ${styles.component} w-50 d-flex align-items-center justify-content-center ${selectedComponent === 'general' ? styles.active : '' }`}
                        onClick={() => handleComponentChange('general')}
                    >
                        Perfil
                    </div>
                    <div className={` ${styles.component} w-50 d-flex align-items-center justify-content-center ${selectedComponent === 'yourPlan' ? styles.active : ''}`}
                        onClick={() => handleComponentChange('yourPlan')}
                    >
                        Tu plan actual
                    </div>
                    <div className={` ${styles.component} w-50 d-flex align-items-center justify-content-center ${selectedComponent === 'billingConfiguration' ? styles.active : ''}`}
                        onClick={() => handleComponentChange('billingConfiguration')}
                    >
                        Configuración de facturación
                    </div>
                    <div className={` ${styles.component} w-50 d-flex align-items-center justify-content-center ${selectedComponent === 'roleInformation' ? styles.active : ''}`}
                        onClick={() => handleComponentChange('roleInformation')}
                    >
                        Información de roles
                    </div>
                    <div className={` ${styles.component} w-50 d-flex align-items-center justify-content-center ${selectedComponent === 'useYourEmail' ? styles.active : ''}`}
                        onClick={() => handleComponentChange('useYourEmail')}
                    >
                        Envío de correos
                    </div>
                </div>
                {selectedComponent === 'general' && (
                    <div>
                        {profile?.userType === 'User' && (
                            <div>
                                <UserCard user={profile} />
                            </div>
                        )}
                        {profile?.userType === 'Company' && (
                            <div>
                                <CompanyCard company={profile} />
                            </div>
                        )}
                    </div>
                )}

                {selectedComponent === 'yourPlan' && (
                    <div>
                        <YourPlan />
                    </div>
                )}

                {selectedComponent === 'billingConfiguration' && (
                    <div>
                        <BillingConfiguration />
                    </div>
                )}

                {selectedComponent === 'roleInformation' && (
                    <div>
                        <RoleInformation />
                    </div>
                )}

                {selectedComponent === 'useYourEmail' && (
                    <div>
                        <UseYourEmail />
                    </div>
                )}
            </div>        
        </div>
    );
}

export default ConfigurationRendering;