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

    // SETEA EL ARTICULO BUSCADO POR NOMBRE
    const [scannedItems, setScannedItems] = useState<IItemsAccountsBook[]>([]);
    const handleItemSelect = (item: any) => {
        const selectedItems: IItemsAccountsBook = {
            nameItem: item.nameItem,
            id: item.id,
            type: item.type as 'Assets' | 'Merchandise' | 'RawMaterial' | 'Service', // Asegúrate de que el tipo coincida con la enumeración permitida
            IVA: item.IVA,
            sellingPrice: item.sellingPrice,
            quantity: 1,                                // Puedes inicializar la cantidad según tu lógica de selección
            subTotalValue: item.sellingPrice * 1,       // Calcula el subtotal según tu lógica
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
    const handleChangeQuantityPerItem = (index: number) => {                                // Función para abrir el modal de cambio de cantidad
        setChangeQuantityIndex(index);
    };

    const [changeIva, setChangeIva] = useState<number | null>(null);
    const handleChangeIva = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const index = parseInt(event.target.value, 10);
        setChangeIva(index);
    };

    const [unitValue, setUnitValue] = useState<number | null>(null);                    //Setea el valor unitario de cada item comprado
    const handleUnitValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const index = parseFloat(event.target.value, 10);
        setUnitValue(index);
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

    const [paymentGiven, setPaymentGiven] = useState<string>('');                 // Estado para almacenar el monto del pago recibido
    const [changeGiven, setChangeGiven] = useState<number | null>(null);          // Estado para almacenar el cambio

    // Función para formatear el valor como moneda
    const formatCurrency = (value: string) => {
        if (!value) return '';
        const numberValue = parseFloat(value.replace(/[^\d]/g, ''));
        return `$ ${new Intl.NumberFormat('es-ES').format(numberValue)}`;
    };

    // Manejar el cambio en el monto recibido
    const handlePaymentGivenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');                         // Eliminar caracteres no numéricos
        setPaymentGiven(value);
    };

    // Calcular el cambio y actualizar el estado
    const handleCalculateChange = () => {
        const numericValue = parseFloat(paymentGiven.replace(/[^\d]/g, ''));
        if (!isNaN(numericValue)) {
            setChangeGiven(numericValue - totalPurchaseGiven);                    // totalPurchaseGiven debe estar definido y accesible aquí
        } else {
            setChangeGiven(null);
        }
    };




    // OTROS GASTOS
    // Periodicidad de pago de los servicios públicos si es Mensual o Bimestral
    const [periodicityPayService, setPeriodicityPayService] = useState('');
    const handlePeriodicityPayService = (event: { target: { value: SetStateAction<string> }}) => {
        setPeriodicityPayService(event.target.value);
    };


    const [totalValueOtherGiven, setTotalValueOtherGiven] = useState<string>('');
    const handleTotalValueOtherGiven = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');                         // Eliminar caracteres no numéricos
        setTotalValueOtherGiven(value);
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
    const [paymentValue, setPaymentValue] = useState<number | undefined>(0);

    //Calcula el valor de la cuota con o sin interés
    useEffect(() => {
        if (totalValueOtherGiven !== undefined && numberOfPayments !== 0) {
            if (interestRateChange !== 0) {
                const totalValue = Number(totalValueOtherGiven);
                const cuotaSinInteres = totalValue / numberOfPayments;                  // Calcula la cuota con interés
                const tasaInteresMensual = interestRateChange / 100 / 12;               // Calcula la tasa de interés mensual
            let saldoRestante = totalValue;                                             // Calcula el interés acumulado sobre el monto total adeudado
                let cuotaConInteres = 0;
        
                for (let i = 0; i < numberOfPayments; i++) {
                    const interesMensual = saldoRestante * tasaInteresMensual;
                    cuotaConInteres = cuotaSinInteres + interesMensual;                 // Calcula la cuota con interés y amortización
                    saldoRestante -= cuotaSinInteres;                                   // Resta la parte que corresponde a la amortización
                }
                setPaymentValue(cuotaConInteres);
            } else {
                const totalValue = Number(totalValueOtherGiven);
                const cuotaSinInteres = totalValue / numberOfPayments;                  // Lógica cuando no hay interés (puedes personalizar esto según tus necesidades)
                setPaymentValue(cuotaSinInteres);
            }
        }
    }, [totalValueOtherGiven, numberOfPayments, interestRateChange]);

    const onSubmit = async (values: IAccountsBook) => {
        const totalValueOtherGivenNumber = Number(totalValueOtherGiven);
        try {
            const formData = {
                ...values,
                transactionType: "Gasto",
                creditCash: "Contado",
                meanPayment: meanPayment ? meanPayment : null,
                itemsBuy: scannedItems,
                transactionCounterpartId: selectedSupplier,
                totalValue: totalPurchaseGiven || totalValueOtherGivenNumber,
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
                                    // readOnly={true}
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
                                                        defaultValue={'0'}
                                                        className={`${styles.input} p-2 border `}
                                                        onChange={handleChangeIva}
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
                                                    onChange={handleUnitValue}
                                                    className={`${styles.input} p-2 border `}
                                                    placeholder='Precio de compra del equipo, herramienta o máquina'
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
                                <p className={`${styles.input__Info_Purchase} m-0 p-2 text-end`}>$ {formatNumber(totalPurchaseGiven)}</p>
                            </div>

                            <div className={`${styles.container__Section_Info_Purchase} mb-3 m-auto d-flex align-items-center justify-content-between`}>
                                <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>Monto recibido</p>
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

                {typeExpense === 'Otros gastos' && (
                    <div>
                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center">
                            <p className={`${styles.text__Purchase} m-0 p-2 text-start`}>¿Qué compraste, gastaste o pagaste o por qué salió dinero de tu negocio?</p>
                            <div>
                                <select
                                    {...register('otherExpenses', { required: true })}
                                    className={`${styles.info} p-2 border rounded border-secundary`}
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
                            </div>
                        </div>

                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <p className={`${styles.text} mb-0 p-2`}>¿El servicio se paga mensual o bimestral?</p>
                            <div>
                                <select
                                    {...register('periodicityPayService', { required: true })}
                                    className={`${styles.info} p-2 border rounded border-secundary`}
                                    onChange={handlePeriodicityPayService}
                                >
                                    <option value=''>Selecciona una opción</option>
                                    <option value='Mensual'>Mensual</option>
                                    <option value='Bimestral'>Bimestral</option>
                                </select>
                                {errors.periodicityPayService && (
                                    <p className='text-danger'>La periodicidad de pago es requerido</p>
                                )}
                            </div>
                        </div>
                        {periodicityPayService === 'Mensual' && (
                            <div>
                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                    <div className="px-3">
                                        <p className={`${styles.text} mb-0 p-2`}>Escoge el mes</p>
                                    </div>
                                    <div>
                                        <select
                                            {...register('periodPayService', { required: true })}
                                            className={`${styles.info} p-2 border rounded border-secundary`}
                                        >
                                            <option value=''>Selecciona un Mes</option>
                                            <option value="Enero de 2024">Enero de 2024</option>
                                            <option value="Febrero de 2024">Febrero de 2024</option>
                                            <option value="Marzo de 2024">Marzo de 2024</option>
                                            <option value="Abril de 2024">Abril de 2024</option>
                                            <option value="Mayo de 2024">Mayo de 2024</option>
                                            <option value="Junio de 2024">Junio de 2024</option>
                                            <option value="Julio de 2024">Julio de 2024</option>
                                            <option value="Agosto de 2024">Agosto de 2024</option>
                                            <option value="Septiembre de 2024">Septiembre de 2024</option>
                                            <option value="Octubre de 2024">Octubre de 2024</option>
                                            <option value="Noviembre de 2024">Noviembre de 2024</option>
                                            <option value="Diciembre de 2024">Diciembre de 2024</option>
                                        </select>
                                        {errors.periodPayService && (
                                            <p className='text-danger'>La periodicidad de pago esrequerido</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {periodicityPayService === 'Bimestral' && (
                            <div>
                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                    <div className="px-3">
                                        <p className={`${styles.text} mb-0 p-2`}>Escoge el bimestre</p>
                                    </div>
                                    <div>
                                        <select
                                        {...register('periodPayService', { required: true })}
                                        className={`${styles.info} p-2 border rounded border-secundary`}
                                    >
                                            <option value=''>Selecciona un rubro</option>
                                            <option value='Enero - Febrero de 2024'>Enero - Febrero de 2024</option>
                                            <option value='Marzo - Abril de 2024'>Marzo - Abril de 2024</option>
                                            <option value='Mayo - Junio de 2024'>Mayo - Junio de 2024</option>
                                            <option value='Julio - Agosto de 2024'>Julio - Agosto de 2024</option>
                                            <option value='Septiembre - Octubre de 2024'>Septiembre - Octubre de 2024</option>
                                            <option value='Noviembre - Diciembre de 2024'>Noviembre - Diciembre de 2024</option>
                                    </select>
                                    {errors.periodPayService && (
                                        <p className='text-danger'>La periodicidad de pago es requerido</p>
                                    )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}


    





                {/* {(
                    expenseCategory === 'Materia Prima' || expenseCategory === 'Mercancia' || expenseCategory === 'Servicio' || expenseCategory === 'Activo' ||  
                    expenseCategory === 'Arriendo' || expenseCategory === 'Reparaciones locativas' || expenseCategory === 'Transporte' || expenseCategory === 'Combustible' || 
                    expenseCategory === 'Nomina' || expenseCategory === 'Seguridad Social y/o parafiscales' || expenseCategory === 'IVA' || expenseCategory === 'IVA' || 
                    expenseCategory === 'Declaracion de Renta' || expenseCategory === 'Retencion en la Fuente' || expenseCategory === 'Predial' || expenseCategory === 'Vehiculos y motos' || 
                    expenseCategory === 'Asesoria Contable' || expenseCategory === 'Renovacion Camara de Comercio' || expenseCategory === 'Licencias y permisos' || expenseCategory === 'Asesoria Juridica' || 
                    expenseCategory === 'Honorarios de contratista' || expenseCategory === 'Honorarios de contratista'
                ) && (
                    <div>
                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div className="px-3">
                                <p className={`${styles.text} mb-0 p-2`}>Valor unitario de lo que compraste, gastaste o pagaste</p>
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
                        </div>
                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div className="px-3">
                                <p className={`${styles.text} mb-0 p-2`}>Cantidad de lo que compraste, gastaste o pagaste</p>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    {...register('quantity', { required: 'La cantidad vendida es requerida', setValueAs: (value) => parseFloat(value) })}
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
                        </div>
                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div className="px-3">
                                <p className={`${styles.text} mb-0 p-2`}>Valor total de lo que compraste, gastaste o pagaste</p>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    {...register('totalValue', { required: 'El valor total de la compra es requerida', setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.info} p-2 border rounded border-secundary text-end`}
                                    placeholder='Valor total'
                                    inputMode="numeric"
                                    readOnly
                                    min={0}
                                    value={unitValue * quantity}
                                />
                                {errors.totalValue && (
                                    <p className='invalid-feedback'>{errors.totalValue.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )} */}

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`}>Medio de Pago</p>
                    </div>
                    <div>
                        <select
                            {...register('meanPayment', { required: true })}
                            className={`${styles.info} p-2 border rounded border-secundary`}
                            onChange={handleMeanPaymentChange}
                        >
                            <option value=''>Selecciona una opción</option>
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
                        {errors.meanPayment && (
                            <p className='text-danger'>El medio de pago es requerido es requerido</p>
                        )}
                    </div>
                </div>

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