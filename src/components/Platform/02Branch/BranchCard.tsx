/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IBranch } from '../../../types/User/branch.types';
import ConfirmDeleteBranch from './ConfirmDeleteBranch/ConfirmDeleteBranch';
import ModalBranch from './ModalBranch/ModalBranch';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaUserEdit } from "react-icons/fa";
import styles from './styles.module.css';

interface BranchCardProps {
    branches: IBranch[];
    token: string;
    onUpdateBranch: () => void;
}

function BranchCard ({ branches, token, onUpdateBranch }: BranchCardProps) {

    const [ idBranch, setIdBranch ] = useState('');
    const [ nameBranch, setNameBranch ] = useState('');
    const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false);
    const [ selectedBranch, setSelectedBranch ] = useState<IBranch>();
    const [ showBranchModal, setShowBranchModal ] = useState(false);

    const handleDelete = (branch: IBranch) => {
        setSelectedBranch(branch);
        setShowDeleteConfirmation(true);
    };

    const handleEdit = (branch: IBranch) => {
        setSelectedBranch(branch);
        setShowBranchModal(true);
    };

    const onCloseModal = () => {
        onUpdateBranch()
        setShowDeleteConfirmation(false);
        setShowBranchModal(false);
    };

    return (
        <div className="m-auto">
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
                    {Array.isArray(branches) && branches.map((branch) => (
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
                                    className={`${styles.button__Delete} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}
                                    onClick={() => {
                                        setIdBranch(branch.id);
                                        setNameBranch(branch.nameBranch || '');
                                        handleDelete(branch);
                                    }}
                                />
                                <FaUserEdit
                                    className={`${styles.button__Edit} `}
                                    onClick={() => handleEdit(branch)}
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
                            branch={selectedBranch}
                            token={token}
                            onUpdateBranch={onUpdateBranch}
                        />}
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                <Modal.Header closeButton onClick={() => setShowDeleteConfirmation(false)}>
                    <Modal.Title>Confirmación para eliminar la sede</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ConfirmDeleteBranch
                        id={idBranch}
                        nameBranch={nameBranch}
                        onCloseModal={() => {onCloseModal()}}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );    
}

export default BranchCard;