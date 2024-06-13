import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function MarketingIndicatorsPage() {
    const [ selectedItems, setSelectedItems ] = useState<string[]>([]);

    const navigate = useNavigate();

    const toggleSelect = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleCalculate = () => {
        navigate('/reports-and-indicators/marketing-indicators/calculate-marketing-items', { state: { selectedItems } });
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <div>
                            <h1 className={styles.title}>Elige el Indicador de Marketing que quieres calcular</h1>
                        </div>
                        <div>
                            <div className={styles.divs}>
                                <div className={`${styles.indicator} ${selectedItems.includes('CostoAdquisicionClientes') ? 'border-primary' : ''}`} onClick={() => toggleSelect('CostoAdquisicionClientes')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('CostoAdquisicionClientes')}>
                                        <div className={`${selectedItems.includes('CostoAdquisicionClientes') ? 'text-primary' : ''}`}>
                                            <h5>Costo de Adquisición de Clientes</h5>
                                            <p>Description Costo de Adquisición de Clientes</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('CostoAdquisicionClientes') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('CostoRetencionClientes') ? 'border-primary' : ''}`} onClick={() => toggleSelect('CostoRetencionClientes')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('CostoRetencionClientes')}>
                                        <div className={`${selectedItems.includes('CostoRetencionClientes') ? 'text-primary' : ''}`}>
                                            <h5>Costo de Retención de Clientes</h5>
                                            <p>Description Costo de Retención de Clientes</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('CostoRetencionClientes') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('EmbudoCampañaDigital') ? 'border-primary' : ''}`} onClick={() => toggleSelect('EmbudoCampañaDigital')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('EmbudoCampañaDigital')}>
                                        <div className={`${selectedItems.includes('EmbudoCampañaDigital') ? 'text-primary' : ''}`}>
                                            <h5>Embudo de ventas de Campaña Digital</h5>
                                            <p>Description Campaña Digital</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('EmbudoCampañaDigital') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                            </div>

                            <div className={styles.divs}>
                                <div className={`${styles.indicator} ${selectedItems.includes('VisualizacionImpresiones') ? 'border-primary' : ''}`} onClick={() => toggleSelect('VisualizacionImpresiones')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('VisualizacionImpresiones')}>
                                        <div className={`${selectedItems.includes('VisualizacionImpresiones') ? 'text-primary' : ''}`}>
                                            <h5>Visualización o impresiones en campaña digital específica</h5>
                                            <p>Description Visualización o impresiones</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('VisualizacionImpresiones') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('ComparativoVisualizacionImpresiones') ? 'border-primary' : ''}`} onClick={() => toggleSelect('ComparativoVisualizacionImpresiones')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('ComparativoVisualizacionImpresiones')}>
                                        <div className={`${selectedItems.includes('ComparativoVisualizacionImpresiones') ? 'text-primary' : ''}`}>
                                            <h5>Comparativo de visualización o impresiones en campañas digitales</h5>
                                            <p>Description Visualización o impresiones</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('ComparativoVisualizacionImpresiones') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('ProspectosGenerados') ? 'border-primary' : ''}`} onClick={() => toggleSelect('ProspectosGenerados')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('ProspectosGenerados')}>
                                        <div className={`${selectedItems.includes('ProspectosGenerados') ? 'text-primary' : ''}`}>
                                            <h5>Prospectos o leads generados en campaña digital específica</h5>
                                            <p>Description Prospectos Generados</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('ProspectosGenerados') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>                                
                            </div>

                            <div className={styles.divs}>
                                <div className={`${styles.indicator} ${selectedItems.includes('ComparativoProspectosGenerados') ? 'border-primary' : ''}`} onClick={() => toggleSelect('ComparativoProspectosGenerados')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('ComparativoProspectosGenerados')}>
                                        <div className={`${selectedItems.includes('ComparativoProspectosGenerados') ? 'text-primary' : ''}`}>
                                            <h5>Comparativo de prospectos o leads generados en campañas digitales</h5>
                                            <p>Description Prospectos Generados</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('ComparativoProspectosGenerados') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('NumeroVentasCampañaDigital') ? 'border-primary' : ''}`} onClick={() => toggleSelect('NumeroVentasCampañaDigital')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('NumeroVentasCampañaDigital')}>
                                        <div className={`${selectedItems.includes('NumeroVentasCampañaDigital') ? 'text-primary' : ''}`}>
                                            <h5>Número de ventas generadas en campaña digital específica</h5>
                                            <p>Description Número de ventas generadas por campaña digital</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('NumeroVentasCampañaDigital') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('ComparativoNumeroVentasCampañaDigital') ? 'border-primary' : ''}`} onClick={() => toggleSelect('ComparativoNumeroVentasCampañaDigital')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('ComparativoNumeroVentasCampañaDigital')}>
                                        <div className={`${selectedItems.includes('ComparativoNumeroVentasCampañaDigital') ? 'text-primary' : ''}`}>
                                            <h5>Comparativo de número de ventas generadas en campañas digitales</h5>
                                            <p>Description Número de ventas generadas por campaña digital</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('ComparativoNumeroVentasCampañaDigital') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                            </div>

                            <div className={styles.divs}>
                                <div className={`${styles.indicator} ${selectedItems.includes('NumeroPersonasInteresadas') ? 'border-primary' : ''}`} onClick={() => toggleSelect('NumeroPersonasInteresadas')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('NumeroPersonasInteresadas')}>
                                        <div className={`${selectedItems.includes('NumeroPersonasInteresadas') ? 'text-primary' : ''}`}>
                                            <h5>Número de personas interesadas en campaña digital específica</h5>
                                            <p>Description Valor total de las ventas digitales</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('NumeroPersonasInteresadas') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('ComparativoNumeroPersonasInteresadas') ? 'border-primary' : ''}`} onClick={() => toggleSelect('ComparativoNumeroPersonasInteresadas')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('ComparativoNumeroPersonasInteresadas')}>
                                        <div className={`${selectedItems.includes('ComparativoNumeroPersonasInteresadas') ? 'text-primary' : ''}`}>
                                            <h5>Comparativo de número de personas interesadas en campañas digitales</h5>
                                            <p>Description Valor total de las ventas digitales</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('ComparativoNumeroPersonasInteresadas') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('TasaConversion') ? 'border-primary' : ''}`} onClick={() => toggleSelect('TasaConversion')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('TasaConversion')}>
                                        <div className={`${selectedItems.includes('TasaConversion') ? 'text-primary' : ''}`}>
                                            <h5>Tasa de conversión en campaña digital específica</h5>
                                            <p>Description Tasa de conversión</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('TasaConversion') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>                                
                            </div>
                            
                            <div className={styles.divs}>
                                <div className={`${styles.indicator} ${selectedItems.includes('ComparativoTasaConversion') ? 'border-primary' : ''}`} onClick={() => toggleSelect('ComparativoTasaConversion')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('ComparativoTasaConversion')}>
                                        <div className={`${selectedItems.includes('ComparativoTasaConversion') ? 'text-primary' : ''}`}>
                                            <h5>Comparativo de tasa de conversión en campañas digitales</h5>
                                            <p>Description Tasa de conversión</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.buttonDiv} ${selectedItems.includes('ComparativoTasaConversion') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>                                
                            </div>
                        </div>
                        <div className={styles.containerButton}>
                            <button className={styles.button} type='submit' onClick={handleCalculate}>Calcular</button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default MarketingIndicatorsPage;