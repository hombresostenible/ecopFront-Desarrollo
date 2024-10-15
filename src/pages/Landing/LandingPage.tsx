import NavBar from '../../components/Landing/01NavBar/NavBar';
import Introduction from '../../components/Landing/02Introduction/Introduction';
import OutstandingFeatures from '../../components/Landing/03OutstandingFeatures/OutstandingFeatures';
import Characteristics from '../../components/Landing/04Characteristics/Characteristics';
import Metrics from '../../components/Landing/05Metrics/Metrics';
import Testimonies from '../../components/Landing/06Testimonies/Testimonies';
import Footer from '../../components/Landing/07Footer/Footer';

function LandingPage() {
    return (
        <main>
            <NavBar />
            <section>
                <Introduction />
                <OutstandingFeatures />
                <Characteristics />
                <Metrics />
                <Testimonies />
            </section>
            <Footer />
        </main>
    );
}

export default LandingPage;