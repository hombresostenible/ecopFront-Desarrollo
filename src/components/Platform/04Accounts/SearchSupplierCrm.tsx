/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCrmSuppliers } from '../../../redux/User/crmSupplierSlice/actions';
import type { RootState, AppDispatch } from '../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import CreateSupplier from './CreateClientAndSupplier/CreateSupplier';
import styles from './styles.module.css';

interface SearchSupplierCrmCrmProps {
    token: string;
    typeExpenses: string;
    onClientSelect: (value: string | null) => void;
}

function SearchSupplierCrm ({ token, typeExpenses, onClientSelect }: SearchSupplierCrmCrmProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const crmSuppliers = useSelector((state: RootState) => state.crmSupplier.crmSupplier);

    const [filterText, setFilterText] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);

    const [showCancelModalCreateSupplier, setShowCancelModalCreateSupplier] = useState(false);

    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(getCrmSuppliers(token));
    }, [ token ]);

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
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ selectRef, selectedOption ]);

    const createClientOption = {
        value: 'createSupplier',
        label: '¿No existe tu proveedor? Créalo acá',
    };

    const options = Array.isArray(crmSuppliers) ? crmSuppliers.map((crmClient) => {
        const label = crmClient.name || crmClient.corporateName || ''; // Usamos un valor por defecto para evitar 'undefined'
        return {
            value: crmClient.documentId,
            label: label,
        };
    }) : [];

    options?.unshift(createClientOption);

    options?.unshift(createClientOption);

    const handleInputChange = (inputValue: string) => {
        setFilterText(inputValue);
    };

    const handleSelectChange = (option: { value: string; label: string } | null) => {
        if (option?.value === 'createSupplier') {
            setShowCancelModalCreateSupplier(true);
        } else {
            onClientSelect(option?.value || null);  // Solo pasa el valor de `value` como argumento.
            setSelectedOption(option);
        }
    };

    const onCloseCreateClientModal = () => {
        setShowCancelModalCreateSupplier(false);
    };

    const onCreateClientCreated = (token: string) => {
        dispatch(getCrmSuppliers(token));
    };


    return (
        <div
            ref={selectRef}
            className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded"
        >
            <div className="px-3">                    
                <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el número de identificación de la persona o empresa {(typeExpenses === 'Crédito' || typeExpenses === 'Crédito del banco' || typeExpenses === 'CooperativeCredit' || typeExpenses === 'LoanShark' || typeExpenses === 'WarehouseCredit' || typeExpenses === 'PublicUtilitiesCredit') ? 'que te prestó' : 'a la que le pagaste'}?</p>
            </div>
            <div>
                <Select
                    className={`${styles.info} p-1 border rounded border-secundary`}
                    value={selectedOption}
                    inputValue={filterText}
                    onInputChange={handleInputChange}
                    onChange={handleSelectChange}
                    options={options}
                    placeholder='Busca por nombre o número de NIT'
                    isSearchable
                />
            </div>

            <Modal show={showCancelModalCreateSupplier} onHide={() => setShowCancelModalCreateSupplier(false)} >
                <Modal.Header closeButton onClick={() => setShowCancelModalCreateSupplier(false)}>
                    <Modal.Title>Crea tu cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateSupplier
                        token={token}
                        onCreateComplete={() => {
                            onCloseCreateClientModal();
                        }}
                        onClientCreated={onCreateClientCreated}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SearchSupplierCrm;