/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import * as XLSX from 'xlsx';
//REDUX
import { useDispatch } from 'react-redux';
import { getBranches, postManyBranch } from '../../../../redux/User/branchSlice/actions';
import type { AppDispatch } from '../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../types/User/branch.types';
import styles from './styles.module.css';

interface CreateManyBranchesProps {
    token: string;
    onCreateComplete: () => void;
}

function CreateManyBranches ({ token, onCreateComplete }: CreateManyBranchesProps) {
    const dispatch: AppDispatch = useDispatch();

    const [ excelData, setExcelData ] = useState<Array<{ [key: string]: any }> | null>(null);
    const [ headers, setHeaders ] = useState<string[]>([]);

    const [ message, setMessage ] = useState('');

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
                    "Nombre de la sede": "nameBranch",
                    "Departamento de la sede": "department",
                    "Ciudad de la sede": "city",
                    "Dirección de la sede": "addressBranch",
                    "Email de la sede": "contactEmailBranch",
                    "Teléfono de la sede": "contactPhoneBranch",
                    "Nombre del administrador de la sede": "nameManagerBranch",
                    "Apellido del administrador de la sede": "lastNameManagerBranch",
                    "Tipo de documento": "typeDocumentIdManager",
                    "Número de documento": "documentIdManager",
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
        "nameBranch": "Nombre de la sede",
        "department": "Departamento de la sede",
        "city": "Ciudad de la sede",
        "addressBranch": "Dirección de la sede",
        "contactEmailBranch": "Email de la sede",
        "contactPhoneBranch": "Teléfono de la sede",
        "nameManagerBranch": "Nombre del administrador de la sede",
        "lastNameManagerBranch": "Apellido del administrador de la sede",
        "typeDocumentIdManager": "Tipo de documento",
        "documentIdManager": "Número de documento",
        // Agregar más nombres de columnas según sea necesario
    };

    const onSubmit = async () => {    
        // Filtrar las filas que contienen datos
        const nonEmptyRows = excelData?.filter(row => Object.values(row).some(value => !!value));
    
        // Mapear solo las filas no vacías
        const branchData = nonEmptyRows?.map(branch => ({
            ...branch,
            contactPhoneBranch: branch.contactPhoneBranch.toString(),
            documentIdManager: branch.documentIdManager.toString(),
        }));
        await dispatch(postManyBranch(branchData as IBranch[], token));
        setExcelData(null);
        setMessage('Se guardó masivamente tus sedes con exito');
        setTimeout(() => {
            dispatch(getBranches(token));
            onCreateComplete();
        }, 1500);
    };


    return (
        <div>
            <h2 className="text-primary-emphasis text-start">Crea tus sedes de forma masiva</h2>

            <div className='mt-3 mb-3 p-2 d-flex flex-column border rounded'>
                <div className={`${styles.containerDownloadFile} mt-3 mb-3 p-2 d-flex align-items-center justify-content-between border rounded`}>
                    <h6 className='m-0 text-center'>Primero descarga el archivo para que lo diligencies</h6>
                    <a className={`${styles.downloadFile} text-center text-decoration-none`} href="/Download-Excels/Sedes.xlsx" download="Sedes.xlsx">Descargar Excel</a>
                </div>
                <p>Recuerda descargar el archivo Excel adjunto para que puedas diligenciarlo con la información de cada una de tus sedes y facilitar la creación masiva.</p>
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

            <div className="d-flex">
                <button className={`${styles.buttonSubmit} m-auto border-0 rounded text-decoration-none`} type='button' onClick={onSubmit}>Enviar</button>
            </div>
        </div>
    );
}

export default CreateManyBranches;