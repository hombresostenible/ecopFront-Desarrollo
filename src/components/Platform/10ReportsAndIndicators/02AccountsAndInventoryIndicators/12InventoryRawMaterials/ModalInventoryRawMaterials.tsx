/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';

interface ModalInventoryRawMaterialProps {
    rawMaterialsInventory: IRawMaterial[] | null;
}

function ModalInventoryRawMaterials ({ rawMaterialsInventory }: ModalInventoryRawMaterialProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas'); 

    useEffect(() => {
        dispatch(getBranches(token));
    }, [ selectedBranch, rawMaterialsInventory ]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    return (
        <div className="p-3 text-center m-auto border">
            <div className="pt-3 pb-3 d-flex align-items">
                <h2 className="m-0 text-primary-emphasis text-start">Inventario de materias primas</h2>
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
                {rawMaterialsInventory && rawMaterialsInventory.length > 0 ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Sede</th>
                                <th>Nombre de la materia prima</th>
                                <th>Inventario</th>                                
                                <th>Unidades vendidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rawMaterialsInventory.map((rawMaterialInventory, index) => (
                                <tr key={rawMaterialInventory.id || index}>
                                    <td>
                                        {getBranchName(rawMaterialInventory.branchId)}
                                    </td>
                                    <td>
                                        {rawMaterialInventory.nameItem ? (rawMaterialInventory.nameItem) : 'N/A'}
                                    </td>
                                    <td>
                                        {rawMaterialInventory.inventory? formatNumber(rawMaterialInventory.inventory) : 'N/A'}
                                    </td>
                                    <td>
                                        {rawMaterialInventory.salesCount? formatNumber(rawMaterialInventory.salesCount) : 'N/A'}
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

export default ModalInventoryRawMaterials;