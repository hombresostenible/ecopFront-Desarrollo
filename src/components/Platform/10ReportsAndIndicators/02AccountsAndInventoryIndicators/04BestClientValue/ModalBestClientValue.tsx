/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IBestClientValue } from "../../../../../types/User/financialIndicators.types";

interface ModalBestClientValueProps {
    consolidatedData: IBestClientValue[] | null;
}

function ModalBestClientValue ({ consolidatedData }: ModalBestClientValueProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IBestClientValue[] | null>(null); 


    useEffect(() => {
        dispatch(getBranches(token));
        if (consolidatedData) {
            setOriginalData(consolidatedData);
        }
    }, [ selectedBranch, consolidatedData ]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    const exportToExcel = () => {
        if (originalData) {
            const dataForExcel = originalData.map(item => ({
                'Puesto': item.transactionDate,
                'Sede': item.branchId,
                'Cliente': item.transactionCounterpartId,
                'Valor total': item.value,
            }));
            const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas del período');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Ventas_del_período.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    function formatNumberWithCommas(number: number): string {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return (
        <div className="m-2 p-3 text-center m-auto">
            <div className="p-4 d-flex align-items-center justify-content-between">
                <h2 className="text-primary-emphasis text-start">Mejor cliente por valor</h2>
                <div>
                    <button className="btn btn-success btn-sm" onClick={exportToExcel}>Exportar a Excel</button>
                </div>
            </div>

            <div className="border">
                <div className="d-flex justify-content-between">
                    <select
                        className="border-0 p-3"
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                        <option value=''>Todas las Sedes</option>
                        {Array.isArray(branches) && branches.map((branch, index) => (
                            <option key={index} value={branch.id}>
                                {branch.nameBranch}
                            </option>
                        ))}
                    </select>
                    <button className="m-2 p-3 chart-container border rounded" onClick={() => setSelectedBranch('')}>Borrar Filtro de sedes</button>
                </div>
            </div>

            <div className="mt-4">    
                {consolidatedData && consolidatedData.length > 0 ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Puesto</th>
                                <th>Sede</th>
                                <th>Cliente</th>
                                <th>Valor total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consolidatedData.map((data, index) => (
                                <tr key={data.id || index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {getBranchName(data.branchId)}
                                    </td>
                                    <td>
                                        {data.transactionCounterpartId ? (data.transactionCounterpartId) : 'N/A'}
                                    </td>
                                    <td className='text-end'>
                                        $ {data.value ? formatNumberWithCommas(data.value) : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">
                        <p>Los datos no están disponibles.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalBestClientValue;