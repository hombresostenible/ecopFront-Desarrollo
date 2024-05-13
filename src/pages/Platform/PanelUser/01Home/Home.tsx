import NavBar from '../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../components/Platform/Footer/Footer';
import Panel from '../../../../components/Platform/Home/Panel';
import styles from './styles.module.css';

function HomePage() {

    return (
        <div className="d-flex w-100">
            <SideBar />
            <div>
                <NavBar />
                <div className={`${styles.container} w-100 overflow-hidden overflow-y-auto`}>
                    <Panel />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;