import { useCallback } from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoPersonAdd } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import styles from './styles.module.css';

function OutstandingFeatures() {
    const handleScrollToAnchor = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, hash: string) => {
        event.preventDefault();
        const element = document.querySelector(hash);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop - 70, // Ajusta el desplazamiento para la altura de la Navbar
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <div className={`${styles.container} mb-5 d-flex flex-column align-items-center justify-content-center`}>
            <h2 className={`${styles.subtitle} mb-3 text-center`}>¿Quieres hacer tu negocio más competitivo y sostenible?</h2>
            <div className={`${styles.container__Functionalities} d-flex align-items-center justify-content-center`}>
                <a onClick={(e) => handleScrollToAnchor(e, '#registra-tus-transacciones-diarias')} className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center text-decoration-none`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <FaFileInvoiceDollar className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Registra tus transacciones diarias</p>
                    </div>
                </a>

                <a onClick={(e) => handleScrollToAnchor(e, '#gestiona-tus-facturas-electrónicas')} className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center text-decoration-none`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <LiaFileInvoiceSolid className= {styles.iconItemInvoiceSolid}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Gestiona tus facturas electrónicas</p>
                    </div>
                </a>

                <a onClick={(e) => handleScrollToAnchor(e, '#gestiona-tus-clientes-y-mejora-tus-ventas')} className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center text-decoration-none`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <FaChartLine className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Gestiona tus clientes y mejora tus ventas</p>
                    </div>
                </a>

                <a onClick={(e) => handleScrollToAnchor(e, '#gestión-de-la-sostenibilidad-de-tu-negocio')} className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center text-decoration-none`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <FaCloudDownloadAlt className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Gestión de la sostenibilidad de tu negocio</p>
                    </div>
                </a>

                <a onClick={(e) => handleScrollToAnchor(e, '#calcula-más-de-100-indicadores-y-genera-reportes')} className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center text-decoration-none`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <IoPersonAdd className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Calcula más de 100 indicadores y genera reportes</p>
                    </div>
                </a>

                <a onClick={(e) => handleScrollToAnchor(e, '#recibe-asesorías-personalizadas')} className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center text-decoration-none`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <RiCustomerService2Fill className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Recibe asesorías personalizadas</p>
                    </div>
                </a>

                <a onClick={(e) => handleScrollToAnchor(e, '#notificaciones-estratégicas')} className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center text-decoration-none`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <FaCloudDownloadAlt className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Notificaciones estratégicas</p>
                    </div>
                </a>

                <a onClick={(e) => handleScrollToAnchor(e, '#toma-decisiones-informadas')} className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center text-decoration-none`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <RiCustomerService2Fill className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Toma decisiones informadas</p>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default OutstandingFeatures;