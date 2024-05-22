/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getServices, getServicesByBranch } from '../../../../../../redux/User/serviceSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IService } from '../../../../../../types/User/services.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import ModalService from '../../../../../../components/Platform/03Inventories/Servicios/ModalService/ModalService';
import ConfirmDeleteRegister from '../../../../../../components/Platform/03Inventories/ConfirmDeleteRegister';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from './styles.module.css';

function ServicesCardPage() {
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
                // Si no se selecciona ninguna sede, obtén todos los activos
                dispatch(getServices(token));
            }
        }
    }, [selectedBranch, token, dispatch]);

    const [idRawMaterial, setIdRawMaterial] = useState('');
    const [nameRawMaterial, setNameRawMaterial] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IService>();
    const [showItemModal, setShowItemModal] = useState(false);

    const handleDelete = useCallback((service: IService) => {
        setSelectedItem(service);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((service: IService) => {
        setSelectedItem(service);
        setShowItemModal(true);
    }, []);

    const handleOff = useCallback((service: IService) => {
        setSelectedItem(service);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowDeleteConfirmation(false);
        setShowItemModal(false);
    }, []);

    const branchesArray = Array.isArray(branches) ? branches : [];

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <Link to='/inventories/create-services'>Crea tus servicios</Link>
                        <div className='mt-4 border d-flex flex-column align-items-center justify-content-center'>
                            <div className='p-4'>
                                <h1 className='text-2xl font-bold'>Servicios</h1>
                            </div>
                            <h2>Filtra tus servicios por sede</h2>
                            <select
                                value={selectedBranch || ''}
                                className="mx-2 p-3 mb-3 m-center col-lg-5 col-md-4 col-sm-6 col-xs-12 text-center border rounded"
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
                                <div className={`${styles.container__Tr} text-center d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.column__Branch} d-flex align-items-center justify-content-center`}>Sede</div>
                                    <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-center`}>Nombre del item</div>
                                    <div className={`${styles.column__Selling_Price} d-flex align-items-center justify-content-center`}>Precio</div>
                                    <div className={`${styles.column__Action} d-flex align-items-center justify-content-center`}>Acciones</div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body} d-flex flex-column `}>
                                {Array.isArray(service) && service.map((service) => (
                                    <div key={service.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                        <div className={`${styles.column__Branch} d-flex align-items-center justify-content-start`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{service.branchId}</span>
                                        </div>
                                        <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-start`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{service.nameItem}</span>
                                        </div>
                                        <div className={`${styles.column__Selling_Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{service.sellingPrice}</span>
                                        </div>
                                        <div className={`${styles.column__Action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <RiDeleteBin6Line
                                                className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdRawMaterial(service.id);
                                                    setNameRawMaterial(service.nameItem || '');
                                                    handleDelete(service);
                                                }}
                                            />
                                            <BsPencil
                                                className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdRawMaterial(service.id);
                                                    handleEdit(service)
                                                }}
                                            />
                                            <IoIosCloseCircleOutline
                                                className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdRawMaterial(service.id);
                                                    setNameRawMaterial(service.nameItem || '');
                                                    handleOff(service)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Modal show={showItemModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu materia prima</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalService
                                        token={token}
                                        idItem={idRawMaterial}
                                        service={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
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
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ServicesCardPage;