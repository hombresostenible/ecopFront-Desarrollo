/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCrmClients } from '../../../redux/User/crmClientSlice/actions';
import type { RootState, AppDispatch } from '../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import CreateClient from './CreateClientAndSupplier/CreateClient';
import { StylesReactSelect } from '../../../helpers/StylesComponents/StylesReactSelect';
import styles from './styles.module.css';

interface SearchClientCrmProps {
    token: string;
    onClientSelect: (value: number | null) => void;
}

function SearchClientCrm({ token, onClientSelect }: SearchClientCrmProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const crmClients = useSelector((state: RootState) => state.crmClient.crmClient);

    const [filterText, setFilterText] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);
    const [showCancelModalCreateClient, setShowCancelModalCreateClient] = useState(false);
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(getCrmClients(token));
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

    const createClientOption = {
        value: 'createClient',
        label: '¿No existe tu cliente? Créalo acá',
    };

    const filteredOptions = Array.isArray(crmClients)
        ? crmClients
              .filter((crmClient) =>
                  crmClient.documentId.toString().includes(filterText) ||
                  (crmClient.name && crmClient.name.toLowerCase().includes(filterText.toLowerCase())) ||
                  (crmClient.lastName && crmClient.lastName.toLowerCase().includes(filterText.toLowerCase())) ||
                  (crmClient.corporateName && crmClient.corporateName.toLowerCase().includes(filterText.toLowerCase()))
              )
              .map((crmClient) => ({
                  value: crmClient.documentId.toString(),
                  label:
                      crmClient.name && crmClient.lastName
                          ? `${crmClient.documentId} - ${crmClient.name} ${crmClient.lastName}`
                          : `${crmClient.documentId} - ${crmClient.corporateName}`,
              }))
        : [];

    filteredOptions.unshift(createClientOption);

    const handleInputChange = (inputValue: string) => {
        setFilterText(inputValue);
    };

    const handleSelectChange = (option: { value: string; label: string } | null) => {
        if (option?.value === 'createClient') {
            setShowCancelModalCreateClient(true);
        } else {
            onClientSelect(option?.value ? parseInt(option.value) : null); // Pasa el valor de `value` como número.
            setSelectedOption(option);
        }
    };

    const onCloseCreateClientModal = () => {
        setShowCancelModalCreateClient(false);
    };

    const onCreateClient = (token: string) => {
        dispatch(getCrmClients(token));
    };

    return (
        <div ref={selectRef} className="m-auto d-flex align-items-center justify-content-center">
            <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el número de identificación de la persona o empresa a la que le vendiste?</p>
            <div>
                <Select
                    value={selectedOption}
                    inputValue={filterText}
                    onInputChange={handleInputChange}
                    onChange={handleSelectChange}
                    options={filteredOptions}
                    placeholder="Busca por nombre o número de cédula"
                    isSearchable
                    styles={StylesReactSelect}
                />
            </div>

            <Modal show={showCancelModalCreateClient} onHide={onCloseCreateClientModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea tu cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateClient
                        token={token}
                        onCreateComplete={onCloseCreateClientModal}
                        onClientCreated={onCreateClient}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SearchClientCrm;