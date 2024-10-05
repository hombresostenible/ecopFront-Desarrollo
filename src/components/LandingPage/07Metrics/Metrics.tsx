import styles from './styles.module.css';

function Metrics () {

    return (
        <div className={`${styles.container} mb-5`}>
            <div className={`${styles.container__Metrics} `}>
                <h2 className={`${styles.title} m-0 text-center`}>Los análisis globales al alcance de tu mano</h2>
                <p className="text-center">Te conectamos de forma fiable a cientos de feeds de datos, con acceso directo a más de 100 indicadores. La información obtenida es de máxima calidad, así como la que utilizan los profesionales relacionados con socios de datos de nivel institucional.</p>
                <div className={`${styles.container__Tags} `}>
                    <h1 className={`${styles.title__Hashtags} text-center`}>Respaldo en cada</h1>
                    <h1 className={`${styles.title__Hashtags} mb-3 text-center`}>#Ecopción</h1>
                    <div className={`${styles.container__Info_Hashtags} d-flex align-items-start justify-content-center`}>
                        <div className={`${styles.info__Hashtags} `}>
                            <h4 className={`${styles.count__Tags} m-0 text-center`}>+50M</h4>
                            <p className={`${styles.text__Tags} m-0 p-2 text-center`}>Nuestra plataforma está diseñada para comercios de todas las categorías.</p>
                        </div>
                        <div className={`${styles.info__Hashtags} `}>
                            <h4 className={`${styles.count__Tags} m-0 text-center`}>#1</h4>
                            <p className={`${styles.text__Tags} m-0 p-2 text-center`}>Queremos ser la mejor plataforma del país en lo que respecta a inteligencia de negocios.</p>
                        </div>
                        <div className={`${styles.info__Hashtags} `}>
                            <h4 className={`${styles.count__Tags} m-0 text-center`}>+100</h4>
                            <p className={`${styles.text__Tags} m-0 p-2 text-center`}>Indicadores financieros, de marketing y de sostenibilidad para tu negocio</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Metrics;