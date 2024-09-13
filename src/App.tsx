import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
// GENERALES
import WhatsApp from './components/WhatsApp/WhatsApp';
import Telegram from './components/WhatsApp/Telegram';
import Scroll from "./components/Scroll/Scroll";
import Notification from './components/Platform/PanelUser/Notifications/Notification';
// LANDINGPAGE
import LandingPage from './pages/LandingPage/LandingPage';
// NAVBAR DE LA LANDINGPAGE
import PaymentPlansPage from './pages/LandingPage/NavBarLandingPage/01PaymentPlans/PaymentPlansPage';
import ContactUsPage from './pages/LandingPage/NavBarLandingPage/02ContactUs/ContactUsPage';
import FastSimulatorPage from './pages/LandingPage/NavBarLandingPage/03FastSimulator/FastSimulatorPage';
import AppointmentPage from './pages/LandingPage/NavBarLandingPage/04Appointment/AppointmentPage';
// REGISTER
import RegisterPage from './pages/LandingPage/NavBarLandingPage/05Register/RegisterPage';
import RegisterUserPage from './pages/LandingPage/NavBarLandingPage/05Register/User/00RegisterUserPage';
// LOGIN
import LoginPage from './pages/LandingPage/NavBarLandingPage/06Login/LoginPage';
import SendEmailResetPasswordPage from './pages/LandingPage/NavBarLandingPage/06Login/SendEmailResetPassword/SendEmailResetPasswordPage';
import ResetPasswordPage from './pages/LandingPage/NavBarLandingPage/06Login/ResetPassword/ResetPasswordPage';
import UnblockingAccountPage from './pages/LandingPage/NavBarLandingPage/06Login/UnblockingAccount/UnblockingAccountPage';
// Sección de Body LandingPage
import RegisterYourTransactions from './components/LandingPage/05Characteristics/01RegisterYourTransactions/RegisterYourTransactions';
import ManageYourElectronicInvoices from './components/LandingPage/05Characteristics/02ManageYourElectronicInvoices/ManageYourElectronicInvoices';
import ManageYourCustomers from './components/LandingPage/05Characteristics/03ManageYourCustomers/ManageYourCustomers';
import ManagingSustainabilityBusiness from './components/LandingPage/05Characteristics/04ManagingSustainabilityBusiness/ManagingSustainabilityBusiness';
import ViewDownloadReports from './components/LandingPage/05Characteristics/05ViewDownloadReports/ViewDownloadReports';
import PersonalizedAdvisories from './components/LandingPage/05Characteristics/06PersonalizedAdvisories/PersonalizedAdvisories';
import InformedDecisions from './components/LandingPage/05Characteristics/07InformedDecisions/InformedDecisions';
// Sección de Sustainability LandingPage
import Primer from './components/LandingPage/04Sustainability/01Primer/Primer';
import Segundo from './components/LandingPage/04Sustainability/02Segundo/Segundo';
import Tercer from './components/LandingPage/04Sustainability/03Tercer/Tercer';
import Cuarto from './components/LandingPage/04Sustainability/04Cuarto/Cuarto';
// FOOTER DE LA LANDINGPAGE
import Blog from './pages/LandingPage/Footer/AboutUs/Blog/Blog';
import OurCompany from './pages/LandingPage/Footer/AboutUs/OurCompany/OurCompany';
import KnowUs from './pages/LandingPage/Footer/AboutUs/KnowUs/KnowUs';
import WorkWithUs from './pages/LandingPage/Footer/AboutUs/WorkWithUs/WorkWithUs';
import AlliancesAndPrograms from './pages/LandingPage/Footer/AboutUs/AlliancesAndPrograms/AlliancesAndPrograms';
import TermsAndConditions from './pages/LandingPage/Footer/Legal/TermsAndConditions/TermsAndConditions';
import DataProcessing from './pages/LandingPage/Footer/Legal/DataProcessing/DataProcessing';
import HabeasData from './pages/LandingPage/Footer/Legal/HabeasData/HabeasData';
import MembershipAgreement from './pages/LandingPage/Footer/Legal/MembershipAgreement/MembershipAgreement';
import Help from './pages/LandingPage/Footer/Support/Help/Help';
import Trainings from './pages/LandingPage/Footer/Support/Trainings/Trainings';
import APIDocumentation from './pages/LandingPage/Footer/Support/APIDocumentation/APIDocumentation';
// ERROR 404
import Error404 from './pages/Error404/Error404';
// PROTECCION DE RUTAS
import ProtectedRoute from './ProtectedRoute';
// NAVBAR PLATAFORMA - QUESTIONS
import QuestionsPage from './pages/Platform/PanelUser/00NavBar/01Questions/QuestionsPage';
import KeyInformationManageYourBusiness from './pages/Platform/PanelUser/00NavBar/01Questions/01KeyInformationManageYourBusiness/KeyInformationManageYourBusiness';
import ContactSupport from './pages/Platform/PanelUser/00NavBar/01Questions/02ContactSupport/ContactSupport';
import OperationPlatform from './pages/Platform/PanelUser/00NavBar/01Questions/03OperationPlatform/OperationPlatform';
// NAVBAR PLATAFORMA - SERVICES
import ServicesPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/ServicesPage';
import ServiceActivateNewPlansPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/01ServiceActivateNewPlans/ServiceActivateNewPlansPage';
// NAVBAR PLATAFORMA - NOTIFICATIONS
import NotificationsPage from './pages/Platform/PanelUser/00NavBar/03Notifications/NotificationsPage';
// NAVBAR PLATAFORMA - CONFIGURATION
import ProfileUserPage from './pages/Platform/PanelUser/00NavBar/04Configuration/01ProfileUser/ProfileUserPage';
// import YourCurrentPlanPage from './pages/Platform/PanelUser/00NavBar/04Configuration/02YourCurrentPlan/YourCurrentPlanPage';
import MailConfigurationPage from './pages/Platform/PanelUser/00NavBar/04Configuration/05MailConfiguration/MailConfigurationPage';
// import BillingConfigurationPage from './pages/Platform/PanelUser/00NavBar/04Configuration/03BillingConfiguration/BillingConfigurationPage';
// import RoleInformationPage from './pages/Platform/PanelUser/00NavBar/04Configuration/04RoleInformation/RoleInformationPage';
// SIDEBAR - HOME
import HomePage from './pages/Platform/PanelUser/01Home/HomePage';
// SIDEBAR - TUS SEDES
import ConsultBranchPage from './pages/Platform/PanelUser/02Branch/ConsultBranch/ConsultBranchPage';
import CreateBranchPage from './pages/Platform/PanelUser/02Branch/CreateBranch/CreateBranchPage';
// SIDEBAR - INVENTARIOS
import BranchPage from './pages/Platform/PanelUser/02Branch/BranchPage';
import InventoriesPage from './pages/Platform/PanelUser/03Inventories/InventoriesPage';
// SIDEBAR - INVENTARIOS - ASSETS
import ConsultAssetsPage from './pages/Platform/PanelUser/03Inventories/01InventoryAssets/ConsultAssets/ConsultAssetsPage';
import CreateAssetsPage from './pages/Platform/PanelUser/03Inventories/01InventoryAssets/CreateAssets/CreateAssetsPage';
// SIDEBAR - INVENTARIOS - MERCHANDISES
import ConsultMerchandisesPage from './pages/Platform/PanelUser/03Inventories/02InventoryMerchadises/ConsultMerchandises/ConsultMerchandisesPage';
import CreateMerchandisesPage from './pages/Platform/PanelUser/03Inventories/02InventoryMerchadises/CreateMerchandises/CreateMerchandisesPage';
// SIDEBAR - INVENTARIOS - PRODUCTS
import ConsultProductsPage from './pages/Platform/PanelUser/03Inventories/03InventoryProducts/ConsultProducts/ConsultProductsPage';
import CreateProductsPage from './pages/Platform/PanelUser/03Inventories/03InventoryProducts/CreateProducts/CreateProductsPage';
import QuoteProductsPage from './pages/Platform/PanelUser/03Inventories/03InventoryProducts/QuoteProducts/QuoteProductsPage';
// SIDEBAR - INVENTARIOS - RAWMATERIALS
import ConsultRawMateralsPage from './pages/Platform/PanelUser/03Inventories/04InventoryRawMaterals/ConsultRawMaterals/ConsultRawMateralsPage';
import CreateRawMateralsPage from './pages/Platform/PanelUser/03Inventories/04InventoryRawMaterals/CreateRawMaterals/CreateRawMateralsPage';
// SIDEBAR - INVENTARIOS - SERVICES
import ConsultServicesPage from './pages/Platform/PanelUser/03Inventories/05InventoryServices/ConsultServices/ConsultServicesPage';
import CreateServicesPage from './pages/Platform/PanelUser/03Inventories/05InventoryServices/CreateServices/CreateServicesPage';
// SIDEBAR - ACCOUNTS
import AccountsPage from './pages/Platform/PanelUser/04Accounts/AccountsPage';
import SeeRecordsPage from './pages/Platform/PanelUser/04Accounts/01SeeRecordsAccountsBook/SeeRecordsAccountsBookPage';
import CreateIncomePage from './pages/Platform/PanelUser/04Accounts/02Income/CreateIncome/CreateIncomePage';
import CreateExpensesPage from './pages/Platform/PanelUser/04Accounts/03Expenses/CreateExpenses/CreateExpensesPage';
import PendingApprovalPage from './pages/Platform/PanelUser/04Accounts/04PendingApproval/PendingApprovalPage';
// SIDEBAR - INVOICING-AND-POS
import InvoicingAndPosPage from './pages/Platform/PanelUser/05InvoicingAndPos/InvoicingAndPosPage';
import SellPointOfSalePage from './pages/Platform/PanelUser/05InvoicingAndPos/01SellPointOfSalePage/01SellPointOfSale/SellPointOfSalePage';
import ElectronicInvoicingPage from './pages/Platform/PanelUser/05InvoicingAndPos/01SellPointOfSalePage/02ElectronicInvoicing/ElectronicInvoicingPage';
import SeeElectronicInvoicingPosPage from './pages/Platform/PanelUser/05InvoicingAndPos/02SeeElectronicInvoicingPosPage/SeeElectronicInvoicingPosPage';
import ConsultCreditNotes from './pages/Platform/PanelUser/05InvoicingAndPos/03CreditNotes/ConsultCreditNotes/ConsultCreditNotes';
import CreateCreditNotesPage from './pages/Platform/PanelUser/05InvoicingAndPos/03CreditNotes/CreateCreditNotes/CreateCreditNotesPage';
import ConsultDebitNotesPage from './pages/Platform/PanelUser/05InvoicingAndPos/04DebitNotes/ConsultDebitNotes/ConsultDebitNotesPage';
import CreateDebitNotesPage from './pages/Platform/PanelUser/05InvoicingAndPos/04DebitNotes/CreateDebitNotes/CreateDebitNotesPage';
import RecurringInvoicesPage from './pages/Platform/PanelUser/05InvoicingAndPos/05RecurringInvoices/RecurringInvoicesPage';
import ReceivedPaymentsPage from './pages/Platform/PanelUser/05InvoicingAndPos/06ReceivedPayments/ReceivedPaymentsPage';
import QuotesPage from './pages/Platform/PanelUser/05InvoicingAndPos/07Quotes/QuotesPage';
// SIDEBAR - ELECTRONIC-PAYROLL
import ElectronicPayrollPage from './pages/Platform/PanelUser/06ElectronicPayroll/ElectronicPayrollPage';
import ConsultCollaboratorPage from './pages/Platform/PanelUser/06ElectronicPayroll/01Collaborator/01ConsultCollaborator/ConsultCollaboratorPage';
import CreateCollaboratorPage from './pages/Platform/PanelUser/06ElectronicPayroll/01Collaborator/02CreateCollaborator/CreateCollaboratorPage';
import ConsultPayrollPaymentsPage from './pages/Platform/PanelUser/06ElectronicPayroll/02PayrollPayments/01ConsultPayrollPayments/ConsultPayrollPaymentsPage';
import CreatePayrollPaymentsPage from './pages/Platform/PanelUser/06ElectronicPayroll/02PayrollPayments/02CreatePayrollPayments/CreatePayrollPaymentsPage';
import CertificationsPage from './pages/Platform/PanelUser/06ElectronicPayroll/03Certifications/CertificationsPage';
import PayrollSettlementPage from './pages/Platform/PanelUser/06ElectronicPayroll/04PayrollSettlement/PayrollSettlementPage';
// SIDEBAR - CRM-CLIENT
import CrmClientsPage from './pages/Platform/PanelUser/07CrmClients/ConsultCrmClients/ConsultCrmClientsPage';
import CreateCrmClientPage from './pages/Platform/PanelUser/07CrmClients/CreateCrmClient/CreateCrmClientPage';
// SIDEBAR - CRM-SUPPLIER
import CrmSuppliersPage from './pages/Platform/PanelUser/08CrmSuppliers/ConsultCrmSuppliers/ConsultCrmSuppliersPage';
import CreateCrmSupplierPage from './pages/Platform/PanelUser/08CrmSuppliers/CreateCrmSuppliers/CreateCrmSuppliersPage';
import TrackingYourPurchases from './pages/Platform/PanelUser/08CrmSuppliers/TrackingYourPurchases/TrackingYourPurchases';
import CustomerTracking from './pages/Platform/PanelUser/07CrmClients/CustomerTracking/CustomerTracking';
// SIDEBAR - SUSTAINABILITY
import SustainabilityPage from './pages/Platform/PanelUser/09Sustainability/SustainabilityPage';
import EnvironmentalStandardsConsultationPage from './pages/Platform/PanelUser/09Sustainability/01EnvironmentalStandardsConsultation/EnvironmentalStandardsConsultationPage';
import PlanDesignPage from './pages/Platform/PanelUser/09Sustainability/02PlanDesign/PlanDesignPage';
import AsgReportsPage from './pages/Platform/PanelUser/09Sustainability/03AsgReports/AsgReportsPage';
import SustainabilityStoriesPage from './pages/Platform/PanelUser/09Sustainability/04SustainabilityStories/SustainabilityStoriesPage';
import DiagnosticsPage from './pages/Platform/PanelUser/09Sustainability/05Diagnostics/DiagnosticsPage';
// SIDEBAR - REPORT-AND-INDICATORS
import ReportsAndIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/ReportsAndIndicatorsPage';
import BillingIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/01BillingIndicators/BillingIndicatorsPage';
import AccountsAndInventoryIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/AccountsAndInventoryIndicatorsPage';
import CalculateIndicatorsFinancialsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/CalculateIndicatorsFinancials/CalculateFinancialIndicatorsPage';
import MarketingIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/03MarketingIndicators/MarketingIndicatorsPage';
import CalculateIndicatorsMarketingPage from './pages/Platform/PanelUser/10ReportsAndIndicators/03MarketingIndicators/CalculateIndicatorsMarketing/CalculateIndicatorsMarketingPage';
import SustainabilityIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/04SustainabilityIndicators/SustainabilityIndicatorsPage';
import CustomReportPage from './pages/Platform/PanelUser/10ReportsAndIndicators/05CustomReport/CustomReportPage';
import DailyReportPage from './pages/Platform/PanelUser/10ReportsAndIndicators/06DailyReport/DailyReportPage';
import EndOfMonthReportPage from './pages/Platform/PanelUser/10ReportsAndIndicators/07EndOfMonthReport/EndOfMonthReportPage';
import SuggestedReportPage from './pages/Platform/PanelUser/10ReportsAndIndicators/08SuggestedReport/SuggestedReportPage';
// SIDEBAR - STRATEGIC-NOTIFICATIONS
import StrategicNotificationsPage from './pages/Platform/PanelUser/11StrategicNotifications/StrategicNotificationsPage';
import ProductExpiryPage from './pages/Platform/PanelUser/11StrategicNotifications/01ProductExpiry/ProductExpiryPage';
import TaxCalendarPage from './pages/Platform/PanelUser/11StrategicNotifications/02TaxCalendar/TaxCalendarPage';
// SIDEBAR - CONSULTANCIES
import ConsultanciesPage from './pages/Platform/PanelUser/12Consultancies/ConsultanciesPage';
import ContactAnAdvisorPage from './pages/Platform/PanelUser/12Consultancies/01ContactAnAdvisor/ContactAnAdvisorPage';

function App() {
    const [notifications, setNotifications] = useState<{ id: number; type: 'success' | 'delete' | 'error'; message: string }[]>([]);

    const addNotification = (type: 'success' | 'delete' | 'error', message: string) => {
      const id = Date.now();
      setNotifications([...notifications, { id, type, message }]);
  
      setTimeout(() => {
        setNotifications((notifications) => notifications.filter(notification => notification.id !== id));
      }, 5000);
    };

    return (
        <div className="container__General">
            <BrowserRouter>
                <WhatsApp />
                <Telegram />
                <Scroll />
                <div className="notification__Container">
                    {notifications.map(({ id, type, message }) => (
                        <Notification key={id} type={type} message={message} onClose={() => setNotifications(notifications.filter(notification => notification.id !== id))} />
                    ))}
                </div>
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
                    <Route path='/reset-password/complete/:idParams/:passwordResetCode' element={<ResetPasswordPage />} />
                    <Route path='/unblocking-account/complete/:idParams' element={<UnblockingAccountPage />} />
                    {/* Sección de NavBar LandingPage */}
                    <Route path='/payment-plans' element={<PaymentPlansPage />} />
                    <Route path='/contactUs' element={<ContactUsPage />} />
                    <Route path='/fast-simulator' element={<FastSimulatorPage />} />
                    <Route path='/appointment' element={<AppointmentPage />} />
                    {/* Sección de Body LandingPage */}
                    <Route path='/register-your-transactions' element={<RegisterYourTransactions />} />
                    <Route path='/manage-your-electronic-invoices' element={<ManageYourElectronicInvoices />} />
                    <Route path='/manage-your-customers' element={<ManageYourCustomers />} />
                    <Route path='/managing-sustainability-business' element={<ManagingSustainabilityBusiness />} />
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
                    <Route path='/our-company' element={<OurCompany />} />
                    <Route path='/know-us' element={<KnowUs />} />
                    <Route path='/work-with-us' element={<WorkWithUs />} />
                    <Route path='/alliances-and-programs' element={<AlliancesAndPrograms />} />
                    <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
                    <Route path='/data-processing' element={<DataProcessing />} />
                    <Route path='/habeas-data' element={<HabeasData />} />
                    <Route path='/membership-agreement' element={<MembershipAgreement />} />
                    <Route path='/help' element={<Help />} />
                    <Route path='/trainings' element={<Trainings />} />
                    <Route path='/api-documentation' element={<APIDocumentation />} />
                    {/* Rutas Protegidas */}
                    <Route element={<ProtectedRoute />}>
                        <Route path='/home' element={<HomePage />} />
                        {/* Sección NavBar - Questions */}
                        <Route path='/questions' element={<QuestionsPage />} />
                        <Route path='/questions/information-manage-your-business' element={<KeyInformationManageYourBusiness />} />
                        <Route path='/questions/support-contact' element={<ContactSupport />} />
                        <Route path='/questions/operation-platform' element={<OperationPlatform />} />
                        {/* Sección NavBar - Services */}
                        <Route path='/services' element={<ServicesPage />} />
                        <Route path='/services/activate-new-plans' element={<ServiceActivateNewPlansPage />} />
                        {/* Sección NavBar - Notifications */}
                        <Route path='/notifications' element={<NotificationsPage />} />
                        {/* Sección NavBar - Configuration */}
                        <Route path='/configuration/profile' element={<ProfileUserPage />} />
                        {/* <Route path='/configuration/your-current-plan' element={<YourCurrentPlanPage />} /> */}
                        <Route path='/configuration/mail-configuration' element={<MailConfigurationPage />} />
                        {/* <Route path='/configuration/billing-configuration' element={<BillingConfigurationPage />} /> */}
                        {/* <Route path='/configuration/role-information' element={<RoleInformationPage />} /> */}
                        {/* SideBar Home */}
                        {/* SideBar Tus Sedes */}
                        <Route path='/branches' element={<BranchPage />} />
                        <Route path='/branches/consult-branches' element={<ConsultBranchPage addNotification={addNotification} />} />
                        <Route path='/branches/create-branches' element={<CreateBranchPage addNotification={addNotification} />} />
                        {/* SideBar Inventarios */}
                        <Route path='/inventories' element={<InventoriesPage />} />
                        {/* SideBar Inventarios - Assets */}
                        <Route path='/inventories/consult-assets' element={<ConsultAssetsPage />} />
                        <Route path='/inventories/create-assets' element={<CreateAssetsPage addNotification={addNotification} />} />
                        {/* SideBar Inventarios - Merchadises */}
                        <Route path='/inventories/consult-merchandises' element={<ConsultMerchandisesPage />} />
                        <Route path='/inventories/create-merchandises' element={<CreateMerchandisesPage addNotification={addNotification}/>} />
                        {/* SideBar Inventarios - Products */}
                        <Route path='/inventories/consult-products' element={<ConsultProductsPage />} />
                        <Route path='/inventories/create-products' element={<CreateProductsPage selectedBranchId={''} addNotification={addNotification}/>} />
                        <Route path='/inventories/quote-products' element={<QuoteProductsPage />} />
                        {/* SideBar Inventarios - Rawmaterals */}
                        <Route path='/inventories/consult-raw-materals' element={<ConsultRawMateralsPage />} />
                        <Route path='/inventories/create-raw-materals' element={<CreateRawMateralsPage addNotification={addNotification}/>} />
                        {/* SideBar Inventarios - Services */}
                        <Route path='/inventories/consult-services' element={<ConsultServicesPage />} />
                        <Route path='/inventories/create-services' element={<CreateServicesPage addNotification={addNotification}/>} />
                        {/* SideBar Cuentas */}
                        <Route path='/accounts' element={<AccountsPage />} />
                        {/* SideBar Cuentas - Ver registros */}
                        <Route path='/accounts/see-records' element={<SeeRecordsPage />} />
                        {/* SideBar Cuentas - Crear Ingresos */}
                        <Route path='/accounts/create-incomes' element={<CreateIncomePage />} />
                        {/* SideBar Cuentas - Crear Gastos */}
                        <Route path='/accounts/create-expenses' element={<CreateExpensesPage />} />
                        {/* SideBar Cuentas - TX Pendientes de Aprobar */}
                        <Route path='/accounts/consult-pending-approval' element={<PendingApprovalPage />} />
                        {/* SideBar CRM Clientes */}
                        <Route path='/crm-clients/consult-crm-clients' element={<CrmClientsPage />} />
                        <Route path='/crm-clients/create-crm-clients' element={<CreateCrmClientPage addNotification={addNotification} />} />
                        <Route path='/crm-clients/customer-tracking' element={<CustomerTracking />} />
                        {/* SideBar CRM Proveedores */}
                        <Route path='/crm-suppliers/consult-crm-suppliers' element={<CrmSuppliersPage />} />
                        <Route path='/crm-suppliers/create-crm-suppliers' element={<CreateCrmSupplierPage addNotification={addNotification}/>} />
                        <Route path='/crm-suppliers/tracking-your-purchases' element={<TrackingYourPurchases />} />
                        {/* SideBar Facturación y POS */}
                        <Route path='/invoicing-and-pos' element={<InvoicingAndPosPage />} />
                        <Route path='/invoicing-and-pos/pos' element={<SellPointOfSalePage />} />
                        <Route path='/invoicing-and-pos/electronic-invoicing' element={<ElectronicInvoicingPage />} />
                        <Route path='/invoicing-and-pos/see-electronic-invoicing-pos' element={<SeeElectronicInvoicingPosPage />} />
                        <Route path='/invoicing-and-pos/recurring-invoices' element={<RecurringInvoicesPage />} />
                        <Route path='/invoicing-and-pos/received-payments' element={<ReceivedPaymentsPage />} />
                        <Route path='/invoicing-and-pos/quotes' element={<QuotesPage />} />
                        <Route path='/credit-notes/consult-credit-notes' element={<ConsultCreditNotes />} />
                        <Route path='/credit-notes/create-credit-notes' element={<CreateCreditNotesPage />} />
                        <Route path='/debit-notes/consult-debit-notes' element={<ConsultDebitNotesPage />} />
                        <Route path='/debit-notes/create-debit-notes' element={<CreateDebitNotesPage />} />
                        {/* SideBar Nomina electrónica */}
                        <Route path='/electronic-payroll' element={<ElectronicPayrollPage />} />
                        <Route path='/electronic-payroll/consult-collaborators' element={<ConsultCollaboratorPage />} />
                        <Route path='/electronic-payroll/create-collaborators' element={<CreateCollaboratorPage addNotification={addNotification}/>} />
                        <Route path='/electronic-payroll/consult-payroll-payments' element={<ConsultPayrollPaymentsPage />} />
                        <Route path='/electronic-payroll/create-payroll-payments' element={<CreatePayrollPaymentsPage />} />
                        <Route path='/electronic-payroll/certifications' element={<CertificationsPage />} />
                        <Route path='/electronic-payroll/payroll-settlement' element={<PayrollSettlementPage />} />
                        {/* SideBar Sostenibilidad */}
                        <Route path='/sustainability' element={<SustainabilityPage />} />
                        <Route path='/sustainability/environmental-standards-consultation' element={<EnvironmentalStandardsConsultationPage />} />
                        <Route path='/sustainability/plan-design' element={<PlanDesignPage />} />
                        <Route path='/sustainability/asg-reports' element={<AsgReportsPage />} />
                        <Route path='/sustainability/sustainability-stories' element={<SustainabilityStoriesPage />} />
                        <Route path='/sustainability/diagnostics' element={<DiagnosticsPage />} />
                        {/* SideBar Reportes e indicadores */}
                        <Route path='/reports-and-indicators' element={<ReportsAndIndicatorsPage />} />
                        <Route path='/reports-and-indicators/billing-indicators' element={<BillingIndicatorsPage />} />
                        <Route path='/reports-and-indicators/accounts-and-inventory-indicators' element={<AccountsAndInventoryIndicatorsPage />} />
                        <Route path='/reports-and-indicators/accounts-and-inventory-indicators/calculate-financial-items' element={<CalculateIndicatorsFinancialsPage />} />
                        <Route path='/reports-and-indicators/marketing-indicators' element={<MarketingIndicatorsPage />} />
                        <Route path='/reports-and-indicators/marketing-indicators/calculate-marketing-items' element={<CalculateIndicatorsMarketingPage />} />
                        <Route path='/reports-and-indicators/sustainability-indicators' element={<SustainabilityIndicatorsPage />} />
                        <Route path='/reports-and-indicators/custom-report' element={<CustomReportPage />} />
                        <Route path='/reports-and-indicators/daily-report' element={<DailyReportPage />} />
                        <Route path='/reports-and-indicators/end-of-month-report' element={<EndOfMonthReportPage />} />
                        <Route path='/reports-and-indicators/suggested-report' element={<SuggestedReportPage />} />
                        {/* SideBar Notificaciones estratégicas */}
                        <Route path='/strategic-notifications' element={<StrategicNotificationsPage />} />
                        <Route path='/strategic-notifications/product-expiry' element={<ProductExpiryPage />} />
                        <Route path='/strategic-notifications/tax-calendar' element={<TaxCalendarPage />} />
                        {/* SideBar Asesorías para toma de decisiones */}
                        <Route path='/consultancies' element={<ConsultanciesPage />} />
                        <Route path='/consultancies/contact-an-advisor' element={<ContactAnAdvisorPage />} />
                    </Route>
                    {/* Sección Error 404 */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;