/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getRawMaterials, getRawMaterialsByBranch } from '../../../../../../redux/User/rawMaterialSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../../types/User/rawMaterial.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import ConsultRawMaterialsOff from '../../../../../../components/Platform/03Inventories/04RawMaterials/01ConsultRawMaterialsOff/ConsultRawMaterialsOff';
import SeeItemRawMaterials from '../../../../../../components/Platform/03Inventories/04RawMaterials/02SeeItemRawMaterials/SeeItemRawMaterials';
import ConfirmDeleteRegister from '../../../../../../components/Platform/03Inventories/ConfirmDeleteRegister';
import ModalEditRawMaterial from '../../../../../../components/Platform/03Inventories/04RawMaterials/04ModalEditRawMaterial/ModalEditRawMaterial';
import AddInventoryRawMaterial from '../../../../../../components/Platform/03Inventories/04RawMaterials/05AddInventoryRawMaterial/AddInventoryRawMaterial';
import ModalRawMaterialOff from '../../../../../../components/Platform/03Inventories/04RawMaterials/06ModalRawMaterialOff/ModalRawMaterialOff';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from './styles.module.css';

function ConsultRawMateralsPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    ///ESTADOS DE REDUX
    const rawMaterial = useSelector((state: RootState) => state.rawMaterial.rawMaterial);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState<string | undefined>('');

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getRawMaterials(token));
        }
    }, [token]);

    //PARA FILTRAR POR SEDE O POR TODAS
    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                dispatch(getRawMaterialsByBranch(selectedBranch, token));
            } else {
                // Si no se selecciona ninguna sede, obtén todos los activos
                dispatch(getRawMaterials(token));
            }
        }
    }, [selectedBranch, token, dispatch]);

    const [idRawMaterial, setIdRawMaterial] = useState('');
    const [idBranch, setIdBranch] = useState('');
    const [nameRawMaterial, setNameRawMaterial] = useState('');
    const [selectedItem, setSelectedItem] = useState<IRawMaterial>();
    const [showSeeItem, setShowSeeItem] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditRawMaterialModal, setShowEditRawMaterialModal] = useState(false);
    const [showOff, setShowOff] = useState(false);
    const [showConsultOff, setShowConsultOff] = useState(false);
    const [showAddInventory, setShowAddInventory] = useState(false);

    const handleConsultOff = useCallback(() => {
        setShowConsultOff(true);
    }, []);

    const handleSeeItem = useCallback((asset: IRawMaterial) => {
        setSelectedItem(asset);
        setShowSeeItem(true);
    }, []);

    const handleDelete = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowEditRawMaterialModal(true);
    }, []);

    const handleAddInventory = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowAddInventory(true);
    }, []);

    const handleOff = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowOff(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeItem(false);
        setShowDeleteConfirmation(false);
        setShowEditRawMaterialModal(false);
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
                        <h1 className={`${styles.title} mb-4 mt-4`}>Materias primas</h1>

                        <div className='mb-4 d-flex align-items-center justify-content-between'>
                            <div className="d-flex">
                                <div className={styles.link__Head_Navigate} onClick={handleConsultOff} >
                                    Ver dados de baja
                                </div>
                            </div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/inventories/create-raw-materals' className={`${styles.link} text-decoration-none`}>Registro de materias primas</Link>
                            </div>
                        </div>

                        <Modal show={showConsultOff} onHide={() => setShowConsultOff(false)} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalle de las mercancías dadas de baja</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConsultRawMaterialsOff
                                    token={token}
                                    branches={branchesArray}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <div className={`${styles.container__Filter_Branch} mt-4 mb-4 d-flex align-items-center`}>
                            <h3 className='m-0'>Filtra tus materias primas por sede</h3>
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
                                    <div className={`${styles.brand__Assets} d-flex align-items-center justify-content-center text-center`}>Marca</div>
                                    <div className={`${styles.inventory} d-flex align-items-center justify-content-center text-center`}>Inventario</div>
                                    <div className={`${styles.selling__Price} d-flex align-items-center justify-content-center text-center`}>Precio de compra</div>
                                    <div className={`${styles.IVA} d-flex align-items-center justify-content-center text-center`}>IVA</div>
                                    <div className={`${styles.price} d-flex align-items-center justify-content-center text-center`}>Precio de venta</div>
                                    <div className={`${styles.packaged} d-flex align-items-center justify-content-center text-center`}>Empacado</div>
                                    <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body} d-flex flex-column`}>
                                {Array.isArray(rawMaterial) && rawMaterial.length > 0 ? (
                                    rawMaterial.map((rawMaterial) => (
                                        <div key={rawMaterial.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                                        rawMaterial.branchId === branch.id && (
                                                            <span className={`${styles.text__Ellipsis} text-center overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                        )
                                                    ))}
                                                </span>
                                            </div>
                                            <div className={`${styles.name__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.barCode}</span>
                                            </div>
                                            <div className={`${styles.name__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.nameItem}</span>
                                            </div>
                                            <div className={`${styles.name__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.brandItem}</span>
                                            </div>
                                            <div className={`${styles.inventory} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.inventory} {rawMaterial.unitMeasure}</span>
                                            </div>
                                            <div className={`${styles.selling__Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(rawMaterial.purchasePriceBeforeTax)}</span>
                                            </div>
                                            <div className={`${styles.selling__Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{formatNumber(rawMaterial.IVA)} %</span>
                                            </div>
                                            <div className={`${styles.selling__Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.sellingPrice ? `$ ${formatNumber(rawMaterial.sellingPrice)}` : 'No definido'}</span>
                                            </div>
                                            <div className={`${styles.packaged} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.packaged}</span>
                                            </div>
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Edit} `}
                                                        onClick={() => {
                                                            setIdRawMaterial(rawMaterial.id);
                                                            setNameRawMaterial(rawMaterial.nameItem || '');
                                                            handleSeeItem(rawMaterial);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <RiDeleteBin6Line
                                                        className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRawMaterial(rawMaterial.id);
                                                            setNameRawMaterial(rawMaterial.nameItem || '');
                                                            handleDelete(rawMaterial);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <BsPencil
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRawMaterial(rawMaterial.id);
                                                            handleEdit(rawMaterial)
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <FaPlus
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRawMaterial(rawMaterial.id);
                                                            setNameRawMaterial(rawMaterial.nameItem || '');
                                                            setIdBranch(rawMaterial.branchId);
                                                            handleAddInventory(rawMaterial)
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <IoIosCloseCircleOutline
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdRawMaterial(rawMaterial.id);
                                                            setNameRawMaterial(rawMaterial.nameItem || '');
                                                            handleOff(rawMaterial)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`${styles.noRawMaterialMessage} d-flex align-items-center justify-content-center`}>
                                        No tienes materias primas registradas
                                    </div>
                                )}
                            </div>
                        </div>

                        <Modal show={showSeeItem} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu materia prima</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <SeeItemRawMaterials
                                        rawMaterial={selectedItem}
                                        branches={branchesArray}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar la materia prima "{nameRawMaterial}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteRegister
                                    typeRegisterDelete={'RawMaterial'}
                                    idItem={idRawMaterial}
                                    nameRegister={nameRawMaterial}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showEditRawMaterialModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu materia prima</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalEditRawMaterial
                                        token={token}
                                        idItem={idRawMaterial}
                                        rawMaterial={selectedItem}
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
                                <AddInventoryRawMaterial
                                    token={token}
                                    idItem={idRawMaterial}
                                    nameItem={nameRawMaterial}
                                    idBranch={idBranch}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showOff} onHide={() => setShowOff(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para dar de baja del inventario de materias primas</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalRawMaterialOff
                                    token={token}
                                    rawMaterial={selectedItem as IRawMaterial}
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

export default ConsultRawMateralsPage;