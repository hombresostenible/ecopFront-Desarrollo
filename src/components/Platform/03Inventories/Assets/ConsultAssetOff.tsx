// REDUX
import { useDispatch } from 'react-redux';
import { patchAsset, getAssets } from '../../../../redux/User/assetsSlice/actions';
import type { AppDispatch } from '../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../types/User/assets.types';
import { IBranch } from '../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ConsultAssetOffProps {
    token: string;
    assets: IAssets[];
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ConsultAssetOff({ token, assets, branches, onCloseModal }: ConsultAssetOffProps) {
    const dispatch: AppDispatch = useDispatch();

    const transformInventoryOff = (inventoryOff: (string | undefined)[]) => {
        return inventoryOff.map((item) => {
            if (typeof item === 'string' && item !== 'undefined') {
                try {
                    const parsedItem = JSON.parse(item.replace(/\\"/g, '"'));
                    return parsedItem;
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    return null;
                }
            }
            return null;
        }).filter(Boolean);
    };

    const transformedInventoryOff = transformInventoryOff(assets.map(asset => JSON.stringify(asset.inventoryOff || [])));

    const totalInventoryOff = transformedInventoryOff.reduce((acc, item) => {
        if (item && typeof item.quantity === 'number') {
            return acc + item.quantity;
        }
        return acc;
    }, 0);

    const onSubmit = (idAsset: string) => {
        try {
            const assetData: IAssets = {
                inventoryOff: [{
                    date: new Date(),
                    quantity: 1, // O cualquier valor apropiado
                    reason: "Activo en uso",
                }],
            } as IAssets;
            dispatch(patchAsset(idAsset, assetData, token));
            onCloseModal();
            dispatch(getAssets(token));
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    return (
        <div className="m-auto w-100">
            <div className="mt-4 table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Sede</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Nombre del item</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Marca</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Referencia</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Cantidad</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {assets && assets.length > 0  ? (
                            assets.map((asset) => (
                                <tr key={asset.id}>
                                    <td className='align-middle text-center'>
                                        <span>
                                            {branches && branches.map((branch, index) => (
                                                asset.branchId === branch.id && (
                                                    <span className="text-center" key={index}>{branch.nameBranch}</span>
                                                )
                                            ))}
                                        </span>
                                    </td>
                                    <td className='align-middle text-center'>
                                        <span>{asset.nameItem}</span>
                                    </td>
                                    <td className='align-middle text-center'>
                                        <span>{asset.brandAssets}</span>
                                    </td>
                                    <td className='align-middle text-center'>
                                        <span>{asset.referenceAssets}</span>
                                    </td>

                                    <td className='align-middle text-center'>
                                        <span>{totalInventoryOff}</span>
                                    </td>
                                    <td className='d-flex align-items-center justify-content-center align-middle text-center'>
                                        <div
                                            className={styles.dsdsdsdsdsd}
                                            onClick={() => {
                                                onSubmit(asset.id); // Llamamos a onSubmit al hacer clic en "Normalizar"
                                            }}
                                        >
                                            Deshacer
                                        </div>
                                    </td>
                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center">
                                    No hay equipos, herramientas o máquinas dadas de baja
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConsultAssetOff;
