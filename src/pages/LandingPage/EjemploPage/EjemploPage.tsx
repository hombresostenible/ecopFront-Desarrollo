// import LogoEcopcion from '../../../assets/Logo.png';


import styles from './styles.module.css';

function EjemploPage() {

    return (
        <div className={`${styles.container} `}>
            <div className={styles.container__Component}>
                <div className={styles.top}>
                    <div className={styles.title}>VENTAS DEL PERIODO</div>
                    <div className={styles.container__Generate__By}>
                        <span className={styles.generate__By}>Genereado por Ecopcion</span>
                    </div>
                </div>

                
                <div className={styles.container__Body}>
                    <div className={styles.container__Head}>
                        <div className={styles.ddd}>
                            <div className={styles.eee}>
                                <img src="https://res.cloudinary.com/dqvdqhf4x/image/upload/v1726607570/profiles/lvkhntebfe7b7lzvgi2x.png" alt="" className={styles.logo} />
                            </div>
                            <div className={styles.fff}>
                                Empresario: Carlos Mario Reyes
                            </div>
                        </div>
                        <div className={styles.wwwwwww}>
                            <div className={styles.ccccccc}>
                                <div>Correo: <span> carlosmario.reyesp@gmail.com</span></div>
                                <div>Teléfono: <span>3128082002</span></div>
                                <div>Dirección: <span>Cra 100 # 10 - 10</span></div>
                            </div>
                            <div className={styles.user__Report}>
                                Reporte generado por: Usuario que lo genera
                            </div>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.encabezados}>
                            <div className={styles.fecha}>Fecha</div>
                            <div className={styles.sede}>Sede</div>
                            <div className={styles.nombre}>Cliente</div>
                            <div className={styles.idCliente}>Id Cliente</div>
                            <div className={styles.monto}>Monto</div>
                            <div className={styles.tipo}>Tipo</div>
                        </div>
                        <div className={styles.tbody}>
                            <div className={styles.fecha}>29/09/2024</div>
                            <div className={styles.sede}>Sede Centro</div>
                            <div className={styles.nombre}>Carlos Mario Reyes</div>
                            <div className={styles.idCliente}>1110521285</div>
                            <div className={styles.monto}>$ 1.000.000</div>
                            <div className={styles.tipo}>Contado</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.back}>

            </div>
        </div>
    );
}

export default EjemploPage;