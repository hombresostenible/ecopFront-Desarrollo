/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postAccountsBook } from '../../../../../redux/User/accountsBookSlice/actions';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import { getItemByBarCode } from '../../../../../redux/User/itemBybarCodeOrName/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";
import SearchItemName from '../../../../../components/Platform/05InvoicingAndPos/01SearchItemName/SearchItemName';
import SearchClientCrm from '../../SearchClientCrm';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
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
        setScannedItems(prevItems => [...prevItems, { item, quantity: 1 }]);
    };
    console.log('scannedItems')

    useEffect(() => {
        const inputElement = document.getElementById("barCodeInput") as HTMLInputElement;
        if (inputElement) {
            inputElement.value = '';
        }
    }, [scannedItems]);
    
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
                                    <div className={`${styles.price__Unit} d-flex align-items-center justify-content-center text-center`}>Precio incluido IVA</div>
                                    <div className={`${styles.iva} d-flex align-items-center justify-content-center text-center`}>IVA</div>
                                    <div className={`${styles.value} d-flex align-items-center justify-content-center text-center`}>Subtotal</div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body} `}>
                                {Array.isArray(scannedItems) && scannedItems.length > 0 ? (
                                    scannedItems.map((product, index) => (
                                        <div key={index} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <div className={`${styles.quantity} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.quantity}</span>
                                            </div>
                                            <div className={`${styles.description__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.item.nameItem}</span>
                                            </div>
                                            <div className={`${styles.price__Unit} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}><span>$</span> {formatNumber(product.item.sellingPrice)}</span>
                                            </div>
                                            <div className={`${styles.iva} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{product.item.IVA} %</span>
                                            </div>
                                            <div className={`${styles.value} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}><span>$</span>{formatNumber((product.quantity) * (product.item.sellingPrice))}</span>
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

                        <SearchClientCrm
                            token={token}
                            onClientSelect={(client) => setSelectedClient(client)}
                        />

                        <div className="d-flex align-items-start justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className={`${styles.text} mb-0 p-2`}>Medio de Pago</p>
                                <div>
                                    <select
                                        {...register('meanPayment', { required: true })}
                                        className={`${styles.input} p-2`}
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
                                        <p className='text-danger'>El medio de pago es requerido</p>
                                    )}
                                </div>
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

                {typeIncome === 'Otros ingresos' && (
                    <div>
                        bbbbbbb
                    </div>
                )}

                <div className="mb-4 d-flex align-items-center justify-content-center">
                    <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default IncomeCash;

/*
-ESCOGER EL ARTICULO
-VER EL VR UNITARIO
-ESCRIBIR LA CANTIDAD
-VER EL VR TOTAL
-SELECCIONAR EL MEDIO DE PAGO

*/