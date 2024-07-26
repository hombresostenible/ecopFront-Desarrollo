/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postAccountsBook } from '../../../../../redux/User/accountsBookSlice/actions';
import { getItemByBarCode } from '../../../../../redux/User/itemBybarCodeOrName/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook, IAccountsBookItems } from "../../../../../types/User/accountsBook.types";
import SearchItemName from '../../../../../helpers/SearchItemName/SearchItemName';
import ModalChangeQuantityPerItem from '../../../../../helpers/ModalChangeQuantityPerItem/ModalChangeQuantityPerItem';
import SearchClientCrm from '../../../../../helpers/SearchClientCrm/SearchClientCrm';
import SearchSupplierCrm from '../../../../../helpers/SearchSupplierCrm/SearchSupplierCrm';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface IncomeCashProps {
    token: string;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: string | undefined;
    transactionDate: string | undefined;
    typeIncome: string;
}

function IncomeCash({ token, selectedBranch, defaultDates, registrationDate, transactionDate, typeIncome }: IncomeCashProps) {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorAccountsBook = useSelector((state: RootState) => state.accountsBook.errorAccountsBook);
    const itemByBarCode = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByBarCode);

    //Setea todos los artículos que se registrarán
    const [scannedItems, setScannedItems] = useState<IAccountsBookItems[]>([]);

    // SETEA EL ARTICULO BUSCADO POR CODIGO DE BARRAS
    useEffect(() => {
        // Actualiza el estado `scannedItems` cuando `itemByBarCode` cambie
        if (itemByBarCode && itemByBarCode.result) {
            const item = itemByBarCode.result;
            const selectedItem: IAccountsBookItems = {
                nameItem: item.nameItem,
                id: item.id,
                type: item.type as 'Assets' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service',
                IVA: Number(item.IVA),
                sellingPrice: item.sellingPrice,
                quantity: 1,
                subTotalValue: item.sellingPrice * 1,
            };
            // Añade el ítem al estado `scannedItems`
            setScannedItems(prevItems => [...prevItems, selectedItem]);
            setBarCode(''); // Limpia el campo de código de barras
        }
    }, [itemByBarCode]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAccountsBook>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [messageSelectedBranch, setMessageSelectedBranch] = useState<string | null>('');
    const [messageSelectedClient, setMessageSelectedClient] = useState<string | null>(null);

    // BUSCAR Y SETEAR EL ARTICULO POR CODIGO DE BARRAS
    const [barCode, setBarCode] = useState<string>('');
    const handleBarCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBarCode(value);
        if (value) dispatch(getItemByBarCode(value, token));
    };
    
    // SETEA EL ARTICULO BUSCADO POR NOMBRE
    const handleItemSelect = (item: any) => {
        const selectedItems: IAccountsBookItems = {
            nameItem: item.nameItem,
            id: item.id,
            type: item.type as 'Assets' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service',
            IVA: item.IVA,
            sellingPrice: item.sellingPrice,
            quantity: 1,
            subTotalValue: item.sellingPrice * 1,
        };
        setScannedItems([...scannedItems, selectedItems]);
    };

    //Aumenta la cantidad de artículos seleccionados para la venta
    const [changeQuantityIndex, setChangeQuantityIndex] = useState<number | null>(null);
    const handleChangeQuantityPerItem = (index: number) => setChangeQuantityIndex(index);
    
    //Elimina de la tabla, el artículo seleccionados para la venta
    const handleDeleteItem = (index: number) => {
        setScannedItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };

    //Cierra el modal que cambia la cantidad del artículo seleccionado para la venta
    const handleCloseModal = () => setChangeQuantityIndex(null);

    //Selecciona el cliente al que se le vende
    const [selectedClient, setSelectedClient] = useState<number | null>(null);

    //Selección el medio de pago
    const [meanPayment, setMeansPayment] = useState('');
    const handleMeanPaymentChange = (event: { target: { value: SetStateAction<string> }}) => {
        setMeansPayment(event.target.value);
    };

    // CALCULA EL VALOR TOTAL DE TODOS LOS ARTICULOS AÑADIDOS A LA COMPRA
    const totalPurchaseAmount = scannedItems.reduce((total, scannedItem) => {
        return total + (scannedItem.quantity * scannedItem.sellingPrice);
    }, 0);

    // Función para formatear el valor como moneda
    const formatCurrency = (value: string) => {
        if (!value) return '';
        const numberValue = parseFloat(value.replace(/[^\d]/g, ''));
        return `$ ${new Intl.NumberFormat('es-ES').format(numberValue)}`;
    };

    // Estado para almacenar el monto del pago recibido
    const [paymentAmount, setPaymentAmount] = useState<string>('');
    
    // Manejar el cambio en el monto recibido
    const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Eliminar caracteres no numéricos
        const value = e.target.value.replace(/[^\d]/g, '');
        setPaymentAmount(value);
    };

    // Estado para almacenar el cambio
    const [changeAmount, setChangeAmount] = useState<number | null>(null);
    // Calcular el cambio y actualizar el estado
    const handleCalculateChange = () => {
        const numericValue = parseFloat(paymentAmount.replace(/[^\d]/g, ''));
        if (!isNaN(numericValue)) {
            // totalPurchaseAmount debe estar definido y accesible aquí
            setChangeAmount(numericValue - totalPurchaseAmount);
        } else {
            setChangeAmount(null);
        }
    };


    // OTROS INGRESOS
    //Setea el poveedor cuando se busca o se crea
    const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);

    // Muestra el CRM Supplier, el Gota Gota no necesita grabar el id de quien le presta
    const [showOtherIncomes, setShowOtherIncomes] = useState('');
    const handleOtherIncomesChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowOtherIncomes(event.target.value);
    };

    //Setea el total del ingreso por la venta
    const [totalValueOtherIncome, setTotalValueOtherIncome] = useState<string>('');
    const handleTotalValueOtherIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');                                     // Eliminar caracteres no numéricos
        setTotalValueOtherIncome(value);
    };

    const [creditWithInterest, setCreditWithInterest] = useState<'No' | 'Si'>('Si');            //Setea si es con interés o no
    const handleCreditWithInterest = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCreditWithInterest = event.target.value as 'No' | 'Si';
        setCreditWithInterest(newCreditWithInterest);
        setValue('creditWithInterest', newCreditWithInterest);
    };

    const [interestRateChange, setInterestRateChange] = useState<number>(0);                    //Setea la tasa de interés de la venta a cuotas
    const handleInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const interestRate = parseFloat(event.target.value);
        setInterestRateChange(interestRate);
    };

    const [numberOfPayments, setNumberOfPayments] = useState<number>(0);                      //Setea la cantidad de cuotas
    const handleNumberOfPaymentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUnitValue = parseFloat(event.target.value);
        setNumberOfPayments(newUnitValue);
    };

    //Setea el valor de la cuota
    const [paymentValue, setPaymentValue] = useState<number>(0);
    //Calcula el valor de la cuota con o sin interés
    useEffect(() => {
        if (totalValueOtherIncome !== undefined && numberOfPayments !== 0) {
            if (interestRateChange !== 0) {
                const totalValue = Number(totalValueOtherIncome);
                const cuotaSinInteres = totalValue / numberOfPayments;                  // Calcula la cuota con interés
                const tasaInteresMensual = interestRateChange / 100 / 12;               // Calcula la tasa de interés mensual
                let saldoRestante = totalValue;                                         // Calcula el interés acumulado sobre el monto total adeudado
                let cuotaConInteres = 0;
        
                for (let i = 0; i < numberOfPayments; i++) {
                    const interesMensual = saldoRestante * tasaInteresMensual;
                    cuotaConInteres = cuotaSinInteres + interesMensual;                 // Calcula la cuota con interés y amortización
                    saldoRestante -= cuotaSinInteres;                                   // Resta la parte que corresponde a la amortización
                }
                setPaymentValue(cuotaConInteres);
            } else {
                const totalValue = Number(totalValueOtherIncome);
                const cuotaSinInteres = totalValue / numberOfPayments;                  // Lógica cuando no hay interés (puedes personalizar esto según tus necesidades)
                setPaymentValue(cuotaSinInteres);
            }
        }
    }, [totalValueOtherIncome, numberOfPayments, interestRateChange]);

    const onSubmit = async (values: IAccountsBook) => {
        const totalValueOtherIncomeNumber = Number(totalValueOtherIncome);
        try {
            const formData = {
                ...values,
                branchId: selectedBranch,
                transactionType: "Ingreso",
                creditCash: "Contado",
                transactionCounterpartId: selectedClient ? selectedClient : selectedSupplier,
                meanPayment: meanPayment ? meanPayment : null,
                itemsSold: scannedItems,
                totalValue: totalPurchaseAmount || totalValueOtherIncomeNumber,
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

            if (!selectedClient && !selectedSupplier) {
                setMessageSelectedClient('Debes de seleccionar un cliente o un proveedor');
                setTimeout(() => setMessageSelectedClient(null), 5000);
                return;
            }

            dispatch(postAccountsBook(formData, token));
            setFormSubmitted(true);
            setSelectedClient(null);
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
                {typeIncome === 'Venta de articulos' && (
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
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.IVA} %</span>
                                            </div>
                                            <div className={`${styles.price__Unit} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}><span>$</span> {formatNumber(product.sellingPrice)}</span>
                                            </div>
                                            <div className={`${styles.value} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}><span>$ </span>{formatNumber((product.quantity) * (product.sellingPrice))}</span>
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

                        <div className={`${styles.container__Selected_Client} m-auto d-flex align-items-center justify-content-between position-relative`}>
                            <p className='m-0'>Selecciona o crea a tu cliente</p>
                            <SearchClientCrm
                                token={token}
                                onClientSelect={(client) => setSelectedClient(client)}
                            />
                            {messageSelectedClient && (
                                <div className={`${styles.error__Selected_Client} p-2 position-absolute`}>
                                    <div className={`${styles.triangle} position-absolute`}></div>
                                    <p className='m-0'>Selecciona el cliente acá</p>
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
                                    <optgroup label="Billeteras digitales">
                                        <option value='Daviplata'>Daviplata</option>
                                        <option value='Nequi'>Nequi</option>
                                        <option value='Movii'>Movii</option>
                                        <option value='Tuya Pay'>Tuya Pay</option>
                                        <option value='Dale'>Dale</option>
                                        <option value='Nubank'>Nubank</option>
                                        <option value='Uala'>Uala</option>
                                        <option value='Lulo Bank'>Lulo Bank</option>
                                        <option value='Tpaga'>Tpaga</option>
                                        <option value='Powwi'>Powwi</option>
                                        <option value='BBVA Wallet'>BBVA Wallet</option>
                                        <option value='Ahorro a la mano'>Ahorro a la mano</option>
                                        <option value='Apple Pay'>Apple Pay</option>
                                        <option value='Rappipay'>Rappipay</option>
                                        <option value='Claro Pay'>Claro Pay</option>
                                        <option value='Powwi'>Powwi</option>
                                    </optgroup>
                                    <optgroup label="Otros">
                                        <option value='Baloto'>Baloto</option>
                                        <option value='Giro'>Giro</option>
                                        <option value='Cheque'>Cheque</option>
                                    </optgroup>
                                </select>
                            </div>

                            <div className={`${styles.container__Section_Info_Purchase} mb-3 m-auto d-flex align-items-center justify-content-between`}>
                                <p className={`${styles.text__Purchase} m-0 p-2`}>Total de la compra</p>
                                <p className={`${styles.input__Info_Purchase} m-0 p-2 text-end`}>$ {formatNumber(totalPurchaseAmount)}</p>
                            </div>

                            {meanPayment === 'Efectivo' && (
                                <div className='m-auto'>
                                    <div className={`${styles.container__Section_Info_Purchase} mb-3 m-auto d-flex align-items-center justify-content-between`}>
                                        <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Monto recibido</p>
                                        <input
                                            type="text"
                                            className={`${styles.input__Info_Purchase} p-2 text-end`}
                                            value={formatCurrency(paymentAmount)}
                                            onChange={handlePaymentAmountChange}
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
                                                {changeAmount !== null && (
                                                    <input
                                                        type="text"
                                                        className={`${styles.input__Change} m-0 p-2 text-end border-0`}
                                                        value={`$ ${new Intl.NumberFormat('es-ES').format(changeAmount)}`} // Formatear cambio como moneda
                                                        readOnly
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {typeIncome === 'Otros ingresos' && (
                    <div className={`${styles.container__Info_Purchase} d-flex flex-column align-items-center justify-content-between`}>
                        <div className="p-2 d-flex align-items-center justify-content-center">
                            <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Selecciona el concepto de otros ingresos</p>
                            <div>
                                <select
                                    {...register('otherIncomes', { required: true })}
                                    className={`${styles.input__Info_Purchase} p-2`}
                                    onChange={handleOtherIncomesChange}
                                >
                                    <option value=''>Selecciona una opción</option>
                                    <option value='Credito del Banco'>Credito del Banco</option>
                                    <option value='Credito en Cooperativa'>Credito en Cooperativa</option>
                                    <option value='Gota gota'>Gota gota</option>
                                    <option value='Credito de almacen'>Credito de almacen</option>
                                    <option value='Credito de servicios publicos'>Credito de servicios publicos</option>
                                </select>
                                {errors.otherIncomes && (
                                    <p className='text-danger'>El dato es requerido</p>
                                )}
                            </div>
                        </div>

                        {showOtherIncomes !== 'Gota gota' && (
                            <div className={`${styles.container__Selected_Client} mb-4 m-auto d-flex align-items-center justify-content-between position-relative`}>
                                <p className='m-0'>Selecciona o crea a tu proveedor</p>
                                <SearchSupplierCrm
                                    token={token}
                                    onSupplierSelect={(supplier) => setSelectedSupplier(supplier)}
                                />
                                {messageSelectedClient && (
                                    <div className={`${styles.error__Selected_Client} p-2 position-absolute`}>
                                        <div className={`${styles.triangle} position-absolute`}></div>
                                        <p className='m-0'>Selecciona el cliente acá</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mb-3 d-flex align-items-center justify-content-center">
                            <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Describe tu crédito</p>
                            <div>
                                <input
                                    type="text"
                                    {...register('creditDescription', { required: true })}
                                    className={`${styles.input__Info_Purchase} p-2 text-start`}
                                    placeholder='Describe tu crédito: Venta de arroz a don Lucho'
                                />
                                {errors.creditDescription && (
                                    <div className='invalid-feedback'>La descripión es requerida</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3 d-flex align-items-center justify-content-center">
                            <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Valor total del préstamo</p>
                            <input
                                type="text"
                                {...register('totalValue' )}
                                className={`${styles.input__Info_Purchase} p-2 text-end`}
                                onChange={handleTotalValueOtherIncome}
                                value={formatCurrency(totalValueOtherIncome)}
                            />
                            {errors.totalValue && (
                                <p className='invalid-feedback'>El valor total es requerido</p>
                            )}
                        </div>

                        <div className="mb-3 d-flex align-items-center justify-content-center" >
                            <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>¿Es con interés?</p>
                            <div>
                                <select
                                    {...register('creditWithInterest', { required: true })}
                                    className={`${styles.input__Info_Purchase} p-2`}
                                    onChange={handleCreditWithInterest}
                                >
                                    <option value='Si'>Si</option>
                                    <option value='No'>No</option>
                                </select>
                                {errors.creditWithInterest && (
                                    <p className='text-danger'>El dato es requerido</p>
                                )}
                            </div>
                        </div>

                        {creditWithInterest === 'Si' && (
                            <div className="mt-3 mb-3 d-flex align-items-center justify-content-center" >
                                <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Tasa de interés</p>
                                <div>
                                    <input
                                        type="number"
                                        {...register('creditInterestRate', { setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input__Info_Purchase} p-2`}
                                        placeholder='5'
                                        inputMode="numeric"
                                        onChange={handleInterestRateChange}
                                        min={0}
                                    />
                                    {errors.creditInterestRate && (
                                        <div className='invalid-feedback'>{errors.creditInterestRate.message}</div>
                                        )}
                                </div>
                            </div>
                        )}

                        <div className="mb-3 d-flex align-items-center justify-content-center">
                            <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>¿A cuántas cuotas te van a pagar?</p>
                            <div>
                                <input
                                    type="number"
                                    {...register('numberOfPayments', { setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input__Info_Purchase} p-2`}
                                    placeholder='Número de cuotas'
                                    inputMode="numeric"
                                    onChange={handleNumberOfPaymentsChange}
                                    min={0}
                                />
                                {errors.numberOfPayments && (
                                    <div className='invalid-feedback'>{errors.numberOfPayments.message}</div>
                                )}
                            </div>
                        </div> 

                        <div className="mb-3 d-flex align-items-center justify-content-center">
                            <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Vr, aproximado de cada cuota</p>
                            <div>
                                <input
                                    type="number"
                                    {...register('paymentValue', { setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input__Info_Purchase} p-2`}
                                    placeholder='Valor de cada cuota'
                                    inputMode="numeric"
                                    readOnly
                                    value={paymentValue}
                                    min={0}
                                />
                                {errors.paymentValue && (
                                    <div className='invalid-feedback'>{errors.paymentValue.message}</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-4 d-flex align-items-center justify-content-center position-relative">
                    {formSubmitted && (
                        <div className={`${styles.alert__Success} position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                    )}
                    {messageSelectedBranch && (
                        <div className={`${styles.error__Message_Selected_Branch} position-absolute`}>{messageSelectedBranch}</div>
                    )}
                    {messageSelectedClient && (
                        <div className={`${styles.error__Message_Selected_Client} position-absolute`}>{messageSelectedClient}</div>
                    )}
                    <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default IncomeCash;