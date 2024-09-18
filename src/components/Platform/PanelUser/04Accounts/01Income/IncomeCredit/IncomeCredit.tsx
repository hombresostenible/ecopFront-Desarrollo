/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { postAccountsBook } from '../../../../../../redux/User/04AccountsSlice/actions';
import { getItemByBarCode } from '../../../../../../redux/User/itemBybarCodeOrName/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook, IAccountsBookItems } from "../../../../../../types/User/accountsBook.types";
import { IUserPlatform } from '../../../../../../types/User/userPlatform.types';
import SearchItemsByname from '../../../../../../helpers/SearchItemName/SearchItemsByname';
import ModalChangeQuantityPerItem from '../../../../../../helpers/ModalChangeQuantityPerItem/ModalChangeQuantityPerItem';
import SearchClientCrm from '../../../../../../helpers/SearchClientCrm/SearchClientCrm';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface IncomeCreditProps {
    token: string;
    decodeUserIdRegister: string;
    usersPlatform: IUserPlatform | IUserPlatform[] | null;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: string | undefined;
    transactionDate: string | undefined;
}

function IncomeCredit({ token, decodeUserIdRegister, usersPlatform, selectedBranch, defaultDates, registrationDate, transactionDate }: IncomeCreditProps) {
    const navigate = useNavigate();
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorAccountsBook = useSelector((state: RootState) => state.accountsBook.errorAccountsBook);
    const itemByBarCode = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByBarCode);

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

    //Setea todos los artículos que se registrarán
    const [scannedItems, setScannedItems] = useState<IAccountsBookItems[]>([]);

        // SETEA EL ARTICULO BUSCADO POR CODIGO DE BARRAS
    useEffect(() => {
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

    // CALCULA EL VALOR TOTAL DE TODOS LOS ARTICULOS AÑADIDOS A LA COMPRA
    const totalPurchaseAmount = scannedItems.reduce((total, scannedItem) => {
        return total + (scannedItem.quantity * scannedItem.sellingPrice);
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

    // SETEA EL USUARIO VENDEDOR
    const [userPlatform, setUserPlatform] = useState<IUserPlatform>();
    const handleUserPlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedUser = Array.isArray(usersPlatform)
            ? usersPlatform.find((user) => user.id === selectedId)
            : null;
    
        setUserPlatform(selectedUser || undefined);
    };

    const onSubmit = async (values: IAccountsBook) => {
        try {
            const formData = {
                ...values,
                branchId: selectedBranch,
                transactionType: "Ingreso",
                creditCash: "Credito",
                transactionCounterpartId: selectedClient,
                itemsSold: scannedItems,
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

            if (!selectedClient) {
                setMessageSelectedClient('Debes de seleccionar un cliente');
                setTimeout(() => setMessageSelectedClient(null), 5000);
                return;
            }
            if(userPlatform?.id) formData.seller = userPlatform.id;
            dispatch(postAccountsBook(formData, token));
            setFormSubmitted(true);
            setSelectedClient(null);
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
            <h3 className='text-center text-primary-emphasis'>Elegiste la forma de venta "A cuotas", por tanto estas creando una cuenta por cobrar</h3>
            {Array.isArray(errorAccountsBook) && errorAccountsBook.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{error}</div>
            ))}

            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} `}>
                <div className='mt-4 mb-4'>
                    <div className="d-flex align-items-start justify-content-between">
                        <div>
                            <p className="m-0">Código de barras</p>
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

                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <p className={`${styles.text__Purchase} m-0`}>Total de la compra</p>
                            <p className={`${styles.input__Info_Purchase} m-0 p-2 text-end`}>$ {formatNumber(totalPurchaseAmount)}</p>
                        </div>
                    </div>
                </div>

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
                        <p className={`${styles.label} m-0`}>¿A cuántas cuotas te van a pagar?</p>
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
                    {messageSelectedClient && (
                        <div className={`${styles.error__Message_Selected_Client} position-absolute`}>{messageSelectedClient}</div>
                    )}
                    <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default IncomeCredit;