/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState } from 'react';
// import { useState, useEffect, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postAccountsBook } from '../../../../../redux/User/accountsBookSlice/actions';
// import { getAssetsByBranch } from '../../../../../redux/User/assetsSlice/actions';
// import { getMerchandisesByBranch } from '../../../../../redux/User/merchandiseSlice/actions';
// import { getRawMaterialsByBranch } from '../../../../../redux/User/rawMaterialSlice/actions';
// import { getServicesByBranch } from '../../../../../redux/User/serviceSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";
// import { IAssets } from '../../../../../types/User/assets.types';
// import { IMerchandise } from '../../../../../types/User/merchandise.types';
// import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
// import { IService } from '../../../../../types/User/services.types';
// import SearchSupplierCrm from '../../SearchSupplierCrm';
import styles from './styles.module.css';

interface CashProps {
    token: string;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: Date | undefined;
    transactionDate: Date | undefined;
}

function CashExpense({ token, selectedBranch, defaultDates, registrationDate, transactionDate }: CashProps) {
    console.log('defaultDates: ', defaultDates)
    console.log('registrationDate: ', registrationDate)
    console.log('transactionDate: ', transactionDate)
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorAccountsBook = useSelector((state: RootState) => state.accountsBook.errorAccountsBook);
    // const assets = useSelector((state: RootState) => state.assets.assets);
    // const merchandises = useSelector((state: RootState) => state.merchandise.merchandise);
    // const rawMaterials = useSelector((state: RootState) => state.rawMaterial.rawMaterial);
    // const services = useSelector((state: RootState) => state.service.service);

    const { register, handleSubmit, formState: { errors } } = useForm<IAccountsBook>();
    const [formSubmitted, setFormSubmitted] = useState(false);

    //Setea el cliente cuando se busca o se crea
    // const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

    //Setea el nombre de lo que se va a comprar
    // const [nameItem, setNameItem] = useState('');

    //Selección de la tabla que se consultará para renderizar los activos, mercancías, etc que se compraron a contado
    // const [expenseCategory, setTypeExpenses] = useState('');
    // const handleTypeExpenses = (event: { target: { value: SetStateAction<string> }}) => {
    //     setTypeExpenses(event.target.value);
    // };

    //Selección el medio de pago
    // const [meanPayment, setMeansPayment] = useState('');
    // const handleMeanPaymentChange = (event: { target: { value: SetStateAction<string> }}) => {
    //     setMeansPayment(event.target.value);
    // };

    //Hace la petición get a la base de datos cuando se selecciona Equipos, Mercancia, MP, etc
    // useEffect(() => {
    //     if (expenseCategory === 'Activo') {
    //         dispatch(getAssetsByBranch(selectedBranch, token));
    //     }
    //     if (expenseCategory === 'Mercancia') {
    //         dispatch(getMerchandisesByBranch(selectedBranch, token));
    //     }
    //     if (expenseCategory === 'Materia Prima') {
    //         dispatch(getRawMaterialsByBranch(selectedBranch, token));
    //     }
    //     if (expenseCategory === 'Servicio') {
    //         dispatch(getServicesByBranch(selectedBranch, token));
    //     }
    // }, [ expenseCategory, token ]);
    
    //Muestra los nombres de los registros
    // const getItemInfoTypeExpenses = () => {
    //     switch (expenseCategory) {
    //         case 'Activo':
    //             return { labelTypeExpenses: 'el activo', dataTypeExpenses: assets as IAssets[] };
    //         case 'Mercancia':
    //             return { labelTypeExpenses: 'la mercancía', dataTypeExpenses: merchandises as IMerchandise[] };
    //         case 'Materia Prima':
    //             return { labelTypeExpenses: 'la materia prima', dataTypeExpenses: rawMaterials as IRawMaterial[] };
    //         case 'Servicio':
    //             return { labelTypeExpenses: 'el servicio', dataTypeExpenses: services as IService[] };
    //         default:
    //             return { labelTypeExpenses: '', dataTypeExpenses: [] };
    //     }
    // };
    // const { labelTypeExpenses, dataTypeExpenses } = getItemInfoTypeExpenses();

    //Periodicidad de pago de los servicios públicos si es Mensual o Bimestral
    // const [periodicityPayService, setPeriodicityPayService] = useState('');
    // const handlePeriodicityPayService = (event: { target: { value: SetStateAction<string> }}) => {
    //     setPeriodicityPayService(event.target.value);
    // };

    //Setea el valor unitario de la compra, gasto o pago
    // const [unitValue, setUnitValue] = useState<number>(0);
    // const handleUnitValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newUnitValue = parseFloat(event.target.value);
    //     setUnitValue(newUnitValue);
    // };

    //Setea la cantidad de unidades de la compra, gasto o pago
    // const [quantity, setQuantity] = useState<number>(0);
    // const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newQuantity = parseFloat(event.target.value);
    //     setQuantity(newQuantity);
    // };

    const onSubmit = async (values: IAccountsBook) => {
        try {
            const formData = {
                ...values,
                branchId: selectedBranch,
                transactionType: "Gasto",
                creditCash: "Contado",
                // nameItem,
                // meanPayment,
                // transactionCounterpartId: selectedSupplier,
            } as IAccountsBook;
            // if (defaultDates) {
            //     formData.registrationDate = new Date();
            //     formData.transactionDate = new Date();
            // }

            // if (expenseCategory === 'Acueducto' || expenseCategory === 'Energia' || expenseCategory === 'Gas' || expenseCategory === 'Internet' || expenseCategory === 'Celular/Plan de datos') formData.unitValue = formData.totalValue;
            // if (registrationDate) formData.registrationDate = registrationDate;
            // if (transactionDate) formData.transactionDate = transactionDate;

            dispatch(postAccountsBook(formData, token));
            setFormSubmitted(true);
            setTimeout(() => {
                setFormSubmitted(false);
            }, 1500);
        } catch (error) {
            throw new Error(`Error en el envío del formulario: ${error}`);
        }
    };

    return (
        <div>
            {/* <h2 className="text-primary-emphasis text-center">Gasto en efectivo</h2> */}
            {formSubmitted && (
                <div className='alert alert-success'>El formulario se ha enviado con éxito</div>
            )}
            {errorAccountsBook?.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{error}</div>
            ))}

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`}>¿Qué compraste, gastaste o pagaste o por qué salió dinero de tu negocio?</p>
                    </div>
                    <div>
                        <select
                            {...register('expenseCategory', { required: true })}
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
                        {errors.expenseCategory && (
                            <p className='text-danger'>El rubro es requerido</p>
                        )}
                    </div>
                </div> */}

                {/* {(expenseCategory === 'Activo' || expenseCategory === 'Mercancia' || expenseCategory === 'Materia Prima' || expenseCategory === 'Servicio') && (
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

                {/* {(expenseCategory === 'Acueducto' || expenseCategory === 'Energia' || expenseCategory === 'Gas' || expenseCategory === 'Internet' || expenseCategory === 'Celular/Plan de datos') && (
                    <div>
                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div className="px-3">
                                <p className={`${styles.text} mb-0 p-2`}>¿El servicio se paga mensual o bimestral?</p>
                            </div>
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
                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div className="px-3">
                                <p className={`${styles.text} mb-0 p-2`}>Valor total pagado por el servicio</p>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    {...register('totalValue', { required: 'El valor total de la compra es requerida', setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.info} p-2 border rounded border-secundary text-end`}
                                    placeholder='Valor total'
                                    inputMode="numeric"
                                    min={0}
                                />
                                {errors.totalValue && (
                                    <p className='invalid-feedback'>{errors.totalValue.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )} */}

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

                {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
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
                </div> */}
                
                {/* <SearchSupplierCrm
                    token={token}
                    expenseCategory={expenseCategory}
                    onSupplierSelect={(supplier) => setSelectedSupplier(supplier)}
                /> */}

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`}>Usurio(a) que registra</p>
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

export default CashExpense;