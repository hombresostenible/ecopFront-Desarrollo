/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { SetStateAction, useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import BranchCard from '../../../../components/Platform/04Branch/BranchCard';
import CreateBranch from '../../../../components/Platform/04Branch/CreateBranch';
import NavBar from '../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function BranchPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    
    // Utiliza useSelector para obtener la información del usuario del estado de Redux
    const branch = useSelector((state: RootState) => state.branch.branch);

    const [ selectedBranch, setSelectedBranch ] = useState('');
    const [ selectedComponent, setSelectedComponent ] = useState('branchCard');

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    const handleComponentChange = (component: SetStateAction<string>) => {
        setSelectedComponent(component);
    };

    const branchesToDisplay = Array.isArray(branch) ? branch : [];
    
    const filteredBranches = selectedBranch
    ? branchesToDisplay.filter(branch => branch.id === selectedBranch)
    : branchesToDisplay;
    
    const handleCreateBranch = () => {
        // Llama a getBranches para actualizar los datos después de crear una nueva sede
        dispatch(getBranches(token));
    };
   

    return (
        <div className="d-flex">
            <SideBar />
            <div>
                <NavBar />
                <div className={`${styles.container} overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.containerBranchPage} m-auto`}>
                        <div className="d-flex">
                            <div
                                className={` ${styles.component} w-50 d-flex align-items-center justify-content-center ${selectedComponent === 'branchCard' ? styles.active : '' }`}
                                onClick={() => handleComponentChange('branchCard')}
                            >
                                Tus Sedes
                            </div>
                            <div
                                className={` ${styles.component} w-50 d-flex align-items-center justify-content-center ${selectedComponent === 'createBranch' ? styles.active : ''}`}
                                onClick={() => handleComponentChange('createBranch')}
                            >
                                Crea tus Sedes
                            </div>
                        </div>
                        
                        {selectedComponent === 'branchCard' ? (
                            <div>
                                <div className='mt-4 border d-flex flex-column align-items-center justify-content-center'>
                                    <div>
                                        <h1 className={`${styles.title} m-0 text-center`}>Tu lista de Sedes</h1>
                                    </div>
                                    <h2>Filtra tu sede</h2>
                                    <select
                                        value={selectedBranch}
                                        className="mx-2 p-3 mb-3 m-center col-lg-5 col-md-4 col-sm-6 col-xs-12 text-center border rounded"
                                        onChange={(e) => setSelectedBranch(e.target.value)}
                                    >
                                        <option value=''>Todas</option>
                                        {branchesToDisplay.map((branch, index) => (
                                            <option key={index} value={branch.id}>
                                                {branch.nameBranch}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    {filteredBranches.length > 0 ? (
                                        <div>
                                            <BranchCard
                                                branches={filteredBranches}
                                            />
                                        </div>
                                    ) : (
                                        <div className="col-12 text-center">
                                            <h3>No hay Sedes disponibles</h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <CreateBranch
                                onCreateBranch={handleCreateBranch}
                            />
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default BranchPage;