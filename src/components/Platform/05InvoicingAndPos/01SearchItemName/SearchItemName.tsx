/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemByName } from '../../../../redux/User/itemBybarCodeOrName/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
import debounce from 'lodash/debounce';
import styles from './styles.module.css';

interface SearchItemNameProps {
    token: string;
    onItemSelect: (item: any) => void;
}

function SearchItemName({ token, onItemSelect }: SearchItemNameProps) {
    const dispatch: AppDispatch = useDispatch();
    const itemByBarCodeOrName = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByBarCodeOrName);

    const [nameItem, setNameItem] = useState('');
    const [debouncedNameItem, setDebouncedNameItem] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]); // Nuevo estado local para resultados de búsqueda

    const debouncedSearch = useMemo(() => debounce((nextValue: string) => setDebouncedNameItem(nextValue), 500), []);

    useEffect(() => {
        if (debouncedNameItem && token) {
            dispatch(getItemByName(debouncedNameItem, token));
        }
    }, [debouncedNameItem, token, dispatch]);

    useEffect(() => {
        if (itemByBarCodeOrName) {
            // Convierte itemByBarCodeOrName a un array de any si es necesario
            const results = Array.isArray(itemByBarCodeOrName) ? itemByBarCodeOrName : [itemByBarCodeOrName];
            setSearchResults(results);
        }
    }, [itemByBarCodeOrName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameItem(value);
        debouncedSearch(value);
    };

    const handleItemClick = (item: any) => {
        onItemSelect(item);
        setNameItem('');
        setDebouncedNameItem('');
        setSearchResults([]);
    };

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
                {searchResults.length > 0 && ( // Renderizar solo si hay resultados en la búsqueda local
                    <div className={`${styles.select__Container} position-absolute overflow-y-auto`}>
                        {searchResults.map((item, index) => (
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