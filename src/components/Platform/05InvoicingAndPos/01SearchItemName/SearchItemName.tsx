/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getItemByName } from '../../../../redux/User/itemBybarCodeOrName/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import styles from './styles.module.css';

interface SearchItemNameProps {
    token: string;
    onItemSelect: (item: any) => void; // Función para pasar el artículo seleccionado al componente padre
}

function SearchItemName ({ token, onItemSelect }: SearchItemNameProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const itemByBarCodeOrName = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByBarCodeOrName);

    const [nameItem, setNameItem] = useState('');

    useEffect(() => {
        if (nameItem && token) {
            dispatch(getItemByName(nameItem, token));
        }
    }, [nameItem, token]);

    // Manejar la selección de un artículo y pasar la información al componente padre
    const handleItemClick = (item: any) => {
        onItemSelect(item);
    };

    return (
        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
            <div className="px-3">
                <p className={`${styles.text} mb-0 p-2`}>Nombre del artículo</p>
            </div>
            <div>
                <input
                    type="text"
                    value={nameItem}
                    onChange={(e) => setNameItem(e.target.value)}
                />
                {/* Mostrar la lista de artículos filtrados */}
                <div className={styles.selectContainer}>
                    <button value="" onClick={() => handleItemClick({})}>Seleccionar artículo</button>
                    {Array.isArray(itemByBarCodeOrName) && itemByBarCodeOrName.map((item, index) => (
                        <button key={index} onClick={() => handleItemClick(item)}>
                            {item.nameItem}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchItemName;