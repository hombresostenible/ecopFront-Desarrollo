import NavBar from '../../01NavBar/NavBar';
import Footer from '../../07Footer/Footer';
import styles from './styles.module.css';

function InformedDecisions() {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                <h2 className={`${styles.subtitle} m-5 text-center`}>Notificaciones estratégicas</h2>
                    <p className='mb-5'>De manera gratuita podrás recibir notificaciones sobre aspectos calendarios y/o aspectos tributaros y legales y además, recibirás notificaciones sobre noticias del ecosistema relacionadas con eventos, convocatorias, trámites de ley ante el congreso y/o cualquier otra información de interés para el mundo del emprendimiento y de las mipymes.</p>
                    <p className='mb-5'>Adicionalmente, a través de nuestros planes o membresías, puedes recibir avisos clave sobre proyectos, contratos y/o cobros que te permitirán administrar tu negocio más fácil. Además, podrás recibir notificaciones especiales sobre tu negocio respecto de tus cuentas, inventarios, facturación, clientes y sostenibilidad y/o impacto que te permitirán anticipar riesgos y generar mayor valor al mercado. Igualmente, podrás recibir avisos sobre el comportamiento de tu industria y de esta manera, generar estrategias para mejorar tu posición frente a tu competencia.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default InformedDecisions;