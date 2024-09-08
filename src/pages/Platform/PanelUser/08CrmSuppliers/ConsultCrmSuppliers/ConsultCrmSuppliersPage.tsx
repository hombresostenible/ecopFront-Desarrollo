/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store.ts';
import { getCrmSuppliers } from '../../../../../redux/User/crmSupplierSlice/actions.ts';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../../types/User/crmSupplier.types.ts';
import ColumnSelector from '../../../../../helpers/ColumnSelector/ColumnSelector';
import NavBar from '../../../../../components/Platform/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../components/Platform/PanelUser/Footer/Footer.tsx';
import SeeCrmSuppliers from '../../../../../components/Platform/PanelUser/08CrmSuppliers/01SeeCrmSuppliers/SeeCrmSuppliers.tsx';
import ModalEditCrmSupplier from '../../../../../components/Platform/PanelUser/08CrmSuppliers/ModalEditCrmSupplier/ModalEditCrmSupplier.tsx';
import ConfirmDeleteCrmSuppliers from '../../../../../components/Platform/PanelUser/08CrmSuppliers/ConfirmDeleteCrmSuppliers/ConfirmDeleteCrmSuppliers.tsx';
import SendEmailSuppliers from '../../../../../components/Platform/PanelUser/08CrmSuppliers/SendEmailSuppliers/SendEmailSuppliers.tsx';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { MdOutgoingMail } from "react-icons/md";
import styles from './styles.module.css';

function ConsultCrmSuppliersPage() {
    const token = jsCookie.get('token') || '';
    
    //REDUX
    const dispatch: AppDispatch = useDispatch();
    const crmSuppliers = useSelector((state: RootState) => state.crmSupplier.crmSupplier);
    
    useEffect(() => {
        if (token) {
            dispatch(getCrmSuppliers(token));
        }
    }, [token]);

    const [idCrmSupplier, setIdCrmSupplier] = useState('');
    const [nameCrmSupplier, setNameCrmSupplier] = useState('');
    const [selectedCrmSupplier, setSelectedCrmSupplier] = useState<ICrmSupplier>();
    const [showSeeCrmSupplier, setShowSeeCrmSupplier] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showCrmSupplierModal, setShowCrmSupplierModal] = useState(false);
    const [showSendEmailCrmSupplierModal, setShowSendEmailCrmSupplierModal] = useState(false);
    
    //MODAL PARA VISUALIZAR INFORMACION DEL proveedor
    const handleSeeCrmSupplier = useCallback((crmSupplier: ICrmSupplier) => {
        setSelectedCrmSupplier(crmSupplier);
        setShowSeeCrmSupplier(true);
    }, []);

    //MODAL PARA ELIMINAR UN proveedor
    const handleDelete = useCallback((crmSupplier: ICrmSupplier) => {
        setSelectedCrmSupplier(crmSupplier);
        setShowDeleteConfirmation(true);
    }, []);

    //MODAL PARA EDITAR INFORMACION DEL CLIENTE
    const handleEdit = useCallback((crmSupplier: ICrmSupplier) => {
        setSelectedCrmSupplier(crmSupplier);
        setShowCrmSupplierModal(true);
    }, []);

    //MODAL PARA ENVIAR EMIAL AL PROVEEDOR
    const handleSendEmailClient = useCallback((crmSupplier: ICrmSupplier) => {
        setSelectedCrmSupplier(crmSupplier);
        setShowSendEmailCrmSupplierModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeCrmSupplier(false);
        setShowDeleteConfirmation(false);
        setShowCrmSupplierModal(false);
        setShowSendEmailCrmSupplierModal(false);
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
        'Tipo de Doc. Id',
        'Documento identidad',
        'Proveedor',
        'Email',
        'Teléfono',
        'Departamento',
        'Ciudad',
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
                        <h1 className={`${styles.title} mb-4 mt-4`}>CRM Proveedores</h1>

                        <div className='mb-4 d-flex align-items-center justify-content-between'>
                            <div className="d-flex"></div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/crm-suppliers/create-crm-suppliers' className={`${styles.link} text-decoration-none`}>Crea tus proveedores</Link>
                            </div>
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
                                            'Tipo de Doc. Id',
                                            'Documento identidad',
                                            'Proveedor',
                                            'Email',
                                            'Teléfono',
                                            'Departamento',
                                            'Ciudad',
                                        ]}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto table-responsive`}>
                            <table className="table table-striped">
                                <thead className={`${styles.container__Head}`}>
                                    <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                        {selectedColumns.includes('Tipo de Doc. Id') && (
                                            <th className={`${styles.type__Document_Id} d-flex align-items-center justify-content-center text-center`}>Tipo de Doc. Id</th>
                                        )}
                                        {selectedColumns.includes('Documento identidad') && (
                                            <th className={`${styles.document__Id} d-flex align-items-center justify-content-center text-center`}>Documento identidad</th>
                                        )}
                                        {selectedColumns.includes('Proveedor') && (
                                            <th className={`${styles.supplier} d-flex align-items-center justify-content-center text-center`}>Proveedor</th>
                                        )}
                                        {selectedColumns.includes('Email') && (
                                            <th className={`${styles.email} d-flex align-items-center justify-content-center text-center`}>Email</th>
                                        )}
                                        {selectedColumns.includes('Teléfono') && (
                                            <th className={`${styles.phone} d-flex align-items-center justify-content-center text-center`}>Teléfono</th>
                                        )}
                                        {selectedColumns.includes('Departamento') && (
                                            <th className={`${styles.department} d-flex align-items-center justify-content-center text-center`}>Departamento</th>
                                        )}
                                        {selectedColumns.includes('Ciudad') && (
                                            <th className={`${styles.city} d-flex align-items-center justify-content-center text-center`}>Ciudad</th>
                                        )}
                                        <th className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</th>
                                    </tr>
                                </thead>
                                
                                <tbody className={`${styles.container__Body}`}>
                                    {Array.isArray(crmSuppliers) && crmSuppliers.length > 0 ? (
                                        crmSuppliers.map((crmSupplier) => (
                                        <tr key={crmSupplier.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            {selectedColumns.includes('Tipo de Doc. Id') && (
                                                <td className={`${styles.type__Document_Id} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.typeDocumentId}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Documento identidad') && (
                                                <td className={`${styles.document__Id} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.documentId}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Proveedor') && (
                                                <td className={`${styles.supplier} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.name ? crmSupplier.name + ' ' + crmSupplier.lastName : crmSupplier.corporateName}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Email') && (
                                                <td className={`${styles.email} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.email}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Teléfono') && (
                                                <td className={`${styles.phone} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.phone ? crmSupplier.phone : 'No registrado'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Departamento') && (
                                                <td className={`${styles.department} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.department ? crmSupplier.department : 'No definido'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Ciudad') && (
                                                <td className={`${styles.city} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.city ? crmSupplier.city : 'No definido'}</span>
                                                </td>
                                            )}
                                            <td className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <MdOutlineRemoveRedEye
                                                            className={`${styles.button__Edit} `}
                                                            onClick={() => {
                                                                setIdCrmSupplier(crmSupplier.id);
                                                                setNameCrmSupplier(crmSupplier.name ?? crmSupplier.corporateName ?? '');
                                                                handleSeeCrmSupplier(crmSupplier);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdCrmSupplier(crmSupplier.id);
                                                                setNameCrmSupplier(crmSupplier.name ?? crmSupplier.corporateName ?? '');
                                                                handleDelete(crmSupplier);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <BsPencil
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdCrmSupplier(crmSupplier.id);
                                                                handleEdit(crmSupplier)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <MdOutgoingMail
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdCrmSupplier(crmSupplier.id);
                                                                handleSendEmailClient(crmSupplier)
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
                                                No tienes proveedores registrados
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Modal show={showSeeCrmSupplier} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu proveedor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedCrmSupplier &&
                                    <SeeCrmSuppliers
                                        selectedCrmSupplier={selectedCrmSupplier}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el proveedor "{nameCrmSupplier}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteCrmSuppliers
                                    token={token}
                                    idCrmSupplier={idCrmSupplier}
                                    nameClient={nameCrmSupplier}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showCrmSupplierModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Proveedor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedCrmSupplier &&
                                    <ModalEditCrmSupplier
                                        token={token}
                                        idCrmSupplier={idCrmSupplier}
                                        crmSupplier={selectedCrmSupplier}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showSendEmailCrmSupplierModal} onHide={onCloseModal} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Envía un emails a tu proveedor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <SendEmailSuppliers
                                    token={token}
                                    selectedCrmSupplier={selectedCrmSupplier}
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

export default ConsultCrmSuppliersPage;