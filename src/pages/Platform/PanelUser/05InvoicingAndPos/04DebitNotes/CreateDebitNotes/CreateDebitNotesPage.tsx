/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { useForm, useFieldArray } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import { getProfileUser } from '../../../../../../redux/User/userSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../../../types/User/branch.types';
import { ICrmClient } from '../../../../../../types/User/crmClient.types';
import { IAssets } from "../../../../../../types/User/assets.types";
import { IMerchandise } from "../../../../../../types/User/merchandise.types";
import { IProduct } from "../../../../../../types/User/products.types";
import { IRawMaterial } from "../../../../../../types/User/rawMaterial.types";
import { IService } from "../../../../../../types/User/services.types";
import SearchClientCrm from '../../../../../../helpers/SearchClientCrm/SearchClientCrm';
import SearchItems from '../../../../../../helpers/SearchItems/SearchItems';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import { IoMdSettings } from "react-icons/io";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import styles from './styles.module.css';

function CreateDebitNotesPage() {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    // Estado de Redux
    const branches = useSelector((state: RootState) => state.branch.branch);
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getProfileUser(token));
        }
    }, [token, dispatch]);

    const navigate = useNavigate();
    const { handleSubmit, reset, control } = useForm<any>();
    // const { register, handleSubmit, reset, control } = useForm<any>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'retentions',
    });

    // Selecciona el cliente al que se le vende
    const [idSelectedClient, setIdSelectedClient] = useState<number | null>(null);
    const [selectedClient, setSelectedClient] = useState<ICrmClient | null>(null);
    
    // Estados para las fechas de registro y transacción
    const [registrationDate, setRegistrationDate] = useState<Date>();
    
    // Selecciona el artículo que se agrega
    const [idSelectedItem, setIdSelectedItem] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<IAssets | IMerchandise | IProduct | IRawMaterial | IService | null>(null);
    console.log('idSelectedItem: ', idSelectedItem)
    console.log('selectedItem: ', selectedItem)

    const [sellingPrice, setSellingPrice] = useState('');
    useEffect(() => {
        if (selectedItem?.sellingPrice) {
            setSellingPrice(formatNumber(selectedItem.sellingPrice));
        }
    }, [selectedItem]);
    const handleInputChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        // Validar que el valor sea un número válido
        if (!isNaN(value) && value >= 0) {
            setSellingPrice(value);
        }
    };

    // Setea la cantidad
    const [quantity, setQuantity] = useState<number | null>(null);
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Convierte el valor del input a número y actualiza el estado
        const value = e.target.value;
        // Verifica que el valor sea un número válido
        if (!isNaN(parseFloat(value)) && isFinite(parseFloat(value))) {
            setQuantity(parseFloat(value));
        } else {
            setQuantity(null);
        }
    };

    // Calcula el subtotal de cada artículo
    const subTtotal = quantity !== null && selectedItem?.sellingPrice ? quantity * selectedItem.sellingPrice : 0;

    const onSubmit = async (values: any) => {
        try {
            const formData = {
                ...values,
                // retentions: values.retentions?.map(retention => ({
                //     ...retention,
                //     retentionPercentageFeesConsulting: retention.retentionPercentageFeesConsulting || 0
                // }))
            } as any;
            console.log('formData: ', formData)
            // await dispatch(postMerchandise(formData, token));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                // dispatch(getMerchandises(token));
                setFormSubmitted(false);
                setShouldNavigate(true);
            }, 1500);
        } catch (error) {
            console.error('Error en el envío del formulario', error);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-merchandises');
        }
    }, [shouldNavigate, navigate]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus notas débito</h1>

                        <Link to='/debit-notes/consult-debit-notes' className={`${styles.link__Back} border-0 text-decoration-none`}>Consulta tus notas débito</Link>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}

                            <div className={`${styles.container__Debit_Note} mt-4 mb-5 p-4 d-flex flex-column align-items-center justify-content-center`}>
                                <div className={`${styles.container__Header_Debit_Note} mt-4 pb-4 d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.container__Logo} d-flex align-items-center justify-content-center`}>
                                        <img src={user?.logo} alt="Logo" className={`${styles.logo__User} `}/>
                                    </div>
                                    <div className={`${styles.container__Info_User} d-flex flex-column align-items-center justify-content-center`}>
                                        <h4 className={`${styles.name__User} m-0`}>
                                            {user?.name && user?.lastName
                                                ? `${String(user?.name).toUpperCase()} ${String(user?.lastName).toUpperCase()}`
                                                : String(user?.corporateName).toUpperCase()}
                                        </h4>
                                        <div className={`${styles.container__Identification} d-flex gap-1`}>
                                            <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'NIT' && ('NIT:')}</p>
                                            <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'Cedula de Ciudadania' && ('CC:')}</p>
                                            <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'Cedula de Extranjeria' && ('CE:')}</p>
                                            <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'Pasaporte' && ('PS:')}</p>
                                            <p className={`${styles.document__Id} m-0`}>{user?.documentId}</p>
                                        </div>
                                        <p className={`${styles.email} m-0`}>{user?.email}</p>
                                    </div>
                                    <div className={`${styles.container__Number_Debit_Note} d-flex`}>
                                        <span className={`${styles.numerator} d-flex align-items-center justify-content-center`}>No.</span>
                                        <div className={`${styles.invoice__Number} p-2 d-flex align-items-center justify-content-start`}>1</div>
                                        {/* <p>El número de la factura es el que la Dian le dió al cliente (CUDE)</p> */}
                                        <div className={`${styles.container__Icon_setting} d-flex align-items-center justify-content-center`}>
                                            <IoMdSettings className={`${styles.icon__Setting} `}/>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.container__Dates_Client} pt-4 pb-4 d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.dates__Client} `}>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Cliente</p>
                                            <SearchClientCrm
                                                token={token}
                                                onClientSelect={(client) => setIdSelectedClient(client)}
                                                onDataClientSelect={(client) => setSelectedClient(client)}
                                            />
                                        </div>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Identificación</p>
                                            <div className={`${styles.data} px-3 d-flex align-items-center justify-content-start`}>{idSelectedClient}</div>
                                        </div>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Teléfono</p>
                                            <div className={`${styles.data} px-3 d-flex align-items-center justify-content-start`}>{selectedClient?.phone}</div>
                                        </div>
                                        <div className={`${styles.container__Info_Reason} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label__Reason} m-0 d-flex align-items-center justify-content-end`}>Razón</p>{/* TOOLTIP RAZON QUE JUSTIFICA LA CREACION DE LA NOTA DEBITO DEL CLIENTE */}
                                            <textarea name="" id="" className={`${styles.textarea} p-3`}></textarea>
                                        </div>
                                    </div>

                                    <div className={`${styles.dates__Debit_Note} `}>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Fecha</p>{/* TOOLTIP FECHA EN LA QUE SE EMITE LA FACTURA */}
                                            <DatePicker
                                                selected={registrationDate || undefined}
                                                onChange={(date) => setRegistrationDate(date || undefined)}
                                                className={`${styles.calendar} p-2 border`}
                                                dayClassName={(date) =>
                                                    date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                                }
                                                placeholderText='Fecha de registro'
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </div>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Factura</p>
                                            <div className={`${styles.data} px-3 d-flex align-items-center justify-content-start`}>
                                                Hacer ruta del back para traer el # de factura
                                            </div>
                                        </div>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Tipo</p>
                                            <select
                                                className={`${styles.select} px-3 d-flex align-items-center justify-content-start`}
                                            >
                                                <option value="">Cobro de intereses</option>
                                                <option value="">Gastos por cobrar</option>
                                                <option value="">Cambio de valor</option>
                                                <option value="">Otros</option>
                                            </select>
                                        </div>
                                        <div className={`${styles.container__Info_Reason} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label__Reason} m-0 d-flex align-items-center justify-content-end`}>Notas</p>
                                            <textarea name="" id="" className={`${styles.textarea} p-3`}></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                                    <div className={styles.container__Head}>
                                        <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                            <div className={`${styles.branch} d-flex align-items-center justify-content-center text-center`}>Sede</div>
                                            <div className={`${styles.name__Item} d-flex align-items-center justify-content-center text-center`}>Item</div>
                                            {/* <div className={`${styles.reference} d-flex align-items-center justify-content-center text-center`}>Referencia</div> */}
                                            <div className={`${styles.selling__Price} d-flex align-items-center justify-content-center text-center`}>Precio</div>
                                            <div className={`${styles.discount__Percentage} d-flex align-items-center justify-content-center text-center`}>Desc %</div>
                                            <div className={`${styles.tax} d-flex align-items-center justify-content-center text-center`}>Impuesto</div>
                                            {/* <div className={`${styles.description__Note} d-flex align-items-center justify-content-center text-center`}>Descripción</div> */}
                                            <div className={`${styles.quantity} d-flex align-items-center justify-content-center text-center`}>Cantidad</div>
                                            <div className={`${styles.total} d-flex align-items-center justify-content-center text-center`}>Subtotal</div>
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</div>
                                        </div>
                                    </div>
                                    
                                    <div className={`${styles.container__Body} `}>
                                        {Array.isArray(fields) && fields.length > 0 ? (
                                            fields.map((field, index) => (
                                                <div key={field.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                                    <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                        <select
                                                            className={`${styles.input} p-2 border-0`}
                                                        >
                                                            {Array.isArray(branches) && branches.map((branch: IBranch, index: number) => (
                                                                <option key={index} value={branch.id}>
                                                                    {branch.nameBranch}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className={`${styles.name__Item} d-flex align-items-center justify-content-center text-center`}>
                                                        <SearchItems
                                                            token={token}
                                                            onItemSelect={(item) => setIdSelectedItem(item)}
                                                            onDataItemSelect={(item) => setSelectedItem(item)}
                                                        />
                                                    </div>
                                                    {/* <div className={`${styles.reference} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} text-align-center overflow-hidden`}>Refencia</span>
                                                    </div> */}
                                                    <div className={`${styles.selling__Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <input
                                                            type="number"
                                                            className={`${styles.input} p-2 border `}
                                                            value={sellingPrice}
                                                            min={0}
                                                            onChange={handleInputChange}
                                                            onKeyDown={(e) => {
                                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.discount__Percentage} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} text-align-center overflow-hidden`}>{selectedItem?.discountPercentage ? selectedItem?.discountPercentage : 'N/A'}</span>
                                                    </div>
                                                    <div className={`${styles.tax} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <select
                                                            defaultValue={0}
                                                            className={`${styles.input} p-2 border `}
                                                        >
                                                            <optgroup label="IVA">
                                                                <option value='No aplica'>No aplica</option>
                                                                <option value={0}>IVA 0 %</option>
                                                                <option value={5}>IVA 5 %</option>
                                                                <option value={19}>IVA 19 %</option>
                                                            </optgroup>
                                                            <optgroup label="INC">
                                                                <option value={4}>INC 4 %</option>
                                                                <option value={8}>INC 8 %</option>
                                                                <option value={16}>INC 16 %</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                    {/* <div className={`${styles.description__Note} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <input
                                                            type="text"
                                                            className={`${styles.input} p-2 border `}
                                                            placeholder='Descripción'
                                                        />
                                                    </div> */}
                                                    <div className={`${styles.quantity} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <input
                                                            type="number"
                                                            className={`${styles.input} p-2 border `}
                                                            placeholder='Precio de compra de la mercancía'
                                                            min={0}
                                                            onKeyDown={(e) => {
                                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onChange={handleQuantityChange}
                                                        />
                                                    </div>
                                                    <div className={`${styles.total} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} text-align-center overflow-hidden`}>$ {formatNumber(subTtotal)}</span>
                                                    </div>
                                                    <div className={`${styles.action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete} `}
                                                            onClick={() => remove(index)}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                                No tienes artículos agregados
                                            </div>
                                        )}
                                    </div>
                                    <div className={`${styles.container__Append} mt-3 mb-3 d-flex align-items-center justify-content-between`} onClick={() => append({})}>
                                        <FaPlus className={`${styles.icon__Plus}` }/>
                                        <span>Agregar Retención</span>
                                    </div>
                                </div>

                                <div className={`${styles.container__Totals} d-flex align-items-center justify-content-between`}>
                                    <div className="d-flex"></div>
                                    <div className={`${styles.debit__Note_Total} `}>
                                        <div className={`{} `}>
                                            <div className={`${styles.container__Section_Total} d-flex`}>
                                                <span className={`${styles.title__Total} px-2 d-flex align-items-center justify-content-end`}>Subtotal</span>
                                                <div className={`${styles.total__Debit__Note} d-flex align-items-center justify-content-center`}>24.000</div>
                                            </div>
                                            <div className={`${styles.container__Section_Total} d-flex`}>
                                                <span className={`${styles.title__Total} px-2 d-flex align-items-center justify-content-end`}>Descuentos</span>
                                                <div className={`${styles.total__Debit__Note} d-flex align-items-center justify-content-center`}>2.400</div>
                                            </div>
                                        </div>
                                        <div className={`${styles.container__Section_Total} d-flex`}>
                                            <span className={`${styles.title__Total} px-2 d-flex align-items-center justify-content-end`}>Total</span>
                                            <div className={`${styles.total__Debit__Note} d-flex align-items-center justify-content-center`}>21.600</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CreateDebitNotesPage;