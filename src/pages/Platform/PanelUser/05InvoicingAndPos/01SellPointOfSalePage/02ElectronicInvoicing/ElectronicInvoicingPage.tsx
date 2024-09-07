/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { getProfileUser } from '../../../../../../redux/User/userSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../../types/User/crmClient.types';
import { IAssets } from "../../../../../../types/User/assets.types";
import { IMerchandise } from "../../../../../../types/User/merchandise.types";
import { IProduct } from "../../../../../../types/User/products.types";
import { IRawMaterial } from "../../../../../../types/User/rawMaterial.types";
import { IService } from "../../../../../../types/User/services.types";
import SearchItemsByname from '../../../../../../helpers/SearchItemName/SearchItemsByname';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import SearchClientCrm from '../../../../../../helpers/SearchClientCrm/SearchClientCrm';
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa";
import styles from './styles.module.css';

function ElectronicInvoicingPage() {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const user = useSelector((state: RootState) => state.user.user);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
            dispatch(getBranches(token))
        }
    }, [token]);

    //Selección de la sede
    const [selectedBranch, setSelectedBranch] = useState('');

    // Setea la sede escogida
    const handleBranchChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedBranch(value);
    };
    
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    // Selecciona el cliente al que se le vende
    const [selectedClient, setSelectedClient] = useState<ICrmClient | null>(null);
    
    // useEffect para establecer la fecha actual
    const [currentDate, setCurrentDate] = useState<Date>();
    useEffect(() => {
        const currentDate = new Date();
        setCurrentDate(currentDate);
    }, []);
    
    const [rows, setRows] = useState<Array<{
        id: number | null;
        item: IAssets | IMerchandise | IProduct | IRawMaterial | IService | null;
        quantity: number | null;
        // sellingPrice: number | null;
        discountPercentage: number | null;
    }>>([]);

    const addRow = () => {
        setRows(prevRows => [
            ...prevRows,
            { id: null, item: null, sellingPrice: null, quantity: null, discountPercentage: null }
        ]);
    };

    // Setea el porcentaje de descuento que deseo darle al cliente   
    // const calculateDiscount = (quantity: number | null | undefined, price: number | null | undefined, discountPercentage: number | null | undefined): number => {
    //     if (quantity == null || price == null || discountPercentage == null) return 0;
    //     return ((quantity * price) / 100) * discountPercentage;
    // };
    const calculateDiscount = (quantity: number | null, sellingPrice: number | null, discountPercentage: number | null): number => {
        if (quantity && sellingPrice !== null && discountPercentage !== null) {
            const discountValue = (sellingPrice * discountPercentage / 100) * quantity;
            return discountValue;
        }
        return 0;
    };

    const onSubmit = async (values: any) => {
        try {
            const formData = {
                ...values,
            } as any;
            console.log('formData: ', formData)
            setTimeout(() => {
                setShouldNavigate(true);
            }, 1500);
        } catch (error) {
            throw new Error(`Error en el envío del formulario: ${error}`);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/invoicing-and-pos/see-electronic-invoicing-pos');
        }
    }, [shouldNavigate, navigate]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <div className="d-flex align-items-center justify-content-between">
                            <h1 className={`${styles.title} mb-4 mt-4`}>Facturación</h1>
                            <div className={styles.link__Head_Navigate}>
                                <LiaFileInvoiceSolid className={`${styles.icon__Plus} `}/>
                                <Link to='/invoicing-and-pos/pos' className={`${styles.link} text-decoration-none`}>POS</Link>
                            </div>
                        </div>

                        <div className="p-2 border">
                            <select
                                className={`${styles.select__Branch} p-1 text-center border-0`}
                                value={selectedBranch}
                                onChange={handleBranchChange}
                            >
                                <option value=''>Selecciona una Sede</option>
                                {Array.isArray(branches) && branches.map((branch, index) => (
                                    <option key={index} value={branch.id}>
                                        {branch.nameBranch}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <form onSubmit={onSubmit} className={`${styles.form} position-relative`}>
                            <div className={`${styles.container__Invoice} mt-4 mb-5 px-4 d-flex flex-column align-items-center justify-content-center`}>
                                <div className={`${styles.container__Header} mt-4 d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.container__Logo} d-flex align-items-center justify-content-center`}>
                                        <img src={user?.logo} alt="Logo" className={`${styles.logo} `}/>
                                    </div>
                                    <div className={`d-flex flex-column align-items-center justify-content-center`}>
                                        <h4 className='text-center m-0'>Factura de venta N°</h4>
                                        <h4 className='text-center m-0'>9593122DFDF-1</h4>
                                        <h4 className='text-center m-0'>FECHA: {currentDate  && currentDate.toLocaleDateString()}</h4>
                                        <h4 className='text-center m-0'>FECHA DE VENCIMIENTO:</h4>
                                        <div className={`${styles.container__Calendars} d-flex align-items-center justify-content-between gap-4`}>
                                            <div className="d-flex flex-column align-items-start justify-content-center">
                                                <DatePicker
                                                    selected={currentDate || undefined}
                                                    onChange={(date) => setCurrentDate(date || undefined)}
                                                    className={`${styles.input} p-2 border text-center`}
                                                    calendarClassName={styles.custom__Calendar}
                                                    dayClassName={(date) =>
                                                        date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                                    }
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.container__Qr_Invoicing} d-flex align-items-center justify-content-center`}>
                                        <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/1200px-Codigo_QR.svg.png'} alt="Logo" className={`${styles.qr__Code} `}/>
                                    </div>
                                </div>

                                <div className={`${styles.container__Dates} mb-4 P-2 d-flex`}>
                                    <div className={`${styles.container__Issuer_Data} `}>
                                        <div className={`${styles.title__Section} px-2 d-flex align-items-center justify-content-start`}>Datos del Emisor</div>
                                        <div className="px-2">
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Razón social/Nombre</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.name ? `${user.name} ${user.lastName}` : user?.corporateName}</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>NIT/CC</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.verificationDigit ? `${user.documentId}-${user.verificationDigit}` : user?.documentId}</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Dirección</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.address}</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Teléfono</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.container__Issuer_Data}>
                                        <div className={`${styles.title__Section} px-2 d-flex align-items-center justify-content-start`}>Datos del Adquiriente</div>
                                        <div className="px-2">
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>NIT/CC</h4>
                                                <div>
                                                    <SearchClientCrm
                                                        token={token}
                                                        onDataClientSelect={(client) => setSelectedClient(client)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Razón social/Nombre</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>
                                                    {selectedClient?.name ? `${selectedClient?.name} ${selectedClient.lastName}` : selectedClient?.corporateName || 'No asignado aún'}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Dirección</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{selectedClient?.address ? selectedClient?.address : 'No asignada aún'}</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Teléfono</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{selectedClient?.phone ? selectedClient?.phone : 'No asignado aún'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`${styles.container__Table} mt-2 mb-4 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                                    <div className={`${styles.container__Head} `}>
                                        <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                            <div className={`${styles.number} d-flex align-items-center justify-content-center text-center`}>#</div>
                                            <div className={`${styles.code} d-flex align-items-center justify-content-center text-center`}>Código</div>
                                            <div className={`${styles.product__Service} d-flex align-items-center justify-content-center text-center`}>Producto/Servicio</div>
                                            <div className={`${styles.unit__Value} d-flex align-items-center justify-content-center text-center`}>Valor Unitario</div>
                                            <div className={`${styles.quantity} d-flex align-items-center justify-content-center text-center`}>Cant.</div>
                                            <div className={`${styles.discount} d-flex align-items-center justify-content-center text-center`}>Descuento</div>
                                            <div className={`${styles.discount__Value} d-flex align-items-center justify-content-center text-center`}>Valor Descuento</div>
                                            <div className={`${styles.total__Value} d-flex align-items-center justify-content-center text-center`}>Subotal</div>
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}></div>
                                        </div>
                                    </div>

                                    <div className={`${styles.container__Body} `}>
                                        {Array.isArray(rows) && rows.length > 0 ? (
                                            rows.map((row, index) => (
                                                <div key={index} className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                                    <div className={`${styles.number} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{index + 1}</span>
                                                    </div>
                                                    <div className={`${styles.code} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center`}>
                                                        <SearchItemsByname
                                                            selectedBranch={selectedBranch}
                                                            token={token}
                                                            onItemSelect={() => {
                                                                const updatedRows = [...rows];
                                                                updatedRows[index] = { ...updatedRows[index] };
                                                                setRows(updatedRows);
                                                            }}
                                                            onDataItemSelect={(item) => {
                                                                const updatedRows = [...rows];
                                                                updatedRows[index] = { ...updatedRows[index], item };
                                                                setRows(updatedRows);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.product__Service} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{row.item?.nameItem}</span>
                                                    </div>
                                                    <div className={`${styles.unit__Value} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <input
                                                            type="number"
                                                            className={`${styles.quantity__Quantity} p-2 border`}
                                                            value={row.item?.sellingPrice}
                                                            min={0}
                                                        />
                                                    </div>
                                                    <div className={`${styles.quantity} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <input
                                                            type="number"
                                                            className={`${styles.quantity__Quantity} p-2 border`}
                                                            placeholder='Cantidad'
                                                            min={0}
                                                            value={row.quantity || ''}
                                                            onChange={(e) => {
                                                                const value = parseFloat(e.target.value);
                                                                const updatedRows = [...rows];
                                                                updatedRows[index] = { ...updatedRows[index], quantity: value };
                                                                setRows(updatedRows);
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.discount} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <input
                                                            type="number"
                                                            className={`${styles.quantity__Quantity} p-2 border`}
                                                            placeholder='Descuento'
                                                            min={0}
                                                            value={row.discountPercentage ?? ''}
                                                            onChange={(e) => {
                                                                const value = parseFloat(e.target.value);
                                                                const updatedRows = [...rows];
                                                                updatedRows[index] = { ...updatedRows[index], discountPercentage: value };
                                                                setRows(updatedRows);
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.discount__Value} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                            {row.discountPercentage !== null && row.item?.sellingPrice !== undefined
                                                                ? `$ ${formatNumber(calculateDiscount(row.quantity, row.item.sellingPrice, row.discountPercentage))}`
                                                                : ''
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className={`${styles.total__Value} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} text-align-center overflow-hidden`}>$ {formatNumber((row.quantity || 1) * (row.item?.sellingPrice || 0))}</span>
                                                    </div>
                                                    <div className={`${styles.action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete}`}
                                                            onClick={() => {
                                                                const updatedRows = rows.filter((_, i) => i !== index);
                                                                setRows(updatedRows);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                                No tienes artículos registrados
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={`${styles.container__Add} mb-4 d-flex flex-column align-items-start justify-content-between gap-2`}>
                                    <div>CADA PRODUCTO SE DEBE DE AGREGAR CON CODIGO DE BARRAS O POR NOMBRE EN EL SELECT</div>
                                    <div
                                        className={`${styles.container__Append} d-flex align-items-center justify-content-between`}
                                        onClick={addRow}
                                    >
                                        <FaPlus className={`${styles.icon__Plus}`} />
                                        <span>Agregar artículo</span>
                                    </div>
                                </div>
                                
                                <div className={`${styles.container__Taxes_And_Values} pb-4 d-flex align-items-start justify-content-between`}>
                                    <div className={styles.container__Totales}>
                                        <div className={`${styles.title__Container_Totales} p-2 text-center`}>Totales</div>
                                        <div className={`${styles.ffffffffff} d-flex`}>
                                            <div className={styles.container__Column_Totals}>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Base antes de descuentos:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Descuentos:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Total Base Imponible:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>IVA:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Total Impuestos:</div>
                                            </div>
                                            <div className={styles.container__Values_Totals}>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>$ XXXXXXX</div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>$ XXXXXXX</div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>$ XXXXXXX</div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>$XXXXXXX</div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>XXXXXXX</div>
                                            </div>
                                        </div>
                                        <div className={`${styles.totals} px-2 d-flex align-items-center justify-content-end`}><span>Total factura:</span> XXXXXXXXXX</div>
                                        <div className={`${styles.letter__Amount} p-2 d-flex align-items-start justify-content-center`}>
                                            MONTO EN LETRAS PERO NUESTRO CLIENTE LO DEBE DE ESCRIBIR
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4 d-flex align-items-center justify-content-center">
                                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ElectronicInvoicingPage;