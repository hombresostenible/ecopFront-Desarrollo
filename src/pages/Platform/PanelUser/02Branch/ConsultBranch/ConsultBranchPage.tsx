/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../../types/User/branch.types';
import ColumnSelector from '../../../../../helpers/ColumnSelector/ColumnSelector';
import NavBar from '../../../../../components/Platform/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../components/Platform/PanelUser/Footer/Footer';
import ConfirmDeleteBranch from '../../../../../components/Platform/PanelUser/02Branch/ConfirmDeleteBranch/ConfirmDeleteBranch';
import ModalEditBranch from '../../../../../components/Platform/PanelUser/02Branch/ModalEditBranch/ModalEditBranch.tsx';
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

function ConsultBranchPage() {
    const token = jsCookie.get('token') || '';
    
    const dispatch: AppDispatch = useDispatch();
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

    const menuColumnSelector = useRef<HTMLDivElement | null>(null);
    const [menuColumnSelectorVisible, setMenuColumnSelectorVisible] = useState(false);
    const handleColumnSelector = () => {
        setMenuColumnSelectorVisible(!menuColumnSelectorVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuColumnSelector.current && !menuColumnSelector.current.contains(event.target as Node)) {
                setMenuColumnSelectorVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuColumnSelector ]);

    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        'Departamento',
        'Ciudad',
        'Dirección',
        'Email',
        'Teléfono',
    ]);

    const handleColumnChange = (column: string) => {
        const updatedColumns = selectedColumns.includes(column)
            ? selectedColumns.filter((col) => col !== column)
            : [...selectedColumns, column];
        setSelectedColumns(updatedColumns);
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Tu lista de Sedes</h1>

                        <div className={`${styles.container__Filters} mb-3 d-flex align-items-center justify-content-between`}>
                            <div className={`${styles.container__Filter_Branch} d-flex align-items-center`}>
                                <h3 className={`${styles.title__Branch} m-0`}>Filtra tu sede</h3>
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

                            <div className={`${styles.container__Column_Selector} d-flex align-items-center justify-content-end position-relative`} >
                                <span className={`${styles.span__Menu} p-2 text-center`} onClick={handleColumnSelector}>Escoge las columnas que deseas ver</span>
                                {menuColumnSelectorVisible && (
                                    <div ref={menuColumnSelector} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                                        <ColumnSelector
                                            selectedColumns={selectedColumns}
                                            onChange={handleColumnChange}
                                            minSelectedColumns={3}
                                            availableColumns={[
                                                'Departamento',
                                                'Ciudad',
                                                'Dirección',
                                                'Email',
                                                'Teléfono',
                                            ]}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.link__Head_Navigate}>
                            <FaPlus className={`${styles.icon__Plus} `}/>
                            <Link to='/branches/create-branches' className={`${styles.link} text-decoration-none`}>Registro de sedes</Link>
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto table-responsive`}>
                            <table className="table table-striped">
                                <thead className={`${styles.container__Head}`}>
                                    <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                        <th className={`${styles.branch} d-flex align-items-center justify-content-center text-center`}>Sede</th>
                                        {selectedColumns.includes('Departamento') && (
                                            <th className={`${styles.department} d-flex align-items-center justify-content-center text-center`}>Departamento</th>
                                        )}
                                        {selectedColumns.includes('Ciudad') && (
                                            <th className={`${styles.city} d-flex align-items-center justify-content-center text-center`}>Ciudad</th>
                                        )}
                                        {selectedColumns.includes('Dirección') && (
                                            <th className={`${styles.address} d-flex align-items-center justify-content-center text-center`}>Dirección</th>
                                        )}
                                        {selectedColumns.includes('Email') && (
                                            <th className={`${styles.email} d-flex align-items-center justify-content-center text-center`}>Email</th>
                                        )}
                                        {selectedColumns.includes('Teléfono') && (
                                            <th className={`${styles.phone} d-flex align-items-center justify-content-center text-center`}>Teléfono</th>
                                        )}
                                        <th className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</th>
                                    </tr>
                                </thead>
                                
                                <tbody className={`${styles.container__Body}`}>
                                    {Array.isArray(filteredBranches) && filteredBranches.length > 0 ? (
                                        filteredBranches.map((branch) => (
                                        <tr key={branch.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <td className={`${styles.branch} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.nameBranch}</span>
                                            </td>
                                            {selectedColumns.includes('Departamento') && (
                                                <td className={`${styles.department} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.department}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Ciudad') && (
                                                <td className={`${styles.city} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.city}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Dirección') && (
                                                <td className={`${styles.address} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.addressBranch}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Email') && (
                                                <td className={`${styles.email} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.contactEmailBranch}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Teléfono') && (
                                                <td className={`${styles.phone} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.contactPhoneBranch}</span>
                                                </td>
                                            )}
                                            <td className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                handleDelete(branch);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <BsPencil
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                handleEdit(branch)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={10} className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                                No tienes sedes registradas
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Modal show={showBranchModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title>Detalles de la sede</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedBranchModal && <ModalEditBranch
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

export default ConsultBranchPage;