/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBarLandingPage from '../../components/LandingPage/01 NavBarLandingPage/NavBarLandingPage';
import Introduction from '../../components/LandingPage/02 Introduction/Introduction';
import OutstandingFeatures from '../../components/LandingPage/03 OutstandingFeatures/OutstandingFeatures';
import Sustainability from '../../components/LandingPage/04 Sustainability/Sustainability';
import Characteristics from '../../components/LandingPage/05 Characteristics/Characteristics';
import Slider from '../../components/LandingPage/06 Slider/Slider';
import Metrics from '../../components/LandingPage/07 Metrics/Metrics';
import NewsletterSuscribe from '../../components/LandingPage/08 NewsletterSuscribe/NewsletterSuscribe';
import ChatUs from '../../components/LandingPage/09 ChatUs/ChatUs';
import Testimonies from '../../components/LandingPage/11 Testimonies/Testimonies';
import Footer from '../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function LandingPage () {

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