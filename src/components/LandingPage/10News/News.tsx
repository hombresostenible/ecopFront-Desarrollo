/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';

function News () {

    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.containerNews} d-flex flex-column align-items-center justify-content-center gap-2`}>
                <h2 className={`${styles.title} m-0 text-start`}>Las noticias de hoy</h2>
                <div className='d-flex align-items-center justify-content-center gap-3'>
                    <div className={`${styles.news} d-flex flex-column position-relative overflow-hidden`}>
                        <div className={`${styles.visualization} d-flex flex-column position-relative`}>
                            <div className={`${styles.imageNews1} position-relative w-100`}></div>
                            <div className={`${styles.intermediateShadow} position-absolute w-100`}></div>
                            <h4 className={`${styles.titleNews} text-center position-absolute`}>¿Sabes sobrellevar la presión y el estrés laboral?</h4>
                        </div>
                        <div className={`${styles.lineBottom1} d-flex`}></div>
                        <div className={`${styles.descriptionNews} text-center w-100`}>
                            <p className={`${styles.textDescription1} d-flex align-items-center justify-content-center`}>Lorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur adipisicing</p>
                        </div>
                    </div>
                    <div className={`${styles.news} d-flex flex-column position-relative overflow-hidden`}>
                        <div className={`${styles.visualization} d-flex flex-column position-relative`}>
                            <div className={`${styles.imageNews2} d-flex align-items-center justify-content-end position-relative w-100`}></div>
                            <div className={`${styles.intermediateShadow} position-absolute w-100`}></div>
                            <h4 className={`${styles.titleNews} text-center position-absolute`}>Recomendaciones para llevar una buena contabilidad de tu negocio</h4>
                        </div>
                        <div className={`${styles.lineBottom2} d-flex`}></div>
                        <div className={`${styles.descriptionNews} text-center w-100`}>
                            <p className={`${styles.textDescription2} d-flex align-items-center justify-content-center`}>Lorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur adipisicing</p>
                        </div>
                    </div>
                    <div className={`${styles.news} d-flex flex-column position-relative overflow-hidden`}>
                        <div className={`${styles.visualization} d-flex flex-column position-relative`}>
                            <div className={`${styles.imageNews3} d-flex align-items-center justify-content-end position-relative`}></div>
                            <div className={`${styles.intermediateShadow} position-absolute w-100`}></div>
                            <h4 className={`${styles.titleNews} text-center position-absolute`}>El equilibrio perfecto entre tu vida laboral y familiar</h4>
                        </div>
                        <div className={`${styles.lineBottom3} d-flex`}></div>
                        <div className={`${styles.descriptionNews} text-center w-100`}>
                            <div>
                                <p className={`${styles.textDescription3} d-flex align-items-center justify-content-center`}>Lorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur adipisicing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News
