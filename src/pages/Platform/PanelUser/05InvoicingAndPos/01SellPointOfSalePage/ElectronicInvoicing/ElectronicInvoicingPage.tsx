/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
// import { getItemByBarCode } from '../../../../../redux/User/itemBybarCodeOrName/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import { IoIosClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import styles from './styles.module.css';

function ElectronicInvoicingPage() {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) dispatch(getBranches(token));
    }, [token]);

    const [selectedBranch, setSelectedBranch] = useState('');

    // Setea la sede escogida
    const handleBranchChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedBranch(value);
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Facturación</h1>
                        <div className={`${styles.branch} mb-1 p-3 border`}>
                            <div className="d-flex justify-content-between ">
                                <select
                                    className="border-0 p-1 text-center"
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
                        </div>

                        <div className={styles.container__aaaaaa}>
                            <div className={`${styles.container__Header} mb-4`}>
                                <div className={styles.container__Logo}>
                                    <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Exxon_Mobil_Logo.svg/2560px-Exxon_Mobil_Logo.svg.png'} alt="Logo" className={`${styles.logo} `}/>
                                </div>
                                <div className={styles.container__General_Information_Invoincing}>
                                    <div className={styles.container_Dates_Invoicing}>
                                        <h4 className='text-center m-0'>Factura de venta N° </h4>
                                        <h4 className='text-center m-0'>9593122DFDF-1</h4>
                                        <h4 className='text-center m-0'>FECHA: (Fecha de generación)</h4>
                                        <h4 className='text-center m-0'>FECHA DE VENCIMIENTO: (Fecha de vencimiento)</h4>
                                    </div>                                    
                                    <div className={styles.container_Qr_Invoicing}>
                                        <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/1200px-Codigo_QR.svg.png'} alt="Logo" className={`${styles.qr__Code} `}/>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.container__Dates_Client} mb-4`}>
                                <div className={`${styles.container__Ecopcion_User_Data} `}>
                                    <div className={styles.title__Section}>Datos del Emisor</div>
                                    <div className={styles.container__Section_aaaaa}>
                                        <h4 className={styles.aaaaaaaa}>Razón social/Nombre</h4>
                                        <p className={styles.bbbbbb}>Carlos Mario Reyes</p>
                                    </div>
                                    <div className={styles.container__Section_aaaaa}>
                                        <h4 className={styles.aaaaaaaa}>NIT/CC</h4>
                                        <p className={styles.bbbbbb}>900400200-1</p>
                                    </div>
                                    <div className={styles.container__Section_aaaaa}>
                                        <h4 className={styles.aaaaaaaa}>Dirección:</h4>
                                        <p className={styles.bbbbbb}>Cra 10 # 10 - 10</p>
                                    </div>
                                    <div className={styles.container__Section_aaaaa}>
                                        <h4 className={styles.aaaaaaaa}>Teléfono:</h4>
                                        <p className={styles.bbbbbb}>300 100 2020</p>
                                    </div>
                                </div>

                                <div className={styles.container__Ecopcion_User_Data}>
                                    <div className={styles.title__Section}>Datos del Adquiriente</div>
                                    <div className={styles.container__Section_aaaaa}>
                                        <h4 className={styles.aaaaaaaa}>Razón social/Nombre</h4>
                                        <p className={styles.bbbbbb}>Felipe Hernández</p>
                                    </div>
                                    <div className={styles.container__Section_aaaaa}>
                                        <h4 className={styles.aaaaaaaa}>NIT/CC</h4>
                                        <p className={styles.bbbbbb}>900400200-1</p>
                                    </div>
                                    <div className={styles.container__Section_aaaaa}>
                                        <h4 className={styles.aaaaaaaa}>Dirección:</h4>
                                        <p className={styles.bbbbbb}>Cra 10 # 10 - 10</p>
                                    </div>
                                    <div className={styles.container__Section_aaaaa}>
                                        <h4 className={styles.aaaaaaaa}>Teléfono:</h4>
                                        <p className={styles.bbbbbb}>300 100 2020</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={`${styles.container__Table} mb-4`}>
                                <div className={styles.contaner__Columns_Titles}>
                                    <div className={`${styles.number} `}>#</div>
                                    <div className={`${styles.code} `}>Código</div>
                                    <div className={`${styles.product__Service} `}>Producto/Servicio</div>
                                    <div className={`${styles.unit__Value} `}>Valor Unitario</div>
                                    <div className={`${styles.quantity} `}>Cant.</div>
                                    <div className={`${styles.discount} `}>Descuento</div>
                                    <div className={`${styles.discount__Value} `}>Valor Descuento</div>
                                    <div className={`${styles.total__Value} `}>Valor Total</div>
                                    <div className={`${styles.delete} `}></div>
                                </div>

                                <div className={`${styles.contaner__Columns_Titles} `} >
                                    <div className={`${styles.number} d-flex align-items-center justify-content-start`}>
                                        <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>9999</span>
                                    </div>
                                    <div className={`${styles.code} d-flex align-items-center justify-content-center`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>7701024000016</span>
                                    </div>
                                    <div className={`${styles.product__Service} d-flex align-items-center justify-content-center`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>Arroz Supremo</span>
                                    </div>
                                    <div className={`${styles.unit__Value} d-flex align-items-center justify-content-center`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ 2.100</span>
                                    </div>
                                    <div className={`${styles.quantity} d-flex align-items-center justify-content-center`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>10</span>
                                    </div>
                                    <div className={`${styles.discount} d-flex align-items-center justify-content-center`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>18%</span>
                                    </div>
                                    <div className={`${styles.discount__Value} d-flex align-items-center justify-content-center`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>$200</span>
                                    </div>
                                    <div className={`${styles.total__Value} d-flex align-items-center justify-content-center`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ 21.000</span>
                                    </div>
                                    <div className={`${styles.delete} d-flex align-items-center justify-content-center`}>
                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                            <IoIosClose
                                                // className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                // onClick={() => {
                                                //     handleDelete(branch);
                                                // }}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>CADA PRODUCTO SE DEBE DE AGREAGR CON CODIGO DE BARRAS O POR NOMBRE EN EL SELECT</div>

                            <div className={`${styles.container__Button__Add} mb-4`}>
                                <div className={styles.button__Add}>Agregar <FaPlus className={styles.icon__Add}/></div>
                            </div>
                            
                            <div className={`${styles.container__Taxes_And_Values} d-flex`}>
                                <div className={`${styles.container__Taxes}`}>
                                    <div className={styles.cccccccc}>
                                        <h4 className={styles.dddddd}>Medio de pago</h4>
                                        <div className={styles.eeeeee}>
                                            <select name="" id="">
                                                <option value="">CONTADO</option>
                                                <option value="">CREDITO</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.continer__Retention}>
                                        <div className={styles.continer__Retention_Title}>
                                            <div className={styles.retention}>Retención</div>
                                            <div className={styles.percentage__Value}>Valor Porcentual (%)</div>
                                            <div className={styles.retention__Value}>Importe</div>
                                        </div>

                                        <div className={styles.container__Retention_Values}>
                                            <div className={styles.retention__Values}>
                                                <p className={styles.title_Retention__Rows}>Retefuente</p>
                                                <div className={styles.percentage_Retention__Rows}>10%</div>
                                                <div className={styles.value_Retention__Rows}>$ 2.100</div>
                                            </div>
                                            <div className={styles.retention__Values}>
                                                <p className={styles.title_Retention__Rows}>Rete IVA</p>
                                                <div className={styles.percentage_Retention__Rows}>10%</div>
                                                <div className={styles.value_Retention__Rows}>$ 2.100</div>
                                            </div>
                                            <div className={styles.retention__Values}>
                                                <p className={styles.title_Retention__Rows}>Rete ICA</p>
                                                <div className={styles.percentage_Retention__Rows}>10%</div>
                                                <div className={styles.value_Retention__Rows}>$ 2.100</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.container__Totales}>
                                    <div className={styles.title__Container_Totales}>Totales</div>
                                    <div className={styles.ffffffffff}>
                                        <div className={styles.ggggggggg}>
                                            <p className={`${styles.hhhhhhh} m-0`}>Base antes de descuentos:</p>
                                            <p className={`${styles.hhhhhhh} m-0`}>Descuentos:</p>
                                            <p className={`${styles.hhhhhhh} m-0`}>Total Base Imponible:</p>
                                            <p className={`${styles.hhhhhhh} m-0`}>IVA:</p>
                                            <p className={`${styles.hhhhhhh} m-0`}>Total Impuestos:</p>
                                        </div>
                                        <div className={styles.fffffff}>
                                            <p className={`${styles.hhhhhhh} m-0`}>XXXXXXX</p>
                                            <p className={`${styles.hhhhhhh} m-0`}>XXXXXXX</p>
                                            <p className={`${styles.hhhhhhh} m-0`}>XXXXXXX</p>
                                            <p className={`${styles.hhhhhhh} m-0`}>XXXXXXX</p>
                                            <p className={`${styles.hhhhhhh} m-0`}>XXXXXXX</p>
                                        </div>
                                    </div>
                                    <div className={styles.iiiiiiiii}>XXXXXXXXXX</div>
                                    <div className={styles.jjjjjjjjj}>
                                        MONTO EN LETRAS PERO NUESTRO CLIENTE LO DEBE DE ESCRIBIR
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ElectronicInvoicingPage;