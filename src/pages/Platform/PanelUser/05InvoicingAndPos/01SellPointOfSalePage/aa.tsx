/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getItemByBarCode } from '../../../../../redux/User/itemBybarCodeOrName/actions';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import SearchItemName from '../../../../../components/Platform/05InvoicingAndPos/01SearchItemName/SearchItemName';
import SelectQuantity from '../../../../../components/Platform/05InvoicingAndPos/02SelectQuantity/SelectQuantity';
import PlasticBagCharged from '../../../../../components/Platform/05InvoicingAndPos/03PlasticBagCharged/PlasticBagCharged';
import Facturation from '../../../../../components/Platform/05InvoicingAndPos/04Facturation/Facturation';
import DataFacturation from '../../../../../components/Platform/05InvoicingAndPos/05DataFacturation/DataFacturation';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

function SellPointOfSalePage() {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    const itemByBarCodeOrName = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByBarCodeOrName);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) dispatch(getBranches(token));
    }, [token]);

    const [selectedBranch, setSelectedBranch] = useState('');
    const [barCode, setBarCode] = useState<string>('');
    const [scannedItems, setScannedItems] = useState<{ item: any, quantity: number }[]>([]);
    const [currentItem, setCurrentItem] = useState<any>(null);

    const handleBranchChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedBranch(value);
    };

    const handleBarCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBarCode(value);

        if (value) dispatch(getItemByBarCode(value, token));
    };

    useEffect(() => {
        const inputElement = document.getElementById("barCodeInput") as HTMLInputElement;
        if (inputElement) {
            inputElement.value = '';
        }
    }, [scannedItems]);

    const handleItemSelect = (item: any) => {
        setScannedItems(prevItems => [...prevItems, { item, quantity: 1 }]);
    };

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showCancelModalPlasticBag, setShowCancelModalPlasticBag] = useState(false);
    const [selectedPlasticBagOption, setSelectedPlasticBagOption] = useState<number | null>(null);
    const [showDataFacturation, setShowDataFacturation] = useState(false);
    const [showCancelModalFacturation, setShowCancelModalFacturation] = useState(false);
    const [defaultQuantity, setDefaultQuantity] = useState<number>(1);
    const [plasticBagQuantity, setPlasticBagQuantity] = useState<number | null>(null);
    const [totalValuePlasticBag, setTotalValuePlasticBag] = useState<number>();

    const onQuantityComplete = (quantity: number) => {
        if (currentItem) {
            const itemIndex = scannedItems.findIndex(scannedItem => scannedItem.item.id === currentItem.id);

            if (itemIndex !== -1) {
                const updatedScannedItems = [...scannedItems];
                updatedScannedItems[itemIndex].quantity = quantity;
                setScannedItems(updatedScannedItems);
            }

            setDefaultQuantity(1);
            setShowCancelModal(false);
            setBarCode('');
            setCurrentItem(null);
        }
    };

    const onPlasticBagComplete = (option: number, quantity: number) => {
        setShowCancelModalPlasticBag(false);
        setSelectedPlasticBagOption(option);
        setPlasticBagQuantity(quantity);
    };

    const totalPurchaseAmount = scannedItems.reduce((total, scannedItem) => {
        return total + (scannedItem.quantity * scannedItem.item.sellingPrice);
    }, 0);

    const handleDataFacturation = () => {
        setShowDataFacturation(true);
    };

    useEffect(() => {
        if (selectedPlasticBagOption && plasticBagQuantity) {
            setTotalValuePlasticBag(selectedPlasticBagOption * plasticBagQuantity);
        }
    }, [selectedPlasticBagOption, plasticBagQuantity]);

    useEffect(() => {
        if (itemByBarCodeOrName) {
            setScannedItems(prevProducts => [...prevProducts, { item: itemByBarCodeOrName, quantity: defaultQuantity }]);
        }
    }, [itemByBarCodeOrName, defaultQuantity]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyQuantity as unknown as EventListener);
        return () => {
            document.removeEventListener('keydown', handleKeyQuantity as unknown as EventListener);
        };
    }, []);

    const handleKeyQuantity = (event: KeyboardEvent) => {
        if (event.ctrlKey && (event.key === 'q' || event.key === 'Q')) {
            setShowCancelModal(true);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPlasticBagCharged as unknown as EventListener);
        return () => {
            document.removeEventListener('keydown', handleKeyPlasticBagCharged as unknown as EventListener);
        };
    }, []);

    const handleKeyPlasticBagCharged = (event: KeyboardEvent) => {
        if (event.ctrlKey && (event.key === 'm' || event.key === 'M')) {
            setShowCancelModalPlasticBag(true);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyFacturation as unknown as EventListener);
        return () => {
            document.removeEventListener('keydown', handleKeyFacturation as unknown as EventListener);
        };
    }, []);

    const handleKeyFacturation = (event: KeyboardEvent) => {
        if (event.ctrlKey && (event.key === 'ñ' || event.key === 'Ñ')) {
            setShowCancelModalFacturation(true);
        }
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>POS</h1>

                        <Link to={'/invoicing-and-pos/electronic-invoicing'}>Facturación</Link>
                        <div className={`${styles.branch} mb-1 p-3 border`}>
                            <div className="d-flex justify-content-between ">
                                <select
                                    className="border-0 p-1 text-center"
                                    value={selectedBranch}
                                    onChange={handleBranchChange}
                                >
                                    <option value=''>Selecciona una Sede</option>
                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <div className={`${styles.infoRegister} border rounded`}>
                                <p className={`${styles.barCodettext} m-0`}>Código de barras</p>
                                <input
                                    id="barCodeInput"
                                    type="text"
                                    value={barCode}
                                    className={`${styles.info} p-2 border rounded border-secundary text-end`}
                                    onChange={handleBarCodeChange}
                                    readOnly={true}
                                />
                            </div>

                            <SearchItemName
                                token={token}
                                onItemSelect={(item) => handleItemSelect(item)}
                            />
                        </div>

                        <div>Registrar </div>
                        <div className={`${styles.containerItems} border rounded border-secundary`}>
                            <h3 className="mb-3 text-primary-emphasis text-start">Relación de artículos</h3>
                            <div className={`${styles.thead} `}>
                                <div className={`${styles.theadQuantity} text-center`}>Cantidad</div>
                                <div className={`${styles.theadDescriptionItem} text-center`}>Descripción artículo</div>
                                <div className={`${styles.theadPriceUnit} text-center`}>Precio incluido IVA</div>
                                <div className={`${styles.theadIva} text-center`}>IVA</div>
                                <div className={`${styles.theadValue} text-center`}>Subtotal</div>
                            </div>
                            {Array.isArray(scannedItems) && scannedItems.length > 0 && scannedItems.map((product, index) => (
                                <div className={`${styles.tbody} border-top`} key={index}>
                                    <div className={`${styles.quantity} text-center`}>{product.quantity}</div>
                                    <div className={`${styles.descriptionItem} `}>{product.item.nameItem}</div>
                                    <div className={`${styles.priceUnit} `}><span>$</span> {formatNumber(product.item.sellingPrice)}</div>
                                    <div className={`${styles.iva} text-center`}>{product.item.IVA} %</div>
                                    <div className={`${styles.value} text-center`}><span>$</span>{formatNumber((product.quantity) * (product.item.sellingPrice))}</div>
                                </div>
                            ))}
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title>Modifica la cantidad</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <SelectQuantity
                                    onQuantityComplete={onQuantityComplete}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showCancelModalPlasticBag} onHide={() => setShowCancelModalPlasticBag(false)} backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModalPlasticBag(false)}>
                                <Modal.Title>Modal Title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <PlasticBagCharged
                                    onSelectOption={setSelectedPlasticBagOption}
                                    onPlasticBagComplete={onPlasticBagComplete} // Asegúrate de pasar los dos argumentos aquí
                                />
                            </Modal.Body>
                        </Modal>

                        <div className={`${styles.totalPurchase} border rounded border-secundary`}>
                            <p className={`${styles.infoPurchaseText} m-0`}>Total de la compra</p>
                            <p className={`${styles.infoPurchaseValue} m-0 text-end`}>
                                <span>$</span>
                                {formatNumber(totalPurchaseAmount)}
                            </p>
                        </div>

                        <div className={`${styles.totalPurchase} border rounded border-secundary`}>
                            <p className={`${styles.infoPurchaseText} m-0`}>Total de la compra</p>
                            <p className={`${styles.infoPurchaseValue} m-0 text-end`}>
                                <span>$</span>
                                {formatNumber(totalPurchaseAmount)}
                            </p>
                        </div>

                        <div className={`${styles.plasticBagTax} border rounded border-secundary`}>
                            <p className={`${styles.infoPlasticBagText} m-0`}>Impuesto bolsa plástica</p>
                            <p className={`${styles.infoPlasticBagQuantity} m-0`}>Cantidad: <span>{plasticBagQuantity ? plasticBagQuantity : '--'}</span></p>
                            <p className={`${styles.infoPlasticBagTax} m-0`}>Valor impuesto: $ <span>{totalValuePlasticBag ? formatNumber(totalValuePlasticBag) : '--'}</span></p>
                        </div>

                        <div className={`${styles.plasticBagTax} border rounded border-secundary`}>
                            <p className={`${styles.infoPlasticBagText} m-0`}>Impuesto nacional al consumo</p>
                            <p className={`${styles.infoPlasticBagQuantity} m-0`}>Cantidad: <span>{plasticBagQuantity ? plasticBagQuantity : '--'}</span></p>
                            <p className={`${styles.infoPlasticBagTax} m-0`}>Valor impuesto: $ <span>{totalValuePlasticBag ? formatNumber(totalValuePlasticBag) : '--'}</span></p>
                        </div>

                        <div className={`${styles.totalPayable} border rounded border-secundary`}>
                            <p className={`${styles.infoPayable} m-0`}>Total a pagar</p>
                            <p className={`${styles.infoPayableValue} m-0`}>${formatNumber(totalPurchaseAmount + (totalValuePlasticBag ?? 0))}</p>
                        </div>

                        <div className={`${styles.detailSell}`}>
                            <div className={`${styles.detail} d-flex`}>
                                <p className={`${styles.infoDetail} m-0 w-50`}>Subtotal sin IVA</p>
                                <p className={`${styles.infoDetail} m-0 w-50`}>Valor sin IVA</p>
                            </div>
                            <div className={`${styles.detail} d-flex`}>
                                <p className={`${styles.infoDetail} m-0 w-50`}>IVA</p>
                                <p className={`${styles.infoDetail} m-0 w-50`}>Valor del IVA</p>
                            </div>
                            <div className={`${styles.detail} d-flex`}>
                                <p className={`${styles.infoDetail} m-0 w-50`}>Dcto. promoción</p>
                                <p className={`${styles.infoDetail} m-0 w-50`}>Valor del descuento</p>
                            </div>
                            <div className={`${styles.detail} d-flex`}>
                                <p className={`${styles.infoDetail} m-0 w-50`}>Medio de pago</p>
                                <p className={`${styles.infoDetail} m-0 w-50`}>Medio de pago</p>
                            </div>
                            <div className={`${styles.detail} d-flex`}>
                                <p className={`${styles.infoDetail} m-0 w-50`}>Recibido</p>
                                <p className={`${styles.infoDetail} m-0 w-50`}>Cambio</p>
                            </div>
                        </div>

                        <div className='border'>
                            <div onClick={() => { handleDataFacturation(); }} >Tomar datos del cliente para facturación electrónica</div>
                            <Modal show={showDataFacturation} onHide={() => setShowDataFacturation(false)} backdrop="static" keyboard={false} >
                                <Modal.Header closeButton onClick={() => setShowDataFacturation(false)}>
                                    <Modal.Title>Dirección de facturación</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <DataFacturation />
                                </Modal.Body>
                            </Modal>
                        </div>

                        <div className='border'>
                            <p>Facturar</p>
                            <Modal show={showCancelModalFacturation} onHide={() => setShowCancelModalFacturation(false)} backdrop="static" keyboard={false} >
                                <Modal.Header closeButton onClick={() => setShowCancelModalFacturation(false)}>
                                    <Modal.Title>Facturar</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Facturation
                                        totalPurchase={(totalPurchaseAmount + (totalValuePlasticBag ?? 0))}
                                    />
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default SellPointOfSalePage;