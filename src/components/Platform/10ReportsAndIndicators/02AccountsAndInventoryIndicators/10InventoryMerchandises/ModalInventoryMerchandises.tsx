/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IMerchandise } from '../../../../../types/User/merchandise.types';

interface ModalInventoryMerchandiseProps {
    merchandisesInventory: IMerchandise[] | null;
}

function ModalInventoryMerchandises ({ merchandisesInventory }: ModalInventoryMerchandiseProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');

    useEffect(() => {
        dispatch(getBranches(token));
    }, [ selectedBranch ]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    function formatNumberWithCommas(number: number): string {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return (
        <div className="m-2 p-3 text-center m-auto">
            <h2 className="text-primary-emphasis text-start">Inventario de Mercancías</h2>
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
                {merchandisesInventory && merchandisesInventory.length > 0 ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Sede</th>
                                <th>Nombre de la mercancía</th>
                                <th>Inventario</th>                                
                                <th>Unidades vendidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {merchandisesInventory.map((merchandiseInventory, index) => (
                                <tr key={merchandiseInventory.id || index}>
                                    <td>
                                        {getBranchName(merchandiseInventory.branchId)}
                                    </td>
                                    <td>
                                        {merchandiseInventory.nameItem ? (merchandiseInventory.nameItem) : 'N/A'}
                                    </td>
                                    <td>
                                        {merchandiseInventory.inventory? formatNumberWithCommas(merchandiseInventory.inventory) : 'N/A'}
                                    </td>
                                    <td>
                                        {merchandiseInventory.salesCount? formatNumberWithCommas(merchandiseInventory.salesCount) : 'N/A'}
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

export default ModalInventoryMerchandises;