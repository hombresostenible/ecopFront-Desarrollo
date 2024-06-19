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
    expenseCategory: string;
    onSupplierSelect: (value: string | null) => void;
}

function SearchSupplierCrm ({ token, expenseCategory, onSupplierSelect }: SearchSupplierCrmCrmProps) {
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

    const createSupplierOption = {
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

    options?.unshift(createSupplierOption);

    options?.unshift(createSupplierOption);

    const handleInputChange = (inputValue: string) => {
        setFilterText(inputValue);
    };

    const handleSelectChange = (option: { value: string; label: string } | null) => {
        if (option?.value === 'createSupplier') {
            setShowCancelModalCreateSupplier(true);
        } else {
            onSupplierSelect(option?.value || null);  // Solo pasa el valor de `value` como argumento.
            setSelectedOption(option);
        }
    };

    const onCloseCreateClientModal = () => {
        setShowCancelModalCreateSupplier(false);
    };

    const onCreateSupplierCreated = (token: string) => {
        dispatch(getCrmSuppliers(token));
    };

    return (
        <div
            ref={selectRef}
            className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded"
        >
            <div className="px-3">                    
                <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el número de identificación de la persona o empresa {(expenseCategory === 'Credito' || expenseCategory === 'Credito del Banco' || expenseCategory === 'CooperativeCredit' || expenseCategory === 'LoanShark' || expenseCategory === 'WarehouseCredit' || expenseCategory === 'PublicUtilitiesCredit') ? 'que te prestó' : 'a la que le pagaste'}?</p>
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
                        onSupplierCreated={onCreateSupplierCreated}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SearchSupplierCrm;