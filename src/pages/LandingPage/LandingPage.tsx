/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBarLandingPage from '../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Introduction from '../../components/LandingPage/02Introduction/Introduction';
import OutstandingFeatures from '../../components/LandingPage/03OutstandingFeatures/OutstandingFeatures';
import Sustainability from '../../components/LandingPage/04Sustainability/Sustainability';
import Characteristics from '../../components/LandingPage/05Characteristics/Characteristics';
import Slider from '../../components/LandingPage/06Slider/Slider';
import Metrics from '../../components/LandingPage/07Metrics/Metrics';
import NewsletterSuscribe from '../../components/LandingPage/08NewsletterSuscribe/NewsletterSuscribe';
import ChatUs from '../../components/LandingPage/09ChatUs/ChatUs';
import Testimonies from '../../components/LandingPage/11Testimonies/Testimonies';
import Footer from '../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function LandingPage() {

    return (
        <div>
            <NavBarLandingPage />
            <div className={styles.container}>
                <Introduction />
                <OutstandingFeatures />
                <Sustainability />
                <Characteristics />
                <Slider />
                <Metrics />
                <NewsletterSuscribe />
                <ChatUs />
                <Testimonies />
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;