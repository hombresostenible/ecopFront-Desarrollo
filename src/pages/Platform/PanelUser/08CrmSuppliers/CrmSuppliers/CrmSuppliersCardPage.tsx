/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCrmSuppliers } from '../../../../../redux/User/crmSupplierSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../../types/User/crmSupplier.types';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import ModalCrmSuppliers from '../../../../../components/Platform/08CrmSuppliers/ModalCrmSuppliers/ModalCrmSuppliers';
import ConfirmDeleteCrmSuppliers from '../../../../../components/Platform/08CrmSuppliers/ConfirmDeleteCrmSuppliers/ConfirmDeleteCrmSuppliers';
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
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedCrmSupplier, setSelectedCrmSupplier] = useState<ICrmSupplier>();
    const [showCrmSupplierModal, setShowCrmSupplierModal] = useState(false);

    const handleDelete = useCallback((crmSupplier: ICrmSupplier) => {
        setSelectedCrmSupplier(crmSupplier);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((crmSupplier: ICrmSupplier) => {
        setSelectedCrmSupplier(crmSupplier);
        setShowCrmSupplierModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowDeleteConfirmation(false);
        setShowCrmSupplierModal(false);
    }, []);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <Link to='/crm-suppliers/create-crm-suppliers'>Crea tus proveedores</Link>
                        <h2>CRM Proveedores</h2>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.column__Branch} d-flex align-items-center justify-content-center`}>Nombre completo</div>
                                    <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-center`}>Tipo de Doc. Id</div>
                                    <div className={`${styles.column__Brand_Assets} d-flex align-items-center justify-content-center`}>Documento identidad</div>
                                    <div className={`${styles.column__Reference_Asset} d-flex align-items-center justify-content-center`}>Email</div>
                                    <div className={`${styles.column__Condition_Asset} d-flex align-items-center justify-content-center`}>Teléfono</div>
                                    <div className={`${styles.column__State_Asset} d-flex align-items-center justify-content-center`}>Departamento</div>
                                    <div className={`${styles.column__State_Asset} d-flex align-items-center justify-content-center`}>Ciudad</div>
                                    <div className={`${styles.column__Action} d-flex align-items-center justify-content-center`}>Acciones</div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.container__Body} d-flex flex-column align-items-center justify-content-between`}>
                            {Array.isArray(crmSuppliers) && crmSuppliers.map((crmSupplier) => (
                                <div key={crmSupplier.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                    <div className={`${styles.column__Branch} d-flex align-items-center justify-content-start`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.typeDocumentId === 'NIT' ? crmSupplier.corporateName : `${crmSupplier.name} ${crmSupplier.lastName}`}</span>
                                    </div>
                                    <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-start`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.typeDocumentId}</span>
                                    </div>
                                    <div className={`${styles.column__Brand_Assets} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.documentId}</span>
                                    </div>
                                    <div className={`${styles.column__Reference_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.email}</span>
                                    </div>
                                    <div className={`${styles.column__Condition_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.phone}</span>
                                    </div>
                                    <div className={`${styles.column__State_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.department}</span>
                                    </div>
                                    <div className={`${styles.column__State_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmSupplier.city}</span>
                                    </div>
                                    <div className={`${styles.column__Action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <RiDeleteBin6Line
                                            className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                            onClick={() => {
                                                setIdCrmSupplier(crmSupplier.id);
                                                setNameCrmSupplier(crmSupplier.name ?? crmSupplier.corporateName ?? '');
                                                handleDelete(crmSupplier);
                                            }}
                                        />
                                        <BsPencil
                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                            onClick={() => {
                                                setIdCrmSupplier(crmSupplier.id);
                                                handleEdit(crmSupplier)
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

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
  
                        <div className='d-flex flex-column'>
                            <h4>Seguimiento</h4>
                            <Link to='/inventories/create-assets' >Registra el seguimiento de tus provedores</Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CrmSuppliersCardPage;