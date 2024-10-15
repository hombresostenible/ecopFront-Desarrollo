import NavBar from '../../01NavBar/NavBar';
import Footer from '../../07Footer/Footer';
import styles from './styles.module.css';

function PersonalizedAdvisories() {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                <h2 className={`${styles.subtitle} m-5 text-center`}>Recibir asesorías personalizadas</h2>
                    <p className='mb-5'>Para tomar la decisión informada, ecopcionApp te ofrece la posibilidad de contar con un asesor externo que, en una breve llamada y con base en tu necesidad, te ofrezca su análisis y te comparta una recomendación estratégica para tomar la decisión más rápido y/o con mejor información.</p>
                    <p className='mb-5'>La decisión las tomas tú. Nosotros te ofrecemos insumos, es decir, datos de tu negocio que sean relevantes, te acompañamos en el análisis, te ofrecemos recomendaciones, y/o una mirada externa que muchas veces es valiosa, puesto que nos permite visualizar elementos que por distintas razones -rutina, agotamiento o estrés, - no habíamos tenido en cuenta.</p>
                    <p className='mb-5'>Es importante que sepas que, entre más información hayas registrado sobre tu negocio y mayor cantidad de transacciones hayas registrado en el libro diario digital, nuestro asesor contará con más y mejores datos para ofrecerte la recomendación clave que necesitas para tomar tu decisión.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PersonalizedAdvisories;