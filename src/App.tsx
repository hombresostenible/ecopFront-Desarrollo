// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
// GENERALES
import WhatsApp from './components/GeneralComponents/WhatsApp/WhatsApp';
import Telegram from './components/GeneralComponents/Telegram/Telegram';
import Scroll from "./components/GeneralComponents/Scroll/Scroll";
// import Notification from './components/Platform/PanelUser/Notifications/Notification';
import ScrollToTop from './components/GeneralComponents/ScrollToTop/ScrollToTop';
// LANDINGPAGE
import LandingPage from './pages/Landing/LandingPage';
// NAVBAR DE LA LANDINGPAGE
// import PaymentPlansPage from './pages/Landing/NavBar/01PaymentPlans/PaymentPlansPage';
import ContactUsPage from './pages/Landing/01NavBar/02ContactUs/ContactUsPage';
// import FastSimulatorPage from './pages/Landing/NavBar/03FastSimulator/FastSimulatorPage';
// BODY LANDING
import RegisterYourTransactions from './components/Landing/04Characteristics/01RegisterYourTransactions/RegisterYourTransactions';
import ManageYourElectronicInvoices from './components/Landing/04Characteristics/02ManageYourElectronicInvoices/ManageYourElectronicInvoices';
import ManageYourCustomers from './components/Landing/04Characteristics/03ManageYourCustomers/ManageYourCustomers';
import ManagingSustainabilityBusiness from './components/Landing/04Characteristics/04ManagingSustainabilityBusiness/ManagingSustainabilityBusiness';
import ViewDownloadReports from './components/Landing/04Characteristics/05ViewDownloadReports/ViewDownloadReports';
import PersonalizedAdvisories from './components/Landing/04Characteristics/06PersonalizedAdvisories/PersonalizedAdvisories';
import InformedDecisions from './components/Landing/04Characteristics/07InformedDecisions/InformedDecisions';
// FOOTER
// import Blog from './pages/Landing/Footer/AboutUs/Blog/Blog';
// import OurCompany from './pages/Landing/Footer/AboutUs/OurCompany/OurCompany';
// import KnowUs from './pages/Landing/Footer/AboutUs/KnowUs/KnowUs';
// import WorkWithUs from './pages/Landing/Footer/AboutUs/WorkWithUs/WorkWithUs';
// import AlliancesAndPrograms from './pages/Landing/Footer/AboutUs/AlliancesAndPrograms/AlliancesAndPrograms';
// import TermsAndConditions from './pages/Landing/Footer/Legal/TermsAndConditions/TermsAndConditions';
// import DataProcessing from './pages/Landing/Footer/Legal/DataProcessing/DataProcessing';
// import HabeasData from './pages/Landing/Footer/Legal/HabeasData/HabeasData';
// import MembershipAgreement from './pages/Landing/Footer/Legal/MembershipAgreement/MembershipAgreement';
// import Help from './pages/Landing/Footer/Support/Help/Help';
// import Trainings from './pages/Landing/Footer/Support/Trainings/Trainings';
// import APIDocumentation from './pages/Landing/Footer/Support/APIDocumentation/APIDocumentation';
// ERROR 404
import Error404 from './pages/Error404/Error404';

function App() {

    return (
        <div className="container__General">
            <BrowserRouter>
                <WhatsApp />
                <Telegram />
                <Scroll />
                <ScrollToTop />
                <Routes>
                    {/* LANDING */}
                    <Route path='/' element={<LandingPage />} />
                    {/* NAVBAR */}
                    {/* <Route path='/payment-plans' element={<PaymentPlansPage />} /> */}
                    <Route path='/contactUs' element={<ContactUsPage />} />
                    {/* <Route path='/fast-simulator' element={<FastSimulatorPage />} /> */}
                    {/* BODY LANDING */}
                    <Route path='/register-your-transactions' element={<RegisterYourTransactions />} />
                    <Route path='/manage-your-electronic-invoices' element={<ManageYourElectronicInvoices />} />
                    <Route path='/manage-your-customers' element={<ManageYourCustomers />} />
                    <Route path='/managing-sustainability-business' element={<ManagingSustainabilityBusiness />} />
                    <Route path='/view-download-reports' element={<ViewDownloadReports />} />
                    <Route path='/personalized-advisories' element={<PersonalizedAdvisories />} />
                    <Route path='/strategic-notifications' element={<InformedDecisions />} />
                    {/* FOOTER */}
                    {/* <Route path='/blog' element={<Blog />} />
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
                    <Route path='/api-documentation' element={<APIDocumentation />} /> */}
                    {/* ERROR 404 */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;