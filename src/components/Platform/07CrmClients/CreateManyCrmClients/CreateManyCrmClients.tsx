/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
//REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../redux/store';
import { postManyCrmClients, getCrmClients } from '../../../../redux/User/crmClientSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../types/User/crmClient.types';
import styles from './styles.module.css';

interface CreateManyCrmClientsProps {
    token: string;
    onCreateComplete: () => void;
}

function CreateManyCrmClients({ token, onCreateComplete }: CreateManyCrmClientsProps) {
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

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
                    "Nombre del cliente": "name",
                    "Apellido del cliente": "lastName",
                    "Razon Social del cliente": "corporateName",
                    "Tipo de documento de identidad": "typeDocumentId",
                    "Numero de documento de identidad": "documentId",
                    "Digito de verificacion": "verificationDigit",
                    "Email del cliente": "email",
                    "Numero de celular o telefono del cliente": "phone",
                    "Departamento": "department",
                    "Ciudad": "city",
                    "Direccion": "address",
                    // Agregar más nombres de columnas según sea necesario
                };
    
                // Tomar las filas 4 y 6 como encabezados y datos respectivamente
                const originalHeaders: string[] = parsedData[1] || [];
                const originalData: any[][] = parsedData[3] ? parsedData.slice(3) : [];
    
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
        "name": "Nombre del cliente",
        "lastName": "Apellido del cliente",
        "corporateName": "Razon Social del cliente",
        "typeDocumentId": "Tipo de documento de identidad",
        "documentId": "Numero de documento de identidad",
        "verificationDigit": "Digito de verificacion",
        "email": "Email del cliente",
        "phone": "Numero de celular o telefono del cliente",
        "department": "Departamento",
        "city": "Ciudad",
        "address": "Direccion",
        // Agregar más nombres de columnas según sea necesario
    };

    const onSubmit = async () => {    
        // Filtrar las filas que contienen datos
        const nonEmptyRows = excelData?.filter(row => Object.values(row).some(value => !!value));
    
        // Mapear solo las filas no vacías
        const formData = nonEmptyRows?.map(crmClients => ({
            ...crmClients,
            documentId: crmClients.documentId.toString(),
            phone: crmClients.phone.toString(),
        }));
        await dispatch(postManyCrmClients(formData as ICrmClient[], token));
        setExcelData(null);
        setMessage('Se guardó masivamente tus clientes con éxito');
        setTimeout(() => {
            setShouldNavigate(true);
            dispatch(getCrmClients(token));
            onCreateComplete();
        }, 1500);
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/crm-clients/consult-crm-clients');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div>
            <div className='mt-3 mb-3 p-2 d-flex flex-column border rounded'>
                <div className={`${styles.container__Download_File} mt-3 mb-3 p-2 d-flex align-items-center justify-content-between border rounded`}>
                    <h6 className='m-0 text-center'>Primero descarga el archivo para que lo diligencies</h6>
                    <a className={`${styles.download__File} text-center text-decoration-none`} href="/DownloadExcels/Clientes.xlsx" download="Clientes.xlsx">Descargar Excel</a>
                </div>
                <p>Recuerda descargar el archivo Excel adjunto para que puedas diligenciarlo con la información de cada cliente y facilitar la creación masiva.</p>
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
                <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} type='button' onClick={onSubmit}>Enviar</button>
            </div>
        </div>
    );
}

export default CreateManyCrmClients;