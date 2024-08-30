/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getExpensesPerPeriod, getExpensesPerPeriodByBranch } from '../../../../../redux/User/indicator/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';

function ModalExpensesPerPeriod () {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const expensesPerPeriod = useSelector((state: RootState) => state.finantialIndicators.expensesPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);
    
    const [selectedBranch, setSelectedBranch] = useState('Todas'); 

    useEffect(() => {
        dispatch(getBranches(token));
        if (selectedBranch === 'Todas') {
            dispatch(getExpensesPerPeriod(token));
        } else {
            dispatch(getExpensesPerPeriodByBranch(selectedBranch, token));
        }
    }, [selectedBranch, dispatch, token]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    return (
        <div className="p-3 text-center m-auto border">
            <div className="pt-3 pb-3 d-flex align-items-center justify-content-between">
                <h2 className="m-0 text-primary-emphasis text-start">Gastos del período</h2>
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
                    {expensesPerPeriod && expensesPerPeriod.length > 0 ? (
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Fecha de transacción</th>
                                    <th>Sede</th>
                                    <th>Concepto de egreso</th>
                                    <th>Nombre del artículo</th>
                                    <th>Valor unitario</th>
                                    <th>Cantidad</th>
                                    <th>Valor total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expensesPerPeriod.map((expensePerPeriod: { id: any; transactionDate: string | number | Date; branchId: string; typeExpenses: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; nameItem: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; unitValue: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; quantity: number; totalValue: number | undefined; }, index: any) => (
                                    <tr key={expensePerPeriod.id || index}>
                                        <td>
                                            {new Date(expensePerPeriod.transactionDate).toLocaleDateString('en-GB')}
                                        </td>
                                        <td>
                                            {getBranchName(expensePerPeriod.branchId)}
                                        </td>
                                        <td>
                                            {expensePerPeriod.typeExpenses? (expensePerPeriod.typeExpenses) : 'N/A'}
                                        </td>
                                        <td>
                                            {expensePerPeriod.nameItem ? (expensePerPeriod.nameItem) : 'N/A'}
                                        </td>
                                        <td className='text-end'>
                                            $ {expensePerPeriod.unitValue}
                                        </td>
                                        <td>
                                            $ {expensePerPeriod.quantity? formatNumber(expensePerPeriod.quantity) : 'N/A'}
                                        </td>
                                        <td className='text-end'>
                                            $ {expensePerPeriod.totalValue !== undefined ? formatNumber(expensePerPeriod.totalValue) : 'N/A'}
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

export default ModalExpensesPerPeriod
