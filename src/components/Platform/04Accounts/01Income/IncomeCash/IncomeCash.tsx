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
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";
import SearchItemName from '../../../../../components/Platform/05InvoicingAndPos/01SearchItemName/SearchItemName';
import ModalChangeQuantityPerItem from './ModalChangeQuantityPerItem';
import SearchClientCrm from '../../SearchClientCrm';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface CashProps {
    token: string;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: Date | undefined;
    transactionDate: Date | undefined;
    typeIncome: string;
}

function IncomeCash({ token, selectedBranch, defaultDates, registrationDate, transactionDate, typeIncome }: CashProps) {
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

    // BUSCAR Y SETEAR EL ARTICULO POR CODIGO DE BARRAS
    const [barCode, setBarCode] = useState<string>('');
    const handleBarCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBarCode(value);
        if (value) dispatch(getItemByBarCode(value, token));
    };
    
    // SETEA EL ARTICULO BUSCADO POR NOMBRE
    const [scannedItems, setScannedItems] = useState<{ item: any, quantity: number }[]>([]);
    const handleItemSelect = (item: any) => {
        setScannedItems(prevItems => {
            const existingItem = prevItems.find(scannedItem => scannedItem.item.id === item.id);
            if (existingItem) {
                return prevItems.map(scannedItem =>
                    scannedItem.item.id === item.id
                        ? { ...scannedItem, quantity: scannedItem.quantity + 1 }
                        : scannedItem
                );
            } else {
                return [...prevItems, { item, quantity: 1 }];
            }
        });
    };

    // 
    useEffect(() => {
        const inputElement = document.getElementById("barCodeInput") as HTMLInputElement;
        if (inputElement) {
            inputElement.value = '';
        }
    }, [scannedItems]);

    // BORRA EL ARTÍCULO RELACIONADO EN LA TABLA PARA COMPRA
    const handleDeleteItem = (index: number) => {
        setScannedItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1); // Elimina el artículo en la posición `index`
            return updatedItems;
        });
    };

    // Estado para controlar el índice del artículo en `scannedItems` que se está editando
    const [changeQuantityIndex, setChangeQuantityIndex] = useState<number | null>(null);

    // Función para abrir el modal de cambio de cantidad
    const handleChangeQuantityPerItem = (index: number) => {
        setChangeQuantityIndex(index);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setChangeQuantityIndex(null);
    };
    
    //Setea el cliente cuando se busca o se crea
    const [selectedClient, setSelectedClient] = useState<string | null>(null);

    //Selección el medio de pago
    const [meanPayment, setMeansPayment] = useState('');
    const handleMeanPaymentChange = (event: { target: { value: SetStateAction<string> }}) => {
        setMeansPayment(event.target.value);
    };

    const onSubmit = async (values: IAccountsBook) => {
        try {
            const accountBookData = {
                ...values,
                branchId: selectedBranch,
                transactionType: "Ingreso",
                creditCash: "Contado",

                meanPayment,
                transactionCounterpartId: selectedClient,
            } as IAccountsBook;
            if (defaultDates) {
                accountBookData.registrationDate = new Date();
                accountBookData.transactionDate = new Date();
            }
            if (registrationDate) accountBookData.registrationDate = registrationDate;
            if (transactionDate) accountBookData.transactionDate = transactionDate;
            dispatch(postAccountsBook(accountBookData, token));
            setFormSubmitted(true);
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
            {formSubmitted && (
                <div className='alert alert-success'>El formulario se ha enviado con éxito</div>
            )}
            {Array.isArray(errorAccountsBook) && errorAccountsBook.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{error}</div>
            ))}

            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} `}>

                {typeIncome === 'Venta de articulos' && (
                    <div className='mt-4 mb-4'>
                        <div className={`${styles.container__Search} d-flex align-items-start justify-content-between`}>
                            <div className={`${styles.info__Register} d-flex align-items-center justify-content-between`}>
                                <p className={`${styles.barCode} m-0 text-center`}>Código de barras</p>
                                <input
                                    id="barCodeInput"
                                    type="text"
                                    value={barCode}
                                    className={`${styles.input__BarCode} p-2`}
                                    onChange={handleBarCodeChange}
                                    // readOnly={true}
                                    placeholder='Código de barras'
                                />
                            </div>

                            <SearchItemName
                                token={token}
                                onItemSelect={(item) => handleItemSelect(item)}
                            />
                        </div>

                        <div className={`${styles.container__Table} mt-5 mb-5 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <h3 className="mb-3 text-primary-emphasis text-start">Relación de artículos</h3>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.quantity} d-flex align-items-center justify-content-center text-center`}>Cantidad</div>
                                    <div className={`${styles.description__Item} d-flex align-items-center justify-content-center text-center`}>Descripción artículo</div>
                                    <div className={`${styles.iva} d-flex align-items-center justify-content-center text-center`}>IVA</div>
                                    <div className={`${styles.price__Unit} d-flex align-items-center justify-content-center text-center`}>Precio</div>
                                    <div className={`${styles.value} d-flex align-items-center justify-content-center text-center`}>Subtotal</div>
                                    <div className={`${styles.delete} d-flex align-items-center justify-content-center text-center`}></div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body} `}>
                                {Array.isArray(scannedItems) && scannedItems.length > 0 ? (
                                    scannedItems.map((product, index) => (
                                        <div key={index} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <div className={`${styles.quantity} d-flex align-items-center justify-content-center`}>
                                                <div className={`${styles.container__Quantity} `}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.quantity}</span>
                                                </div>
                                                <div className={`${styles.container__FaPlus} `}>
                                                    <FaPlus
                                                        className={`${styles.icon__FaPlus} `}
                                                        onClick={() => handleChangeQuantityPerItem(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`${styles.description__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.item.nameItem}</span>
                                            </div>
                                            <div className={`${styles.iva} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.item.IVA} %</span>
                                            </div>
                                            <div className={`${styles.price__Unit} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}><span>$</span> {formatNumber(product.item.sellingPrice)}</span>
                                            </div>
                                            <div className={`${styles.value} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}><span>$ </span>{formatNumber((product.quantity) * (product.item.sellingPrice))}</span>
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
                                            handleCloseModal(); // Cierra el modal después de guardar
                                        }}
                                        onClose={handleCloseModal}
                                    />
                                )}
                            </Modal.Body>
                        </Modal>

                        <SearchClientCrm
                            token={token}
                            onClientSelect={(client) => setSelectedClient(client)}
                        />

                        <div className="d-flex align-items-start justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className={`${styles.label} m-0 text-start me-3`}>Medio de pago</p>
                                <select
                                    className={`${styles.input} p-2`}
                                    value={meanPayment}
                                    onChange={handleMeanPaymentChange}
                                    required
                                >
                                    <option value="">Seleccione medio de pago</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                                    <option value="Transferencia">Transferencia</option>
                                </select>
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                                <p className={`${styles.text} mb-0 p-2`}>Vendedor(a)</p>
                                <div>
                                    <input
                                        type="text"
                                        {...register('seller', { required: 'El vendedor es requerido' })}
                                        className={`${styles.input} p-2`}
                                        placeholder='Nombre del vendedor'
                                    />
                                    {errors.seller && (
                                        <div className='invalid-feedback'>{errors.seller.message}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {}

                <div className="mb-4 d-flex align-items-center justify-content-center">
                    <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default IncomeCash;