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
import BranchPage from './pages/Platform/PanelUser/02Branch/BranchPage';
import SustainabilityPage from './pages/Platform/PanelUser/Sustainability/SustainabilityPage';
import QuestionsPage from './pages/Platform/PanelUser/00NavBar/01Questions/Questions';
import ServicesPage from './pages/Platform/PanelUser/00NavBar/02Services/Services';
import NotificationsPage from './pages/Platform/PanelUser/00NavBar/03Notifications/Notifications';
import ConfigurationPage from './pages/Platform/PanelUser/00NavBar/04Configuration/Configuration';

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
                        {/* Recuperación de contraseñas y desbloqueos de cuenta de Company */}

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
                            <Route path='/services' element={<ServicesPage />} />
                            <Route path='/notifications' element={<NotificationsPage />} />
                            <Route path='/configuration' element={<ConfigurationPage />} />
                            <Route path='/configuration/profile' element={<ProfilePage />} />

                            {/* Sección Home */}
                            <Route path='/home' element={<Home />} />
                            <Route path='/branches' element={<BranchPage />} />
                            <Route path='/inventories' element={<BranchPage />} />
                            <Route path='/accounts' element={<BranchPage />} />
                            <Route path='/invoicing-and-pos' element={<BranchPage />} />
                            <Route path='/electronic-payroll' element={<BranchPage />} />
                            <Route path='/crm-clients' element={<BranchPage />} />
                            <Route path='/crm-suppliers' element={<BranchPage />} />
                            <Route path='/sustainability' element={<SustainabilityPage />} />
                            <Route path='/reports-and-indicators' element={<SustainabilityPage />} />
                            <Route path='/strategic-notifications' element={<SustainabilityPage />} />
                            <Route path='/consultancies' element={<SustainabilityPage />} />
                        </Route>
                    {/* Sección Error 404 */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;