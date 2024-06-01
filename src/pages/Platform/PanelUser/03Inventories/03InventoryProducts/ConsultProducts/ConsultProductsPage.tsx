/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsByBranch } from '../../../../../../redux/User/productSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../../../types/User/products.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import ModalProduct from '../../../../../../components/Platform/03Inventories/Products/ModalProduct/ModalProduct';
import ModalProductOff from '../../../../../../components/Platform/03Inventories/Products/ModalProductOff/ModalProductOff';
import ConfirmDeleteRegister from '../../../../../../components/Platform/03Inventories/ConfirmDeleteRegister';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from './styles.module.css';

function ConsultProductsPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    ///ESTADOS DE REDUX
    const product = useSelector((state: RootState) => state.product.product);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState<string | undefined>('');

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getProducts(token));
        }
    }, [token]);

    //PARA FILTRAR POR SEDE O POR TODAS
    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                dispatch(getProductsByBranch(selectedBranch, token));
            } else {
                // Si no se selecciona ninguna sede, obtén todos los activos
                dispatch(getProducts(token));
            }
        }
    }, [selectedBranch, token, dispatch]);

    const [idProduct, setIdProduct] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IProduct>();
    const [showItemModal, setShowItemModal] = useState(false);
    const [showOff, setShowOff] = useState(false);

    const handleDelete = useCallback((product: IProduct) => {
        setSelectedItem(product);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((product: IProduct) => {
        setSelectedItem(product);
        setShowItemModal(true);
    }, []);

    const handleOff = useCallback((product: IProduct) => {
        setSelectedItem(product);
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
                        <Link to='/inventories/create-products'>Crea tus productos</Link>
                        <Link to='/inventories/quote-products'>Cotizar productos</Link>
                        <div className='mt-4 border d-flex flex-column align-items-center justify-content-center'>
                            <div className='p-4'>
                                <h1 className='text-2xl font-bold'>Productos</h1>
                            </div>
                            <h2>Filtra tus productos por sede</h2>
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
                                {Array.isArray(product) && product.map((product) => (
                                    <div key={product.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                        <div className={`${styles.column__Branch} d-flex align-items-center justify-content-start`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.branchId}</span>
                                        </div>
                                        <div className={`${styles.column__Name_Item} d-flex align-items-center justify-content-start`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.nameItem}</span>
                                        </div>
                                        <div className={`${styles.column__Inventory} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.inventory}</span>
                                        </div>
                                        <div className={`${styles.column__Unit_Measure} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.unitMeasure}</span>
                                        </div>
                                        <div className={`${styles.column__Selling_Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.sellingPrice}</span>
                                        </div>
                                        <div className={`${styles.column__Packaged} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.packaged}</span>
                                        </div>
                                        <div className={`${styles.column__Primary_Package_Type} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.primaryPackageType}</span>
                                        </div>
                                        <div className={`${styles.column__Action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-start overflow-hidden`}>
                                            <RiDeleteBin6Line
                                                className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdProduct(product.id);
                                                    setNameProduct(product.nameItem || '');
                                                    handleDelete(product);
                                                }}
                                            />
                                            <BsPencil
                                                className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdProduct(product.id);
                                                    handleEdit(product)
                                                }}
                                            />
                                            <IoIosCloseCircleOutline
                                                className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                onClick={() => {
                                                    setIdProduct(product.id);
                                                    setNameProduct(product.nameItem || '');
                                                    handleOff(product)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Modal show={showItemModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu producto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalProduct
                                        token={token}
                                        idItem={idProduct}
                                        product={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el produto "{nameProduct}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteRegister
                                    typeRegisterDelete={'Product'}
                                    idItem={idProduct}
                                    nameRegister={nameProduct}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showOff} onHide={() => setShowOff(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para dar de baja del inventario de productos</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalProductOff
                                    token={token}
                                    product={selectedItem as IProduct}
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

export default ConsultProductsPage;