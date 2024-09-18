/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { getProfileUser } from '../../../../../../redux/User/userSlice/actions';
import { postManyProducts, getProducts } from '../../../../../../redux/User/03Inventories/03InventoryProductsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../../../types/User/branch.types';
import { IProduct } from "../../../../../../types/User/products.types";
import styles from './styles.module.css';

interface CreateManyProductsProps {
    branches: IBranch | IBranch[] | null;
    token: string;
    onCreateComplete: () => void;
}

function CreateManyProducts({ branches, token, onCreateComplete }: CreateManyProductsProps) {
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    const [excelData, setExcelData] = useState<Array<{ [key: string]: any }> | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
        }
    }, [token]);

    //Selección de la sede
    const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBranch(e.target.value);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target?.result as string;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const parsedData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                const spanishColumnNames: { [key: string]: string } = {
                    "Código de barras": "barCode",
                    "Nombre del producto": "nameItem",
                    "Inventario": "inventory",
                    "Unidad de medida": "unitMeasure",
                    "Precio unitario de venta": "sellingPrice",
                    "Fecha de vencimiento": "expirationDate",
                    "IVA": "IVA",
                    "Impuesto al consumo": "consumptionTax",
                    "Tipo de retención en la fuente": "retentionType",
                    "Porcentaje de Rete Fuente": "withholdingTax",
                    "Rete IVA": "withholdingIVA",
                    "Rete ICA": "withholdingICA",
                };

                // Tomar las filas 4 y 6 como encabezados y datos respectivamente
                const originalHeaders: string[] = parsedData[1] || [];
                const originalData: any[][] = parsedData[3] ? parsedData.slice(3) : [];

                // Traducir los encabezados originales al inglés
                const currentHeaders: string[] = originalHeaders.map((header: string) => {
                    return spanishColumnNames[header] || header;
                });

                if (currentHeaders.length > 0) {
                    // Mapear los datos a un formato compatible con el modelo, excluyendo la primera columna
                    const formattedData = originalData.map((row) =>
                        currentHeaders.slice(1).reduce((obj: { [key: string]: any }, header, index) => {
                            let value = row[index + 1];
                            if (header === 'expirationDate' && typeof value === 'number') {
                                value = excelSerialToDate(value).toLocaleDateString(); // Convertir el número de serie a fecha legible
                            }
                            obj[header] = value;
                            return obj;
                        }, {})
                    );

                    // Establecer los encabezados y los datos traducidos
                    setHeaders(currentHeaders.slice(1));
                    setExcelData(formattedData);
                } else {
                    console.error('No se encontraron encabezados válidos en el archivo Excel.');
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    // Función para traducir los nombres de las columnas de inglés a español
    const englishToSpanishColumnNames: { [key: string]: string } = {
        "barCode": "Código de barras",
        "nameItem": "Nombre del producto",
        "inventory": "Inventario",
        "unitMeasure": "Unidad de medida",
        "sellingPrice": "Precio unitario de venta",
        "expirationDate": "Fecha de vencimiento",
        "IVA": "IVA",
        "consumptionTax": "Impuesto al consumo",
        "retentionType": "Tipo de retención en la fuente",
        "withholdingTax": "Porcentaje de Rete Fuente",
        "withholdingIVA": "Rete IVA",
        "withholdingICA": "Rete ICA",
        // Agregar más nombres de columnas según sea necesario
    };

    const excelSerialToDate = (serial: number): Date => {
        const startDate = new Date(1900, 0, 1); // 1st January 1900
        return new Date(startDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
    };

    // Función para preparar los datos del formulario antes de enviarlos a Redux
    const prepareFormData = (excelData: any[], selectedBranch: string, user?: { id: string } | null): IProduct[] => {
        if (!excelData || !selectedBranch) return [];
    
        const branchId = selectedBranch;
        const nonEmptyRows = excelData.filter(row => Object.values(row).some(value => !!value));
    
        return nonEmptyRows.map(item => {
            const expirationDate = typeof item.expirationDate === 'number' ? excelSerialToDate(item.expirationDate) : undefined;
    
            const dataPrepare: IProduct = {
                id: item.id,
                barCode: item.barCode,
                nameItem: item.nameItem,
                inventory: item.inventory,
                unitMeasure: item.unitMeasure,
                sellingPrice: item.sellingPrice,
                expirationDate: expirationDate,
                IVA: item.IVA,
                consumptionTax: item.consumptionTax,
                retentionType: item.retentionType,
                withholdingTax: item.withholdingTax,
                withholdingIVA: item.withholdingIVA,
                withholdingICA: item.withholdingICA,
                branchId: branchId,
                userId: user?.id,
            };
            return dataPrepare;
        });
    };
        
    // Función onSubmit actualizada que usa prepareFormData
    const onSubmit = () => {
        if (!excelData || !selectedBranch) return;
        const formData = prepareFormData(excelData, selectedBranch, user);
        dispatch(postManyProducts(formData, token));
        setExcelData(null);
        setMessage('Se guardaron exitosamente los registros');
        setTimeout(() => {
            setShouldNavigate(true);
            dispatch(getProducts(token));
            onCreateComplete();
        }, 1500);
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-products');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div>
            <div className='mt-3 mb-3 p-2 d-flex flex-column border rounded'>
                <div className={`${styles.container__Download_File} mt-3 mb-3 p-2 d-flex align-items-center justify-content-between border rounded`}>
                    <h6 className='m-0 text-center'>Primero descarga el archivo para que lo diligencies</h6>
                    <a className={`${styles.download__File} text-center text-decoration-none`} href="/DownloadExcels/Productos.xlsx" download="Productos.xlsx">Descargar Excel</a>
                </div>
                <p>Recuerda descargar el archivo Excel adjunto para que puedas diligenciarlo con la información de cada uno de tus productos y facilitar la creación masiva en la sede seleccionada.</p>
            </div>

            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                <p className={`${styles.label} mb-0 p-2`}>Selecciona una Sede</p>
                <select
                    className={`${styles.input} p-2 border`}
                    onChange={handleBranchChange}
                >
                    <option value=''>Selecciona una Sede</option>
                    {Array.isArray(branches) && branches.map((branch: IBranch, index: number) => (
                        <option key={index} value={branch.id}>
                            {branch.nameBranch}
                        </option>
                    ))}
                </select>
            </div>

            <div className="d-flex">
                <input type="file" accept=".xlsx" onChange={handleFileUpload} className="m-auto p-1 border rounded text-decoration-none" />
            </div>

            <div className={`${styles.success} m-auto position-relative`}>
                {message && (
                    <p className={`${styles.alert__Success} text-center position-absolute alert-success`}>{message}</p>
                )}
            </div> 

            <div className="mt-4 mb-4 table-responsive">
                {excelData && (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th key={header} className="align-middle text-center">
                                        {englishToSpanishColumnNames[header] || header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.map((row, index) => (
                                Object.values(row).some(value => !!value) && (
                                    <tr key={index}>
                                        {headers.map((header, columnIndex) => (
                                            <td key={columnIndex} className="align-middle text-center">{row[header]}</td>
                                        ))}
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="d-flex">
                <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} type='button' onClick={onSubmit}>Enviar</button>
            </div>
        </div>
    );
}

export default CreateManyProducts;