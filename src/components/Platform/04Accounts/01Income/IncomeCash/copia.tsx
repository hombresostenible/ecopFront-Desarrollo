/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postAccountsBook } from '../../../../../redux/User/accountsBookSlice/actions';
import { getAssetsByBranch } from '../../../../../redux/User/assetsSlice/actions';
import { getMerchandisesByBranch } from '../../../../../redux/User/merchandiseSlice/actions';
import { getProductsByBranch } from '../../../../../redux/User/productSlice/actions';
import { getRawMaterialsByBranch } from '../../../../../redux/User/rawMaterialSlice/actions';
import { getServicesByBranch } from '../../../../../redux/User/serviceSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";
import { IAssets } from '../../../../../types/User/assets.types';
import { IMerchandise } from '../../../../../types/User/merchandise.types';
import { IProduct } from '../../../../../types/User/products.types';
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
import { IService } from '../../../../../types/User/services.types';
import SearchClientCrm from '../../SearchClientCrm';
import styles from './styles.module.css';

interface CashProps {
    token: string;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: Date | undefined;
    transactionDate: Date | undefined;
}

function IncomeCash({ token, selectedBranch, defaultDates, registrationDate, transactionDate }: CashProps) {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // Estados de Redux
    const errorAccountsBook = useSelector((state: RootState) => state.accountsBook.errorAccountsBook);
    const assets = useSelector((state: RootState) => state.assets.assets);
    const merchandises = useSelector((state: RootState) => state.merchandise.merchandise);
    const products = useSelector((state: RootState) => state.product.product);
    const rawMaterials = useSelector((state: RootState) => state.rawMaterial.rawMaterial);
    const services = useSelector((state: RootState) => state.service.service);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAccountsBook>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    //Setea el cliente cuando se busca o se crea
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
    
    //Setea el nombre de lo que se va a vender
    const [nameItem, setNameItem] = useState('');

    //Selección de la tabla que se consultará para renderizar los activos, mercancías, etc que se vendieron a contado
    const [typeSell, setTypeSell] = useState('');
    const handleTableChange = (event: { target: { value: SetStateAction<string> }}) => {
        setTypeSell(event.target.value);
    };

    //Selección el medio de pago
    const [meanPayment, setMeansPayment] = useState('');
    const handleMeanPaymentChange = (event: { target: { value: SetStateAction<string> }}) => {
        setMeansPayment(event.target.value);
    };
    
    //Hace la petición get a la base de datos cuando se selecciona Equipos, Mercancia, MP, etc
    useEffect(() => {
        if (typeSell === 'Activo') {
            dispatch(getAssetsByBranch(selectedBranch, token));
        }
        if (typeSell === 'Mercancia') {
            dispatch(getMerchandisesByBranch(selectedBranch, token));
        }
        if (typeSell === 'Producto') {
            dispatch(getProductsByBranch(selectedBranch, token));
        }
        if (typeSell === 'Materia Prima') {
            dispatch(getRawMaterialsByBranch(selectedBranch, token));
        }
        if (typeSell === 'Servicio') {
            dispatch(getServicesByBranch(selectedBranch, token));
        }
    }, [ typeSell, token ]); 
    
    //Muestra los nombres de los registros
    const getItemInfoTableChange = () => {
        switch (typeSell) {
            case 'Activo':
                return { labelTableChange: 'el activo', dataTableChange: assets as IAssets[] };
            case 'Mercancia':
                return { labelTableChange: 'la mercancía', dataTableChange: merchandises as IMerchandise[] };
            case 'Producto':
                return { labelTableChange: 'el producto', dataTableChange: products as IProduct[] };
            case 'Materia Prima':
                return { labelTableChange: 'la materia prima', dataTableChange: rawMaterials as IRawMaterial[] };
            case 'Servicio':
                return { labelTableChange: 'el servicio', dataTableChange: services as IService[] };
            default:
                return { labelTableChange: '', dataTableChange: [] };
        }
    };
    const { labelTableChange, dataTableChange } = getItemInfoTableChange();

    //Setea el valor unitario de la venta
    const [unitValue, setUnitValue] = useState<number>(0);
    const handleUnitValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUnitValue = parseFloat(event.target.value);
        setUnitValue(newUnitValue);
        setValue('unitValue', newUnitValue);
    };

    //Setea la cantidad de unidades de la venta
    const [quantity, setQuantity] = useState<number>(0);
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseFloat(event.target.value);
        setQuantity(newQuantity);
        setValue('quantity', newQuantity);
    };

    //Setea el valor total de la venta
    const [totalValue, setTotalValue] = useState<number | undefined>(0);
    useEffect(() => {
        if (!isNaN(unitValue) && !isNaN(quantity)) {
            const total = unitValue * quantity;
            setTotalValue(total);
            setValue('totalValue', total);
        }
    }, [ unitValue, quantity ]);

    const onSubmit = async (values: IAccountsBook) => {
        try {
            const accountBookData = {
                ...values,
                branchId: selectedBranch,
                transactionType: "Ingreso",
                creditCash: "Contado",
                nameItem,
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
                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`}>¿Qué vendiste o por qué entró dinero a tu negocio?</p>
                    </div>
                    <div>
                        <select
                            {...register('incomeCategory', { required: true })}
                            className={`${styles.info} p-2 border rounded border-secundary`}
                            onChange={handleTableChange}
                        >
                            <option value=''>Selecciona una opción</option>
                            <optgroup label="Ventas">
                                <option value='Producto'>Producto</option>
                                <option value='Mercancia'>Mercancia</option>
                                <option value='Servicio'>Servicio</option>
                                <option value='Materia Prima'>Materia Prima</option>
                                <option value='Activo'>Equipo, herramienta o máquina</option>
                            </optgroup>
                            <optgroup label="Otros ingresos">
                                <option value='Credito del Banco'>Credito del Banco</option>
                                <option value='Credito en Cooperativa'>Credito de la cooperativa</option>
                                <option value='Gota gota'>Gota gota</option>
                                <option value='Credito de almacén'>Créditos en almacenes</option>
                                <option value='Credito de servicios públicos'>Créditos en servicios públicos</option>
                            </optgroup>
                        </select>
                        {errors.incomeCategory && (
                            <p className='text-danger'>El dato es requerido</p>
                        )}
                    </div>
                </div>

                {(typeSell === 'Activo' || typeSell === 'Mercancia' || typeSell === 'Producto' || typeSell === 'Materia Prima' || typeSell === 'Servicio') && (
                    <div className="mb-3 p-2 d-flex flex-column align-items-center justify-content-center border rounded">
                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div className="px-3">
                                <p className={`${styles.text} mb-0 p-2`}>Escoge {labelTableChange} que vendiste</p>
                            </div>
                            <div>
                                <select
                                    {...register('itemId', { required: true })}
                                    className={`${styles.info} p-2 border rounded border-secundary`}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedItem = dataTableChange?.find((item) => item.id === selectedId);
                                        setNameItem(selectedItem?.nameItem || '');
                                    }}
                                >
                                    {dataTableChange && dataTableChange.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.nameItem}
                                        </option>
                                    ))}
                                    <option value='Otro'>Otro</option>
                                </select>
                                {errors.itemId && (
                                    <p className='text-danger'>El nombre de lo que vendiste es requerido</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div className="px-3">
                                <p className={`${styles.text} mb-0 p-2`}>Valor unitario de lo que vendiste</p>
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
                                <p className={`${styles.text} mb-0 p-2`}>Cantidad de lo que vendiste</p>
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
                                <p className={`${styles.text} mb-0 p-2`}>Valor total de la venta</p>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    {...register('totalValue', { required: 'El valor total de la venta es requerido', setValueAs: (value) => parseFloat(value) })}
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
                        </div>

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
                    </div>
                )}
   
                <SearchClientCrm
                    token={token}
                    typeSell={typeSell}
                    onClientSelect={(client) => setSelectedClient(client)}
                />

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`}>Vendedor(a)</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            {...register('seller', { required: 'El vendedor es requerido' })}
                            className={`${styles.info} p-2 border rounded border-secundary`}
                            placeholder='Nombre del vendedor'
                            />
                        {errors.seller && (
                            <div className='invalid-feedback'>{errors.seller.message}</div>
                        )}
                    </div>
                </div>

                <div className="d-flex">
                    <button className={`${styles.buttonSubmit} m-auto border-0 rounded text-decoration-none`} type='submit' >Enviar</button>
                </div> 
            </form>
        </div>
    );
}

export default IncomeCash;