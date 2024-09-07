/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getCrmSuppliers } from '../../../../../redux/User/crmSupplierSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../../types/User/crmSupplier.types';
import NavBar from '../../../../../components/Platform/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../components/Platform/PanelUser/Footer/Footer';
import SeeSupplier from '../../../../../components/Platform/PanelUser/08CrmSuppliers/01CrmSuppliers/CrmSuppliers';
import ModalCrmSuppliers from '../../../../../components/Platform/PanelUser/08CrmSuppliers/ModalCrmSuppliers/ModalCrmSuppliers';
import ConfirmDeleteCrmSuppliers from '../../../../../components/Platform/PanelUser/08CrmSuppliers/ConfirmDeleteCrmSuppliers/ConfirmDeleteCrmSuppliers';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

function CrmSuppliersCardPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    
    // Estados de Redux
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

    const handleDelete = useCallback((crmSupplier: ICrmSupplier) => {
        setSelectedCrmSupplier(crmSupplier);
        setShowDeleteConfirmation(true);
    }, []);

    const handleCrmSupplier = useCallback((crmSupplier: ICrmSupplier) => {
        setSelectedCrmSupplier(crmSupplier);
        setShowSeeCrmSupplier(true);
    }, []);

    const handleEdit = useCallback((crmSupplier: ICrmSupplier) => {
        setSelectedCrmSupplier(crmSupplier);
        setShowCrmSupplierModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeCrmSupplier(false);
        setShowDeleteConfirmation(false);
        setShowCrmSupplierModal(false);
    }, []);

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

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.type__Document_Id} d-flex align-items-center justify-content-center text-center`}>Tipo de Doc. Id</div>
                                    <div className={`${styles.document__Id} d-flex align-items-center justify-content-center text-center`}>Documento identidad</div>
                                    <div className={`${styles.email} d-flex align-items-center justify-content-center text-center`}>Email</div>
                                    <div className={`${styles.phone} d-flex align-items-center justify-content-center text-center`}>Teléfono</div>
                                    <div className={`${styles.department} d-flex align-items-center justify-content-center text-center`}>Departamento</div>
                                    <div className={`${styles.city} d-flex align-items-center justify-content-center text-center`}>Ciudad</div>
                                    <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body} d-flex flex-column `}>
                                {Array.isArray(crmSuppliers) && crmSuppliers.length > 0 ? (
                                    crmSuppliers.map((crmSupplier) => (
                                        <div key={crmSupplier.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                            <div className={`${styles.type__Document_Id} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.typeDocumentId}</span>
                                            </div>
                                            <div className={`${styles.document__Id} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.documentId}</span>
                                            </div>
                                            <div className={`${styles.email} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.email}</span>
                                            </div>
                                            <div className={`${styles.phone} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.phone}</span>
                                            </div>
                                            <div className={`${styles.department} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.department ? crmSupplier.department : 'No definido'}</span>
                                            </div>
                                            <div className={`${styles.city} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.city ? crmSupplier.city : 'No definido'}</span>
                                            </div>
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Edit} `}
                                                        onClick={() => {
                                                            setIdCrmSupplier(crmSupplier.id);
                                                            setNameCrmSupplier(crmSupplier.name ?? crmSupplier.corporateName ?? '');
                                                            handleCrmSupplier(crmSupplier);
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
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                        No tienes proveedores registrados
                                    </div>
                                )}
                            </div>
                        </div>

                        <Modal show={showSeeCrmSupplier} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu proveedor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedCrmSupplier &&
                                    <SeeSupplier
                                        selectedCrmSupplier={selectedCrmSupplier}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showCrmSupplierModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Proveedor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedCrmSupplier &&
                                    <ModalCrmSuppliers
                                        token={token}
                                        idCrmSupplier={idCrmSupplier}
                                        crmSupplier={selectedCrmSupplier}
                                        onCloseModal={onCloseModal}
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
  
                        {/* <div className='d-flex flex-column'>
                            <h4 className={`${styles.subTitle} `}>Seguimiento</h4>
                            <Link to='/inventories/create-assets' className={`${styles.link__Consult_Inventory} text-decoration-none`}>Registra el seguimiento de tus provedores</Link>
                        </div> */}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CrmSuppliersCardPage;