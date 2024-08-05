import { FaFileInvoiceDollar } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoPersonAdd } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import styles from './styles.module.css';

function OutstandingFeatures() {

    return (
        <div className={`${styles.container} mb-5 d-flex flex-column align-items-center justify-content-center`}>
            <h2 className={`${styles.subtitle} mb-3 text-center`}>¿Quieres hacer tu negocio más competitivo y sostenible?</h2>
            <div className={`${styles.container__Functionalities} d-flex align-items-center justify-content-center`}>
                <div className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <FaFileInvoiceDollar className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Registra tus transacciones diarias</p>
                    </div>
                </div>

                <div className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <LiaFileInvoiceSolid className= {styles.iconItemInvoiceSolid}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Gestiona tus facturas electrónicas</p>
                    </div>
                </div>

                <div className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <FaChartLine className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Gestiona tus clientes y mejora tus ventas</p>
                    </div>
                </div>

                <div className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <FaCloudDownloadAlt className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Gestión de la sostenibilidad de tu negocio</p>
                    </div>
                </div>

                <div className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <IoPersonAdd className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Calcula + de 100 indicadores y genera reportes</p>
                    </div>
                </div>

                <div className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <RiCustomerService2Fill className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Recibe asesorías personalizadas</p>
                    </div>
                </div>

                <div className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <FaCloudDownloadAlt className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Notificaciones estratégicas</p>
                    </div>
                </div>

                <div className={`${styles.container__Section} overflow-hidden d-flex align-items-center justify-content-center`}>
                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                        <RiCustomerService2Fill className= {styles.iconItem}/>
                    </div>
                    <div className={`${styles.container__Description} `}>
                        <p className={`${styles.textFunctionality} `}>Toma decisiones informadas</p>
                    </div>
                </div>
            </div>

            {/* <div className={`${styles.container__Functionalities} d-flex align-items-center justify-content-center`}>
            </div> */}
        </div>
    );
}

export default OutstandingFeatures;