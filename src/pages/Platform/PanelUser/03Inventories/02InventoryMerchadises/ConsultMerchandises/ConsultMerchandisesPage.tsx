/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { getMerchandises, getMerchandisesByBranch } from '../../../../../../redux/User/merchandiseSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IMerchandise } from '../../../../../../types/User/merchandise.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import ConsultMerchandisesOff from '../../../../../../components/Platform/03Inventories/02Merchandises/01ConsultMerchandisesOff/ConsultMerchandisesOff';
import SeeItemMerchandise from '../../../../../../components/Platform/03Inventories/02Merchandises/02SeeItemMerchandise/SeeItemMerchandise';
import ConfirmDeleteRegister from '../../../../../../components/Platform/ConfirmDeleteRegister/ConfirmDeleteRegister';
import ModalEditMerchandise from '../../../../../../components/Platform/03Inventories/02Merchandises/04ModalEditMerchandise/ModalEditMerchandise';
import AddInventoryMerchandise from '../../../../../../components/Platform/03Inventories/02Merchandises/05AddInventoryMerchandise/AddInventoryMerchandise';
import ModalMerchadiseOff from '../../../../../../components/Platform/03Inventories/02Merchandises/06ModalMerchadiseOff/ModalMerchadiseOff';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from './styles.module.css';

function ConsultMerchandisesPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    ///ESTADOS DE REDUX
    const merchandises = useSelector((state: RootState) => state.merchandise.merchandise);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState<string | undefined>('');

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getMerchandises(token));
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                dispatch(getMerchandisesByBranch(selectedBranch, token));
            } else {
                // Si no se selecciona ninguna sede, obtén todos los activos
                dispatch(getMerchandises(token));
            }
        }
    }, [selectedBranch, token, dispatch]);

    const [idMerchadise, setIdMerchadise] = useState('');
    const [idBranch, setIdBranch] = useState('');
    const [nameMerchadise, setNameMerchadise] = useState('');
    const [selectedItem, setSelectedItem] = useState<IMerchandise>();
    const [showSeeItem, setShowSeeItem] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditMerchandiseModal, setShowEditMerchandiseModal] = useState(false);
    const [showOff, setShowOff] = useState(false);
    const [showConsultOff, setShowConsultOff] = useState(false);
    const [showAddInventory, setShowAddInventory] = useState(false);

    const handleConsultOff = useCallback(() => {
        setShowConsultOff(true);
    }, []);

    const handleSeeItem = useCallback((asset: IMerchandise) => {
        setSelectedItem(asset);
        setShowSeeItem(true);
    }, []);

    const handleDelete = useCallback((merchadise: IMerchandise) => {
        setSelectedItem(merchadise);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((merchadise: IMerchandise) => {
        setSelectedItem(merchadise);
        setShowEditMerchandiseModal(true);
    }, []);

    const handleAddInventory = useCallback((merchadise: IMerchandise) => {
        setSelectedItem(merchadise);
        setShowAddInventory(true);
    }, []);

    const handleOff = useCallback((merchadise: IMerchandise) => {
        setSelectedItem(merchadise);
        setShowOff(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeItem(false);
        setShowDeleteConfirmation(false);
        setShowEditMerchandiseModal(false);
        setShowAddInventory(false);
        setShowOff(false);
    }, []);

    const branchesArray = Array.isArray(branches) ? branches : [];

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Mercancías</h1>

                        <div className='mb-4 d-flex align-items-center justify-content-between'>
                            <div className="d-flex">
                                <div className={styles.link__Head_Navigate} onClick={handleConsultOff} >
                                    Ver dados de baja
                                </div>
                            </div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/inventories/create-merchandises' className={`${styles.link} text-decoration-none`}>Registro de mercancías</Link>
                            </div>
                        </div>

                        <Modal show={showConsultOff} onHide={() => setShowConsultOff(false)} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalle de las mercancías dadas de baja</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConsultMerchandisesOff
                                    token={token}
                                    branches={branchesArray}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <div className={`${styles.container__Filter_Branch} mt-4 mb-4 d-flex align-items-center`}>
                            <h3 className='m-0'>Filtra tus mercancías por sede</h3>
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
                                    <div className={`${styles.brand} d-flex align-items-center justify-content-center text-center`}>Marca</div>
                                    <div className={`${styles.inventory} d-flex align-items-center justify-content-center text-center`}>Inventario</div>
                                    <div className={`${styles.IVA} d-flex align-items-center justify-content-center text-center`}>IVA</div>
                                    <div className={`${styles.selling__Price} d-flex align-items-center justify-content-center text-center`}>Precio de venta</div>
                                    <div className={`${styles.packaged} d-flex align-items-center justify-content-center text-center`}>Empacado</div>
                                    <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body} `}>
                                {Array.isArray(merchandises) && merchandises.length > 0 ? (
                                    merchandises.map((merchadise) => (
                                        <div key={merchadise.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                            <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                                        merchadise.branchId === branch.id && (
                                                            <span className={`${styles.text__Ellipsis} text-center overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                        )
                                                    ))}
                                                </span>
                                            </div>
                                            <div className={`${styles.bar__Code} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{merchadise.barCode ? merchadise.barCode : 'No definido'}</span>
                                            </div>
                                            <div className={`${styles.name__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{merchadise.nameItem}</span>
                                            </div>
                                            <div className={`${styles.brand} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{merchadise.brandItem}</span>
                                            </div>
                                            <div className={`${styles.inventory} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{merchadise.inventory} {merchadise.unitMeasure}s</span>
                                            </div>
                                            <div className={`${styles.IVA} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{merchadise.IVA} %</span>
                                            </div>
                                            <div className={`${styles.selling__Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(merchadise.sellingPrice)}</span>
                                            </div>
                                            <div className={`${styles.packaged} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{merchadise.packaged}</span>
                                            </div>
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Edit} `}
                                                        onClick={() => {
                                                            setIdMerchadise(merchadise.id);
                                                            setNameMerchadise(merchadise.nameItem || '');
                                                            handleSeeItem(merchadise);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <RiDeleteBin6Line
                                                        className={`${styles.button__Delete} `}
                                                        onClick={() => {
                                                            setIdMerchadise(merchadise.id);
                                                            setNameMerchadise(merchadise.nameItem || '');
                                                            handleDelete(merchadise);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <BsPencil
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdMerchadise(merchadise.id);
                                                            handleEdit(merchadise)
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <FaPlus
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdMerchadise(merchadise.id);
                                                            setNameMerchadise(merchadise.nameItem || '');
                                                            setIdBranch(merchadise.branchId);
                                                            handleAddInventory(merchadise)
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <IoIosCloseCircleOutline
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdMerchadise(merchadise.id);
                                                            setNameMerchadise(merchadise.nameItem || '');
                                                            handleOff(merchadise)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                        No tienes mercancías registradas
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
                                    <SeeItemMerchandise
                                        merchandise={selectedItem}
                                        branches={branchesArray}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar la mercancía "{nameMerchadise}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteRegister
                                    typeRegisterDelete={'Merchandise'}
                                    idItem={idMerchadise}
                                    nameRegister={nameMerchadise}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showEditMerchandiseModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu mercancía</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalEditMerchandise
                                        token={token}
                                        idItem={idMerchadise}
                                        merchandise={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showAddInventory} onHide={() => setShowAddInventory(false)} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Aumenta tu inventario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddInventoryMerchandise
                                    token={token}
                                    idItem={idMerchadise}
                                    nameItem={nameMerchadise}
                                    idBranch={idBranch}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showOff} onHide={() => setShowOff(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para dar de baja a tu mercancía "{nameMerchadise}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalMerchadiseOff
                                    token={token}
                                    merchandise={selectedItem as IMerchandise}
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

export default ConsultMerchandisesPage;