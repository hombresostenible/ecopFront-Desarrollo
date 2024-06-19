import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function AccountsAndInventoryIndicatorsPage() {
    const [ selectedItems, setSelectedItems ] = useState<string[]>([]);

    const navigate = useNavigate();

    const toggleSelect = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([ ...selectedItems, item ]);
        }
    };

    const handleCalculate = () => {
        navigate('/reports-and-indicators/accounts-and-inventory-indicators/calculate-financial-items', { state: { selectedItems } });
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Elige el Indicador de Cuentas e Inventarios que quieres calcular</h1>

                        <div className={styles.container__Cards_Indicators}>
                            <div className={styles.divs}>
                                <div className={`${styles.indicator} ${selectedItems.includes('Ventas') ? 'border-primary' : ''}`} onClick={() => toggleSelect('Ventas')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('Ventas')}>
                                        <div className={`${selectedItems.includes('Ventas') ? 'text-primary' : ''}`}>
                                            <h5>Ventas del Período</h5>
                                            <p>Este indicador te calcula las ventas del negocio por períodos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('Ventas') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('Gastos') ? 'border-primary' : ''}`} onClick={() => toggleSelect('Gastos')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('Gastos')}>
                                        <div className={`${selectedItems.includes('Gastos') ? 'text-primary' : ''}`}>
                                            <h5>Gastos del período</h5>
                                            <p>Este indicador te calcula los gastos del negocio por períodos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('Gastos') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('Utilidad') ? 'border-primary' : ''}`} onClick={() => toggleSelect('Utilidad')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('Utilidad')}>
                                        <div className={`${selectedItems.includes('Utilidad') ? 'text-primary' : ''}`}>
                                            <h5>Utilidad del período</h5>
                                            <p>Este indicador te calcula la utilidad del negocio por períodos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('Utilidad') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divs}>
                                <div className={`${styles.indicator} ${selectedItems.includes('ClienteQueMasCompra') ? 'border-primary' : ''}`} onClick={() => toggleSelect('ClienteQueMasCompra')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('ClienteQueMasCompra')}>
                                        <div className={`${selectedItems.includes('ClienteQueMasCompra') ? 'text-primary' : ''}`}>
                                            <h5>Cliente que más compra</h5>
                                            <p>Este indicador revela los clientes con los que generas mayores ingresos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('ClienteQueMasCompra') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('ClienteFrecuente') ? 'border-primary' : ''}`} onClick={() => toggleSelect('ClienteFrecuente')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('ClienteFrecuente')}>
                                        <div className={`${selectedItems.includes('ClienteFrecuente') ? 'text-primary' : ''}`}>
                                            <h5>Cliente frecuente</h5>
                                            <p>Este indicador revela los clientes con compras más frecuentes</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('ClienteFrecuente') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('TicketPromedio') ? 'border-primary' : ''}`} onClick={() => toggleSelect('TicketPromedio')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('TicketPromedio')}>
                                        <div className={`${selectedItems.includes('TicketPromedio') ? 'text-primary' : ''}`}>
                                            <h5>Ticket Promedio</h5>
                                            <p>Este indicador te permite calcular el valor promedio de cada compra</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('TicketPromedio') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                            </div>
                        
                            <div className={styles.divs}>
                                <div className={`${styles.indicator} ${selectedItems.includes('CuentasXPagar') ? 'border-primary' : ''}`} onClick={() => toggleSelect('CuentasXPagar')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('CuentasXPagar')}>
                                        <div className={`${selectedItems.includes('CuentasXPagar') ? 'text-primary' : ''}`}>
                                            <h5>Cuentas por Pagar</h5>
                                            <p>Este indicador te permite calcular las cuentas por pagar por períodos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('CuentasXPagar') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('CuentasXCobrar') ? 'border-primary' : ''}`} onClick={() => toggleSelect('CuentasXCobrar')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('CuentasXCobrar')}>
                                        <div className={`${selectedItems.includes('CuentasXCobrar') ? 'text-primary' : ''}`}>
                                            <h5>Cuentas por Cobrar</h5>
                                            <p>Este indicador te permite calcular las cuentas por cobrar por períodos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('CuentasXCobrar') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('InventarioProducto') ? 'border-primary' : ''}`} onClick={() => toggleSelect('InventarioProducto')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('InventarioProducto')}>
                                        <div className={`${selectedItems.includes('InventarioProducto') ? 'text-primary' : ''}`}>
                                            <h5>Inventario de Productos</h5>
                                            <p>Este indicador te calcula el inventario de tu negocio por períodos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('InventarioProducto') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divs}>
                                <div className={`${styles.indicator} ${selectedItems.includes('InventarioMateriasPrimas') ? 'border-primary' : ''}`} onClick={() => toggleSelect('InventarioMateriasPrimas')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('InventarioMateriasPrimas')}>
                                        <div className={`${selectedItems.includes('InventarioMateriasPrimas') ? 'text-primary' : ''}`}>
                                            <h5>Inventario de Materias Primas</h5>
                                            <p>Este indicador te calcula el inventario de tu negocio por períodos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('InventarioMateriasPrimas') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('InventarioMercancias') ? 'border-primary' : ''}`} onClick={() => toggleSelect('InventarioMercancias')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('InventarioMercancias')}>
                                        <div className={`${selectedItems.includes('InventarioMercancias') ? 'text-primary' : ''}`}>
                                            <h5>Inventario de Mercancía</h5>
                                            <p>Este indicador te calcula el inventario de tu negocio por períodos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('InventarioMercancias') ? 'active' : ''}`} >
                                        Selecciona
                                    </div>
                                </div>
                                <div className={`${styles.indicator} ${selectedItems.includes('InventarioActivos') ? 'border-primary' : ''}`} onClick={() => toggleSelect('InventarioActivos')} >
                                    <div className={`${styles.div} `} onClick={() => toggleSelect('InventarioActivos')}>
                                        <div className={`${selectedItems.includes('InventarioActivos') ? 'text-primary' : ''}`}>
                                            <h5>Inventario de Activos</h5>
                                            <p>Este indicador te calcula el inventario de tu negocio por períodos</p>
                                        </div>
                                    </div>
                                    <div className={` ${styles.buttonDiv} ${selectedItems.includes('InventarioActivos') ? 'active' : ''}`} >
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

export default AccountsAndInventoryIndicatorsPage;