/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { getServices, getServicesByBranch } from '../../../../../../redux/User/serviceSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IService } from '../../../../../../types/User/services.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import SeeItemService from '../../../../../../components/Platform/03Inventories/05Servicios/01SeeItemService/SeeItemService';
import ConfirmDeleteRegister from '../../../../../../components/Platform/ConfirmDeleteRegister/ConfirmDeleteRegister';
import ModalEditService from '../../../../../../components/Platform/03Inventories/05Servicios/03ModalEditService/ModalEditService';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

function ConsultServicesPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    ///ESTADOS DE REDUX
    const service = useSelector((state: RootState) => state.service.service);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState<string | undefined>('');

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getServices(token));
        }
    }, [token]);

    //PARA FILTRAR POR SEDE O POR TODAS
    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                dispatch(getServicesByBranch(selectedBranch, token));
            } else {
                dispatch(getServices(token));
            }
        }
    }, [selectedBranch, token, dispatch]);

    const [idRawMaterial, setIdRawMaterial] = useState('');
    const [nameRawMaterial, setNameRawMaterial] = useState('');
    const [selectedItem, setSelectedItem] = useState<IService>();
    const [showSeeItem, setShowSeeItem] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditServiceModal, setShowEditServiceModal] = useState(false);

    const handleDelete = useCallback((service: IService) => {
        setSelectedItem(service);
        setShowDeleteConfirmation(true);
    }, []);

    const handleSeeItem = useCallback((asset: IService) => {
        setSelectedItem(asset);
        setShowSeeItem(true);
    }, []);

    const handleEdit = useCallback((service: IService) => {
        setSelectedItem(service);
        setShowEditServiceModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeItem(false);
        setShowDeleteConfirmation(false);
        setShowEditServiceModal(false);
    }, []);

    const branchesArray = Array.isArray(branches) ? branches : [];

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Servicios</h1>

                        <div className='mb-4 d-flex align-items-center justify-content-between'>
                            <div className="d-flex"></div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/inventories/create-services' className={`${styles.link} text-decoration-none`}>Registro de servicios</Link>
                            </div>
                        </div>

                        <div className={`${styles.container__Filter_Branch} mt-4 mb-4 d-flex align-items-center`}>
                            <h3 className='m-0'>Filtra tus servicios por sede</h3>
                            <select
                                value={selectedBranch || ''}
                                className="mx-2 p-2 border rounded"
                                onChange={(e) => setSelectedBranch(e.target.value)}
                            >
                                <option value=''>Todas</option>
                                {branchesArray.map((branch: IBranch, index: number) => (
                                    <option key={index} value={branch.id}>
                                        {branch.nameBranch}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.branch} d-flex align-items-center justify-content-center text-center`}>Sede</div>
                                    <div className={`${styles.bar__Code} d-flex align-items-center justify-content-center text-center`}>Código de barras</div>
                                    <div className={`${styles.name__Item} d-flex align-items-center justify-content-center text-center`}>Nombre del item</div>
                                    <div className={`${styles.IVA} d-flex align-items-center justify-content-center text-center`}>IVA</div>
                                    <div className={`${styles.selling__Price} d-flex align-items-center justify-content-center text-center`}>Precio de venta</div>
                                    <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body} d-flex flex-column `}>
                                {Array.isArray(service) && service.length > 0 ? (
                                    service.map((service) => (
                                        <div key={service.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                            <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                                        service.branchId === branch.id && (
                                                            <span className={`${styles.text__Ellipsis} text-center overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                        )
                                                    ))}
                                                </span>
                                            </div>
                                            <div className={`${styles.bar__Code} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{service.barCode ? service.barCode : 'No definido'}</span>
                                            </div>
                                            <div className={`${styles.name__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{service.nameItem}</span>
                                            </div>
                                            <div className={`${styles.IVA} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{service.IVA} %</span>
                                            </div>
                                            <div className={`${styles.selling__Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(service.sellingPrice)}</span>
                                            </div>
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Edit} `}
                                                        onClick={() => {
                                                            setIdRawMaterial(service.id);
                                                            setNameRawMaterial(service.nameItem || '');
                                                            handleSeeItem(service);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <RiDeleteBin6Line
                                                        className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRawMaterial(service.id);
                                                            setNameRawMaterial(service.nameItem || '');
                                                            handleDelete(service);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <BsPencil
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRawMaterial(service.id);
                                                            handleEdit(service)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                        No tienes servicios registrados
                                    </div>
                                )}
                            </div>
                        </div>

                        <Modal show={showSeeItem} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu mercancía</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <SeeItemService
                                        service={selectedItem}
                                        branches={branchesArray}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el servicio "{nameRawMaterial}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteRegister
                                    typeRegisterDelete={'Service'}
                                    idItem={idRawMaterial}
                                    nameRegister={nameRawMaterial}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showEditServiceModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu materia prima</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalEditService
                                        token={token}
                                        idItem={idRawMaterial}
                                        service={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ConsultServicesPage;