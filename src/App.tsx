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
// ERROR 404
import Error404 from './pages/Error404/Error404';
// PROTECCION DE RUTAS
import ProtectedRoute from './ProtectedRoute';
// NAVBAR PLATAFORMA - QUESTIONS
import QuestionsPage from './pages/Platform/PanelUser/00NavBar/01Questions/QuestionsPage';
import QuestionInformationManageYourBusinessPage from './pages/Platform/PanelUser/00NavBar/01Questions/01QuestionInformationManageYourBusiness/QuestionInformationManageYourBusinessPage';
import QuestionActivateNewPlansPage from './pages/Platform/PanelUser/00NavBar/01Questions/02QuestionActivateNewPlans/QuestionActivateNewPlansPage';
import QuestionAccountsAndInventoriesPage from './pages/Platform/PanelUser/00NavBar/01Questions/03QuestionAccountsAndInventories/QuestionAccountsAndInventoriesPage';
import QuestionInvoicingAndPosPage from './pages/Platform/PanelUser/00NavBar/01Questions/04QuestionInvoicingAndPos/QuestionInvoicingAndPosPage';
import QuestionElectronicPayrollPage from './pages/Platform/PanelUser/00NavBar/01Questions/05QuestionElectronicPayroll/QuestionElectronicPayrollPage';
import QuestionCrmPage from './pages/Platform/PanelUser/00NavBar/01Questions/06QuestionCrm/QuestionCrmPage';
import QuestionSustainabilityPage from './pages/Platform/PanelUser/00NavBar/01Questions/07QuestionSustainability/QuestionSustainabilityPage';
import QuestionConsultanciesPage from './pages/Platform/PanelUser/00NavBar/01Questions/08QuestionConsultancies/QuestionConsultanciesPage';
import QuestionStrategicNotificationsPage from './pages/Platform/PanelUser/00NavBar/01Questions/09QuestionStrategicNotifications/QuestionStrategicNotificationsPage';
// NAVBAR PLATAFORMA - SERVICES
import ServicesPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/ServicesPage';
import ServiceSupportContactPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/01ServiceSupportContact/ServiceSupportContactPage';
import ServiceActivateNewPlansPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/02ServiceActivateNewPlans/ServiceActivateNewPlansPage';
import ServicePlatformFunctionalityPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/03ServicePlatformFunctionalityPage/ServicePlatformFunctionalityPage';
import ServiceInventoriesPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/04ServiceInventories/ServiceInventoriesPage';
import ServiceAccountsPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/05ServiceAccounts/ServiceAccountsPage';
import ServiceBillingAndPosPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/06ServiceBillingAndPos/ServiceBillingAndPosPage';
import ServiceElectronicPayrollPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/07ServiceElectronicPayroll/ServiceElectronicPayrollPage';
import ServiceCrmClientPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/08ServiceCrmClient/ServiceCrmClientPage';
import ServiceCrmSupplierPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/09ServiceCrmSupplier/ServiceCrmSupplierPage';
import ServiceSustainabilityPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/10ServiceSustainability/ServiceSustainabilityPage';
import ServiceStrategyAndDecisionMakingPage from './pages/Platform/PanelUser/00NavBar/02ServicesPage/11ServiceStrategyAndDecisionMaking/ServiceStrategyAndDecisionMakingPage';
// NAVBAR PLATAFORMA - NOTIFICATIONS
import NotificationsPage from './pages/Platform/PanelUser/00NavBar/03Notifications/NotificationsPage';
// NAVBAR PLATAFORMA - CONFIGURATION
import ConfigurationPage from './pages/Platform/PanelUser/00NavBar/04Configuration/ConfigurationPage';
// SIDEBAR - HOME
import Home from './pages/Platform/PanelUser/01Home/HomePage';
import ProfilePage from './pages/Platform/PanelUser/00NavBar/04Configuration/Profile/ProfilePage';
// SIDEBAR - TUS SEDES
import BranchCardPage from './pages/Platform/PanelUser/02Branch/BranchCard/BranchCardPage';
import CreateBranchPage from './pages/Platform/PanelUser/02Branch/CreateBranch/CreateBranchPage';
// SIDEBAR - INVENTARIOS
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
import ConsultIncomePage from './pages/Platform/PanelUser/04Accounts/01Income/ConsultIncome/ConsultIncomePage';
import CreateIncomePage from './pages/Platform/PanelUser/04Accounts/01Income/CreateIncome/CreateIncomePage';
import ConsultExpensesPage from './pages/Platform/PanelUser/04Accounts/02Expenses/ConsultExpenses/ConsultExpensesPage';
import CreateExpensesPage from './pages/Platform/PanelUser/04Accounts/02Expenses/CreateExpenses/CreateExpensesPage';
import AccountsReceivablePage from './pages/Platform/PanelUser/04Accounts/03AccountsReceivable/AccountsReceivablePage';
import AccountsPayablePage from './pages/Platform/PanelUser/04Accounts/04AccountsPayable/AccountsPayablePage';
import PendingApprovalPage from './pages/Platform/PanelUser/04Accounts/05PendingApproval/PendingApprovalPage';
// SIDEBAR - INVOICING-AND-POS
import InvoicingAndPosPage from './pages/Platform/PanelUser/05InvoicingAndPos/InvoicingAndPosPage';
import CreditNotesPage from './pages/Platform/PanelUser/05InvoicingAndPos/01CreditNotes/CreditNotesPage';
import DebitNotesPage from './pages/Platform/PanelUser/05InvoicingAndPos/02DebitNotes/DebitNotesPage';
import RecurringInvoicesPage from './pages/Platform/PanelUser/05InvoicingAndPos/03RecurringInvoices/RecurringInvoicesPage';
import ReceivedPaymentsPage from './pages/Platform/PanelUser/05InvoicingAndPos/04ReceivedPayments/ReceivedPaymentsPage';
import QuotesPage from './pages/Platform/PanelUser/05InvoicingAndPos/05Quotes/QuotesPage';
// SIDEBAR - ELECTRONIC-PAYROLL
import ElectronicPayrollPage from './pages/Platform/PanelUser/06ElectronicPayroll/ElectronicPayrollPage';
import PayrollPaymentsPage from './pages/Platform/PanelUser/06ElectronicPayroll/01PayrollPayments/PayrollPaymentsPage';
import CertificationsPage from './pages/Platform/PanelUser/06ElectronicPayroll/02Certifications/CertificationsPage';
import PayrollSettlementPage from './pages/Platform/PanelUser/06ElectronicPayroll/03PayrollSettlement/PayrollSettlementPage';
import EmployeesPage from './pages/Platform/PanelUser/06ElectronicPayroll/04Employees/EmployeesPage';
// SIDEBAR - CRM-CLIENT
import CrmClientsPage from './pages/Platform/PanelUser/07CrmClients/CrmClientsCard/CrmClientsCardPage';
import CreateCrmClientPage from './pages/Platform/PanelUser/07CrmClients/CreateCrmClient/CreateCrmClientPage';
// SIDEBAR - CRM-SUPPLIER
import CrmSuppliersPage from './pages/Platform/PanelUser/08CrmSuppliers/CrmSuppliers/CrmSuppliersCardPage';
import CreateCrmSupplierPage from './pages/Platform/PanelUser/08CrmSuppliers/CreateCrmSuppliers/CreateCrmSuppliersPage';
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
import MarketingIndicatorsPage from './pages/Platform/PanelUser/10ReportsAndIndicators/03MarketingIndicators/MarketingIndicatorsPage';
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
                        <Route path='/reset-password/complete/:idParams/:passwordResetCode' element={<ResetPasswordPage />} />
                        <Route path='/unblocking-account/complete/:idParams' element={<UnblockingAccountPage />} />
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
                            {/* Sección NavBar - Questions */}
                            <Route path='/questions' element={<QuestionsPage />} />
                            <Route path='/questions/information-manage-your-business' element={<QuestionInformationManageYourBusinessPage />} />
                            <Route path='/questions/activate-new-plans' element={<QuestionActivateNewPlansPage />} />
                            <Route path='/questions/accounts-and-inventories' element={<QuestionAccountsAndInventoriesPage />} />
                            <Route path='/questions/invoicing-and-pos' element={<QuestionInvoicingAndPosPage />} />
                            <Route path='/questions/electronic-payroll' element={<QuestionElectronicPayrollPage />} />
                            <Route path='/questions/crm' element={<QuestionCrmPage />} />
                            <Route path='/questions/sustainability' element={<QuestionSustainabilityPage />} />
                            <Route path='/questions/consultancies' element={<QuestionConsultanciesPage />} />
                            <Route path='/questions/strategic-notifications' element={<QuestionStrategicNotificationsPage />} />
                            {/* Sección NavBar - Services */}
                            <Route path='/services' element={<ServicesPage />} />
                            <Route path='/services/support-contact' element={<ServiceSupportContactPage />} />
                            <Route path='/services/activate-new-plans' element={<ServiceActivateNewPlansPage />} />
                            <Route path='/services/platform-functionality' element={<ServicePlatformFunctionalityPage />} />
                            <Route path='/services/inventories' element={<ServiceInventoriesPage />} />
                            <Route path='/services/accounts' element={<ServiceAccountsPage />} />
                            <Route path='/services/billing-and-pos' element={<ServiceBillingAndPosPage />} />
                            <Route path='/services/electronic-payroll' element={<ServiceElectronicPayrollPage />} />
                            <Route path='/services/crm-client' element={<ServiceCrmClientPage />} />
                            <Route path='/services/crm-supplier' element={<ServiceCrmSupplierPage />} />
                            <Route path='/services/sustainability' element={<ServiceSustainabilityPage />} />
                            <Route path='/services/strategy-and-decision-making' element={<ServiceStrategyAndDecisionMakingPage />} />
                            {/* Sección NavBar - Notifications */}
                            <Route path='/notifications' element={<NotificationsPage />} />
                            {/* Sección NavBar - Configuration */}
                            <Route path='/configuration' element={<ConfigurationPage />} />
                            <Route path='/configuration/profile' element={<ProfilePage />} />



                            {/* SideBar Home */}
                            <Route path='/home' element={<Home />} />                                               {/* APARECEN TODOS LOS RECUADROS */}
                            <Route path='/inventories' element={<InventoriesPage />} />                             {/* ACCESOS DIRECTOS A ASSETS, MERCHANDISES, PRODUCTS, RAWMATERIALS  SERVICES */}
                            <Route path='/accounts' element={<AccountsPage />} />                              {/* ACCESOS DIRECTOS A INGRESOS, GASTOS, CXC, CXP, TX PENDIENTES DE APROBAR */}
                            <Route path='/invoicing-and-pos' element={<InvoicingAndPosPage />} />                   {/* ACCESOS DIRECTOS A  */}
                            <Route path='/electronic-payroll' element={<ElectronicPayrollPage />} />                {/* ACCESOS DIRECTOS A  */}
                            <Route path='/crm-clients/consult-crm-clients' element={<CrmClientsPage />} />          {/* ACCESOS DIRECTOS A  */}
                            <Route path='/crm-suppliers/consult-crm-suppliers' element={<CrmSuppliersPage />} />    {/* ACCESOS DIRECTOS A  */}
                            <Route path='/sustainability' element={<SustainabilityPage />} />                       {/* ACCESOS DIRECTOS A  */}
                            <Route path='/reports-and-indicators' element={<ReportsAndIndicatorsPage />} />         {/* ACCESOS DIRECTOS A  */}
                            <Route path='/strategic-notifications' element={<StrategicNotificationsPage />} />      {/* ACCESOS DIRECTOS A  */}
                            <Route path='/consultancies' element={<ConsultanciesPage />} />                         {/* ACCESOS DIRECTOS A  */}

                            {/* SideBar Tus Sedes */}
                            <Route path='/branches/consult-branches' element={<BranchCardPage />} />
                            <Route path='/branches/create-branches' element={<CreateBranchPage onCreateBranch={function (): void { throw new Error('Function not implemented.'); } } />} />
                            {/* SideBar Inventarios - Assets */}
                            <Route path='/inventories/consult-assets' element={<ConsultAssetsPage />} />
                            <Route path='/inventories/create-assets' element={<CreateAssetsPage />} />
                            {/* SideBar Inventarios - Merchadises */}
                            <Route path='/inventories/consult-merchandises' element={<ConsultMerchandisesPage />} />
                            <Route path='/inventories/create-merchandises' element={<CreateMerchandisesPage />} />
                            {/* SideBar Inventarios - Products */}
                            <Route path='/inventories/consult-products' element={<ConsultProductsPage />} />
                            <Route path='/inventories/create-products' element={<CreateProductsPage />} />
                            <Route path='/inventories/quote-products' element={<QuoteProductsPage />} />
                            {/* SideBar Inventarios - Rawmaterals */}
                            <Route path='/inventories/consult-raw-materals' element={<ConsultRawMateralsPage />} />
                            <Route path='/inventories/create-raw-materals' element={<CreateRawMateralsPage />} />
                            {/* SideBar Inventarios - Services */}
                            <Route path='/inventories/consult-services' element={<ConsultServicesPage />} />
                            <Route path='/inventories/create-services' element={<CreateServicesPage />} />


                            {/* SideBar Cuentas - Ingresos */}
                            <Route path='/accounts/consult-incomes' element={<ConsultIncomePage />} />
                            <Route path='/accounts/create-incomes' element={<CreateIncomePage />} />
                            {/* SideBar Cuentas - Gastos */}
                            <Route path='/accounts/consult-expenses' element={<ConsultExpensesPage />} />
                            <Route path='/accounts/create-expenses' element={<CreateExpensesPage />} />
                            {/* SideBar Cuentas - CXC */}
                            <Route path='/accounts/consult-account-receivable' element={<AccountsReceivablePage />} />
                            {/* SideBar Cuentas - CXP */}
                            <Route path='/accounts/consult-accounts-payable' element={<AccountsPayablePage />} />
                            {/* SideBar Cuentas - TX Pendientes de Aprobar */}
                            <Route path='/accounts/consult-pending-approval' element={<PendingApprovalPage />} />
                            {/* SideBar Facturación y POS */}
                            <Route path='/invoicing-and-pos/credit-notes' element={<CreditNotesPage />} />
                            <Route path='/invoicing-and-pos/debit-notes' element={<DebitNotesPage />} />
                            <Route path='/invoicing-and-pos/recurring-invoices' element={<RecurringInvoicesPage />} />
                            <Route path='/invoicing-and-pos/received-payments' element={<ReceivedPaymentsPage />} />
                            <Route path='/invoicing-and-pos/quotes' element={<QuotesPage />} />
                            {/* SideBar Nomina electrónica */}
                            <Route path='/electronic-payroll/payroll-payments' element={<PayrollPaymentsPage />} />
                            <Route path='/electronic-payroll/certifications' element={<CertificationsPage />} />
                            <Route path='/electronic-payroll/payroll-settlement' element={<PayrollSettlementPage />} />
                            <Route path='/electronic-payroll/employees' element={<EmployeesPage />} />
                            {/* SideBar CRM Clientes */}
                            <Route path='/crm-clients/create-crm-clients' element={<CreateCrmClientPage />} />
                            {/* SideBar CRM Proveedores */}
                            <Route path='/crm-suppliers/create-crm-suppliers' element={<CreateCrmSupplierPage />} />
                            {/* SideBar Sostenibilidad */}
                            <Route path='/sustainability/environmental-standards-consultation' element={<EnvironmentalStandardsConsultationPage />} />
                            <Route path='/sustainability/plan-design' element={<PlanDesignPage />} />
                            <Route path='/sustainability/asg-reports' element={<AsgReportsPage />} />
                            <Route path='/sustainability/sustainability-stories' element={<SustainabilityStoriesPage />} />
                            <Route path='/sustainability/diagnostics' element={<DiagnosticsPage />} />
                            {/* SideBar Reportes e indicadores */}
                            <Route path='/reports-and-indicators/billing-indicators' element={<BillingIndicatorsPage />} />
                            <Route path='/reports-and-indicators/accounts-and-inventory-indicators' element={<AccountsAndInventoryIndicatorsPage />} />
                            <Route path='/reports-and-indicators/marketing-indicators' element={<MarketingIndicatorsPage />} />
                            <Route path='/reports-and-indicators/sustainability-indicators' element={<SustainabilityIndicatorsPage />} />
                            <Route path='/reports-and-indicators/custom-report' element={<CustomReportPage />} />
                            <Route path='/reports-and-indicators/daily-report' element={<DailyReportPage />} />
                            <Route path='/reports-and-indicators/end-of-month-report' element={<EndOfMonthReportPage />} />
                            <Route path='/reports-and-indicators/suggested-report' element={<SuggestedReportPage />} />
                            {/* SideBar Notificaciones estratégicas */}
                            <Route path='/strategic-notifications/product-expiry' element={<ProductExpiryPage />} />
                            <Route path='/strategic-notifications/tax-calendar' element={<TaxCalendarPage />} />
                            {/* SideBar Asesorías para toma de decisiones */}
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