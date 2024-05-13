/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState } from 'react';
// import Cookies from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { IBranch } from '../../../types/User/branch.types';
import ConfirmDeleteBranch from './ConfirmDeleteBranch';
import ModalBranch from './ModalBranch/ModalBranch';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaUserEdit } from "react-icons/fa";
import styles from './styles.module.css';

interface BranchCardProps {
    branches: IBranch[];
}

function BranchCard ({ branches }: BranchCardProps) {
// function BranchCard () {
    // const token = Cookies.get('token') || '';
    // const { getBranches } = useBranches();

    // useEffect(() => {
    //     getBranches(token);
    // }, [ token ]);

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
        setShowDeleteConfirmation(false);
        setShowBranchModal(false);
    };
    

    return (
        <div className="m-auto">
            <div className="mt-4 table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Sede</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Departamento</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Ciudad</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Dirección</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Email</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Teléfono</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(branches) && branches.map((branch) => (
                            <tr key={branch.id}>
                                <td className='align-middle text-center'>
                                    <span>{branch.nameBranch}</span>
                                </td>
                                <td className='align-middle text-center'>
                                    <span>{branch.department}</span>
                                </td>
                                <td className='align-middle text-center'>
                                    <span>{branch.city}</span>
                                </td>
                                <td className='align-middle text-center'>
                                    <span>{branch.addressBranch}</span>
                                </td>
                                <td className='align-middle text-center'>
                                    <span>{branch.contactEmailBranch}</span>
                                </td>
                                <td className='align-middle text-center'>
                                    <span>{branch.contactPhoneBranch}</span>
                                </td>
                                <td className='d-flex align-items-center justify-content-center align-middle text-center'>
                                    <RiDeleteBin6Line
                                        className={`${styles.button__Delete} `}
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={showBranchModal} onHide={onCloseModal} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles de la sede</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedBranch && <ModalBranch branch={selectedBranch} />}
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
        </div>
    );    
}

export default BranchCard;