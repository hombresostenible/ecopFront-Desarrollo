/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../../types/User/branch.types';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import ConfirmDeleteBranch from '../../../../../components/Platform/02Branch/ConfirmDeleteBranch/ConfirmDeleteBranch';
import ModalBranch from '../../../../../components/Platform/02Branch/ModalBranch/ModalBranchPage';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaUserEdit } from "react-icons/fa";
import styles from './styles.module.css';

function BranchCardPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const branches = useSelector((state: RootState) => state.branch.branch);
    
    const [selectedBranch, setSelectedBranch] = useState<string | undefined>(undefined);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showBranchModal, setShowBranchModal] = useState(false);

    const [idBranch, setIdBranch] = useState('');
    const [nameBranch, setNameBranch] = useState('');

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    const branchesToDisplay = Array.isArray(branches) ? branches : [];
    
    const filteredBranches = selectedBranch
        ? branchesToDisplay.filter(branch => branch.id === selectedBranch)
        : branchesToDisplay;

    const handleDelete = (branch: IBranch) => {
        setIdBranch(branch.id);
        setNameBranch(branch.nameBranch || '');
        setShowDeleteConfirmation(true);
    };

    const handleEdit = (branch: IBranch) => {
        setSelectedBranch(branch.id);
        setShowBranchModal(true);
    };

    const onCloseModal = () => {
        setShowDeleteConfirmation(false);
        setShowBranchModal(false);
    };

    const handleUpdateBranch = () => {
        dispatch(getBranches(token));
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Tu lista de Sedes</h1>
                        <div className='mt-4 d-flex flex-column align-items-center justify-content-center'>
                            <h2>Filtra tu sede</h2>
                            <select
                                value={selectedBranch || ''}
                                className="mx-2 p-3 mb-3 m-center col-lg-5 col-md-4 col-sm-6 col-xs-12 text-center border rounded"
                                onChange={(e) => setSelectedBranch(e.target.value || undefined)}
                            >
                                <option value=''>Todas</option>
                                {branchesToDisplay.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.nameBranch}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>Sede</div>
                                    <div className={`${styles.department} d-flex align-items-center justify-content-center`}>Departamento</div>
                                    <div className={`${styles.city} d-flex align-items-center justify-content-center`}>Ciudad</div>
                                    <div className={`${styles.address} d-flex align-items-center justify-content-center`}>Dirección</div>
                                    <div className={`${styles.email} d-flex align-items-center justify-content-center`}>Email</div>
                                    <div className={`${styles.phone} d-flex align-items-center justify-content-center`}>Teléfono</div>
                                    <div className={`${styles.action} d-flex align-items-center justify-content-center`}>Acciones</div>
                                </div>
                            </div>
                            <div className={`${styles.container__Body} d-flex flex-column align-items-center justify-content-between`}>
                                {Array.isArray(filteredBranches) && filteredBranches.map((branch) => (
                                    <div key={branch.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                        <div className={`${styles.container__Branch} d-flex align-items-center justify-content-start`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.nameBranch}</span>
                                        </div>
                                        <div className={`${styles.container__Department} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.department}</span>
                                        </div>
                                        <div className={`${styles.container__City} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.city}</span>
                                        </div>
                                        <div className={`${styles.container__Address} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.addressBranch}</span>
                                        </div>
                                        <div className={`${styles.container__Email} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.contactEmailBranch}</span>
                                        </div>
                                        <div className={`${styles.container__Phone} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.contactPhoneBranch}</span>
                                        </div>
                                        <div className={`${styles.container__Action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <RiDeleteBin6Line
                                                className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    handleDelete(branch);
                                                }}
                                            />
                                            <FaUserEdit
                                                className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    handleEdit(branch)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Modal show={showBranchModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title>Detalles de la sede</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedBranch &&
                                    <ModalBranch
                                        branch={filteredBranches.find(branch => branch.id === selectedBranch)!}
                                        token={token}
                                        onUpdateBranch={handleUpdateBranch}
                                    />}
                            </Modal.Body>
                        </Modal>
                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmación para eliminar la sede</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteBranch
                                    id={idBranch}
                                    nameBranch={nameBranch}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default BranchCardPage;