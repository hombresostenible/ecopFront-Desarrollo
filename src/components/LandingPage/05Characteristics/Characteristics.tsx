/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import RegisterTransactions from '../../../assets/LandingPage/05Characteristics/RegisterTransactions.png';
import ManageYourElectronicInvoicing from '../../../assets/LandingPage/05Characteristics/ManageYourElectronicInvoicing.png';
import ManageYourCustomers from '../../../assets/LandingPage/05Characteristics/ManageYourCustomers.png';
import CalculateIndicators from '../../../assets/LandingPage/05Characteristics/CalculateIndicators.png';
import ViewAndDownload from '../../../assets/LandingPage/05Characteristics/ViewAndDownload.png';
import ReceiveCounseling from '../../../assets/LandingPage/05Characteristics/ReceiveCounseling.png';
import MakingInformedDecisions from '../../../assets/LandingPage/05Characteristics/MakingInformedDecisions.png';
import styles from './styles.module.css';

interface AnimatedBlockProps {
    title: string;
    content: string;
    image: string;
    route: string;
    textButton: string;
}

function AnimatedBlockLeft({ title, content, image, route, textButton }: AnimatedBlockProps) {
    const [ ref, inView ] = useInView({
        triggerOnce: false,
        rootMargin: '-100px 0px',
    });

    const [ animated, setAnimated ] = useState(false);

    useEffect(() => {
        if (inView) {
            setAnimated(true);
        } else {
            setAnimated(false);
        }
    }, [ inView ]);

    const animateClass = animated ? styles.animateIn : '';


    return (
        <div className="m-5 d-flex align-items-center justify-content-center gap-4" ref={ref}>
            <div className={`${styles.containerEffectTitle} d-flex flex-column align-items-center justify-content-center`}>
                <div className={`${styles.effectTitle} p-0 w-100 overflow-hidden`}>                
                    <div className={`${styles.titleCharacteristics} ${animateClass} d-flex flex-title align-items-start justify-content-center`}>
                        <h2 className={`${styles.title} m-0 text-center`}>{title}</h2>
                    </div>
                </div>
                <div><p className={`${styles.textContent} m-0 `}>{content}</p></div>
                <div className={`${styles.containerRoute}  d-flex align-items-center justify-content-center w-100`}>
                    <Link to={`/${route}`} className={`${styles.buttonRoute} text-center text-decoration-none`} >{textButton}</Link>
                </div>
            </div>
            <div className={`${styles.containerImage} position-relative d-flex align-items-center justify-content-center overflow-hidden`}>
                <img src={image} alt="Ecopcion" className={styles.image} />
            </div>
        </div>
    );
}

function AnimatedBlockRight ({ title, content, image, route, textButton }: AnimatedBlockProps) {
    const [ ref, inView ] = useInView({
        triggerOnce: false,
        rootMargin: '-100px 0px',
    });

    const [ animated, setAnimated ] = useState(false);

    useEffect(() => {
        if (inView) {
            setAnimated(true);
        } else {
            setAnimated(false);
        }
    }, [ inView ]);

    const animateClass = animated ? styles.animateIn : '';


    return (
        <div className="m-5 d-flex align-items-center justify-content-center gap-4" ref={ref}>
            <div className={`${styles.containerImage} position-relative d-flex align-items-center justify-content-center overflow-hidden`}>
                <img src={image} alt="Ecopcion" className={styles.image} />
            </div>
            <div className={`${styles.containerEffectTitle} d-flex flex-column align-items-center justify-content-center`}>
                <div className={`${styles.effectTitle} p-0 w-100 overflow-hidden`}>                
                    <div className={`${styles.titleCharacteristics} ${animateClass} d-flex flex-title align-items-start justify-content-center`}>
                        <h2 className={`${styles.title} m-0 text-center`}>{title}</h2>
                    </div>
                </div>
                <div><p className={`${styles.textContent} m-0 `}>{content}</p></div>
                <div className={`${styles.containerRoute}  d-flex align-items-center justify-content-center w-100`}>
                    <Link to={`/${route}`} className={`${styles.buttonRoute} text-center text-decoration-none`} >{textButton}</Link>
                </div>
            </div>
        </div>
    );
}

function Characteristics () {

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-center`}> 
            <div> 
                <AnimatedBlockLeft
                    title="Registrar tus transacciones diarias"
                    content="Cada vez que realices una venta, ingrese dinero al negocio o hagas una compra o pago, podrás registrar el movimiento en tu libro diario digital. Además, podrás visualizar todos los movimientos, hacer filtros para llevar control y hacer análisis"
                    image={RegisterTransactions}
                    route="register-your-transactions"
                    textButton="Saber más"
                />
                <AnimatedBlockRight
                    title="Gestionar tus facturas electrónicas"
                    content="Una vez realices la venta, podrás enviar la factura a la Dian, recibir su aprobación e imprimir o enviar el documento a tu cliente. También si lo deseas, podrás hacer cambios a tus facturas"
                    image={ManageYourElectronicInvoicing}
                    route="manage-your-electronic-invoices"
                    textButton="¡Quiero ver!"
                />
                <AnimatedBlockLeft
                    title="Gestionar tus clientes y mejorar las ventas"
                    content="Una vez hayas realizado publicidad, que la campaña este en proceso o ya haya terminado, podrás registrar en el embudo de ventas digital el número de visualizaciones, clientes interesados, cotizaciones enviadas y ventas realizadas.  Así mismo, a través de nuestro CRM, podrás llevar la base de datos de tus clientes, enviar cotizaciones, enviar comunicaciones masivas, segmentar por distintas características, hacer seguimiento al proceso de venta por cada cliente y monitorear a tu equipo de ventas"
                    image={ManageYourCustomers}
                    route="manage-your-customers"
                    textButton="El CRM ya!"
                />
                <AnimatedBlockRight
                    title="Calcular + de 50 indicadores de finanzas, mercadeo y sostenibilidad de tu negocio"
                    content="Con base en la información que hayas registrado en el libro diario digital, En cualquier momento, podrás calcular indicadores que te permitan medir cómo está la gestión de la empresa en términos de plata, ventas e impacto generado en el planeta. Dependiendo del indicador, podrás filtrar por año, mes, día, producto o servicio, tema y ver detalles o información específica de cada indicador"
                    image={CalculateIndicators}
                    route="calculate-indicators-plus"
                    textButton="Conoce cómo"
                />
                <AnimatedBlockLeft
                    title="Visualizar y descargar informes para gerentes, socios, inversionistas o clientes"
                    content="Una vez hayas calculado los indicadores, podrás visualizar gráficas e informes en pantalla o podrás descargarlos en PDF o Excel. Puedes incluir los indicadores que desees en los informes, personalizando la información para gerentes, socios, inversionistas o clientes"
                    image={ViewAndDownload}
                    route="view-download-reports"
                    textButton="Quiero saber más"
                />
                <AnimatedBlockRight
                    title="Recibir asesorías personalizadas"
                    content="Podrás agendar una cita de 20 minutos con asesores empresariales para tomar decisiones de tu negocio con base en los indicadores"
                    image={ReceiveCounseling}
                    route="personalized-advisories"
                    textButton="Saber más"
                />
                <AnimatedBlockLeft
                    title="Tomar decisiones informadas"
                    content="Durante la asesoría, te ayudaremos a tomar decisiones estratégicas de tu negocio con base "
                    image={MakingInformedDecisions}
                    route="informed-decisions"
                    textButton="Intentémoslo"
                />
            </div>
        </div>
    );
}

export default Characteristics;