/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */

interface CreditProps {
    selectedBranch: string;
    defaultDates: boolean;
}

function Credit({ selectedBranch, defaultDates }: CreditProps) {
    console.log('selectedBranch: ', selectedBranch)
    console.log('defaultDates: ', defaultDates)
    return (
        <div>Credit</div>
    );
}

export default Credit;




// import { useState, useEffect, SetStateAction } from 'react';
// import Cookies from 'js-cookie';
// import { useForm } from 'react-hook-form';
// import { useAccountsBook } from '../../../context/AccounstBookContext';
// import { useProducts } from '../../../context/ProductsContext';
// import { useAsset } from '../../../context/AssetsContext';
// import { useMerchandise } from '../../../context/MerchandiseContext';
// import { useRawMaterials } from '../../../context/RawMaterialContext';
// import { useServices } from '../../../context/ServiceContext';
// import { IAccountsBook } from "../../../types/accountsBook.types";
// import SearchSupplierCrm from '../SearchSupplierCrm';
// import styles from '../../../pages/07 AccountsBook/styles.module.css';

// interface BuyOnCreditProps {
//     selectedBranch: string;
//     defaultDates: boolean;
//     onCreateComplete: () => void;
// }

// function BuyOnCredit ({ selectedBranch, defaultDates, onCreateComplete }: BuyOnCreditProps) {
//     const token = Cookies.get("token") || '';
//     const { postAccountsBook, accountsBookErrors } = useAccountsBook();
//     const { assetsBranch, getAssetsBranch } = useAsset();
//     const { merchandisesBranch, getMerchandisesBranch } = useMerchandise();
//     const { productsBranch, getProductsBranch } = useProducts();
//     const { rawMaterialsBranch, getRawMaterialsBranch } = useRawMaterials();
//     const { servicesBranch, getServicesBranch } = useServices();

//     const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAccountsBook>();
//     const [ formSubmitted, setFormSubmitted ] = useState(false);

//     //Setea el cliente cuando se busca o se crea
//     const [ selectedClient, setSelectedClient ] = useState<string | null>(null);

//     const [ nameItem, setNameItem ] = useState('');

//     //Selección de la tabla que se consultará para renderizar los activos, mercancías, etc que se compraron a crédito
//     const [ typeExpenses, setTypeExpenses ] = useState('');
//     const handleTypeExpenses = (event: { target: { value: SetStateAction<string> }}) => {
//         setTypeExpenses(event.target.value);
//     };

//     //Hace la petición get a la base de datos cuando se selecciona Equipos, Mercancía, MP, etc
//     useEffect(() => {
//         if (typeExpenses === 'Activo') {
//             getAssetsBranch(selectedBranch, token);
//         }
//         if (typeExpenses === 'Mercancía') {
//             getMerchandisesBranch(selectedBranch, token);
//         }
//         if (typeExpenses === 'Producto') {
//             getProductsBranch(selectedBranch, token);
//         }
//         if (typeExpenses === 'Materia Prima') {
//             getRawMaterialsBranch(selectedBranch, token);
//         }
//         if (typeExpenses === 'Servicio') {
//             getServicesBranch(selectedBranch, token);
//         }
//     }, [ typeExpenses, token ]);    

//     //Muestra los nombre de los registros
//     const getItemInfoTableChange = () => {
//         switch (typeExpenses) {
//             case 'Activo':
//                 return { labelTableChange: 'el activo', dataTableChange: assetsBranch };
//             case 'Mercancía':
//                 return { labelTableChange: 'la mercancía', dataTableChange: merchandisesBranch };
//             case 'Producto':
//                 return { labelTableChange: 'el producto', dataTableChange: productsBranch };
//             case 'Materia Prima':
//                 return { labelTableChange: 'la materia prima', dataTableChange: rawMaterialsBranch };
//             case 'Servicio':
//                 return { labelTableChange: 'el servicio', dataTableChange: servicesBranch };
//             default:
//                 return { labelTableChange: '', dataTableChange: [] };
//         }
//     };
//     const { labelTableChange, dataTableChange } = getItemInfoTableChange();

//     //Setea el valor unitario de la compra
//     const [ unitValue, setUnitValue ] = useState<number>(0);
//     const handleUnitValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newUnitValue = parseFloat(event.target.value);
//         setUnitValue(newUnitValue);
//         setValue('unitValue', newUnitValue);
//     };

//     //Setea la cantidad de unidades de la compra
//     const [ quantity, setQuantity ] = useState<number>(0);
//     const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newQuantity = parseFloat(event.target.value);
//         setQuantity(newQuantity);
//         setValue('quantity', newQuantity);
//     };

//     //Setea el valor total de la compra
//     const [ totalValue, setTotalValue ] = useState<number | undefined>(0);
//     useEffect(() => {
//         if (!isNaN(unitValue) && !isNaN(quantity)) {
//             const total = unitValue * quantity;
//             setTotalValue(total);
//             setValue('totalValue', total);
//         }
//     }, [ unitValue, quantity ]);

//     //Setea la cantidad de cuotas
//     const [ numberOfPayments, setNumberOfPayments ] = useState<number>(0);
//     const handleNumberOfPaymentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newUnitValue = parseFloat(event.target.value);
//         setNumberOfPayments(newUnitValue);
//     };

//     //Setea si es con interés o no
//     const [ creditWithInterest, setCreditWithInterest ] = useState<'No' | 'Si'>('No');
//     const handleCreditWithInterest = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const newCreditWithInterest = event.target.value as 'No' | 'Si';
//         setCreditWithInterest(newCreditWithInterest);
//         setValue('creditWithInterest', newCreditWithInterest);
//         setInterestRateChange(0);
//     };

//     //Setea la tasa de interés de la venta a cuotas
//     const [ interestRateChange, setInterestRateChange ] = useState<number>(0);
//     const handleInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const interestRate = parseFloat(event.target.value);
//         setInterestRateChange(interestRate);
//     };

//     //Setea el valor de la cuota
//     const [ paymentValue, setPaymentValue ] = useState<number | undefined>(0);

//     //Calcula el valor de la cuota con o sin interés
//     useEffect(() => {
//         if (totalValue !== undefined && numberOfPayments !== 0) {
//           if (interestRateChange !== 0) {
//                 // Calcula la cuota con interés
//                 const cuotaSinInteres = totalValue / numberOfPayments;
        
//                 // Calcula la tasa de interés mensual
//                 const tasaInteresMensual = interestRateChange / 100 / 12;
        
//                 // Calcula el interés acumulado sobre el monto total adeudado
//                 let saldoRestante = totalValue;
//                 let cuotaConInteres = 0;
        
//                 for (let i = 0; i < numberOfPayments; i++) {
//                     const interesMensual = saldoRestante * tasaInteresMensual;
            
//                     // Calcula la cuota con interés y amortización
//                     cuotaConInteres = cuotaSinInteres + interesMensual;
//                     saldoRestante -= cuotaSinInteres; // Resta la parte que corresponde a la amortización
//                 }
        
//                 setPaymentValue(cuotaConInteres);
//             } else {
//                 // Lógica cuando no hay interés (puedes personalizar esto según tus necesidades)
//                 const cuotaSinInteres = totalValue / numberOfPayments;
//                 setPaymentValue(cuotaSinInteres);
//             }
//         }
//     }, [totalValue, numberOfPayments, interestRateChange]);

//     const onSubmit = async (values: IAccountsBook) => {
//         try {
//             const accountBookData = {
//                 ...values,
//                 branchId: selectedBranch,
//                 transactionType: "Gasto",
//                 creditCash: "Crédito",
//                 pay: "No",
//                 nameItem,
//                 paymentValue,
//                 accountsReceivable: totalValue,
//                 transactionCounterpartId: selectedClient,
//             } as IAccountsBook;
//             if (defaultDates) {
//                 accountBookData.registrationDate = new Date();
//                 accountBookData.transactionDate = new Date();
//             }
//             if (typeExpenses === 'Crédito del banco' || typeExpenses === 'Crédito en Cooperativa' || typeExpenses === 'Gota gota' || typeExpenses === 'Crédito de almacén' || typeExpenses === 'Crédito de servicios públicos') {
//                 accountBookData.incomeCategory = 'Crédito del banco';
//                 accountBookData.unitValue = accountBookData.totalValue;
//             }
//             console.log('Crédito: ', accountBookData);
//             await postAccountsBook(accountBookData, token);
//             setFormSubmitted(true);
//             onCreateComplete();
//             setTimeout(() => {
//                 setFormSubmitted(false);
//             }, 1500);
//         } catch (error) {
//             throw new Error(`Error en el envío del formulario: ${error}`);
//         }
//     };


//     return (
//         <div>
//             <h2 className="text-primary-emphasis text-center">Compra a crédito</h2>
//             {formSubmitted && (
//                 <div className='alert alert-success'>El formulario se ha enviado con éxito</div>
//             )}
//             {accountsBookErrors.map((error, i) => (
//                 <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{error}</div>
//             ))}
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                     <div className="px-3">
//                         <p className={`${styles.text} mb-0 p-2`}>¿Qué compraste, gastaste o pagaste o por qué salió dinero de tu negocio?</p>
//                     </div>
//                     <div>
//                         <select
//                             {...register('typeExpenses', { required: true })}
//                             className={`${styles.info} p-2 border rounded border-secundary`}
//                             onChange={handleTypeExpenses}
//                         >
//                             <option value=''>Selecciona un rubro</option>
//                             <optgroup label="Compras o gastos de tu negocio">
//                                 <option value='Materia Prima'>Materias Primas</option>
//                                 <option value='Mercancía'>Mercancía</option>
//                                 <option value='Activo'>Equipos, herramientas y maquinaría</option>
//                                 <option value='Arriendo'>Arriendo</option>
//                                 <option value='Mantenimiento de equipos, maquinaria, herramientas'>Mantenimiento de equipos, maquinaria, herramientas</option>
//                                 <option value='Reparaciones locativas'>Reparaciones locativas</option>
//                                 <option value='Transporte'>Transporte</option>
//                                 <option value='Combustible'>Combustible</option>
//                             </optgroup>
//                             <optgroup label="Pagos de nómina">
//                                 <option value='Nómina'>Nómina</option>
//                                 <option value='Seguridad Social y/o parafiscales'>Seguridad Social y/o parafiscales</option>
//                             </optgroup>
//                             <optgroup label="Servicios Públicos">
//                                 <option value='Acueducto'>Acueducto</option>
//                                 <option value='Energía'>Energía</option>
//                                 <option value='Gas'>Gas</option>
//                                 <option value='Internet'>Internet</option>
//                                 <option value='Celular/Plan de datos'>Celular/Plan de datos</option>
//                             </optgroup>
//                             <optgroup label="Obligaciones financieras">
//                                 <option value='Crédito del banco'>Crédito del banco</option>
//                                 <option value='CooperativeCredit'>Crédito de la cooperativa</option>
//                                 <option value='LoanShark'>Gota gota</option>
//                                 <option value='WarehouseCredit'>Créditos en almacenes</option>
//                                 <option value='PublicUtilitiesCredit'>Créditos en servicios públicos</option>
//                             </optgroup>
//                             <optgroup label="Impuestos">
//                                 <option value='IVA'>IVA</option>
//                                 <option value='ICA'>ICA</option>
//                                 <option value='Declaración de Renta'>Declaración de Renta</option>
//                                 <option value='Retención en la Fuente'>Retención en la Fuente</option>
//                                 <option value='Predial'>Predial</option>
//                                 <option value='Vehículos y motos'>Vehículos y motos</option>
//                             </optgroup>
//                             <optgroup label="Otros gastos">
//                                 <option value='Asesoría Contable'>Asesoría Contable</option>
//                                 <option value='Renovación Cámara de Comercio'>Renovación Cámara de Comercio</option>
//                                 <option value='Licencias y permisos'>Licencias y permisos</option>
//                                 <option value='Asesoría Jurídica'>Asesoría Jurídica</option>
//                                 <option value='Honorarios de contratista'>Honorarios de contratista</option>
//                                 <option value='Honorarios de contratista'>Honorarios de contratista</option>
//                             </optgroup>
//                             <optgroup label="Otro">
//                                 <option value='Otro'>Otro</option>
//                             </optgroup>
//                         </select>
//                         {errors.typeExpenses && (
//                             <p className='text-danger'>El rubro es requerido</p>
//                         )}
//                     </div>
//                 </div>

//                 {(typeExpenses === 'Activo' || typeExpenses === 'Mercancía' || typeExpenses === 'Producto' || typeExpenses === 'Materia Prima' || typeExpenses === 'Servicio') && (
//                     <div className="mb-3 p-2 d-flex flex-column align-items-center justify-content-center border rounded">
//                         <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                             <div className="px-3">
//                                 <p className={`${styles.text} mb-0 p-2`}>Escoge {labelTableChange} que compraste</p>
//                             </div>
//                             <div>
//                                 <select
//                                     {...register('itemId', { required: true })}
//                                     className={`${styles.info} p-2 border rounded border-secundary`}
//                                     onChange={(e) => {
//                                         const selectedId = e.target.value;
//                                         const selectedItem = dataTableChange?.find((item) => item.id === selectedId);
//                                         setNameItem(selectedItem?.nameItem || '');
//                                     }}
//                                 >
//                                     <option value='Otro'>Otro</option>
//                                     {dataTableChange && dataTableChange.map((item, index) => (
//                                         <option key={index} value={item.id}>
//                                             {item.nameItem}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 {errors.itemId && (
//                                     <p className='text-danger'>El nombre de lo que compraste es requerido</p>
//                                 )}
//                             </div>
//                         </div>

//                     </div>
//                 )}

//                 <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                     <div className="px-3">
//                         <p className={`${styles.text} mb-0 p-2`}>Describe tu crédito</p>
//                     </div>
//                     <div>
//                         <input
//                             type="text"
//                             {...register('creditDescription', { required: 'La descripción del crédito es requerida' })}
//                             className={`${styles.info} p-2 border rounded border-secundary`}
//                             placeholder='Describe tu crédito: Venta de arroz a don Lucho'
//                         />
//                         {errors.seller && (
//                             <div className='invalid-feedback'>{errors.seller.message}</div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                     <div className="px-3">
//                         <p className={`${styles.text} mb-0 p-2`}>Valor unitario de lo que compraste</p>
//                     </div>
//                     <div>
//                         <input
//                             type="number"
//                             {...register('unitValue', { required: 'El valor unitario es requerido', setValueAs: (value) => parseFloat(value) })}
//                             className={`${styles.info} p-2 border rounded border-secundary text-end`}
//                             placeholder='Valor unitario'
//                             onChange={handleUnitValueChange}
//                             min={0}
//                         />
//                         {errors.unitValue && (
//                             <p className='text-danger'>{errors.unitValue.message}</p>
//                         )}
//                     </div>
//                 </div>

//                 <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                     <div className="px-3">
//                         <p className={`${styles.text} mb-0 p-2`}>Cantidad de lo que compraste</p>
//                     </div>
//                     <div>
//                         <input
//                             type="number"
//                             {...register('quantity', { required: 'La cantidad comprada es requerida', setValueAs: (value) => parseFloat(value) })}
//                             className={`${styles.info} p-2 border rounded border-secundary text-end`}
//                             placeholder='Cantidad'
//                             inputMode="numeric"
//                             onChange={handleQuantityChange}
//                             min={0}
//                         />
//                         {errors.quantity && (
//                             <p className='invalid-feedback'>{errors.quantity.message}</p>
//                         )}
//                     </div>
//                 </div>

//                 <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                     <div className="px-3">
//                         <p className={`${styles.text} mb-0 p-2`}>Valor total de la compra</p>
//                     </div>
//                     <div>
//                         <input
//                             type="number"
//                             {...register('totalValue', { required: 'El valor total de la compra es requerido', setValueAs: (value) => parseFloat(value) })}
//                             className={`${styles.info} p-2 border rounded border-secundary text-end`}
//                             placeholder='Valor total'
//                             inputMode="numeric"
//                             readOnly
//                             min={0}
//                             value={totalValue}
//                         />
//                         {errors.totalValue && (
//                             <p className='invalid-feedback'>{errors.totalValue.message}</p>
//                         )}
//                     </div>
//                 </div>

//                 <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                     <div className="px-3">
//                         <p className={`${styles.text} mb-0 p-2`}>¿A cuántas cuotas vas a pagar?</p>
//                     </div>
//                     <div>
//                         <input
//                             type="number"
//                             {...register('numberOfPayments', { setValueAs: (value) => parseFloat(value) })}
//                             className={`${styles.info} p-2 border rounded border-secundary text-end`}
//                             placeholder='Número de cuotas'
//                             inputMode="numeric"
//                             onChange={handleNumberOfPaymentsChange}
//                             min={0}
//                         />
//                         {errors.numberOfPayments && (
//                             <div className='invalid-feedback'>{errors.numberOfPayments.message}</div>
//                         )}
//                     </div>
//                 </div>

//                 <div className='d-flex'>
//                     <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded" style={{ width: "430px", marginRight: "40px"}}>
//                         <div className="px-3">
//                             <p className={`${styles.text} mb-0 p-2`} style={{ width: "160px" }}>¿Es con interés?</p>
//                         </div>
//                         <div>
//                             <select
//                                 {...register('creditWithInterest', { required: true })}
//                                 className={`${styles.info} p-2 border rounded border-secundary`}
//                                 value={creditWithInterest}
//                                 onChange={handleCreditWithInterest}
//                                 style={{ width: "230px" }}
//                             >
//                                 <option value='Si'>Si</option>
//                                 <option value='No'>No</option>
//                             </select>
//                             {errors.creditWithInterest && (
//                                 <p className='text-danger'>El dato es requerido</p>
//                             )}
//                         </div>
//                     </div>

//                     {creditWithInterest === 'Si' && (
//                         <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded" style={{ width: "430px" }}>
//                             <div className="px-3">
//                                 <p className={`${styles.text} mb-0 p-2`} style={{ width: "160px" }}>Tasa de interés</p>
//                             </div>
//                             <div>
//                                 <input
//                                     type="number"
//                                     {...register('creditInterestRate', { setValueAs: (value) => parseFloat(value) })}
//                                     className={`${styles.info} p-2 border rounded border-secundary text-end`}
//                                     placeholder='5'
//                                     inputMode="numeric"
//                                     style={{ width: "230px" }}
//                                     onChange={handleInterestRateChange}
//                                     min={0}
//                                 />
//                                 {errors.creditInterestRate && (
//                                     <div className='invalid-feedback'>{errors.creditInterestRate.message}</div>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                     <div className="px-3">
//                         <p className={`${styles.text} mb-0 p-2`}>Valor de cada una de las cuotas</p>
//                     </div>
//                     <div>
//                         <input
//                             type="number"
//                             {...register('paymentValue', { setValueAs: (value) => parseFloat(value) })}
//                             className={`${styles.info} p-2 border rounded border-secundary text-end`}
//                             placeholder='Valor de cada cuota'
//                             inputMode="numeric"
//                             readOnly
//                             value={paymentValue}
//                             min={0}
//                         />
//                         {errors.paymentValue && (
//                             <div className='invalid-feedback'>{errors.paymentValue.message}</div>
//                         )}
//                     </div>
//                 </div>

//                 <SearchSupplierCrm
//                     typeExpenses={typeExpenses}
//                     onClientSelect={(client) => setSelectedClient(client)}
//                 />

//                 <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
//                     <div className="px-3">
//                         <p className={`${styles.text} mb-0 p-2`}>Vendedor(a)</p>
//                     </div>
//                     <div>
//                         <input
//                             type="text"
//                             {...register('seller', { required: 'El vendedor es requerido' })}
//                             className={`${styles.info} p-2 border rounded border-secundary`}
//                             placeholder='Nombre del vendedor'
//                             />
//                         {errors.seller && (
//                             <div className='invalid-feedback'>{errors.seller.message}</div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="d-flex">
//                     <button className={`${styles.buttonSubmit} m-auto border-0 rounded text-decoration-none`} type='submit' >Enviar</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default BuyOnCredit;