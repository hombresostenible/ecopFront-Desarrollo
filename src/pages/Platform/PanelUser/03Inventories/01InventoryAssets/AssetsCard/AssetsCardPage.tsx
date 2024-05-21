/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAssets, getAssetsByBranch } from '../../../../../../redux/User/assetsSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../../types/User/assets.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import ModalAsset from '../../../../../../components/Platform/03Inventories/Assets/ModalAsset/ModalAsset';
import ModalAssetOff from '../../../../../../components/Platform/03Inventories/Assets/ModalAssetOff/ModalAssetOff';
import ConfirmDeleteRegister from '../../../../../../components/Platform/03Inventories/ConfirmDeleteRegister';
import ConsultAssetOff from '../../../../../../components/Platform/03Inventories/Assets/ConsultAssetOff';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from './styles.module.css';

function InventoryAssetsPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const assets = useSelector((state: RootState) => state.assets.assets);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState<string | undefined>('');

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getAssets(token));
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                dispatch(getAssetsByBranch(selectedBranch, token));
            } else {
                // Si no se selecciona ninguna sede, obtén todos los activos
                dispatch(getAssets(token));
            }
        }
    }, [selectedBranch, token, dispatch]);

    const [idAsset, setIdAsset] = useState('');
    const [nameAsset, setNameAsset] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IAssets>();
    const [showItemModal, setShowItemModal] = useState(false);
    const [showOff, setShowOff] = useState(false);
    const [showConsultAssetOff, setShowConsultAssetOff] = useState(false);

    const handleConsultAssetOff = useCallback(() => {
        setShowConsultAssetOff(true);
    }, []);

    const assetsWithInventoryOff = Array.isArray(assets) ? assets.filter(asset => asset.inventoryOff) : [];

    const handleDelete = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowItemModal(true);
    }, []);

    const handleOff = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
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
                        <Link to='/inventories/create-asset'>Crea tus activos</Link>
                        <div className="d-flex">
                            <div
                                className={`${styles.linkTransfer} border-0 m-auto rounded text-decoration-none`}
                                onClick={handleConsultAssetOff}
                            >
                                Visualiza tus activos dados de baja
                            </div>
                        </div>

                        <Modal show={showConsultAssetOff} onHide={() => setShowConsultAssetOff(false)} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de los equipos dados de baja</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConsultAssetOff
                                    token={token}
                                    assets={assetsWithInventoryOff}
                                    branches={branchesArray}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <div className='mt-4 border d-flex flex-column align-items-center justify-content-center'>
                            <div className='p-4'>
                                <h1 className='text-2xl font-bold'>Equipos, herramientas y máquinas</h1>
                            </div>
                            <h2>Filtra tus activos por sede</h2>
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
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.column__Branch} d-flex align-items-center justify-content-center`}>Sede</div>
                                    <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-center`}>Nombre del item</div>
                                    <div className={`${styles.column__Brand_Assets} d-flex align-items-center justify-content-center`}>Marca</div>
                                    <div className={`${styles.column__Reference_Asset} d-flex align-items-center justify-content-center`}>Referencia</div>
                                    <div className={`${styles.column__Condition_Asset} d-flex align-items-center justify-content-center`}>Condición</div>
                                    <div className={`${styles.column__State_Asset} d-flex align-items-center justify-content-center`}>Estado</div>
                                    <div className={`${styles.column__Action} d-flex align-items-center justify-content-center`}>Acciones</div>
                                </div>
                            </div>
                            <div className={`${styles.container__Body} d-flex flex-column align-items-center justify-content-between`}>
                                {Array.isArray(assets) && assets.map((asset) => (
                                    <div key={asset.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                        <div className={`${styles.column__Branch} d-flex align-items-center justify-content-start`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.branchId}</span>
                                        </div>
                                        <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-start`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.nameItem}</span>
                                        </div>
                                        <div className={`${styles.column__Brand_Assets} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.brandAssets}</span>
                                        </div>
                                        <div className={`${styles.column__Reference_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.referenceAssets}</span>
                                        </div>
                                        <div className={`${styles.column__Condition_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.conditionAssets}</span>
                                        </div>
                                        <div className={`${styles.column__State_Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.stateAssets}</span>
                                        </div>
                                        <div className={`${styles.column__Action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <RiDeleteBin6Line
                                                className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdAsset(asset.id);
                                                    setNameAsset(asset.nameItem || '');
                                                    handleDelete(asset);
                                                }}
                                            />
                                            <BsPencil
                                                className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdAsset(asset.id);
                                                    handleEdit(asset)
                                                }}
                                            />
                                            <IoIosCloseCircleOutline
                                                className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdAsset(asset.id);
                                                    setNameAsset(asset.nameItem || '');
                                                    handleOff(asset)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Modal show={showItemModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Activo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalAsset
                                        token={token}
                                        idItem={idAsset}
                                        asset={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el activo "{nameAsset}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteRegister
                                    typeRegisterDelete={'Asset'}
                                    idItem={idAsset}
                                    nameRegister={nameAsset}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showOff} onHide={() => setShowOff(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para dar de baja a tu activo "{nameAsset}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalAssetOff
                                    asset={selectedItem as IAssets}
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

export default InventoryAssetsPage;