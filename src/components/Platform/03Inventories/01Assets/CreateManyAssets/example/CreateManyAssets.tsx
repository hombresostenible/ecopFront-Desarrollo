/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../../../../../redux/User/userSlice/actions';
import { postManyAssets } from '../../../../../../redux/User/assetsSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { IBranch } from '../../../../../../types/User/branch.types';
import { IAssets } from '../../../../../../types/User/assets.types';
import styles from './styles.module.css';

interface CreateManyAssetsProps {
    branches: IBranch | IBranch[] | null;
    token: string;
    onCreateComplete: () => void;
}

const CreateManyAssets: React.FC<CreateManyAssetsProps> = ({ branches, token, onCreateComplete }) => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    const [excelData, setExcelData] = useState<Array<{ [key: string]: any }> | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
        }
    }, [token]);

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
                    "Nombre del artículo": "nameItem",
                    "Código de barras": "barCode",
                    "Inventario": "inventory",
                    "Marca": "brandAssets",
                    "Referencia": "referenceItem",
                    "Condición de compra": "conditionAssets",
                    "Estado": "stateAssets",
                    "Precio de compra antes de inpuestos": "purchasePriceBeforeTax",
                    "IVA": "IVA",
                    // Agregar más nombres de columnas según sea necesario
                };
    
                const originalHeaders: string[] = parsedData[3] || [];
                const originalData: any[][] = parsedData[5] ? parsedData.slice(5) : [];
    
                const currentHeaders: string[] = originalHeaders.map((header: string) => {
                    return spanishColumnNames[header] || header;
                });
    
                if (currentHeaders.length > 0) {
                    const formattedData = originalData.map((row) =>
                        currentHeaders.slice(1).reduce((obj: { [key: string]: any }, header, index) => {
                            obj[header] = row[index + 1];
                            return obj;
                        }, {})
                    );
                    setHeaders(currentHeaders.slice(1));
                    setExcelData(formattedData);
                } else {
                    console.error('No se encontraron encabezados válidos en el archivo Excel.');
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    const englishToSpanishColumnNames: { [key: string]: string } = {
        "nameItem": "Nombre del artículo",
        "barCode": "Código de barras",
        "inventory": "Inventario",
        "brandAssets": "Marca",
        "referenceItem": "Referencia",
        "conditionAssets": "Condición de compra",
        "stateAssets": "Estado",
        "purchasePriceBeforeTax": "Precio de compra antes de inpuestos",
        "IVA": "IVA",
        // Agregar más nombres de columnas según sea necesario
    };

    const onSubmit = () => {
        if (!excelData || !selectedBranch) return;
        const branchId = selectedBranch;
        const nonEmptyRows = excelData.filter(row => Object.values(row).some(value => !!value));
        const formData = nonEmptyRows.map(asset => ({
            ...asset,
            branchId: branchId,
            userId: user?.id,
        }));
        dispatch(postManyAssets(formData as unknown as IAssets[], token));
        setExcelData(null);
        setMessage('Se guardó masivamente tus equipos, herramientas o máquinas con éxito');
        setTimeout(() => {
            onCreateComplete();
        }, 1500);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, header: string) => {
        const updatedData = [...(excelData || [])];
        if (updatedData[rowIndex]) {
            updatedData[rowIndex][header] = e.target.value;
            setExcelData(updatedData);
        }
    };

    return (
        <div>
            <div className='mt-3 mb-3 p-2 d-flex flex-column border rounded'>
                <div className={`${styles.containerDownloadFile} mt-3 mb-3 p-2 d-flex align-items-center justify-content-between border rounded`}>
                    <h6 className='m-0 text-center'>Primero descarga el archivo para que lo diligencies</h6>
                    <a className={`${styles.downloadFile} text-center text-decoration-none`} href="../DownloadExcels/Equipos_Herramientas_y_Maquinara.xlsx" download="Equipos_Herramientass_y_Maquinara.xlsx">Descargar Excel</a>
                </div>
                <p>Recuerda descargar el archivo Excel adjunto para que puedas diligenciarlo con la información de cada uno de tus mercancías y facilitar la creación masiva en la sede seleccionada.</p>
            </div>

            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                <div>
                    <p className={`${styles.text} mb-0 p-2`}>Selecciona una Sede</p>
                </div>
                <div>
                    <select
                        className={`${styles.info} p-2 border rounded border-secondary`}
                        onChange={handleBranchChange}
                    >
                        <option value=''>Selecciona una Sede</option>
                        {Array.isArray(branches) && branches.map((branch: IBranch) => (
                            <option key={branch.id} value={branch.id}>
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
                    <div className="table table-bordered table-striped">
                        <div>
                            <table className="table">
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
                                                    <td key={columnIndex} className="align-middle text-center">
                                                        <input
                                                            type="text"
                                                            value={row[header] || ''}
                                                            onChange={(e) => handleInputChange(e, index, header)}
                                                            className={`${styles.input} border`}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <div className="d-flex">
                <button className={`${styles.buttonSubmit} m-auto border-0 rounded text-decoration-none`} type='button' onClick={onSubmit}>Enviar</button>
            </div>
        </div>
    );
}

export default CreateManyAssets;