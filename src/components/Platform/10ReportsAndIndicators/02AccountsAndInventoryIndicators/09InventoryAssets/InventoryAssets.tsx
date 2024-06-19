/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAssetsInventory, getAssetsInventoryByBranch } from '../../../../../redux/User/indicator/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/User/assets.types';
import ModalInventoryAssets from './ModalInventoryAssets';
import { PiExportBold } from "react-icons/pi";
import styles from './styles.module.css';

function InventoryAssets() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const assetsInventory = useSelector((state: RootState) => state.finantialIndicators.assetsInventory);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IAssets[] | null>(null);  
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        dispatch(getBranches(token));
        if (selectedBranch === 'Todas') {
            dispatch(getAssetsInventory(token))
                .then((response: any) => {
                    setOriginalData(response.data);
                })
                .catch((error: any) => {
                    console.error("Failed to fetch sales per period:", error);
                });
        } else {
            dispatch(getAssetsInventoryByBranch(selectedBranch, token))
                .then((response: any) => {
                    setOriginalData(response.data);
                })
                .catch((error: any) => {
                    console.error("Failed to fetch sales per period by branch:", error);
                });
        }
    }, [selectedBranch, dispatch, token]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };
    
    const exportToExcel = () => {
        if (originalData) {
            const dataForExcel = originalData.map(item => ({
                'Sede': item.branchId,
                'Nombre del activo': item.nameItem,
                'Marca del activo': item.brandAssets,
                'Condición del activo': item.conditionAssets,
                'Estado del activo': item.stateAssets,
            }));
            const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Información sobre el inventario de activos de tu negocio');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Inventario_De_Activos.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className={`${styles.container} m-2 p-3 chart-container border rounded d-flex flex-column align-items-center justify-content-center`} >
            <div className={styles.containerS}>
                <div className={`${styles.containerTitle} p-4 d-flex align-items-center justify-content-between`}>
                    <h2 className="text-primary-emphasis text-start">Inventario de Activos</h2>
                    <div className={styles.containerButtonExportT}>
                        <button className={`${styles.buttonExcel} btn btn-success btn-sm`} onClick={exportToExcel}>Excel <PiExportBold className={styles.icon} /></button>
                    </div>
                </div>

                <div className="m-auto text-center border">
                    <div className="d-flex justify-content-between">
                        <select
                            className="p-3 border-0 text-center"
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

                <div className='mt-3 text-center'>
                    <div className="col-12 text-center">
                        {assetsInventory && assetsInventory.length > 0 ? (
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center align-middle">Sede</th>
                                        <th className="text-center align-middle">Nombre del activo</th>
                                        <th className="text-center align-middle">Condición del activo</th>
                                        <th className="text-center align-middle">Estado del activo</th>
                                        <th className="text-center align-middle">Ver gráfica</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assetsInventory.map((asset: { id: Key | null | undefined; branchId: string; nameItem: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; conditionAssets: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; stateAssets: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                                        <tr key={asset.id}>
                                            <td>
                                                {getBranchName(asset.branchId)}
                                            </td>
                                            <td>
                                                {asset.nameItem}
                                            </td>
                                            <td>
                                                {asset.conditionAssets}
                                            </td>
                                            <td>
                                                {asset.stateAssets}
                                            </td>
                                            <td>
                                                <button
                                                    className='border'
                                                    onClick={() => {
                                                        setShowCancelModal(true);
                                                    }}
                                                >
                                                    Ver Gráfica
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center">
                                <p>Los datos de inventario no están disponibles</p>
                            </div>
                        )}
                    </div>
                </div>

                <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl">
                    <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                        <Modal.Title>Detalle del inventario de tus activos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalInventoryAssets
                            assetsInventory={assetsInventory}
                        />
                    </Modal.Body>
                </Modal>
            </div>

            <div className="d-flex">
                <button className={styles.buttonDetail} onClick={() => { setShowCancelModal(true) }} >Ver Detalles</button>
            </div> 
        </div>
    )
}

export default InventoryAssets