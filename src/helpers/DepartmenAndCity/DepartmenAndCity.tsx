/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import departments from './Departments';
import citiesByDepartment from './Cities';
import styles from './styles.module.css';

interface DepartmenAndCityProps {
    onSelect: (department: string, city: string, codeDane: string, subregionCodeDane: string) => void;
    reset: boolean;
}

function DepartmenAndCity({ onSelect, reset }: DepartmenAndCityProps) {
    const [ department, setDepartment ] = useState<{ value: string; label: string } | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<{ value: string; label: string } | null>();    
    const handleDepartmentChange = (selectedOption: any) => {
        setDepartment(selectedOption);
        setSelectedDepartment(selectedOption);                                                                      // Actualiza el estado seleccionado del departamento
        setCity(null);                                                                                              // Resetea el estado de la ciudad
        setSelectedCity(null);                                                                                      // Resetea el estado seleccionado de la ciudad
        const selectedDepartmentValue = selectedOption.value;
        const selectedCityValue = '';
        const selectedCityCodeDane = '';
        const selectedCitysubregionCodeDane = '';
        onSelect(selectedDepartmentValue, selectedCityValue, selectedCityCodeDane, selectedCitysubregionCodeDane);  // Reseteamos la ciudad, el código y la subreión del Dane al camnbiar de departamento
    };

    const [ city, setCity ] = useState<{ value: string; label: string } | null>(null);    
    const [ selectedCity, setSelectedCity ] = useState<{ value: string; label: string, codeDane:string } | null>();
    const handleCityChange = (selectedOption: any) => {
        setCity(selectedOption);
        setSelectedCity(selectedOption);                                                                            // Actualiza el estado seleccionado de la ciudad
        const selectedDepartmentValue = department!.value;                                                          // Setea el departamento
        const selectedCityValue = selectedOption.value;                                                             // Setea la ciudad
        const selectedCityCodeDane = selectedOption.codeDane;                                                       // Setea el código del Dane
        const selectedCitysubregionCodeDane = selectedOption.subregionCodeDane;                                     // Setea el código de la subregión del Dane
        onSelect(selectedDepartmentValue, selectedCityValue, selectedCityCodeDane, selectedCitysubregionCodeDane);  // Enviamos el departamento, la ciudad, el código y la subregión del Dane
    };

    const cityOptions: { value: string; label: string }[] = department ? citiesByDepartment[ department.value as keyof typeof citiesByDepartment ] || [] : [];

    useEffect(() => {
        if (reset) {
            setSelectedDepartment(null);
            setSelectedCity(null);
        }
    }, [reset]);

    return (
        <div className="d-flex align-items-center justify-content-center gap-3">
            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Departamento</h6>
                <div className={styles.container__Input}>
                    <Select
                        className={`${styles.input} border-0`}
                        options={departments}
                        value={selectedDepartment || department}
                        onChange={handleDepartmentChange}
                        isSearchable={true}                     // Habilita la funcionalidad de búsqueda
                    />
                </div>
            </div>

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Ciudad</h6>
                <div className={styles.container__Input}>
                    <Select
                        className={`${styles.input} border-0`}
                        options={cityOptions}
                        value={selectedCity || city}
                        onChange={handleCityChange}
                        isSearchable={true}                     // Habilita la funcionalidad de búsqueda
                    />
                </div>
            </div>
        </div>
    );
}

export default DepartmenAndCity;