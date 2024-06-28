/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
//REDUX
import { postManyAssets } from '../../../../../redux/User/assetsSlice/actions';
import { getProfileUser } from '../../../../../redux/User/userSlice/actions';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { IBranch } from '../../../../../types/User/branch.types';
import { IAssets } from "../../../../../types/User/assets.types";
import styles from './styles.module.css';

interface CreateManyMerchandisesProps {
    branches: IBranch | IBranch[] | null;
    token: string;
    onCreateComplete: () => void;
}

function CreateManyAssets({ branches, token, onCreateComplete }: CreateManyMerchandisesProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const user = useSelector((state: RootState) => state.user.user);

    const [excelData, setExcelData] = useState<Array<{ [key: string]: any }> | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);

    const [selectedBranch, setSelectedBranch] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    // Renderiza el Excel adjuntado en la tabla del modal
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
                    "Código de barras": "barCode",
                    "Nombre del artículo": "nameItem",
                    "Marca": "brandItem",
                    "Referencia": "referenceAssets",
                    "Inventario": "inventory",
                    "Precio de compra antes de inpuestos": "purchasePriceBeforeTax",
                    "IVA": "IVA",
                    "Estado": "stateAssets",
                    "Condición de compra": "conditionAssets",
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
        "barCode": "Código de barras",
        "nameItem": "Nombre del artículo",
        "brandItem": "Marca",
        "referenceAssets": "Referencia",
        "inventory": "Inventario",
        "purchasePriceBeforeTax": "Precio de compra antes de inpuestos",
        "IVA": "IVA",
        "stateAssets": "Estado",
        "conditionAssets": "Condición de compra",
        // Agregar más nombres de columnas según sea necesario
    };

    const onSubmit = () => {
        if (!excelData || !selectedBranch) {
            setErrorMessage('Por favor, selecciona una sede antes de enviar.');
            return;
        }
        const branchId = selectedBranch;
        // Filtrar las filas no vacías del excelData
        const nonEmptyRows = excelData.filter(row => Object.values(row).some(value => !!value));
        const formData = nonEmptyRows.map(asset => ({
            ...asset,
            branchId: branchId,
            userId: user?.id,
            referenceAssets: String(asset.referenceAssets), // Asegúrate de que sea siempre una cadena
        }));
        dispatch(postManyAssets(formData as unknown as IAssets[], token));
        // Restablecer estado y mensaje de éxito
        setExcelData(null);
        setMessage('Se guardó masivamente tus equipos, herramientas o máquinas con exito');
        setErrorMessage('');
        setTimeout(() => {
            onCreateComplete();
        }, 1500);
    };

    return (
        <div>
            <div className='mt-3 mb-3 p-2 d-flex flex-column border rounded'>
                <div className={`${styles.container__Download_File} mt-3 mb-3 mx-auto p-2 d-flex align-items-center justify-content-between border rounded`}>
                    <h6 className='m-0 text-center'>Primero descarga el archivo para que lo diligencies</h6>
                    <a className={`${styles.download__File} pt-1 pb-1 px-2 text-center text-decoration-none`} href="/DownloadExcels/Equipos_Herramientas_y_Maquinaria.xlsx" download="Equipos_Herramientas_y_Maquinaria.xlsx">Descargar Excel</a>
                </div>
                <p>Recuerda descargar el archivo Excel adjunto para que puedas diligenciarlo con la información de cada uno de tus mercancías y facilitar la creación masiva en la sede seleccionada.</p>
            </div>

            <div className="mb-5 p-2 d-flex align-items-center justify-content-center border rounded position-relative">
                <div>
                    <p className="mb-0 p-2">Selecciona una Sede</p>
                </div>
                <div>
                    <select
                        className={`${styles.input} p-2 border `}
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

                {errorMessage && (
                    <div className={`${styles.alert__Danger} text-center position-absolute`} role="alert">
                        {errorMessage}
                    </div>
                )}
            </div>

            <div className="d-flex">
                <input type="file" accept=".xlsx" onChange={handleFileUpload} className="m-auto p-1 border rounded text-decoration-none" />
            </div>

            <div className={`${styles.success} m-auto position-relative`}>
                {message && (
                    <div className={`${styles.alert__Success} p-1 text-center text-success position-absolute alert-success`}>{message}</div>
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
                                // Verificar si hay datos en la fila antes de renderizarla
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

            <div className="mb-4 d-flex align-items-center justify-content-center">
                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} onClick={onSubmit}>Enviar</button>
            </div>
        </div>
    );
}

export default CreateManyAssets;