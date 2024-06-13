/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any  */
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import jsCookie from 'js-cookie';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsPayable, getAccountsPayableByBranch } from '../../../../../redux/User/indicator/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";

function ModaAccountsPayable() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const accountsPayable = useSelector((state: RootState) => state.finantialIndicators.accountsPayable);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [originalData, setOriginalData] = useState<IAccountsBook[] | null>(null); 
    const [selectedBranch, setSelectedBranch] = useState('Todas');    

    useEffect(() => {
        dispatch(getBranches(token));
        if (selectedBranch === 'Todas') {
            dispatch(getAccountsPayable(token))
            .then((response: any) => {
                setOriginalData(response.data);
            })
            .catch((error: any) => {
                console.error("Failed to fetch sales per period:", error);
            });
        } else {
            dispatch(getAccountsPayableByBranch(selectedBranch, token))
            .then((response: any) => {
                setOriginalData(response.data);
            })
            .catch((error: any) => {
                console.error("Failed to fetch sales per period by branch:", error);
            });
        }
    }, [selectedBranch, dispatch, token]);

    useEffect(() => {
        if (accountsPayable) {
            setOriginalData(accountsPayable);
        }
    }, [ accountsPayable ]);

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
                'Crédito': item.creditCash,
                'Tipo': item.incomeCategory,
            }));
            const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Información de productos');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Cuentas_X_Cobrar.xlsx';
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
                <h2 className="text-primary-emphasis text-start">Cuentas por Cobrar</h2>
                <div>
                    <button className="btn btn-success btn-sm" onClick={exportToExcel}>Exportar a Excel</button>
                </div>
            </div>

            <div className="text-center border m-auto">
                <div className="d-flex justify-content-between">
                    <select
                        className="border-0 p-3 text-center"
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

            <div>
                <div className="col-12 text-center">    
                    {accountsPayable && accountsPayable.length > 0 ? (
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">Fecha</th>
                                    <th className="text-center align-middle">Sede</th>
                                    <th className="text-center align-middle">Tipo</th>
                                    <th className="text-center align-middle">Tipo de 2</th>
                                    <th className="text-center align-middle">Valor total</th>
                                    <th className="text-center align-middle">Número de cuotas</th>
                                    <th className="text-center align-middle">Valor de la cuotas</th>
                                    <th className="text-center align-middle">Númeo de cuota</th>
                                    <th className="text-center align-middle">A quién le debo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountsPayable.map((accountsReceivable: { id: Key | null | undefined; registrationDate: string | number | Date; branchId: string; transactionType: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; incomeCategory: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; totalValue: number; numberOfPayments: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; paymentValue: number; paymentNumber: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; transactionCounterpartId: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                                    <tr key={accountsReceivable.id}>
                                        <td>
                                            {new Date(accountsReceivable.registrationDate).toLocaleDateString('en-GB')}
                                        </td>
                                        <td>
                                            {getBranchName(accountsReceivable.branchId)}
                                        </td>
                                        <td>
                                            {accountsReceivable.transactionType}
                                        </td>
                                        <td>
                                            {accountsReceivable.incomeCategory}
                                        </td>
                                        <td>
                                            $ {accountsReceivable.totalValue? formatNumberWithCommas(accountsReceivable.totalValue) : 'N/A'}
                                        </td>
                                        <td>
                                            {accountsReceivable.numberOfPayments}
                                        </td>
                                        <td>
                                            $ {accountsReceivable.paymentValue? formatNumberWithCommas(accountsReceivable.paymentValue) : 'N/A'}
                                        </td>
                                        <td>
                                            {accountsReceivable.paymentNumber}
                                        </td>
                                        <td>
                                            {accountsReceivable.transactionCounterpartId}
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

export default ModaAccountsPayable;