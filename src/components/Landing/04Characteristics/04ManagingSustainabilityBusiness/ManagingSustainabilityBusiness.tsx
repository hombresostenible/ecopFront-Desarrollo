import NavBar from '../../01NavBar/NavBar';
import Footer from '../../07Footer/Footer';
import styles from './styles.module.css';

function ManagingSustainabilityBusiness() {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h2 className={`${styles.subtitle} m-5 text-center`}>Gestión de la sostenibilida de tu negocio</h2>
                    <p className='mb-5'>A través de nuestros servicios de sostenibilidad, podrás realizar consultas sobre las normas ambientales aplicables a las empresas. Así mismo, podrás hacer un diagnóstico sobre qué normas ambientales debes cumplir en tu negocio y recibir recomendaciones sobre qué hacer para cumplir con dicha normatividad.</p>
                    <p className='mb-5'>Igualmente podrás utilizar la sostenibilidad como una herramienta para comunicar y vender. Con Ecopcion contarás a tus clientes el impacto que generas en la sociedad, planeta y economía local de manera fácil, innovadora y llamativa y además, harás reportes de sostenibilidad de tu negocio con base en los indicadores ambientales, sociales y de gobernanza (ASG) y principios de economía circular.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ManagingSustainabilityBusiness;