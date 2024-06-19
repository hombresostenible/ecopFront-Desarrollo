/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
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

<<<<<<< HEAD
    // Estados de Redux
=======
>>>>>>> d716eaa9802f5d21952c04035142c851b6cffdea
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranchModal, setSelectedBranchModal] = useState<IBranch | null>(null);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    const [selectedBranch, setSelectedBranch] = useState<string | undefined>(undefined);
    const [idBranch, setIdBranch] = useState('');
    const [nameBranch, setNameBranch] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showBranchModal, setShowBranchModal] = useState(false);
    const [showTooltipDelete, setShowTooltipDelete] = useState<string | null>(null);
    const [showTooltipEdit, setShowTooltipEdit] = useState<string | null>(null);

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
        setIdBranch(branch.id);
        setSelectedBranch(branch.id);
        setSelectedBranchModal(branch);
        setShowBranchModal(true);
    };

    const onCloseModal = useCallback(() => {
        setShowDeleteConfirmation(false);
        setShowBranchModal(false);
        setSelectedBranch(undefined);
        setSelectedBranchModal(null);
    }, []);

    // Tooltip que muestra aviso para eliminar una sede
    const handleDeleteBranchMouseEnter = (idBranch: string) => {
        setShowTooltipDelete(idBranch);
    };

    // Tooltip que oculta aviso para eliminar una sede
    const handleDeleteBranchMouseLeave = () => {
        setShowTooltipDelete(null);
    };

    // Tooltip que muestra aviso para editar una sede
    const handleEditBranchMouseEnter = (idBranch: string) => {
        setShowTooltipEdit(idBranch);
    };

    // Tooltip que oculta aviso para editar una sede
    const handleEditBranchMouseLeave = () => {
        setShowTooltipEdit(null);
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Tu lista de Sedes</h1>

                        <div className={`${styles.container__Filter_Branch} mb-4 d-flex align-items-center`}>
                            <h3 className='m-0'>Filtra tu sede</h3>
                            <select
                                value={selectedBranch || ''}
                                className="mx-2 p-1 border rounded"
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

                            <div className={`${styles.container__Body}`}>
                                {Array.isArray(filteredBranches) && filteredBranches.map((branch) => (
                                    <div key={branch.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                        <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.nameBranch}</span>
                                        </div>
                                        <div className={`${styles.department} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.department}</span>
                                        </div>
                                        <div className={`${styles.city} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.city}</span>
                                        </div>
                                        <div className={`${styles.address} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.addressBranch}</span>
                                        </div>
                                        <div className={`${styles.email} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.contactEmailBranch}</span>
                                        </div>
                                        <div className={`${styles.phone} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.contactPhoneBranch}</span>
                                        </div>
                                        <div className={`${styles.action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center position-relative`}>
                                            <RiDeleteBin6Line
                                                className={`${styles.button__Delete} d-flex align-items-center justify-content-center position-relative`}
                                                onMouseEnter={() => handleDeleteBranchMouseEnter(branch.id)}
                                                onMouseLeave={handleDeleteBranchMouseLeave}
                                                onClick={() => {
                                                    handleDelete(branch);
                                                }}
                                            />
                                            {showTooltipDelete === branch.id && (
                                                <div className={`${styles.modal__Delete_Branch} d-flex align-items-center justify-content-center position-absolute`}>
                                                    Eliminar esta sede
                                                </div>
                                            )}
                                            <FaUserEdit
                                                className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                onMouseEnter={() => handleEditBranchMouseEnter(branch.id)}
                                                onMouseLeave={handleEditBranchMouseLeave}
                                                onClick={() => {
                                                    handleEdit(branch)
                                                }}
                                            />
                                            {showTooltipEdit === branch.id && (
                                                <div className={`${styles.modal__Edit_Branch} d-flex align-items-center justify-content-center position-absolute`}>
                                                    Editar esta sede
                                                </div>
                                            )}
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
                                {selectedBranchModal && <ModalBranch
                                    idBranch={idBranch}
                                    branch={selectedBranchModal}
                                    token={token}
                                    onCloseModal={onCloseModal}
                                />}
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmación para eliminar la sede</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteBranch
                                    idBranch={idBranch}
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