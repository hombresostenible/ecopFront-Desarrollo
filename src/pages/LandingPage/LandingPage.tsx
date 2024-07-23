/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBarLandingPage from '../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Introduction from '../../components/LandingPage/02Introduction/Introduction';
import OutstandingFeatures from '../../components/LandingPage/03OutstandingFeatures/OutstandingFeatures';
import Characteristics from '../../components/LandingPage/05Characteristics/Characteristics';
import Metrics from '../../components/LandingPage/07Metrics/Metrics';
import ChatUs from '../../components/LandingPage/09ChatUs/ChatUs';
import Testimonies from '../../components/LandingPage/11Testimonies/Testimonies';
import Footer from '../../components/LandingPage/Footer/Footer';

function LandingPage() {

    return (
        <div>
            <NavBarLandingPage />
            <div>
                <Introduction />
                <OutstandingFeatures />
                <Characteristics />
                <Metrics />
                <ChatUs />
                <Testimonies />
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;