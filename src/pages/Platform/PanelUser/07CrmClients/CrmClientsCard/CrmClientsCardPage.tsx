/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getCrmClients } from '../../../../../redux/User/crmClientSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../types/User/crmClient.types';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBarCompact.tsx';
import Footer from '../../../../../components/Platform/Footer/Footer';
import SeeCrmClient from '../../../../../components/Platform/07CrmClients/01SeeCrmClient/SeeCrmClient';
import ModalCrmClient from '../../../../../components/Platform/07CrmClients/ModalCrmClient/ModalCrmClient';
import ConfirmDeleteCRMClient from '../../../../../components/Platform/07CrmClients/ConfirmDeleteCRMClient/ConfirmDeleteCRMClient';
import SendEmailClients from '../../../../../components/Platform/07CrmClients/SendEmailClients/SendEmailClients';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { MdOutgoingMail } from "react-icons/md";
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
    const [selectedCrmClient, setSelectedCrmClient] = useState<ICrmClient>();
    const [showSeeCrmClient, setShowSeeCrmClient] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showCrmClientModal, setShowCrmClientModal] = useState(false);
    const [showSendEmailClientModal, setShowSendEmailClientModal] = useState(false);
    
    //MODAL PARA VISUALIZAR INFORMACION DEL CLIENTE
    const handleSeeCrmClient = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowSeeCrmClient(true);
    }, []);

    //MODAL PARA ELIMINAR UN CLIENTE
    const handleDelete = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowDeleteConfirmation(true);
    }, []);
    
    //MODAL PARA EDITAR INFORMACION DEL CLIENTE
    const handleEdit = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowCrmClientModal(true);
    }, []);
    
    //MODAL PARA ENVIAR EMIAL AL CLIENTE
    const handleSendEmailClient = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowSendEmailClientModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeCrmClient(false);
        setShowDeleteConfirmation(false);
        setShowCrmClientModal(false);
        setShowSendEmailClientModal(false);
    }, []);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>CRM Clientes</h1>

                        <div className='mb-4 d-flex align-items-center justify-content-between'>
                            <div className="d-flex"></div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/crm-clients/create-crm-clients' className={`${styles.link} text-decoration-none`}>Crea tus clientes</Link>
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
                                {Array.isArray(crmClients) && crmClients.length > 0 ? (
                                    crmClients.map((crmClient) => (
                                        <div key={crmClient.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                            <div className={`${styles.type__Document_Id} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.typeDocumentId}</span>
                                            </div>
                                            <div className={`${styles.document__Id} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.documentId}</span>
                                            </div>
                                            <div className={`${styles.email} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.email}</span>
                                            </div>
                                            <div className={`${styles.phone} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.phone}</span>
                                            </div>
                                            <div className={`${styles.department} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.department ? crmClient.department : 'No definido'}</span>
                                            </div>
                                            <div className={`${styles.city} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.city ? crmClient.city : 'No definido'}</span>
                                            </div>
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Edit} `}
                                                        onClick={() => {
                                                            setIdCrmClient(crmClient.id);
                                                            setNameCrmClient(crmClient.name ?? crmClient.corporateName ?? '');
                                                            handleSeeCrmClient(crmClient);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <RiDeleteBin6Line
                                                        className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdCrmClient(crmClient.id);
                                                            setNameCrmClient(crmClient.name ?? crmClient.corporateName ?? '');
                                                            handleDelete(crmClient);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <BsPencil
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdCrmClient(crmClient.id);
                                                            handleEdit(crmClient)
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutgoingMail
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdCrmClient(crmClient.id);
                                                            handleSendEmailClient(crmClient)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                        No tienes clientes registrados
                                    </div>
                                )}
                            </div>
                        </div>

                        <Modal show={showSeeCrmClient} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu cliente</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedCrmClient &&
                                    <SeeCrmClient
                                        selectedCrmClient={selectedCrmClient}
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

                        <Modal show={showSendEmailClientModal} onHide={onCloseModal} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Envía mails a tu cliente</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <SendEmailClients
                                    token={token}
                                    selectedCrmClient={selectedCrmClient}
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

export default CrmClientsCardPage;