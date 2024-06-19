/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemByName } from '../../../../redux/User/itemBybarCodeOrName/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
import styles from './styles.module.css';
import debounce from 'lodash/debounce';

interface SearchItemNameProps {
    token: string;
    onItemSelect: (item: any) => void; // Esta función recibe el ítem seleccionado y lo pasa al padre
}

function SearchItemName({ token, onItemSelect }: SearchItemNameProps) {
    const dispatch: AppDispatch = useDispatch();

    const itemByBarCodeOrName = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByBarCodeOrName);
    const [nameItem, setNameItem] = useState('');
    const [debouncedNameItem, setDebouncedNameItem] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isSelectingItem, setIsSelectingItem] = useState(false); // Nuevo estado para controlar la selección

    // Memoize la función debounce
    const debouncedSearch = useMemo(() => debounce((nextValue: string) => setDebouncedNameItem(nextValue), 500), []);

    useEffect(() => {
        if (debouncedNameItem && token) {
            dispatch(getItemByName(debouncedNameItem, token));
        }
    }, [debouncedNameItem, token, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameItem(value);
        debouncedSearch(value);
        setSelectedItem(null); // Limpiar el selectedItem al cambiar el texto
    };

    const handleItemClick = (item: any) => {
        setSelectedItem(item); // Actualizar selectedItem al seleccionar un ítem
        setIsSelectingItem(true); // Marcar que se está seleccionando un ítem
    };

    useEffect(() => {
        // Verificar si selectedItem no es null y si se está seleccionando un ítem
        if (selectedItem && isSelectingItem) {
            onItemSelect(selectedItem);
            setIsSelectingItem(false); // Reiniciar el estado de selección
            setNameItem(''); // Limpiar el input después de seleccionar un ítem
        }
    }, [selectedItem, isSelectingItem, onItemSelect]);

    return (
        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
            <div className="px-3">
                <p className={`${styles.text} mb-0 p-2`}>Nombre del artículo</p>
            </div>
            <div>
                <input
                    type="text"
                    value={nameItem}
                    onChange={handleChange}
                />
                <div className={styles.selectContainer}>
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