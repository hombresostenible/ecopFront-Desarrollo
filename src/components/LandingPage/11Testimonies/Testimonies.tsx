import Felipe from '../../../assets/LandingPage/10Testimonies/Felipe.jpg';
import John from '../../../assets/LandingPage/10Testimonies/John.jpg';
import Mujer1 from '../../../assets/LandingPage/10Testimonies/Mujer1.jpg';
import Mujer2 from '../../../assets/LandingPage/10Testimonies/Mujer2.jpg';
import styles from './styles.module.css';

function Testimonies() {

    return (
        <div className={`${styles.container} `}>
            <h2 className={`${styles.title} text-center`}>¡Están felices y lo saben!</h2>
            <p className={`${styles.text} text-center`}>Mira lo que dicen nuestros clientes sobre nosotros.</p>
            <div className={`${styles.containerCard} d-flex align-items-center justify-content-center`}>
                <div>
                    <div className={`${styles.cardTestimony} `}>
                        <div className={`${styles.testimony} `}>No encontrará un conjunto más completo de modelos estilizados en ningún otro lugar. Sabes que si son modelos de Happy Toolbox, todos funcionarán perfectamente juntos y te harán sonreír en el camino.</div>
                        <div className={`${styles.user} `}>
                            <div className={`${styles.containerImageuser} `}>
                                <img src={Felipe} alt="Felipe" className={`${styles.imageUser} `}/>
                            </div>
                            <div className={`${styles.infoIdentification} `}>
                                <h4 className={`${styles.nameUser} `}>Felipe Hernández</h4>
                                <p className={`${styles.positionCompany} `}>Founder  / CEO <span className={`${styles.spanCompany} `}>Ecopción</span></p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.cardTestimony} `}>
                        <div className={`${styles.testimony} `}>No encontrará un conjunto más completo de modelos estilizados en ningún otro lugar. Sabes que si son modelos de Happy Toolbox, todos funcionarán perfectamente juntos y te harán sonreír en el camino.</div>
                        <div className={`${styles.user} `}>
                            <div className={`${styles.containerImageuser} `}>
                                <img src={John} alt="John" className={`${styles.imageUser} `}/>
                            </div>
                            <div className={`${styles.infoIdentification} `}>
                                <h4 className={`${styles.nameUser} `}>John doe</h4>
                                <p className={`${styles.positionCompany} `}>CTO <span className={`${styles.spanCompany} `}>Ecopción</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={`${styles.cardTestimony} `}>
                        <div className={`${styles.testimony} `}>No encontrará un conjunto más completo de modelos estilizados en ningún otro lugar. Sabes que si son modelos de Happy Toolbox, todos funcionarán perfectamente juntos y te harán sonreír en el camino.</div>
                        <div className={`${styles.user} `}>
                            <div className={`${styles.containerImageuser} `}>
                                <img src={Mujer1} alt="Mujer1" className={`${styles.imageUser} `}/>
                            </div>
                            <div className={`${styles.infoIdentification} `}>
                                <h4 className={`${styles.nameUser} `}>Fulanita de tal</h4>
                                <p className={`${styles.positionCompany} `}>Gerente Distribuidora <span className={`${styles.spanCompany} `}>Tecnology</span></p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.cardTestimony} `}>
                        <div className={`${styles.testimony} `}>No encontrará un conjunto más completo de modelos estilizados en ningún otro lugar. Sabes que si son modelos de Happy Toolbox, todos funcionarán perfectamente juntos y te harán sonreír en el camino.</div>
                        <div className={`${styles.user} `}>
                            <div className={`${styles.containerImageuser} `}>
                                <img src={Mujer2} alt="Mujer2" className={`${styles.imageUser} `}/>
                            </div>
                            <div className={`${styles.infoIdentification} `}>
                                <h4 className={`${styles.nameUser} `}>Martha Sánchez</h4>
                                <p className={`${styles.positionCompany} `}>CEO <span className={`${styles.spanCompany} `}>Mercatop</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonies;