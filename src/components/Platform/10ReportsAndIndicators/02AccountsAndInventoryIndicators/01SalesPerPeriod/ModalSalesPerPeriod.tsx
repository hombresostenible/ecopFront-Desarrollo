/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any  */
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import jsCookie from 'js-cookie';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getSalesPerPeriod, getSalesPerPeriodByBranch } from '../../../../../redux/User/indicator/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";

function ModalSalesPerPeriod () {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const salesPerPeriod = useSelector((state: RootState) => state.finantialIndicators.salesPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IAccountsBook[] | null>(null); 

    useEffect(() => {
        dispatch(getBranches(token));
        if (selectedBranch === 'Todas') {
            dispatch(getSalesPerPeriod(token))
            .then((response: any) => {
                setOriginalData(response.data);
            })
            .catch((error: any) => {
                console.error("Failed to fetch sales per period:", error);
            });
        } else {
            dispatch(getSalesPerPeriodByBranch(selectedBranch, token))
            .then((response: any) => {
                setOriginalData(response.data);
            })
            .catch((error: any) => {
                console.error("Failed to fetch sales per period by branch:", error);
            });
        }
    }, [selectedBranch, dispatch, token]);

    useEffect(() => {
        if (salesPerPeriod) {
            setOriginalData(salesPerPeriod);
        }
    }, [ salesPerPeriod ]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    const exportToExcel = () => {
        if (originalData) {
            const dataForExcel = originalData.map(item => ({
                'Fecha de transacción': item.transactionDate,
                'Sede': item.branchId,
                'Concepto de ingreso': item.incomeCategory,
                'Nombre del artículo': item.nameItem,
                'Valor unitario': item.unitValue,
                'Cantidad': item.quantity,
                'Valor total': item.totalValue,
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
                <h2 className="text-primary-emphasis text-start">Ventas del período</h2>
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
                <div className="col-12">    
                    {salesPerPeriod && salesPerPeriod.length > 0 ? (
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Fecha de transacción</th>
                                    <th>Sede</th>
                                    <th>Concepto de ingreso</th>
                                    <th>Nombre del artículo</th>
                                    <th>Valor unitario</th>
                                    <th>Cantidad</th>
                                    <th>Valor total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesPerPeriod.map((salePerPeriod: { id: any; transactionDate: string | number | Date; branchId: string; incomeCategory: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; nameItem: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; unitValue: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; quantity: number; totalValue: number | undefined; }, index: any) => (
                                    <tr key={salePerPeriod.id || index}>
                                        <td>
                                            {new Date(salePerPeriod.transactionDate).toLocaleDateString('en-GB')}
                                        </td>
                                        <td>
                                            {getBranchName(salePerPeriod.branchId)}
                                        </td>
                                        <td>
                                            {salePerPeriod.incomeCategory? (salePerPeriod.incomeCategory) : 'N/A'}
                                        </td>
                                        <td>
                                            {salePerPeriod.nameItem ? (salePerPeriod.nameItem) : 'N/A'}
                                        </td>
                                        <td className='text-end'>
                                            $ {salePerPeriod.unitValue}
                                        </td>
                                        <td>
                                            {salePerPeriod.quantity? formatNumberWithCommas(salePerPeriod.quantity) : 'N/A'}
                                        </td>
                                        <td className='text-end'>
                                            $ {salePerPeriod.totalValue !== undefined ? formatNumberWithCommas(salePerPeriod.totalValue) : 'N/A'}
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
        </div>
    );
}

export default ModalSalesPerPeriod;