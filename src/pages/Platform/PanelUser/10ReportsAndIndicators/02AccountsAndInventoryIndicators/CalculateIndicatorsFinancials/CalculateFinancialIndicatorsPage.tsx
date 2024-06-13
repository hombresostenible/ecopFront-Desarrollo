import { useLocation, Link } from 'react-router-dom';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import SalesPerPeriod from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/01SalesPerPeriod/SalesPerPeriod';
import ExpensesPerPeriod from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/02ExpensesPerPeriod/ExpensesPerPeriod';
import UtilityPerPeriod from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/03UtilityPerPeriod/UtilityPerPeriod';
import BestClientValue from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/04BestClientValue/BestClientValue';
import BestClientQuantity from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/05BestClientQuantity/BestClientQuantity';
import AverageTicket from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/06AverageTicket/AverageTicket';
import AccountsPayable from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/07AccountsPayable/AccountsPayable';
import AccountsReceivable from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/08AccountsReceivable/AccountsReceivable';
import InventoryAssets from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/09InventoryAssets/InventoryAssets';
import InventoryMerchandises from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/10InventoryMerchandises/InventoryMerchandises';
import InventoryProduct from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/11InventoryProduct/InventoryProduct';
import InventoryRawMaterials from '../../../../../../components/Platform/10ReportsAndIndicators/02AccountsAndInventoryIndicators/12InventoryRawMaterials/InventoryRawMaterials';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from '../styles.module.css';

function CalculateIndicatorsFinancialsPage() {
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];

    return (
        <div className='d-flex flex-column'>
            <NavBar />                
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div>
                        <div className={styles.containerButtonBackTo}>
                            <Link to="/indicators/financial-indicators" className={styles.buttonBackTo}>
                                Volver
                            </Link>
                        </div>
                        <div>
                            <div>
                                <h1 className={styles.title}>Indicadores Financieros</h1>
                            </div>
                            <div className={styles.containerDiv}>
                                {selectedItems.map((item: string) => {
                                    let key;
                                    if (item === 'Ventas') {
                                        key = 'Ventas';
                                        return <div key={key} className={styles.divRender}><SalesPerPeriod key={key} /></div>;
                                    } else if (item === 'Gastos') {
                                        key = 'Gastos';
                                        return <div key={key} className={styles.divRender}><ExpensesPerPeriod key={key} /></div>;
                                    } else if (item === 'Utilidad') {
                                        key = 'Utilidad';
                                        return <div key={key} className={styles.divRender}><UtilityPerPeriod key={key} /></div>;
                                    } else if (item === 'ClienteQueMasCompra') {
                                        key = 'ClienteQueMasCompra';
                                        return <div key={key} className={styles.divRender}><BestClientValue key={key} /></div>;
                                    } else if (item === 'ClienteFrecuente') {
                                        key = 'ClienteFrecuente';
                                        return <div key={key} className={styles.divRender}><BestClientQuantity key={key} /></div>;
                                    } else if (item === 'TicketPromedio') {
                                        key = 'TicketPromedio';
                                        return <div key={key} className={styles.divRender}><AverageTicket key={key} /></div>;
                                    } else if (item === 'CuentasXCobrar') {
                                        key = 'CuentasXCobrar';
                                        return <div key={key} className={styles.divRender}><AccountsReceivable key={key} /></div>;
                                    } else if (item === 'CuentasXPagar') {
                                        key = 'CuentasXPagar';
                                        return <div key={key} className={styles.divRender}><AccountsPayable key={key} /></div>;
                                    } else if (item === 'InventarioProducto') {
                                        key = 'InventarioProducto';
                                        return <div key={key} className={styles.divRender}><InventoryProduct key={key} /></div>;
                                    } else if (item === 'InventarioMateriasPrimas') {
                                        key = 'InventarioMateriasPrimas';
                                        return <div key={key} className={styles.divRender}><InventoryRawMaterials key={key} /></div>;
                                    } else if (item === 'InventarioMercancias') {
                                        key = 'InventarioMercancias';
                                        return <div key={key} className={styles.divRender}><InventoryMerchandises key={key} /></div>;
                                    } else if (item === 'InventarioActivos') {
                                        key = 'InventarioActivos';
                                        return <div key={key} className={styles.divRender}><InventoryAssets key={key} /></div>;
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default CalculateIndicatorsFinancialsPage;