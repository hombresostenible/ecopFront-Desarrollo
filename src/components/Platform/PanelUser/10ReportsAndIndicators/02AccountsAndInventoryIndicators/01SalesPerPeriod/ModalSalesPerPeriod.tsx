/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any  */
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { getSalesPerPeriod, getSalesPerPeriodByBranch } from '../../../../../../redux/User/indicator/finantialIndicators/actions';
import { getBranches } from '../../../../../../redux/User/02BranchSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';

function ModalSalesPerPeriod() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const salesPerPeriod = useSelector((state: RootState) => state.finantialIndicators.salesPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');

    useEffect(() => {
        dispatch(getBranches(token));
        if (selectedBranch === 'Todas') {
            dispatch(getSalesPerPeriod(token));
        }
        else {
            dispatch(getSalesPerPeriodByBranch(selectedBranch, token));
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
                <h2 className="m-0 text-primary-emphasis text-start">Ventas del período</h2>
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
                                            {salePerPeriod.quantity? formatNumber(salePerPeriod.quantity) : 'N/A'}
                                        </td>
                                        <td className='text-end'>
                                            $ {salePerPeriod.totalValue !== undefined ? formatNumber(salePerPeriod.totalValue) : 'N/A'}
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