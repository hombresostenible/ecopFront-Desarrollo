/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';

function Metrics () {

    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.containerMetrics} `}>
                <h1 className={`${styles.title} m-0 text-center`}>Los análisis globales al alcance de tu mano</h1>
                <p className="text-center">Te conectamos de forma fiable a cientos de feeds de datos, con acceso directo a más de 100 indicadores. La información obtenida es de máxima calidad, así como la que utilizan los profesionales relacionados con socios de datos de nivel institucional.</p>
                <div className={`${styles.containerTags} `}>
                    <h1 className={`${styles.titleHashtags} text-center`}>Respaldo en cada</h1>
                    <h1 className={`${styles.titleHashtags} text-center`}>#Ecopción</h1>
                    <div className={`${styles.containerInfoHashtags} d-flex align-items-center justify-content-center`}>
                        <div className={`${styles.infoHashtags} `}>
                            <h4 className={`${styles.countTags} m-0 text-center`}>+50M</h4>
                            <p className={`${styles.textTags} p-2 text-center`}>Nuestra plataforma está diseñada para comercios de todas las categorías.</p>
                        </div>
                        <div className={`${styles.infoHashtags} `}>
                            <h4 className={`${styles.countTags} m-0 text-center`}>#1</h4>
                            <p className={`${styles.textTags} p-2 text-center`}>Queremos ser la mejor plataforma del país en lo que respecta a inteligencia de negocios.</p>
                        </div>
                        <div className={`${styles.infoHashtags} `}>
                            <h4 className={`${styles.countTags} m-0 text-center`}>+100</h4>
                            <p className={`${styles.textTags} p-2 text-center`}>Indicadores financieros, de marketing y de sostenibilidad para tu negocio</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Metrics;