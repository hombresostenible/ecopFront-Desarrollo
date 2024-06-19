import { useLocation, Link } from 'react-router-dom';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import AcquisitionClients from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/01AcquisitionClients/AcquisitionClients';
import RetentionClients from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/02RetentionClients/RetentionClients';
import CustomerDigital from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/03CustomerDigital/CustomerDigital';
import VisualisationImpressions from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/04VisualisationImpressions/VisualisationImpressions';
import ComparativeVisualisationImpressions from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/05ComparativeVisualisationImpressions/ComparativeVisualisationImpressions';
import ProspectsGenerated from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/06ProspectsGenerated/ProspectsGenerated';
import ComparativeProspectsGenerated from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/07ComparativeProspectsGenerated/ComparativeProspectsGenerated';
import NumberSalesDigitalCampaign from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/08NumberSalesDigitalCampaign/NumberSalesDigitalCampaign';
import ComparativeNumberSalesDigitalCampaign from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/09ComparativeNumberSalesDigitalCampaign/ComparativeNumberSalesDigitalCampaign';
import NumberInterestedCustomers from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/10NumberInterestedCustomers/NumberInterestedCustomers';
import ComparativeNumberInterestedCustomers from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/11ComparativeNumberInterestedCustomers/ComparativeNumberInterestedCustomers';
import ConversionRate from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/12ConversionRate/ConversionRate';
import ComparativeConversionRate from '../../../../../../components/Platform/10ReportsAndIndicators/03MarketingIndicators/13ComparativeConversionRate/ComparativeConversionRate';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function CalculateIndicatorsMarketingPage() {
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
                            <Link to="/reports-and-indicators/marketing-indicators" className={styles.buttonBackTo}>
                                Volver
                            </Link>
                        </div>
                        
                        <div>
                            <div>
                                <h1 className={styles.title}>Indicadores de Marketing</h1>
                            </div>
                        
                            <div className={styles.containerDiv}>
                                {selectedItems.map((item: string) => {
                                    let key;
                                    if (item === 'CostoAdquisicionClientes') {
                                        key = 'CostoAdquisicionClientes';
                                        return <div key={key} className={styles.divRender}><AcquisitionClients key={key} /></div>;
                                    } else if (item === 'CostoRetencionClientes') {
                                        key = 'CostoRetencionClientes';
                                        return <div key={key} className={styles.divRender}><RetentionClients key={key} /></div>;
                                    } else if (item === 'EmbudoCampañaDigital') {
                                        key = 'EmbudoCampañaDigital';
                                        return <div key={key} className={styles.divRender}><CustomerDigital key={key} /></div>;
                                    } else if (item === 'VisualizacionImpresiones') {
                                        key = 'VisualizacionImpresiones';
                                        return <div key={key} className={styles.divRender}><VisualisationImpressions key={key} /></div>;
                                    } else if (item === 'ComparativoVisualizacionImpresiones') {
                                        key = 'ComparativoVisualizacionImpresiones';
                                        return <div key={key} className={styles.divRender}><ComparativeVisualisationImpressions key={key} /></div>;
                                    } else if (item === 'ProspectosGenerados') {
                                        key = 'ProspectosGenerados';
                                        return <div key={key} className={styles.divRender}><ProspectsGenerated key={key} /></div>;
                                    } else if (item === 'ComparativoProspectosGenerados') {
                                        key = 'ComparativoProspectosGenerados';
                                        return <div key={key} className={styles.divRender}><ComparativeProspectsGenerated key={key} /></div>;
                                    } else if (item === 'NumeroVentasCampañaDigital') {
                                        key = 'NumeroVentasCampañaDigital';
                                        return <div key={key} className={styles.divRender}><NumberSalesDigitalCampaign key={key} /></div>;
                                    } else if (item === 'ComparativoNumeroVentasCampañaDigital') {
                                        key = 'ComparativoNumeroVentasCampañaDigital';
                                        return <div key={key} className={styles.divRender}><ComparativeNumberSalesDigitalCampaign key={key} /></div>;
                                    } else if (item === 'NumeroPersonasInteresadas') {
                                        key = 'NumeroPersonasInteresadas';
                                        return <div key={key} className={styles.divRender}><NumberInterestedCustomers key={key} /></div>;
                                    } else if (item === 'ComparativoNumeroPersonasInteresadas') {
                                        key = 'ComparativoNumeroPersonasInteresadas';
                                        return <div key={key} className={styles.divRender}><ComparativeNumberInterestedCustomers key={key} /></div>;
                                    } else if (item === 'TasaConversion') {
                                        key = 'TasaConversion';
                                        return <div key={key} className={styles.divRender}><ConversionRate key={key} /></div>;
                                    } else if (item === 'ComparativoTasaConversion') {
                                        key = 'ComparativoTasaConversion';
                                        return <div key={key} className={styles.divRender}><ComparativeConversionRate key={key} /></div>;
                                    } else {
                                        return null;
                                    }
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

export default CalculateIndicatorsMarketingPage;