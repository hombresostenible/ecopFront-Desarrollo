/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any  */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { getAccountsReceivable, getAccountsReceivableByBranch } from '../../../../../../redux/User/indicator/finantialIndicators/actions';
import { getBranches } from '../../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsReceivable } from '../../../../../../types/User/accountsReceivable.types';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';

function ModalAccountsReceivable () {
    const token = jsCookie.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const accountsReceivable = useSelector((state: RootState) => state.finantialIndicators.accountsPayable);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    console.log('selectedBranch: ', selectedBranch)

    useEffect(() => {
        dispatch(getBranches(token));
        if (selectedBranch === 'Todas') {
            dispatch(getAccountsReceivable(token));
        } else {
            dispatch(getAccountsReceivableByBranch(selectedBranch, token));
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
                <h2 className="m-0 text-primary-emphasis text-start">Cuentas por cobrar</h2>
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
                    {Array.isArray(accountsReceivable) && accountsReceivable.length > 0 ? (
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">Fecha</th>
                                    <th className="text-center align-middle">Sede</th>
                                    <th className="text-center align-middle">Descripción</th>
                                    <th className="text-center align-middle">Estado</th>
                                    <th className="text-center align-middle">Valor inicial</th>
                                    <th className="text-center align-middle">Valor actual</th>
                                    <th className="text-center align-middle">Número de cuotas</th>
                                    <th className="text-center align-middle">Valor de la cuota</th>
                                    <th className="text-center align-middle">Número de cuota pendiente</th>
                                    <th className="text-center align-middle">Quién me debo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountsReceivable.map((account: IAccountsReceivable) => (
                                    <tr key={account.id}>
                                        <td>
                                            {new Date(account.transactionDate).toLocaleDateString('en-GB')}
                                        </td>
                                        <td>
                                            {getBranchName(account.branchId)}
                                        </td>
                                        <td>
                                            {account.creditDescription}
                                        </td>
                                        <td>
                                            {account.stateAccount || 'N/A'}
                                        </td>
                                        <td>
                                            $ {account.initialValue ? formatNumber(account.initialValue) : 'N/A'}
                                        </td>
                                        <td>
                                            $ {account.currentBalance ? formatNumber(account.currentBalance) : 'N/A'}
                                        </td>
                                        <td>
                                            {account.initialNumberOfPayments || 'N/A'}
                                        </td>
                                        <td>
                                            $ {account.paymentValue ? formatNumber(account.paymentValue) : 'N/A'}
                                        </td>
                                        <td>
                                            {account.pendingNumberOfPayments || 'N/A'}
                                        </td>
                                        <td>
                                            {account.transactionCounterpartId}
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

export default ModalAccountsReceivable;