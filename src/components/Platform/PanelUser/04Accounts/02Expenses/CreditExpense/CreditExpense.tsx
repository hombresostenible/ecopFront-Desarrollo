/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { postAccountsBook } from '../../../../../../redux/User/accountsBookSlice/actions';
import { getItemByBarCode } from '../../../../../../redux/User/itemBybarCodeOrName/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook, IAccountsBookItems } from "../../../../../../types/User/accountsBook.types";
import SearchItemsByname from '../../../../../../helpers/SearchItemName/SearchItemsByname';
import ModalChangeQuantityPerItem from '../../../../../../helpers/ModalChangeQuantityPerItem/ModalChangeQuantityPerItem';
import SearchSupplierCrm from '../../../../../../helpers/SearchSupplierCrm/SearchSupplierCrm';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface IncomeCreditProps {
    token: string;
    decodeUserIdRegister: string;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: string | undefined;
    transactionDate: string | undefined;
}

function CreditExpense({ token, decodeUserIdRegister, selectedBranch, defaultDates, registrationDate, transactionDate }: IncomeCreditProps) {
    const navigate = useNavigate();
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorAccountsBook = useSelector((state: RootState) => state.accountsBook.errorAccountsBook);
    const itemByBarCode = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByBarCode);
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAccountsBook>();
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

    // Setea todos los artículos que se registrarán
    const [scannedItems, setScannedItems] = useState<IAccountsBookItems[]>([]);

    // SETEA EL ARTICULO BUSCADO POR CODIGO DE BARRAS
    useEffect(() => {
        // Actualiza el estado scannedItems cuando itemByBarCode cambie
        if (itemByBarCode && itemByBarCode.result) {
            const item = itemByBarCode.result;
            const selectedItem: IAccountsBookItems = {
                nameItem: item.nameItem,
                id: item.id,
                type: item.type as 'Asset' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service',
                IVA: item.IVA,
                sellingPrice: item.sellingPrice,
                quantity: 1,
                subTotalValue: item.sellingPrice * 1,
            };
            // Añade el ítem al estado scannedItems
            setScannedItems(prevItems => [...prevItems, selectedItem]);
            setBarCode('');
        }
    }, [itemByBarCode]);

    // SETEA EL ARTICULO BUSCADO POR NOMBRE
    const handleItemSelect = (item: any) => {
        const selectedItems: IAccountsBookItems = {
            nameItem: item.nameItem,
            id: item.id,
            type: item.type as 'Asset' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service',
            IVA: item.IVA,
            sellingPrice: item.sellingPrice,
            purchasePrice: item.purchasePrice,
            quantity: 1,
            subTotalValue: item.sellingPrice * 1,
        };
        setScannedItems([...scannedItems, selectedItems]);
    };

    // ESTADO PARA CONTROLAR EL INDICE DEL ARTICULO EN scannedItems QUE SE ESTA AÑADIENDO
    const [changeQuantityIndex, setChangeQuantityIndex] = useState<number | null>(null);
    const handleChangeQuantityPerItem = (index: number) => setChangeQuantityIndex(index);

    const handlePriceChange = (id: string, value: string) => {
        const newPrice = parseFloat(value);
        setScannedItems(prevItems => 
            prevItems.map(item =>
                item.id === id ? { ...item, purchasePrice: newPrice, subTotalValue: item.quantity * newPrice } : item
            )
        );
    };

    // ELIMINA EL ARTICULO AGREGADO A LA TABLA PARA COMPRA
    const handleDeleteItem = (index: number) => {
        setScannedItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };

    // CIERRA EL MODAL QUE CAMBIA LA CANTIDAD DEL ARTICULO SELECCIONADO PARA LA COMPRA
    const handleCloseModal = () => setChangeQuantityIndex(null);

    // SETEA EL PROVEEDOR CUANDO SE BUSCA O SE CREA
    const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);

    // CALCULA EL VALOR TOTAL DE TODOS LOS ARTICULOS AÑADIDOS A LA COMPRA
    const totalPurchaseAmount = scannedItems.reduce((total, scannedItem) => {
        const purchasePrice = scannedItem.purchasePrice ?? 0;
        return total + (scannedItem.quantity * purchasePrice);
    }, 0);

    //Setea la cantidad de cuotas
    const [numberOfPayments, setNumberOfPayments] = useState<number>(0);
    const handleNumberOfPaymentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUnitValue = parseFloat(event.target.value);
        setNumberOfPayments(newUnitValue);
    };

    //Setea si es con interés o no
    const [creditWithInterest, setCreditWithInterest] = useState<'No' | 'Si'>('No');
    const [interestRateChange, setInterestRateChange] = useState<number>(0);
    const handleCreditWithInterest = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCreditWithInterest = event.target.value as 'No' | 'Si';
        setCreditWithInterest(newCreditWithInterest);
        setValue('creditWithInterest', newCreditWithInterest);
        setInterestRateChange(0);
    };

    //Setea la tasa de interés de la venta a cuotas
    const handleInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const interestRate = parseFloat(event.target.value);
        setInterestRateChange(interestRate);
    };

    //Setea el valor de la cuota
    const [paymentValue, setPaymentValue] = useState<number | undefined>(0);
    useEffect(() => {
        if (totalPurchaseAmount !== undefined && numberOfPayments !== 0) {
            if (interestRateChange !== 0) {
                const totalValue = Number(totalPurchaseAmount);
                const cuotaSinInteres = totalValue / numberOfPayments;
                const tasaInteresMensual = interestRateChange / 100 / 12;
                let saldoRestante = totalPurchaseAmount;
                let cuotaConInteres = 0;
                for (let i = 0; i < numberOfPayments; i++) {
                    const interesMensual = saldoRestante * tasaInteresMensual;
                    cuotaConInteres = cuotaSinInteres + interesMensual;
                    saldoRestante -= cuotaSinInteres;
                }
                setPaymentValue(cuotaConInteres);
            } else {
                const totalValue = Number(totalPurchaseAmount);
                const cuotaSinInteres = totalValue / numberOfPayments;
                setPaymentValue(cuotaSinInteres);
            }
        }
    }, [totalPurchaseAmount, numberOfPayments, interestRateChange]);



    // SELECCIONA EL MEDIO DE PAGO
    const [meanPayment, setMeansPayment] = useState('');
    const handleMeanPaymentChange = (event: { target: { value: SetStateAction<string> }}) => {
        setMeansPayment(event.target.value);
    };


    // OTROS GASTOS
    const [showOtherExpenses, setShowOtherExpenses] = useState('');
    const handleOtherExpensesChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowOtherExpenses(event.target.value);
    };

    const onSubmit = async (values: IAccountsBook) => {
        try {
            const formData = {
                ...values,
                branchId: selectedBranch,
                transactionType: "Gasto",
                creditCash: "Credito",
                pay: "No",
                paymentValue,
                accountsReceivable: totalPurchaseAmount,
                totalValue: totalPurchaseAmount,
                userRegister: decodeUserIdRegister,
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
            if (!showOtherExpenses) {
                if (!selectedSupplier) {
                    setMessageSelectedSupplier('Debes de seleccionar un proveedor');
                    setTimeout(() => setMessageSelectedSupplier(null), 5000);
                    return;
                }
            }
            dispatch(postAccountsBook(formData, token));
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
            {Array.isArray(errorAccountsBook) && errorAccountsBook.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{error}</div>
            ))}

            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} `}>
                <div className='mt-4 mb-4'>
                    <div className="d-flex align-items-start justify-content-between">
                        <div>
                            <p className="m-0">Busca el item por código de barras</p>
                            <input
                                id="barCodeInput"
                                type="text"
                                value={barCode}
                                className={`${styles.input__Bar_Code} `}
                                onChange={handleBarCodeChange}
                                placeholder='Código de barras'
                            />
                        </div>

                        <div>
                            <p className="m-0">Busca el item por nombre</p>
                            <SearchItemsByname
                                selectedBranch={selectedBranch}
                                token={token}
                                onItemSelect={(item) => handleItemSelect(item)}
                            />
                        </div>
                    </div>

                    <div className={`${styles.container__Table} mt-5 mb-4 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                        <h3 className="mb-3 text-primary-emphasis text-start">Relación de artículos</h3>
                        <div className={styles.container__Head}>
                            <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                <div className={`${styles.quantity} d-flex align-items-center justify-content-center text-center`}>Cantidad</div>
                                <div className={`${styles.description__Item} d-flex align-items-center justify-content-center text-center`}>Descripción artículo</div>
                                <div className={`${styles.iva} d-flex align-items-center justify-content-center text-center`}>% IVA</div>
                                <div className={`${styles.price__Unit} d-flex align-items-center justify-content-center text-center`}>Precio</div>
                                <div className={`${styles.value} d-flex align-items-center justify-content-center text-center`}>Subtotal</div>
                                <div className={`${styles.delete} d-flex align-items-center justify-content-center text-center`}></div>
                            </div>
                        </div>

                        <div className={`${styles.container__Body} `}>
                            {Array.isArray(scannedItems) && scannedItems.length > 0 ? (
                                scannedItems.map((item, index) => (
                                    <div key={index} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                        <div className={`${styles.quantity} d-flex align-items-center justify-content-center`}>
                                            <div className={`${styles.container__Quantity} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{item.quantity}</span>
                                            </div>
                                            <div className={`${styles.container__FaPlus} d-flex align-items-center justify-content-center`}>
                                                <FaPlus
                                                    className={`${styles.icon__FaPlus} `}
                                                    onClick={() => handleChangeQuantityPerItem(index)}
                                                />
                                            </div>
                                        </div>
                                        <div className={`${styles.description__Item} d-flex align-items-center justify-content-center`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{item.nameItem}</span>
                                        </div>
                                        <div className={`${styles.iva} d-flex align-items-center justify-content-center`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{item.IVA}</span>
                                        </div>
                                        <div className={`${styles.price__Unit} d-flex align-items-center justify-content-center`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}><span>$</span> {formatNumber(item.sellingPrice)}</span>
                                        </div>
                                        <div className={`${styles.value} d-flex align-items-center justify-content-center`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}><span>$ </span>{formatNumber((item.quantity) * (item.sellingPrice))}</span>
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

                    <div className={`${styles.container__Pay} d-flex align-items-center justify-content-between`}>
                        <div className={`${styles.container__Selected_Client} d-flex flex-column position-relative`}>
                            <p className='m-0'>Selecciona o crea a tu proveedor</p>
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

                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <p className={`${styles.text__Purchase} m-0`}>Total de la compra</p>
                            <p className={`${styles.input__Info_Purchase} m-0 p-2 text-end`}>$ {formatNumber(totalPurchaseAmount)}</p>
                        </div>
                    </div>
                </div>


    
                {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`}>¿Qué compraste, gastaste o pagaste o por qué salió dinero de tu negocio?</p>
                    </div>
                    <div>
                        <select
                            {...register('otherExpenses', { required: true })}
                            className={`${styles.info} p-2 border rounded border-secundary`}
                            onChange={handleTypeExpenses}
                        >
                            <option value=''>Selecciona un rubro</option>
                            <optgroup label="Compras o gastos de tu negocio">
                                <option value='Materia Prima'>Materias Primas</option>
                                <option value='Mercancia'>Mercancia</option>
                                <option value='Activo'>Equipos, herramientas y maquinaría</option>
                                <option value='Arriendo'>Arriendo</option>
                                <option value='Mantenimiento de equipos, maquinaria, herramientas'>Mantenimiento de equipos, maquinaria, herramientas</option>
                                <option value='Reparaciones locativas'>Reparaciones locativas</option>
                                <option value='Transporte'>Transporte</option>
                                <option value='Combustible'>Combustible</option>
                            </optgroup>
                            <optgroup label="Pagos de nómina">
                                <option value='Nomina'>Nomina</option>
                                <option value='Seguridad Social y/o parafiscales'>Seguridad Social y/o parafiscales</option>
                            </optgroup>
                            <optgroup label="Servicios Públicos">
                                <option value='Acueducto'>Acueducto</option>
                                <option value='Energia'>Energia</option>
                                <option value='Gas'>Gas</option>
                                <option value='Internet'>Internet</option>
                                <option value='Celular/Plan de datos'>Celular/Plan de datos</option>
                            </optgroup>
                            <optgroup label="Obligaciones financieras">
                                <option value='Credito del Banco'>Credito del Banco</option>
                                <option value='CooperativeCredit'>Credito de la cooperativa</option>
                                <option value='LoanShark'>Gota gota</option>
                                <option value='WarehouseCredit'>Créditos en almacenes</option>
                                <option value='PublicUtilitiesCredit'>Créditos en servicios públicos</option>
                            </optgroup>
                            <optgroup label="Impuestos">
                                <option value='IVA'>IVA</option>
                                <option value='ICA'>ICA</option>
                                <option value='Declaracion de Renta'>Declaracion de Renta</option>
                                <option value='Retencion en la Fuente'>Retencion en la Fuente</option>
                                <option value='Predial'>Predial</option>
                                <option value='Vehiculos y motos'>Vehiculos y motos</option>
                            </optgroup>
                            <optgroup label="Otros gastos">
                                <option value='Asesoria Contable'>Asesoria Contable</option>
                                <option value='Renovacion Camara de Comercio'>Renovacion Camara de Comercio</option>
                                <option value='Licencias y permisos'>Licencias y permisos</option>
                                <option value='Asesoria Juridica'>Asesoria Juridica</option>
                                <option value='Asesoria Juridica'>Dotación y/o vestuario</option>
                                <option value='Honorarios de contratista'>Honorarios de contratista</option>
                            </optgroup>
                            <optgroup label="Otro">
                                <option value='Otro'>Otro</option>
                            </optgroup>
                        </select>
                        {errors.otherExpenses && (
                            <p className='text-danger'>El rubro es requerido</p>
                        )}
                    </div>
                </div> */}

                {/* {(otherExpenses === 'Activo' || otherExpenses === 'Mercancia' || otherExpenses === 'Materia Prima' || otherExpenses === 'Servicio') && (
                    <div className="mb-3 p-2 d-flex flex-column justify-content-center align-items-center border rounded">
                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div className="px-3">
                                <p className={`${styles.text} mb-0 p-2`}>Escoge {labelTypeExpenses} que compraste</p>
                            </div>
                            <div>
                                <select
                                    {...register('itemId', { required: true })}
                                    className={`${styles.info} p-2 border rounded border-secundary`}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedItem = dataTypeExpenses?.find((item) => item.id === selectedId);
                                        setNameItem(selectedItem?.nameItem || '');
                                    }}
                                    >
                                    <option value='Otro'>Otro</option>
                                    {dataTypeExpenses && dataTypeExpenses.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.nameItem}
                                        </option>
                                    ))}
                                </select>
                                {errors.itemId && (
                                    <p className='text-danger'>El nombre de lo que compraste es requerido</p>
                                )}
                            </div>
                        </div>
                    </div>
                )} */}



                {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`}>Valor unitario de lo que compraste</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            {...register('unitValue', { required: 'El valor unitario es requerido', setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.info} p-2 border rounded border-secundary text-end`}
                            placeholder='Valor unitario'
                            onChange={handleUnitValueChange}
                            min={0}
                        />
                        {errors.unitValue && (
                            <p className='text-danger'>{errors.unitValue.message}</p>
                        )}
                    </div>
                </div> */}

                {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`}>Cantidad de lo que compraste</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            {...register('quantity', { required: 'La cantidad comprada es requerida', setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.info} p-2 border rounded border-secundary text-end`}
                            placeholder='Cantidad'
                            inputMode="numeric"
                            onChange={handleQuantityChange}
                            min={0}
                        />
                        {errors.quantity && (
                            <p className='invalid-feedback'>{errors.quantity.message}</p>
                        )}
                    </div>
                </div> */}

                {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`}>Valor total de la compra</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            {...register('totalValue', { required: 'El valor total de la compra es requerido', setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.info} p-2 border rounded border-secundary text-end`}
                            placeholder='Valor total'
                            inputMode="numeric"
                            readOnly
                            min={0}
                            value={totalValue}
                        />
                        {errors.totalValue && (
                            <p className='invalid-feedback'>{errors.totalValue.message}</p>
                        )}
                    </div>
                </div> */}






                <div className={`${styles.container__Other_Incomes} d-flex flex-column align-items-center justify-content-center`}>
                    <div className="mb-4 position-relative">
                        <p className={`${styles.label} m-0`}>Describe tu crédito</p>
                        <input
                            type="text"
                            {...register('creditDescription', { required: true })}
                            className={`${styles.input__Other_Incomes} p-2`}
                            placeholder='Describe tu crédito: Venta de arroz a don Lucho'
                        />
                        {errors.seller && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>La descripión es requerida</p>
                        )}
                    </div>
                    <div className="mb-4 position-relative">
                        <p className={`${styles.label} m-0`}>¿A cuántas cuotas vas a pagar?</p>
                        <input
                            type="number"
                            {...register('numberOfPayments', { setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.input__Other_Incomes} p-2`}
                            placeholder='Número de cuotas'
                            inputMode="numeric"
                            onChange={handleNumberOfPaymentsChange}
                            min={0}
                        />
                        {errors.numberOfPayments && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de cuotas es requerido</p>
                        )}
                    </div>
                    <div className="mb-4 position-relative">
                        <p className={`${styles.label} m-0`}>¿Es con interés?</p>
                        <select
                            {...register('creditWithInterest', { required: true })}
                            className={`${styles.input__Other_Incomes} p-2`}
                            value={creditWithInterest}
                            onChange={handleCreditWithInterest}
                        >
                            <option value='Si'>Si</option>
                            <option value='No'>No</option>
                        </select>
                        {errors.creditWithInterest && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El dato es requerido</p>
                        )}
                    </div>
                    {creditWithInterest === 'Si' && (
                        <div className="mb-4 position-relative">
                            <p className={`${styles.label} m-0`}>Tasa de interés</p>
                            <input
                                type="number"
                                {...register('creditInterestRate', { setValueAs: (value) => parseFloat(value) })}
                                className={`${styles.input__Other_Incomes} p-2`}
                                placeholder='5'
                                inputMode="numeric"
                                onChange={handleInterestRateChange}
                                min={0}
                            />
                            {errors.creditInterestRate && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>La tasa de interés es requerida</p>
                            )}
                        </div>
                    )}
                    <div className="mb-4 position-relative">
                        <p className={`${styles.label} m-0`}>Valor aproximado de cada una de las cuotas</p>
                        <input
                            type="number"
                            {...register('paymentValue', { setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.input__Other_Incomes} p-2`}
                            placeholder='Valor de cada cuota'
                            inputMode="numeric"
                            readOnly
                            value={formatNumber(paymentValue)}
                            min={0}
                        />
                    </div>
                    <div className="mb-4 position-relative">
                        <select
                            className={`${styles.input__Other_Incomes} p-2`}
                            value={selectedBranch}
                            onChange={handleUserPlatformChange}
                        >
                            <option value=''>Selecciona el vendedor</option>
                            {Array.isArray(usersPlatform) && usersPlatform.map((userPlatform, index) => (
                                <option key={index} value={userPlatform.id}>
                                    {userPlatform.name} {userPlatform.lastName}
                                </option>
                            ))}
                        </select>
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

export default CreditExpense;
