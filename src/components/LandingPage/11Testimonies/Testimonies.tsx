import Felipe from '../../../assets/LandingPage/10Testimonies/Felipe.jpg';
import John from '../../../assets/LandingPage/10Testimonies/John.jpg';
import Mujer1 from '../../../assets/LandingPage/10Testimonies/Mujer1.jpg';
import Mujer2 from '../../../assets/LandingPage/10Testimonies/Mujer2.jpg';
import styles from './styles.module.css';

function Testimonies() {

    return (
        <div className={`${styles.container} mb-5 m-auto`}>
            <h2 className={`${styles.title} text-center`}>¡Están felices y lo saben!</h2>
            <p className={`${styles.text} text-center`}>Mira lo que dicen nuestros clientes sobre nosotros.</p>
            <div className={`${styles.container__Testimonies} mb-4 m-auto d-flex flex-wrap align-items-center justify-content-center gap-4`}>
                <div className={`${styles.card__Testimony} overflow-hidden`}>
                    <div className={`${styles.testimony} `}>No encontrará un conjunto más completo de modelos estilizados en ningún otro lugar. Sabes que si son modelos de Happy Toolbox, todos funcionarán perfectamente juntos y te harán sonreír en el camino.</div>
                    <div className={`${styles.user} d-flex align-items-center justify-content-center`}>
                        <div className={`${styles.container__Image} d-flex align-items-center justify-content-center overflow-hidden`}>
                            <img src={Felipe} alt="Felipe" className={`${styles.image__User} `}/>
                        </div>
                        <div className={`${styles.info__Identification} p-2 d-flex flex-column align-items-start justify-content-center`}>
                            <h4 className={`${styles.name__User} m-0`}>Felipe Hernández</h4>
                            <p className={`${styles.position__Company} m-0`}>Founder  / CEO <span className={`${styles.span__Company} `}>Ecopción</span></p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.card__Testimony} overflow-hidden`}>
                    <div className={`${styles.testimony} `}>No encontrará un conjunto más completo de modelos estilizados en ningún otro lugar. Sabes que si son modelos de Happy Toolbox, todos funcionarán perfectamente juntos y te harán sonreír en el camino.</div>
                    <div className={`${styles.user} d-flex align-items-center justify-content-center`}>
                        <div className={`${styles.container__Image} `}>
                            <img src={John} alt="John" className={`${styles.image__User} `}/>
                        </div>
                        <div className={`${styles.info__Identification} p-2 d-flex flex-column align-items-start justify-content-center`}>
                            <h4 className={`${styles.name__User} m-0`}>John doe</h4>
                            <p className={`${styles.position__Company} m-0`}>CTO <span className={`${styles.span__Company} `}>Ecopción</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.container__Testimonies} mb-4 m-auto d-flex flex-wrap align-items-center justify-content-center gap-4`}>
                <div className={`${styles.card__Testimony} overflow-hidden`}>
                    <div className={`${styles.testimony} `}>No encontrará un conjunto más completo de modelos estilizados en ningún otro lugar. Sabes que si son modelos de Happy Toolbox, todos funcionarán perfectamente juntos y te harán sonreír en el camino.</div>
                    <div className={`${styles.user} d-flex align-items-center justify-content-center`}>
                        <div className={`${styles.container__Image} `}>
                            <img src={Mujer1} alt="Mujer1" className={`${styles.image__User} `}/>
                        </div>
                        <div className={`${styles.info__Identification} p-2 d-flex flex-column align-items-start justify-content-center`}>
                            <h4 className={`${styles.name__User} m-0`}>Fulanita de tal</h4>
                            <p className={`${styles.position__Company} m-0`}>Gerente Distribuidora <span className={`${styles.span__Company} `}>Tecnology</span></p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.card__Testimony} overflow-hidden`}>
                    <div className={`${styles.testimony} `}>No encontrará un conjunto más completo de modelos estilizados en ningún otro lugar. Sabes que si son modelos de Happy Toolbox, todos funcionarán perfectamente juntos y te harán sonreír en el camino.</div>
                    <div className={`${styles.user} d-flex align-items-center justify-content-center`}>
                        <div className={`${styles.container__Image} `}>
                            <img src={Mujer2} alt="Mujer2" className={`${styles.image__User} `}/>
                        </div>
                        <div className={`${styles.info__Identification} p-2 d-flex flex-column align-items-start justify-content-center`}>
                            <h4 className={`${styles.name__User} m-0`}>Martha Sánchez</h4>
                            <p className={`${styles.position__Company} m-0`}>CEO <span className={`${styles.span__Company} `}>Mercatop</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonies;