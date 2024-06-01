/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
//REDUX
import { postManyProducts } from '../../../../../../redux/User/productSlice/actions';
import { getProfileUser } from '../../../../../../redux/User/userSlice/actions';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { IBranch } from '../../../../../../types/User/branch.types';
import { IProduct } from "../../../../../../types/User/products.types";
import styles from './styles.module.css';

interface CreateManyProductsProps {
    branches: IBranch | IBranch[] | null;
    token: string;
    onCreateComplete: () => void;
}

function CreateManyProducts({ branches, token, onCreateComplete }: CreateManyProductsProps) {
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
    const handleBranchChange = (e: any) => {
        const selectedId = e.target.value;
        setSelectedBranch(selectedId);
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
    
                // Obtener los nombres de las columnas en español desde el archivo de Excel
                const spanishColumnNames: { [key: string]: string } = {
                    "Nombre del producto": "nameItem",
                    "Código de barras": "barCode",
                    "Inventario": "inventory",
                    "Unidad de medida": "unitMeasure",
                    "¿Autoincremento?": "inventoryIncrease",
                    "Periodicidad del autoincremento": "periodicityAutomaticIncrease",
                    "Cantidad de aumento automático": "automaticInventoryIncrease",
                    "Precio de venta": "sellingPrice",
                    "IVA": "IVA",
                    "¿Empacado?": "packaged",
                    "Tipo de empaque principal": "primaryPackageType",
                    "Fecha de vencimiento": "expirationDate"
                    // Agregar más nombres de columnas según sea necesario
                };
    
                // Tomar las filas 4 y 6 como encabezados y datos respectivamente
                const originalHeaders: string[] = parsedData[3] || [];
                const originalData: any[][] = parsedData[5] ? parsedData.slice(5) : [];
    
                // Traducir los encabezados originales al inglés
                const currentHeaders: string[] = originalHeaders.map((header: string) => {
                    // Obtener la traducción en inglés si está disponible, de lo contrario, mantener el nombre original
                    return spanishColumnNames[header] || header;
                });
    
                if (currentHeaders.length > 0) {
                    // Mapear los datos a un formato compatible con el modelo, excluyendo la primera columna
                    const formattedData = originalData.map((row) =>
                        currentHeaders.slice(1).reduce((obj: { [key: string]: any }, header, index) => {
                            obj[header] = row[index + 1];
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
        "nameItem": "Nombre del producto",
        "barCode": "Código de barras",
        "inventory": "Inventario",
        "unitMeasure": "Unidad de medida",
        "inventoryIncrease": "¿Autoincremento?",
        "periodicityAutomaticIncrease": "Periodicidad del autoincremento",
        "automaticInventoryIncrease": "Cantidad de aumento automático",
        "sellingPrice": "Precio de venta",        
        "IVA": "IVA",
        "packaged": "¿Empacado?",
        "primaryPackageType": "Tipo de empaque principal",
        "expirationDate": "Fecha de vencimiento"
        // Agregar más nombres de columnas según sea necesario
    };

    const onSubmit = async () => {
        if (!excelData || !selectedBranch) return;
        const branchId = selectedBranch;
    
        // Filtrar las filas no vacías del excelData
        const nonEmptyRows = excelData.filter(row => Object.values(row).some(value => !!value));
    
        // Mapear los datos con la manipulación específica
        const rawMateriaData = nonEmptyRows.map(product => {
            // Verificar si inventoryIncrease es No o packaged es No
            if (product.inventoryIncrease === 'No' || product.packaged === 'No') {
                return {
                    ...product,
                    branchId: branchId,
                    userId: user?.id,
                    periodicityAutomaticIncrease: product.inventoryIncrease === 'No' ? null : product.periodicityAutomaticIncrease,
                    automaticInventoryIncrease: product.inventoryIncrease === 'No' ? null : product.automaticInventoryIncrease,
                    primaryPackageType: product.packaged === 'No' ? null : product.primaryPackageType
                };
            }
    
            return {
                ...product,
                branchId: branchId,
                userId: user?.id
            };
        });
        dispatch(postManyProducts(rawMateriaData as unknown as IProduct[], token));
        // Restablecer estado y mensaje de éxito
        setExcelData(null);
        setMessage('Se guardó masivamente tus productos con éxito');
        setTimeout(() => {
            onCreateComplete();
        }, 1500);
    };

    return (
        <div>
            <div className='mt-3 mb-3 p-2 d-flex flex-column border rounded'>
                <div className={`${styles.containerDownloadFile} mt-3 mb-3 m-auto p-2 d-flex align-items-center justify-content-between border rounded`}>
                    <h6 className='m-0 text-center'>Primero descarga el archivo para que lo diligencies</h6>
                    <a className={`${styles.downloadFile} text-center text-decoration-none`} href="/DownloadExcels/Productos.xlsx" download="Productos.xlsx">Descargar Excel</a>
                </div>
                <p>Recuerda descargar el archivo Excel adjunto para que puedas diligenciarlo con la información de cada uno de tus productos y facilitar la creación masiva en la sede seleccionada.</p>
            </div>

            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                <div>
                    <p className={`${styles.text} mb-0 p-2`}>Selecciona una Sede</p>
                </div>
                <div>
                    <select
                        className={`${styles.info} p-2 border rounded border-secundary`}
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
            </div>

            <div className="d-flex">
                <input type="file" accept=".xlsx" onChange={handleFileUpload} className="m-auto p-1 border rounded text-decoration-none" />
            </div>

            <div className={`${styles.success} m-auto position-relative`}>
                {message && (
                    <p className={`${styles.successMessage} p-1 text-center text-success position-absolute w-100`}>{message}</p>
                )}
            </div> 

            <div className="mt-4 table-responsive">
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
                <button className={`${styles.buttonSubmit} m-auto border-0 rounded text-decoration-none`} type='button' onClick={onSubmit}>Enviar</button>
            </div>
        </div>
    );
}

export default CreateManyProducts;