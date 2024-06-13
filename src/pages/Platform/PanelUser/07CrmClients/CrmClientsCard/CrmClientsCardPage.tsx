/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCrmClients } from '../../../../../redux/User/crmClientSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../types/User/crmClient.types';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import ModalCrmClient from '../../../../../components/Platform/07CrmClients/ModalCrmClient/ModalCrmClient';
import ConfirmDeleteCRMClient from '../../../../../components/Platform/07CrmClients/ConfirmDeleteCRMClient/ConfirmDeleteCRMClient';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

function CrmClientsCardPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const crmClients = useSelector((state: RootState) => state.crmClient.crmClient);

    useEffect(() => {
        if (token) {
            dispatch(getCrmClients(token));
        }
    }, [token]);

    const [idCrmClient, setIdCrmClient] = useState('');
    const [nameCrmClient, setNameCrmClient] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedCrmClient, setSelectedCrmClient] = useState<ICrmClient>();
    const [showCrmClientModal, setShowCrmClientModal] = useState(false);

    const handleDelete = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowCrmClientModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowDeleteConfirmation(false);
        setShowCrmClientModal(false);
    }, []);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>CRM Clientes</h1>

                        <Link to='/crm-clients/create-crm-clients' className={styles.link__Income_Create}>Crea tus clientes</Link>
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
                            {Array.isArray(crmClients) && crmClients.map((crmClient) => (
                                <div key={crmClient.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                    <div className={`${styles.column__Branch} d-flex align-items-center justify-content-start`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.typeDocumentId === 'NIT' ? crmClient.corporateName : `${crmClient.name} ${crmClient.lastName}`}</span>
                                    </div>
                                    <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-start`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.typeDocumentId}</span>
                                    </div>
                                    <div className={`${styles.column__Brand_Assets} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.documentId}</span>
                                    </div>
                                    <div className={`${styles.column__Reference_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.email}</span>
                                    </div>
                                    <div className={`${styles.column__Condition_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.phone}</span>
                                    </div>
                                    <div className={`${styles.column__State_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.department}</span>
                                    </div>
                                    <div className={`${styles.column__State_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.city}</span>
                                    </div>
                                    <div className={`${styles.column__Action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                        <RiDeleteBin6Line
                                            className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                            onClick={() => {
                                                setIdCrmClient(crmClient.id);
                                                setNameCrmClient(crmClient.name ?? crmClient.corporateName ?? '');
                                                handleDelete(crmClient);
                                            }}
                                        />
                                        <BsPencil
                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                            onClick={() => {
                                                setIdCrmClient(crmClient.id);
                                                handleEdit(crmClient)
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Modal show={showCrmClientModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Cliente</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedCrmClient &&
                                    <ModalCrmClient
                                        token={token}
                                        idCrmClient={idCrmClient}
                                        crmClient={selectedCrmClient}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el cliente "{nameCrmClient}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteCRMClient
                                    token={token}
                                    idCrmClient={idCrmClient}
                                    nameClient={nameCrmClient}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>
  
                        <div className='d-flex flex-column'>
                            <h4 className={`${styles.subTitle} `}>Seguimiento</h4>
                            <Link to='/inventories/create-assets' className={styles.link__Income_Create}>Registra el seguimiento de tus clientes</Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CrmClientsCardPage;