/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postAccountsBook } from '../../../../../redux/User/accountsBookSlice/actions';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import { getItemByBarCode } from '../../../../../redux/User/itemBybarCodeOrName/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook, IItemsAccountsBook } from "../../../../../types/User/accountsBook.types";
import SearchItemName from '../../../../../components/Platform/05InvoicingAndPos/01SearchItemName/SearchItemName';
import ModalChangeQuantityPerItem from '../../../../../helpers/ModalChangeQuantityPerItem/ModalChangeQuantityPerItem';
import SearchSupplierCrm from '../../SearchSupplierCrm';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface CashExpenseProps {
    token: string;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: string | undefined;
    transactionDate: string | undefined;
    typeExpense: string;
}

function CashExpense({ token, selectedBranch, defaultDates, registrationDate, transactionDate, typeExpense }: CashExpenseProps) {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorAccountsBook = useSelector((state: RootState) => state.accountsBook.errorAccountsBook);

    useEffect(() => {
        if (token) dispatch(getBranches(token));
    }, [token]);

    const { register, handleSubmit, formState: { errors } } = useForm<IAccountsBook>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [messageSelectedBranch, setMessageSelectedBranch] = useState<string | null>('');
    const [messageSelectedSupplier, setMessageSelectedSupplier] = useState<string | null>(null);

    // BUSCAR Y SETEAR EL ARTICULO POR CODIGO DE BARRAS
    const [barCode, setBarCode] = useState<string>('');
    const handleBarCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBarCode(value);
        if (value) dispatch(getItemByBarCode(value, token));
    };

    // SETEA EL ARTICULO BUSCADO POR NOMBRE
    const [scannedItems, setScannedItems] = useState<IItemsAccountsBook[]>([]);
    const handleItemSelect = (item: any) => {
        const selectedItems: IItemsAccountsBook = {
            nameItem: item.nameItem,
            id: item.id,
            type: item.type as 'Assets' | 'Merchandise' | 'RawMaterial' | 'Service',
            IVA: item.IVA,
            sellingPrice: item.sellingPrice,
            quantity: 1,
            subTotalValue: item.sellingPrice * 1,
        };
        setScannedItems([...scannedItems, selectedItems]);
    };

    // BORRA EL ARTÍCULO RELACIONADO EN LA TABLA PARA VENTA
    const handleDeleteItem = (index: number) => {
        setScannedItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1); // Elimina el artículo en la posición `index`
            return updatedItems;
        });
    };

    // Estado para controlar el índice del artículo en `scannedItems` que se está editando
    const [changeQuantityIndex, setChangeQuantityIndex] = useState<number | null>(null);
    const handleChangeQuantityPerItem = (index: number) => {
        setChangeQuantityIndex(index);
    };

    const handleChangeIva = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newIva = parseFloat(event.target.value);
        setScannedItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems[index].IVA = newIva;
            return updatedItems;
        });
    };

    const [unitValue, setUnitValue] = useState<number>(0);
    const handleUnitValueChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = parseFloat(event.target.value);
        setUnitValue(newValue);
        setScannedItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems[index].sellingPrice = newValue;
            updatedItems[index].subTotalValue = updatedItems[index].quantity * newValue;
            return updatedItems;
        });
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setChangeQuantityIndex(null);
    };

    //Setea el cliente cuando se busca o se crea
    const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);

    //Selección el medio de pago
    const [meanPayment, setMeansPayment] = useState('');
    const handleMeanPaymentChange = (event: { target: { value: SetStateAction<string> }}) => {
        setMeansPayment(event.target.value);
    };

    // CALCULA EL VALOR TOTAL DE TODOS LOS ARTICULOS AÑADIDOS A LA COMPRA
    const totalPurchaseGiven = scannedItems.reduce((total, scannedItem) => {
        return total + (scannedItem.quantity * scannedItem.sellingPrice);
    }, 0);

    const [paymentGiven, setPaymentGiven] = useState<string>('');
    const [changeGiven, setChangeGiven] = useState<number | null>(null);

    // Función para formatear el valor como moneda
    const formatCurrency = (value: string) => {
        if (!value) return '';
        const numberValue = parseFloat(value.replace(/[^\d]/g, ''));
        return `$ ${new Intl.NumberFormat('es-ES').format(numberValue)}`;
    };

    // Manejar el cambio en el monto recibido
    const handlePaymentGivenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        setPaymentGiven(value);
    };

    // Calcular el cambio y actualizar el estado
    const handleCalculateChange = () => {
        const numericValue = parseFloat(paymentGiven.replace(/[^\d]/g, ''));
        if (!isNaN(numericValue)) {
            setChangeGiven(numericValue - totalPurchaseGiven);
        } else {
            setChangeGiven(null);
        }
    };

    const onSubmit = async (values: IAccountsBook) => {
        try {
            const formData = {
                ...values,
                transactionType: "Gasto",
                creditCash: "Contado",
                meanPayment: meanPayment ? meanPayment : null,
                itemsBuy: scannedItems,
                transactionCounterpartId: selectedSupplier,
                totalValue: totalPurchaseGiven,
                branchId: selectedBranch,
            } as IAccountsBook;
            if (defaultDates) {
                formData.registrationDate = new Date().toLocaleDateString();
                formData.transactionDate = new Date().toLocaleDateString();
            }
            if (registrationDate) formData.registrationDate = registrationDate;
            if (transactionDate) formData.transactionDate = transactionDate;

            if (!selectedBranch) {
                setMessageSelectedBranch('Debes de seleccionar una sede');
                setTimeout(() => setMessageSelectedBranch(null), 5000);
                return;
            }

            if (!selectedSupplier) {
                setMessageSelectedSupplier('Debes de seleccionar un cliente o un proveedor');
                setTimeout(() => setMessageSelectedSupplier(null), 5000);
                return;
            }
            dispatch(postAccountsBook(formData, token));
            setFormSubmitted(true);
            setSelectedSupplier(null);
            setTimeout(() => {
                setFormSubmitted(false);
                setShouldNavigate(true);
            }, 1500);
        } catch (error) {
            throw new Error(`Error en el envío del formulario: ${error}`);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/accounts/see-records');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div>
            {Array.isArray(errorAccountsBook) && errorAccountsBook.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{error}</div>
            ))}

            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} `}>
                {typeExpense === 'Compra de articulos' && (
                    <div className='mt-4 mb-4'>
                        <div className="d-flex align-items-start justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className={`${styles.barCode} m-0 text-center`}>Código de barras</p>
                                <input
                                    id="barCodeInput"
                                    type="text"
                                    value={barCode}
                                    className={`${styles.input__BarCode} p-2`}
                                    onChange={handleBarCodeChange}
                                    placeholder='Código de barras'
                                />
                            </div>

                            <SearchItemName
                                token={token}
                                onItemSelect={(item) => handleItemSelect(item)}
                            />
                        </div>

                        <div className={`${styles.container__Table} mt-5 mb-4 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <h3 className="mb-3 text-primary-emphasis text-start">Relación de artículos</h3>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.quantity} d-flex align-items-center justify-content-center text-center`}>Cantidad</div>
                                    <div className={`${styles.description__Item} d-flex align-items-center justify-content-center text-center`}>Descripción artículo</div>
                                    <div className={`${styles.iva} d-flex align-items-center justify-content-center text-center`}>IVA</div>
                                    <div className={`${styles.price__Unit} d-flex align-items-center justify-content-center text-center`}>Precio unitario</div>
                                    <div className={`${styles.value} d-flex align-items-center justify-content-center text-center`}>Subtotal</div>
                                    <div className={`${styles.delete} d-flex align-items-center justify-content-center text-center`}></div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body} `}>
                                {Array.isArray(scannedItems) && scannedItems.length > 0 ? (
                                    scannedItems.map((product, index) => (
                                        <div key={index} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <div className={`${styles.quantity} d-flex align-items-center justify-content-center`}>
                                                <div className={`${styles.container__Quantity} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.quantity}</span>
                                                </div>
                                                <div className={`${styles.container__FaPlus} d-flex align-items-center justify-content-center`}>
                                                    <FaPlus
                                                        className={`${styles.icon__FaPlus} `}
                                                        onClick={() => handleChangeQuantityPerItem(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`${styles.description__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.nameItem}</span>
                                            </div>
                                            <div className={`${styles.iva} d-flex align-items-center justify-content-center`}>
                                                <div className={styles.containerInput}>
                                                <select
                                                    value={product.IVA}
                                                    className={`${styles.input} p-2 border `}
                                                    onChange={(e) => handleChangeIva(e, index)}
                                                >
                                                    <option value={0}>0 %</option>
                                                    <option value={5}>5 %</option>
                                                    <option value={19}>19 %</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div className={`${styles.price__Unit} d-flex align-items-center justify-content-center`}>
                                                <input
                                                    type="number"
                                                    onChange={(e) => handleUnitValueChange(e, index)}
                                                    className={`${styles.input} p-2 border `}
                                                    placeholder='Precio de compra del artículo'
                                                    min={0}
                                                    onKeyDown={(e) => {
                                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className={`${styles.value} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}><span>$ </span>{formatNumber((product.quantity) * (unitValue))}</span>
                                            </div>
                                            <div className={`${styles.delete} d-flex align-items-center justify-content-center`}>
                                                <RiDeleteBin6Line
                                                    className={`${styles.button__Action} `}
                                                    onClick={() => handleDeleteItem(index)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                        No tienes artículos registrados en la venta
                                    </div>
                                )}
                            </div>
                        </div>

                        <Modal show={changeQuantityIndex !== null} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Aumentar Cantidad</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {changeQuantityIndex !== null && (
                                    <ModalChangeQuantityPerItem
                                        onSaveQuantity={(newQuantity) => {
                                            if (changeQuantityIndex !== null) {
                                                setScannedItems(prevItems => {
                                                    const updatedItems = [...prevItems];
                                                    updatedItems[changeQuantityIndex].quantity = newQuantity;
                                                    return updatedItems;
                                                });
                                            }
                                            handleCloseModal();
                                        }}
                                        onClose={handleCloseModal}
                                    />
                                )}
                            </Modal.Body>
                        </Modal>

                        <div className={`${styles.container__Selected_Client} position-relative`}>
                            <SearchSupplierCrm
                                token={token}
                                onSupplierSelect={(supplier) => setSelectedSupplier(supplier)}
                            />
                            {messageSelectedSupplier && (
                                <div className={`${styles.error__Selected_Client} p-2 position-absolute`}>
                                    <div className={`${styles.triangle} position-absolute`}></div>
                                    <p className='m-0'>Selecciona el proveedor acá</p>
                                </div>
                            )}
                        </div>

                        <div className={`${styles.container__Info_Purchase} m-5 d-flex flex-column align-items-start justify-content-between`}>
                            <div className={`${styles.container__Section_Info_Purchase} mb-3 m-auto d-flex align-items-center justify-content-between`}>
                                <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Medio de pago</p>
                                <select
                                    className={`${styles.input__Info_Purchase} p-2`}
                                    value={meanPayment}
                                    onChange={handleMeanPaymentChange}
                                    required
                                >
                                    <option value="">Seleccione el medio de pago</option>
                                    <optgroup label="Tradicionales">
                                        <option value='Efectivo'>Efectivo</option>
                                        <option value='Tarjeta de Credito/Debito'>Tarjeta de Credito/Debito</option>
                                        <option value='Transferencia bancaria (PSE)'>Transferencia bancaria (PSE)</option>
                                    </optgroup>
                                </select>
                            </div>

                            <div className={`${styles.container__Section_Info_Purchase} mb-3 m-auto d-flex align-items-center justify-content-between`}>
                                <p className={`${styles.text__Purchase} m-0 p-2`}>Total de la compra</p>
                                <p className={`${styles.input__Info_Purchase} m-0 p-2 text-end`}>$ {formatNumber(totalPurchaseGiven)}</p>
                            </div>

                            <div className={`${styles.container__Section_Info_Purchase} mb-3 m-auto d-flex align-items-center justify-content-between`}>
                                <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Monto pagado</p>
                                <input
                                    type="text"
                                    className={`${styles.input__Info_Purchase} p-2 text-end`}
                                    value={formatCurrency(paymentGiven)}
                                    onChange={handlePaymentGivenChange}
                                />
                            </div>

                            <div className={`${styles.container__Change_Amount} m-auto d-flex flex-column align-items-center justify-content-between`}>
                                <button
                                    type="button"
                                    className={`${styles.button__Calculate} mb-3 border-0`}
                                    onClick={handleCalculateChange}
                                >
                                    Calcular cambio
                                </button>
                                <div className={`${styles.container__Section_Info_Purchase} mb-3 m-auto d-flex align-items-center justify-content-between`}>
                                    <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Cambio</p>
                                    <div className={`${styles.input__Change__Amount} m-0`}>
                                        {changeGiven !== null && (
                                            <input
                                                type="text"
                                                className={`${styles.input__Change} m-0 p-2 text-end border-0`}
                                                value={`$ ${new Intl.NumberFormat('es-ES').format(changeGiven)}`} // Formatear cambio como moneda
                                                readOnly
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`${styles.container__Section_Info_Purchase} mb-3 m-auto d-flex align-items-center justify-content-between`}>
                    <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Vendedor(a)</p>
                    <div>
                        <input
                            type="text"
                            {...register('seller', { required: 'El vendedor es requerido' })}
                            className={`${styles.input__Info_Purchase} p-2 text-center`}
                            placeholder='Nombre del vendedor'
                        />
                        {errors.seller && (
                            <div className='invalid-feedback'>{errors.seller.message}</div>
                        )}
                    </div>
                </div>

                <div className="mb-4 d-flex align-items-center justify-content-center position-relative">
                    {formSubmitted && (
                        <div className={`${styles.alert__Success} position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                    )}
                    {messageSelectedBranch && (
                        <div className={`${styles.error__Message_Selected_Branch} position-absolute`}>{messageSelectedBranch}</div>
                    )}
                    {messageSelectedSupplier && (
                        <div className={`${styles.error__Message_Selected_Client} position-absolute`}>{messageSelectedSupplier}</div>
                    )}
                    <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default CashExpense;