import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
// GENERALES
import WhatsApp from './components/WhatsApp/WhatsApp';
import Telegram from './components/WhatsApp/Telegram';
import Scroll from "./components/Scroll/Scroll";

// LANDINGPAGE
import LandingPage from './pages/LandingPage/LandingPage';

// NAVBAR DE LA LANDINGPAGE
import PaymentPlansPage from './pages/LandingPage/NavBarLandingPage/01PaymentPlans/PaymentPlansPage';
import ContactUsPage from './pages/LandingPage/NavBarLandingPage/02ContactUs/ContactUsPage';
import FastSimulatorPage from './pages/LandingPage/NavBarLandingPage/03FastSimulator/FastSimulatorPage';
import AppointmentPage from './pages/LandingPage/NavBarLandingPage/04Appointment/AppointmentPage';

// Registros
import RegisterPage from './pages/LandingPage/NavBarLandingPage/05Register/RegisterPage';
import RegisterUserPage from './pages/LandingPage/NavBarLandingPage/05Register/User/00RegisterUserPage';

// Login
import LoginPage from './pages/LandingPage/NavBarLandingPage/06Login/LoginPage';
import SendEmailResetPasswordPage from './pages/LandingPage/NavBarLandingPage/06Login/SendEmailResetPassword/SendEmailResetPasswordPage';
import UnblockingAccountPage from './pages/LandingPage/NavBarLandingPage/06Login/UnblockingAccount/UnblockingAccountPage';
import ResetPasswordPage from './pages/LandingPage/NavBarLandingPage/06Login/ResetPassword/ResetPasswordPage';

// Sección de Body LandingPage
import RegisterYourTransactions from './components/LandingPage/05Characteristics/01RegisterYourTransactions/RegisterYourTransactions';
import ManageYourElectronicInvoices from './components/LandingPage/05Characteristics/02ManageYourElectronicInvoices/ManageYourElectronicInvoices';
import ManageYourCustomers from './components/LandingPage/05Characteristics/03ManageYourCustomers/ManageYourCustomers';
import CalculateIndicatorsPlus from './components/LandingPage/05Characteristics/04CalculateIndicatorsPlus/CalculateIndicatorsPlus';
import ViewDownloadReports from './components/LandingPage/05Characteristics/05ViewDownloadReports/ViewDownloadReports';
import PersonalizedAdvisories from './components/LandingPage/05Characteristics/06PersonalizedAdvisories/PersonalizedAdvisories';
import InformedDecisions from './components/LandingPage/05Characteristics/07InformedDecisions/InformedDecisions';

// Sección de Sustainability LandingPage
import Primer from './components/LandingPage/04Sustainability/01Primer/Primer';
import Segundo from './components/LandingPage/04Sustainability/02Segundo/Segundo';
import Tercer from './components/LandingPage/04Sustainability/03Tercer/Tercer';
import Cuarto from './components/LandingPage/04Sustainability/04Cuarto/Cuarto';

// FOOTER DE LA LANDINGPAGE
import Blog from './components/LandingPage/Footer/AboutUs/Blog/Blog';
import OurCompany from './components/LandingPage/Footer/AboutUs/OurCompany/OurCompany';
import KnowUs from './components/LandingPage/Footer/AboutUs/KnowUs/KnowUs';
import WorkWithUs from './components/LandingPage/Footer/AboutUs/WorkWithUs/WorkWithUs';
import AlliancesAndPrograms from './components/LandingPage/Footer/AboutUs/AlliancesAndPrograms/AlliancesAndPrograms';
import TermsAndConditions from './components/LandingPage/Footer/Legal/TermsAndConditions/TermsAndConditions';
import DataProcessing from './components/LandingPage/Footer/Legal/DataProcessing/DataProcessing';
import HabeasData from './components/LandingPage/Footer/Legal/HabeasData/HabeasData';
import MembershipAgreement from './components/LandingPage/Footer/Legal/MembershipAgreement/MembershipAgreement';
import Help from './components/LandingPage/Footer/Support/Help/Help';
import Trainings from './components/LandingPage/Footer/Support/Trainings/Trainings';
import APIDocumentation from './components/LandingPage/Footer/Support/APIDocumentation/APIDocumentation';

//Error 404
import Error404 from './pages/Error404/Error404';

// PROTECCION DE RUTAS
import ProtectedRoute from './ProtectedRoute';

// NAVBAR PLATAFORMA
import QuestionsPage from './pages/Platform/PanelUser/00NavBar/01Questions/QuestionsPage';
import ServicesEcopcionPage from './pages/Platform/PanelUser/00NavBar/02ServicesEcopcionPage/ServicesEcopcionPage';
import NotificationsPage from './pages/Platform/PanelUser/00NavBar/03Notifications/NotificationsPage';
import ConfigurationPage from './pages/Platform/PanelUser/00NavBar/04Configuration/ConfigurationPage';

// SIDEBAR PLATAFORMA
// SIDEBAR - HOME
import Home from './pages/Platform/PanelUser/01Home/HomePage';
import ProfilePage from './pages/Platform/PanelUser/00NavBar/04Configuration/Profile/ProfilePage';
// SIDEBAR - TUS SEDES
import BranchCardPage from './pages/Platform/PanelUser/02Branch/BranchCard/BranchCardPage';
import CreateBranchPage from './pages/Platform/PanelUser/02Branch/CreateBranch/CreateBranchPage';
// SIDEBAR - INVENTARIOS
import InventoriesPage from './pages/Platform/PanelUser/03Inventories/InventoriesPage';
// SIDEBAR - INVENTARIOS - ASSETS
import AssetsPage from './pages/Platform/PanelUser/03Inventories/01InventoryAssets/AssetsCard/AssetsCardPage';
import CreateAssetPage from './pages/Platform/PanelUser/03Inventories/01InventoryAssets/CreateAssets/CreateAssetPage';
// SIDEBAR - INVENTARIOS - MERCHANDISES
import MerchadisesPage from './pages/Platform/PanelUser/03Inventories/02InventoryMerchadises/MerchadisesCard/MerchadisesCardPage';
import CreateMerchandisePage from './pages/Platform/PanelUser/03Inventories/02InventoryMerchadises/CreateMerchandise/CreateMerchandisePage';
// SIDEBAR - INVENTARIOS - PRODUCTS
import ProductsPage from './pages/Platform/PanelUser/03Inventories/03InventoryProducts/ProductsCard/ProductsCardPage';
import CreateProductPage from './pages/Platform/PanelUser/03Inventories/03InventoryProducts/CreateProduct/CreateProductPage';
import QuoteProductPage from './pages/Platform/PanelUser/03Inventories/03InventoryProducts/QuoteProduct/QuoteProductPage';
// SIDEBAR - INVENTARIOS - RAWMATERIALS
import RawMateralsPage from './pages/Platform/PanelUser/03Inventories/04InventoryRawMaterals/RawMateralCard/RawMateralCardPage';
import CreateRawMateralPage from './pages/Platform/PanelUser/03Inventories/04InventoryRawMaterals/CreateRawMateral/CreateRawMateralPage';
// SIDEBAR - INVENTARIOS - SERVICES
import ServicesPage from './pages/Platform/PanelUser/03Inventories/05InventoryServices/ServicesCard/ServicesCardPage';
import CreateServicePage from './pages/Platform/PanelUser/03Inventories/05InventoryServices/CreateService/CreateServicePage';
// SIDEBAR - INVENTARIOS - ACCOUNTS
import AccountsPage from './pages/Platform/PanelUser/04Accounts/AccountsPage';
// SIDEBAR - INVENTARIOS - INVOICING-AND-POS
import InvoicingAndPosPage from './pages/Platform/PanelUser/05InvoicingAndPos/InvoicingAndPosPage';
// SIDEBAR - INVENTARIOS - ELECTRONIC-PAYROLL
import ElectronicPayrollPage from './pages/Platform/PanelUser/06ElectronicPayroll/ElectronicPayrollPage';
// SIDEBAR - INVENTARIOS - CRM-CLIENT
import CrmClientsPage from './pages/Platform/PanelUser/07CrmClients/CrmClientsCard/CrmClientsCardPage';
import CreateCrmClientPage from './pages/Platform/PanelUser/07CrmClients/CreateCrmClient/CreateCrmClientPage';
// SIDEBAR - INVENTARIOS - CRM-SUPPLIER
import CrmSuppliersPage from './pages/Platform/PanelUser/08CrmSuppliers/CrmSuppliers/CrmSuppliersCardPage';
import CreateCrmSupplierPage from './pages/Platform/PanelUser/08CrmSuppliers/CreateCrmSuppliers/CreateCrmSuppliersPage';
// SIDEBAR - INVENTARIOS - SUSTAINABILITY
import SustainabilityPage from './pages/Platform/PanelUser/09Sustainability/SustainabilityPage';
// SIDEBAR - INVENTARIOS - REPORT-AND-INDICATORS
import ReportsAndIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/ReportsAndIndicatorsPage';
import FinancialIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/FinancialIndicator/FinancialIndicatorsPage';
import MarketingIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/MarketingIndicator/MarketingIndicatorsPage';
import SustainabilityIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/SustainabilityIndicator/SustainabilityIndicatorsPage';
// SIDEBAR - INVENTARIOS - STRATEGIC-NOTIFICATIONS
import StrategicNotificationsPage from './pages/Platform/PanelUser/11StrategicNotifications/StrategicNotificationsPage';
// SIDEBAR - INVENTARIOS - CONSULTANCIES
import ConsultanciesPage from './pages/Platform/PanelUser/12Consultancies/ConsultanciesPage';


function App() {

    return (
        <div>
            <BrowserRouter>
                <WhatsApp />
                <Telegram />
                <Scroll />
                <Routes>
                    {/* LandingPage */}
                    <Route path='/' element={<LandingPage />} />
                        {/* Registros */}
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/register-user' element={<RegisterUserPage />} />
                        {/* Login */}
                        <Route path='/login' element={<LoginPage />} />
                        {/* Recuperación de contraseñas y desbloqueos de cuenta de User */}
                        <Route path='/reset-password' element={<SendEmailResetPasswordPage />} />
                        <Route path='/unblocking-account/complete/:idParams' element={<UnblockingAccountPage />} />
                        <Route path='/reset-password/complete/:idParams/:passwordResetCode' element={<ResetPasswordPage />} />
                        {/* Sección de NavBar LandingPage */}
                        <Route path='/paymentPlans' element={<PaymentPlansPage />} />
                        <Route path='/contactUs' element={<ContactUsPage />} />
                        <Route path='/fastSimulator' element={<FastSimulatorPage />} />
                        <Route path='/appointment' element={<AppointmentPage />} />
                        {/* Sección de Body LandingPage */}
                        <Route path='/register-your-transactions' element={<RegisterYourTransactions />} />
                        <Route path='/manage-your-electronic-invoices' element={<ManageYourElectronicInvoices />} />
                        <Route path='/manage-your-customers' element={<ManageYourCustomers />} />
                        <Route path='/calculate-indicators-plus' element={<CalculateIndicatorsPlus />} />
                        <Route path='/view-download-reports' element={<ViewDownloadReports />} />
                        <Route path='/personalized-advisories' element={<PersonalizedAdvisories />} />
                        <Route path='/informed-decisions' element={<InformedDecisions />} />
                        {/* Sección de Sustainability LandingPage */}
                        <Route path='/primer' element={<Primer />} />
                        <Route path='/segundo' element={<Segundo />} />
                        <Route path='/tercer' element={<Tercer />} />
                        <Route path='/cuarto' element={<Cuarto />} />
                        {/* Sección de Footer LandingPage */}
                        <Route path='/blog' element={<Blog />} />
                        <Route path='/ourCompany' element={<OurCompany />} />
                        <Route path='/knowUs' element={<KnowUs />} />
                        <Route path='/workWithUs' element={<WorkWithUs />} />
                        <Route path='/alliancesAndPrograms' element={<AlliancesAndPrograms />} />
                        <Route path='/termsAndConditions' element={<TermsAndConditions />} />
                        <Route path='/dataProcessing' element={<DataProcessing />} />
                        <Route path='/habeasData' element={<HabeasData />} />
                        <Route path='/membershipAgreement' element={<MembershipAgreement />} />
                        <Route path='/help' element={<Help />} />
                        <Route path='/trainings' element={<Trainings />} />
                        <Route path='/apiDocumentation' element={<APIDocumentation />} />
                        {/* Rutas Protegidas */}
                        <Route element={<ProtectedRoute />}>
                            {/* Sección NavBar */}
                            <Route path='/questions' element={<QuestionsPage />} />
                            <Route path='/services' element={<ServicesEcopcionPage />} />
                            <Route path='/notifications' element={<NotificationsPage />} />
                            <Route path='/configuration' element={<ConfigurationPage />} />
                            <Route path='/configuration/profile' element={<ProfilePage />} />

                            {/* SideBar Home */}
                            <Route path='/home' element={<Home />} />
                            {/* SideBar Tus Sedes */}
                            <Route path='/branches/consult-branches' element={<BranchCardPage />} />
                            <Route path='/branches/create-branches' element={<CreateBranchPage onCreateBranch={function (): void { throw new Error('Function not implemented.'); } } />} />

                            {/* SideBar Inventarios */}
                            <Route path='/inventories' element={<InventoriesPage />} />
                            {/* SideBar Inventarios - Assets */}
                            <Route path='/inventories/consult-assets' element={<AssetsPage />} />
                            <Route path='/inventories/create-assets' element={<CreateAssetPage />} />
                            {/* SideBar Inventarios - Merchadises */}
                            <Route path='/inventories/consult-merchandises' element={<MerchadisesPage />} />
                            <Route path='/inventories/create-merchandises' element={<CreateMerchandisePage />} />
                            {/* SideBar Inventarios - Products */}
                            <Route path='/inventories/consult-products' element={<ProductsPage />} />
                            <Route path='/inventories/create-products' element={<CreateProductPage />} />
                            <Route path='/inventories/quote-products' element={<QuoteProductPage />} />
                            {/* SideBar Inventarios - Rawmaterals */}
                            <Route path='/inventories/consult-raw-materals' element={<RawMateralsPage />} />
                            <Route path='/inventories/create-raw-materals' element={<CreateRawMateralPage />} />
                            {/* SideBar Inventarios - Services */}
                            <Route path='/inventories/consult-services' element={<ServicesPage />} />
                            <Route path='/inventories/create-services' element={<CreateServicePage />} />
                            {/* SideBar Cuentas */}
                            <Route path='/accounts' element={<AccountsPage />} />
                            {/* SideBar Facturación y POS */}
                            <Route path='/invoicing-and-pos' element={<InvoicingAndPosPage />} />
                            {/* SideBar Nómina electrónica */}
                            <Route path='/electronic-payroll' element={<ElectronicPayrollPage />} />
                            {/* SideBar CRM Clientes */}
                            <Route path='/crm-clients/consult-crm-clients' element={<CrmClientsPage />} />
                            <Route path='/crm-clients/create-crm-clients' element={<CreateCrmClientPage />} />
                            {/* SideBar CRM Proveedores */}
                            <Route path='/crm-suppliers/consult-crm-suppliers' element={<CrmSuppliersPage />} />
                            <Route path='/crm-suppliers/create-crm-suppliers' element={<CreateCrmSupplierPage />} />
                            {/* SideBar Sostenibilidad */}
                            <Route path='/sustainability' element={<SustainabilityPage />} />
                            {/* SideBar Reportes e indicadores */}
                            <Route path='/reports-and-indicators' element={<ReportsAndIndicatorsPage />} />
                            <Route path='/reports-and-indicators/financial-indicators' element={<FinancialIndicatorsPage />} />
                            <Route path='/reports-and-indicators/marketing-indicators' element={<MarketingIndicatorsPage />} />
                            <Route path='/reports-and-indicators/sustainability-indicators' element={<SustainabilityIndicatorsPage />} />
                            {/* SideBar Notificaciones estratégicas */}
                            <Route path='/strategic-notifications' element={<StrategicNotificationsPage />} />
                            {/* SideBar Asesorías para toma de decisiones */}
                            <Route path='/consultancies' element={<ConsultanciesPage />} />
                        </Route>
                    {/* Sección Error 404 */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;