/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any  */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAverageTicketPerPeriod, getAverageTicketPerPeriodByBranch } from '../../../../../redux/User/indicator/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";

function ModalAverageTicket () {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const averageTicketPerPeriod = useSelector((state: RootState) => state.finantialIndicators.averageTicketPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IAccountsBook[] | null>(null); 

    useEffect(() => {
        dispatch(getBranches(token));
        if (selectedBranch === 'Todas') {
            dispatch(getAverageTicketPerPeriod(token))
            .then((response: any) => {
                setOriginalData(response.data);
            })
            .catch((error: any) => {
                console.error("Failed to fetch sales per period:", error);
            });
        } else {
            dispatch(getAverageTicketPerPeriodByBranch(selectedBranch, token))
            .then((response: any) => {
                setOriginalData(response.data);
            })
            .catch((error: any) => {
                console.error("Failed to fetch sales per period by branch:", error);
            });
        }
    }, [selectedBranch, dispatch, token]);

    useEffect(() => {
        if (averageTicketPerPeriod) {
            setOriginalData(averageTicketPerPeriod);
        }
    }, [ averageTicketPerPeriod ]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };
        
    const calculateDailyAverages = () => {
        if (!averageTicketPerPeriod) return null;    
        const dailyTotals: { [date: string]: { sum: number; count: number } } = {};    
        averageTicketPerPeriod.forEach((record: { transactionType: string; transactionDate: string | number | Date; totalValue: number; }) => {
            if (record.transactionType === 'Ingreso') {
                const transactionDate = new Date(record.transactionDate).toLocaleDateString();
                const totalValue = record.totalValue || 0;
        
                if (!dailyTotals[transactionDate]) {
                    dailyTotals[transactionDate] = { sum: 0, count: 0 };
                }
        
                dailyTotals[transactionDate].sum += totalValue;
                dailyTotals[transactionDate].count += 1;
            }
        });
        const dailyAverages = Object.keys(dailyTotals).map((date) => {
            const { sum, count } = dailyTotals[date];
            return { date, accumulatedValue: sum, accumulatedQuantity: count, average: sum / count };
        });
        return dailyAverages;
    };

    const exportToExcel = () => {
        if (originalData) {
            const dataForExcel = originalData.map(item => ({
                'Fecha de transacción': item.transactionDate,
                'Sede': item.branchId,
                'Valor acumulado de ventas': item.incomeCategory,
                'Cantidad acumulada de ventas': item.nameItem,
                'Ticket promedio': item.unitValue,
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
                <h2 className="text-primary-emphasis text-start">Ticket promedio</h2>
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
                    {averageTicketPerPeriod && averageTicketPerPeriod.length > 0 ? (
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Sede</th>
                                    <th>Valor acumulado de ventas</th>
                                    <th>Cantidad acumulada de ventas</th>                                    
                                    <th>Ticket promedio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculateDailyAverages()?.map((dailyAverage) => (
                                    <tr key={dailyAverage.date}>
                                        <td>{dailyAverage.date}</td>
                                        <td>{getBranchName(selectedBranch)}</td>
                                        <td className='text-end'>${dailyAverage.accumulatedValue? formatNumberWithCommas(dailyAverage.accumulatedValue) : 'N/A'}</td>
                                        <td>{dailyAverage.accumulatedQuantity? formatNumberWithCommas(dailyAverage.accumulatedQuantity) : 'N/A'}</td>
                                        <td className='text-end'>${dailyAverage.average? formatNumberWithCommas(dailyAverage.average) : 'N/A'}</td>
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

export default ModalAverageTicket;