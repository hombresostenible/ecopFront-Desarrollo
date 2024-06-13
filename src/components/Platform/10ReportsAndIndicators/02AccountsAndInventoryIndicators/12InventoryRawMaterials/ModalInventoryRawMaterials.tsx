/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';

interface ModalInventoryRawMaterialProps {
    rawMaterialsInventory: IRawMaterial[] | null;
}

function ModalInventoryRawMaterials ({ rawMaterialsInventory }: ModalInventoryRawMaterialProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IRawMaterial[] | null>(null); 

    useEffect(() => {
        dispatch(getBranches(token));
        if (rawMaterialsInventory) {
            setOriginalData(rawMaterialsInventory);
        }
    }, [ selectedBranch, rawMaterialsInventory ]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    const exportToExcel = () => {
        if (originalData) {
            const dataForExcel = originalData.map(item => ({
                'Sede': item.branchId,
                'Nombre de la materia prima': item.nameItem,
                'Inventario': item.inventory,
                'Unidad de medida': item.unitMeasure,
                'Unidades vendidas': item.salesCount,
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
                <h2 className="text-primary-emphasis text-start">Inventario de materias primas</h2>
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
                                        {rawMaterialInventory.inventory? formatNumberWithCommas(rawMaterialInventory.inventory) : 'N/A'}
                                    </td>
                                    <td>
                                        {rawMaterialInventory.salesCount? formatNumberWithCommas(rawMaterialInventory.salesCount) : 'N/A'}
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