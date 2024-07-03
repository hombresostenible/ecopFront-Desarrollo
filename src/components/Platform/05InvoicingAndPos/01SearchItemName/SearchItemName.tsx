/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemByName } from '../../../../redux/User/itemBybarCodeOrName/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
import debounce from 'lodash/debounce';
import styles from './styles.module.css';

interface SearchItemNameProps {
    token: string;
    onItemSelect: (item: any) => void;                                  // Esta función recibe el ítem seleccionado y lo pasa al padre
}

function SearchItemName({ token, onItemSelect }: SearchItemNameProps) {
    const dispatch: AppDispatch = useDispatch();

    const itemByBarCodeOrName = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByBarCodeOrName);
    const [nameItem, setNameItem] = useState('');
    const [debouncedNameItem, setDebouncedNameItem] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isSelectingItem, setIsSelectingItem] = useState(false);      // Nuevo estado para controlar la selección

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
        setSelectedItem(null);                  // Limpiar el selectedItem al cambiar el texto
    };

    const handleItemClick = (item: any) => {
        setSelectedItem(item);                  // Actualizar selectedItem al seleccionar un ítem
        setIsSelectingItem(true);               // Marcar que se está seleccionando un ítem
    };

    useEffect(() => {
        // Verificar si selectedItem no es null y si se está seleccionando un ítem
        if (selectedItem && isSelectingItem) {
            onItemSelect(selectedItem);
            setIsSelectingItem(false);          // Reiniciar el estado de selección
            setNameItem('');                    // Limpiar el input después de seleccionar un ítem
        }
    }, [selectedItem, isSelectingItem, onItemSelect]);

    return (
        <div className="d-flex align-items-center justify-content-center">
            <p className="mb-0 p-2">Nombre del artículo</p>
            <div className={`${styles.container__Search_Result} position-relative`}>
                <input
                    type="text"
                    className={`${styles.input__BarCode} p-2`}
                    value={nameItem}
                    onChange={handleChange}
                    placeholder='Escribe el nombre del artículo'
                />
                {itemByBarCodeOrName && (
                    <div className={`${styles.select__Container} position-absolute overflow-y-auto`}>
                        {Array.isArray(itemByBarCodeOrName) && itemByBarCodeOrName.map((item, index) => (
                            <button key={index} onClick={() => handleItemClick(item)} className={`${styles.button__Selected_Item} text-start display-block p-2 border-0`}>
                                {item.nameItem}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchItemName;