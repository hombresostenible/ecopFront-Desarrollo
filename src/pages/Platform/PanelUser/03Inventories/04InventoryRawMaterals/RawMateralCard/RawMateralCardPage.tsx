/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
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
import ModalRawMaterial from '../../../../../../components/Platform/03Inventories/RawMaterials/ModalRawMaterial/ModalRawMaterial';
import ModalRawMaterialOff from '../../../../../../components/Platform/03Inventories/RawMaterials/ModalRawMaterialOff/ModalRawMaterialOff';
import ConfirmDeleteRegister from '../../../../../../components/Platform/03Inventories/ConfirmDeleteRegister';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from './styles.module.css';

function RawMateralCardPage() {
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
    const [nameRawMaterial, setNameRawMaterial] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IRawMaterial>();
    const [showItemModal, setShowItemModal] = useState(false);
    const [showOff, setShowOff] = useState(false);

    const handleDelete = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowItemModal(true);
    }, []);

    const handleOff = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowOff(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowDeleteConfirmation(false);
        setShowItemModal(false);
        setShowOff(false);
    }, []);

    const branchesArray = Array.isArray(branches) ? branches : [];

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <div className='mt-4 border d-flex flex-column align-items-center justify-content-center'>
                            <div className='p-4'>
                                <h1 className='text-2xl font-bold'>Materias primas</h1>
                            </div>
                            <h2>Filtra tus materias primas por sede</h2>
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
                                    <div className={`${styles.column__Inventory} d-flex align-items-center justify-content-center`}>Inventario</div>
                                    <div className={`${styles.column__Unit_Measure} d-flex align-items-center justify-content-center`}>Unidad de medida</div>
                                    <div className={`${styles.column__Selling_Price} d-flex align-items-center justify-content-center`}>Precio</div>
                                    <div className={`${styles.column__Packaged} d-flex align-items-center justify-content-center`}>Empacado</div>
                                    <div className={`${styles.column__Primary_Package_Type} d-flex align-items-center justify-content-center`}>Empaque principal</div>
                                    <div className={`${styles.column__Action} d-flex align-items-center justify-content-center`}>Acciones</div>
                                </div>
                            </div>
                            <div className={`${styles.container__Body} d-flex flex-column `}>
                                {Array.isArray(rawMaterial) && rawMaterial.map((rawMaterial) => (
                                    <div key={rawMaterial.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                        <div className={`${styles.column__Branch} d-flex align-items-center justify-content-start`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.branchId}</span>
                                        </div>
                                        <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-start`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.nameItem}</span>
                                        </div>
                                        <div className={`${styles.column__Inventory} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.inventory}</span>
                                        </div>
                                        <div className={`${styles.column__Unit_Measure} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.unitMeasure}</span>
                                        </div>
                                        <div className={`${styles.column__Selling_Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.sellingPrice}</span>
                                        </div>
                                        <div className={`${styles.column__Packaged} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.packaged}</span>
                                        </div>
                                        <div className={`${styles.column__Primary_Package_Type} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.primaryPackageType}</span>
                                        </div>
                                        <div className={`${styles.column__Action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <RiDeleteBin6Line
                                                className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdRawMaterial(rawMaterial.id);
                                                    setNameRawMaterial(rawMaterial.nameItem || '');
                                                    handleDelete(rawMaterial);
                                                }}
                                            />
                                            <BsPencil
                                                className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdRawMaterial(rawMaterial.id);
                                                    handleEdit(rawMaterial)
                                                }}
                                            />
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
                                ))}
                            </div>
                        </div>

                        <Modal show={showItemModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu materia prima</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalRawMaterial
                                        token={token}
                                        idItem={idRawMaterial}
                                        rawMaterial={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
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

export default RawMateralCardPage;