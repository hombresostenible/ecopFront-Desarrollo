/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../redux/User/searchItems/actions';
import type { RootState, AppDispatch } from '../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from "../../types/User/assets.types";
import { IMerchandise } from "../../types/User/merchandise.types";
import { IProduct } from "../../types/User/products.types";
import { IRawMaterial } from "../../types/User/rawMaterial.types";
import { IService } from "../../types/User/services.types";
import CreateItem from '../CreateItem/CreateItem';
import { StylesReactSelectItems } from '../StylesComponents/StylesReactSelect';

interface SearchItemsProps {
    token: string;                                                                                          //Token del cliente
    onItemSelect?: (value: number | null) => void;                                                          //Id del item seleccionado
    onDataItemSelect?: (data: IAssets | IMerchandise | IProduct | IRawMaterial | IService) => void;         //Prop adicional
}

interface OptionType {
    value: string;
    label: string;
    data?: IAssets | IMerchandise | IProduct | IRawMaterial | IService;                                     // Propiedad opcional
}

function SearchItems({ token, onItemSelect, onDataItemSelect }: SearchItemsProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const items = useSelector((state: RootState) => state.searchItems.items);

    const [filterText, setFilterText] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [showCancelModalCreateClient, setShowCancelModalCreateClient] = useState(false);
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(getItems(token));
    }, [token]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                event.target instanceof Node &&
                !selectRef.current.contains(event.target) &&
                selectedOption === null
            ) {
                setFilterText('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectRef, selectedOption]);

    const createClientOption: OptionType = {
        value: 'CreateItem',
        label: '¿No existe el artículo? Créalo acá',
    };

    const filteredOptions: OptionType[] = Array.isArray(items)
        ? items
            .filter((item) => 
                (item?.nameItem && item.nameItem.toLowerCase().includes(filterText.toLowerCase())) ||
                (item?.barCode && item.barCode.toString().includes(filterText))
            )
            .map((item) => ({
                value: item.barCode ? item.barCode.toString() : '',  // Manejar undefined barCode
                label: `${item.nameItem} - ${item.barCode ? item.barCode : 'N/A'}`,  // Mostrar 'N/A' si barCode es undefined
                data: item, // Incluimos los datos completos del artículo
            }))
        : [];

    filteredOptions.unshift(createClientOption);

    const handleInputChange = (inputValue: string) => {
        setFilterText(inputValue);
    };

    const handleSelectChange = (option: OptionType | null) => {
        if (option?.value === 'CreateItem') {
            setShowCancelModalCreateClient(true);
        } else {
            if (onItemSelect) {
                onItemSelect(option?.value ? parseInt(option.value) : null); // Llama la función `onItemSelect` si está definida
            }
            if (onDataItemSelect && option?.data) {
                onDataItemSelect(option.data); // Llama la función `onDataItemSelect` con los datos completos del cliente
            }
            setSelectedOption(option);
        }
    };

    const onCloseCreateItemtModal = () => {
        setShowCancelModalCreateClient(false);
    };

    const onCreateItem = (token: string) => {
        dispatch(getItems(token));
    };

    return (
        <div ref={selectRef} className="d-flex align-items-center justify-content-center">
            <Select
                value={selectedOption}
                inputValue={filterText}
                onInputChange={handleInputChange}
                onChange={handleSelectChange}
                options={filteredOptions}
                placeholder="Busca por nombre"
                isSearchable
                styles={StylesReactSelectItems}
            />

            <Modal show={showCancelModalCreateClient} onHide={onCloseCreateItemtModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea tu artículo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateItem
                        token={token}
                        onCreateComplete={onCloseCreateItemtModal}
                        onItemCreated={onCreateItem}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SearchItems;