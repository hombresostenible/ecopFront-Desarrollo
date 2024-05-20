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

// PLATAFORMA
import Home from './pages/Platform/PanelUser/01Home/HomePage';
import ProfilePage from './pages/Platform/PanelUser/00NavBar/04Configuration/Profile/ProfilePage';
// import BranchPage from './pages/Platform/PanelUser/02Branch/BranchPage';
import BranchCardPage from './pages/Platform/PanelUser/02Branch/BranchCard/BranchCardPage';
import CreateBranchPage from './pages/Platform/PanelUser/02Branch/CreateBranch/CreateBranchPage';


// import InventoriesPage from './pages/Platform/PanelUser/03Inventories/InventoriesPage';
import AssetsPage from './pages/Platform/PanelUser/03Inventories/01InventoryAssets/AssetsCard/AssetsCardPage';
import MerchadisesPage from './pages/Platform/PanelUser/03Inventories/02InventoryMerchadises/MerchadisesCard/MerchadisesCardPage';
import ProductsPage from './pages/Platform/PanelUser/03Inventories/03InventoryProducts/ProductsCard/ProductsCardPage';
import RawMateralsPage from './pages/Platform/PanelUser/03Inventories/04InventoryRawMaterals/InventoryRawMateralsPage';
import ServicesPage from './pages/Platform/PanelUser/03Inventories/05InventoryServices/InventoryServicesPage';
import AccountsPage from './pages/Platform/PanelUser/04Accounts/AccountsPage';
import InvoicingAndPosPage from './pages/Platform/PanelUser/05InvoicingAndPos/InvoicingAndPosPage';
import ElectronicPayrollPage from './pages/Platform/PanelUser/06ElectronicPayroll/ElectronicPayrollPage';
import CrmClientsPage from './pages/Platform/PanelUser/07CrmClients/CrmClientsPage';
import CrmSuppliersPage from './pages/Platform/PanelUser/08CrmSuppliers/CrmSuppliersPage';
import SustainabilityPage from './pages/Platform/PanelUser/09Sustainability/SustainabilityPage';
import ReportsAndIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/ReportsAndIndicatorsPage';
import StrategicNotificationsPage from './pages/Platform/PanelUser/11StrategicNotifications/StrategicNotificationsPage';
import ConsultanciesPage from './pages/Platform/PanelUser/12Consultancies/ConsultanciesPage';

import QuestionsPage from './pages/Platform/PanelUser/00NavBar/01Questions/QuestionsPage';
import ServicesEcopcionPage from './pages/Platform/PanelUser/00NavBar/02ServicesEcopcionPage/ServicesEcopcionPage';
import NotificationsPage from './pages/Platform/PanelUser/00NavBar/03Notifications/NotificationsPage';
import ConfigurationPage from './pages/Platform/PanelUser/00NavBar/04Configuration/ConfigurationPage';

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

                            {/* SideBar Tus Sedes */}
                            <Route path='/home' element={<Home />} />
                            <Route path='/branches/consult-branches' element={<BranchCardPage />} />
                            <Route path='/branches/create-branches' element={<CreateBranchPage onCreateBranch={function (): void { throw new Error('Function not implemented.'); } } />} />

                            {/* SideBar Inventarios */}
                            {/* <Route path='/inventories' element={<InventoriesPage />} /> */}
                            <Route path='/inventories/assets' element={<AssetsPage />} />
                            <Route path='/inventories/merchadises' element={<MerchadisesPage />} />
                            <Route path='/inventories/products' element={<ProductsPage />} />
                            <Route path='/inventories/raw-materals' element={<RawMateralsPage />} />
                            <Route path='/inventories/services' element={<ServicesPage />} />

                            {/* SideBar Cuentas */}
                            <Route path='/accounts' element={<AccountsPage />} />

                            {/* SideBar Facturación y POS */}
                            <Route path='/invoicing-and-pos' element={<InvoicingAndPosPage />} />

                            {/* SideBar Nómina electrónica */}
                            <Route path='/electronic-payroll' element={<ElectronicPayrollPage />} />

                            {/* SideBar CRM Clientes */}
                            <Route path='/crm-clients' element={<CrmClientsPage />} />

                            {/* SideBar CRM Proveedores */}
                            <Route path='/crm-suppliers' element={<CrmSuppliersPage />} />

                            {/* SideBar Sostenibilidad */}
                            <Route path='/sustainability' element={<SustainabilityPage />} />

                            {/* SideBar Reportes e indicadores */}
                            <Route path='/reports-and-indicators' element={<ReportsAndIndicatorsPage />} />

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