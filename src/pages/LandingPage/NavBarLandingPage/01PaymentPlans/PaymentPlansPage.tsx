import { useState } from 'react';
import NavBarLandingPage from '../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../components/LandingPage/Footer/Footer';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import styles from './styles.module.css';

function PaymentPlansPage() {
    const [ showAnswer1, setShowAnswer1 ] = useState(false);
    const handleShowAnswer1 = () => {
        setShowAnswer1(true);
    };    
    const handleHideAnswer1 = () => {
        setShowAnswer1(false);
    };
    
    const [ showAnswer2, setShowAnswer2 ] = useState(false);
    const handleShowAnswer2 = () => {
        setShowAnswer2(true);
    };    
    const handleHideAnswer2 = () => {
        setShowAnswer2(false);
    };

    const [ showAnswer3, setShowAnswer3 ] = useState(false);
    const handleShowAnswer3 = () => {
        setShowAnswer3(true);
    };    
    const handleHideAnswer3 = () => {
        setShowAnswer3(false);
    };

    const [ showAnswer4, setShowAnswer4 ] = useState(false);
    const handleShowAnswer4 = () => {
        setShowAnswer4(true);
    };    
    const handleHideAnswer4 = () => {
        setShowAnswer4(false);
    };

    const [ showAnswer5, setShowAnswer5 ] = useState(false);
    const handleShowAnswer5 = () => {
        setShowAnswer5(true);
    };    
    const hhandleHideAnswer5 = () => {
        setShowAnswer5(false);
    };

    const [ showAnswer6, setShowAnswer6 ] = useState(false);
    const handleShowAnswer6 = () => {
        setShowAnswer6(true);
    };    
    const handleHideAnswer6 = () => {
        setShowAnswer6(false);
    };

    const [ showAnswer7, setShowAnswer7 ] = useState(false);
    const handleShowAnswer7 = () => {
        setShowAnswer7(true);
    };    
    const handleHideAnswer7 = () => {
        setShowAnswer7(false);
    };

    const [ showAnswer8, setShowAnswer8 ] = useState(false);
    const handleShowAnswer8 = () => {
        setShowAnswer8(true);
    };    
    const handleHideAnswer8 = () => {
        setShowAnswer8(false);
    };

    const [ showAnswer9, setShowAnswer9 ] = useState(false);
    const handleShowAnswer9 = () => {
        setShowAnswer9(true);
    };    
    const handleHideAnswer9 = () => {
        setShowAnswer9(false);
    };

    const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();        
        const targetElement = document.getElementById(targetId);    
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <h1 className={`${styles.title} text-center`}>Planes para cualquier nivel de crecimiento</h1>
                <p className={`${styles.info__Legal} text-center`}>Para efectos fiscales, es posible que su factura final incluya impuestos en función de las normas establecidas en su país de residencia.</p>

                <div className={`${styles.container__Table} `}>
                    <div className={`${styles.thead} d-flex align-items-center justify-content-center`}>
                        <div className={`${styles.thead__Description} text-center`}>Comparar planes</div>
                        <div className={`${styles.thead__Column} text-center`}>Básico - Free</div>
                        <div className={`${styles.thead__Column} text-center`}>Medio</div>
                        <div className={`${styles.thead__Column} text-center`}>Avanzado</div>
                    </div>

                    <div>
                        <div className={`${styles.section} `}>
                            <div className={`${styles.section__Table} mt-2 mb-2 pt-3 pb-3 px-4`}>Registro de información</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Cargue de inventario desde excel</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Acompañamiento telefónico para el registo manual de información</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.section} `}>
                            <div className={`${styles.section__Table} mt-2 mb-2 pt-3 pb-3 px-4`}>Sedes o sucursales</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Número de sedes o sucursales</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>1</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Hasta 3</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.section} `}>
                            <div className={`${styles.section__Table} mt-2 mb-2 pt-3 pb-3 px-4`}>Usuarios</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Registro de usuarios</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Hasta 10</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Hasta 20</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Número de colaboradores con acceso por sede</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>1 por sede</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Hasta 5 por sede</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.section} `}>
                            <div className={`${styles.section__Table} mt-2 mb-2 pt-3 pb-3 px-4`}>Facturación Electrónica</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Facturación Electrónica</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Limitada en cantidad de facturas por mes</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.section} `}>
                            <div className={`${styles.section__Table} mt-2 mb-2 pt-3 pb-3 px-4`}>Libro diario digital</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Registro de transacciones en el libro diario digital</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Visualización del resumen de transacciones</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.section} `}>
                            <div className={`${styles.section__Table} mt-2 mb-2 pt-3 pb-3 px-4`}>Calculo de indicadores y visualización de informes</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Indicadores financieros que puedo calcular</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>3 indicadores</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>5 indicadores</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>13 indicadores</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Indicadores de mercadeo que puedo calcular</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>3 indicadores</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>9 indicadores</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>14 indicadores</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Indicadores de sostenibilidad que puedo calcular</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>8 indicadores ESG</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>21 indicadores ESG</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>61 indicadores</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Visualización del detalle de los indicadores</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Visualización del detalle de los indicadores</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>De manera permanente en función de los indicadores incluidos en el paquete</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>De manera permanente en función de los indicadores incluidos en el paquete</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Filtros para el calculo de indicadores</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Todos</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Todos</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Todos</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Visualización de informes en pantalla</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>De manera permanente en función de los indicadores incluidos en el paquete</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>De manera permanente en función de los indicadores incluidos en el paquete</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>De manera permanente en función de los indicadores incluidos en el paquete</div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.section} `}>
                            <div className={`${styles.section__Table} mt-2 mb-2 pt-3 pb-3 px-4`}>Descarga de informes</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Descarga de informes por tema - finanzas, mercadeo o sostenibilidad- en PDF o Excel con todos los indicadores seleccionados en un (1) mismo documento por temática</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>1 por semana</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>1 por dia</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.section} `}>
                            <div className={`${styles.section__Table} mt-2 mb-2 pt-3 pb-3 px-4`}>Asesorias personalizadas para la toma de decisiones</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Asesorias personalizadas para la toma de decisiones</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Una (1) por mes</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Dos (2) por mes</div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.section} `}>
                            <div className={`${styles.section__Table} mt-2 mb-2 pt-3 pb-3 px-4`}>CRM</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Número de Usuarios del CRM</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Hasta 5</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Hasta 20</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Sin límite</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Lista de clientes</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Envio de correos masivos</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Envio de cotizaciones personalizadas</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Segmentación de clientes</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Embudo de ventas - Seguimiento al proceso de ventas con cada cliente</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                        </div>
                        <div className={`${styles.tbody} d-flex align-items-center justify-content-center`}>
                            <div className={`${styles.thead__Description_Info} pt-2 pb-2 px-4`}>Evaluación del desempeño del equipo de ventas</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>No</div>
                            <div className={`${styles.thead__Column_Info} pt-2 pb-2 px-4 text-center`}>Si</div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.container__Questions} `}>
                    <h1 className={`${styles.title} text-center mb-4`}>Preguntas frecuentes</h1>
                    <div className={`${styles.container__Question} m-auto pt-3 pb-3`}>
                        <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                            <h6 className={`${styles.question} m-0`}>¿Es seguro comprar suscripciones en Ecopción?</h6>                            
                            <div className={`${styles.container__Icon_Plus} d-flex align-items-center justify-content-center`}>
                                {showAnswer1 === false && (
                                    <FiPlus className={`${styles.icon__Answer} m-0`} onClick={handleShowAnswer1}/>
                                )}
                                {showAnswer1 === true && (
                                    <FiMinus className={`${styles.icon__Answer} `} onClick={handleHideAnswer1}/>
                                )}
                            </div>
                        </div>
                        {showAnswer1 && (
                            <div className={`${styles.container__Answers} `}>
                                <p>Si, es seguro, no almacenamos tus credenciales de pago. Implementamos PSE y PayU a través de sus API´s para procesar todos los pagos. Estas API´s nos permiten crear enlaces protegidos al método de pago cuando compras cualquier servicio en nuestra plataforma. Así, proporcionamos una forma segura, fácil y protegida de realizar suscripciones en nuestro sitio.</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.container__Question} m-auto pt-3 pb-3`}>
                        <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                            <h6 className={`${styles.question} m-0`}>¿Cómo puedo pagar una suscripción a Ecopción?</h6>
                            <div className={`${styles.container__Icon_Plus} d-flex align-items-center justify-content-center`}>
                                {showAnswer2 === false && (
                                    <FiPlus className={`${styles.icon__Answer} `} onClick={handleShowAnswer2}/>
                                )}
                                {showAnswer2 === true && (
                                    <FiMinus className={`${styles.icon__Answer} `} onClick={handleHideAnswer2}/>
                                )}
                            </div>
                        </div>
                        {showAnswer2 && (
                            <div className={`${styles.container__Answers} `}>
                                <p>Entre los métodos de pago aceptados se incluyen tarjetas de Credito, cuentas de ahorro y cuentas corrientes de todos los bancos con integración a PSE.</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.container__Question} m-auto pt-3 pb-3`}>
                        <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                            <h6 className={`${styles.question} m-0`}>¿Puedo cancelar en cualquier momento?</h6>
                            <div className={`${styles.container__Icon_Plus} d-flex align-items-center justify-content-center`}>
                                {showAnswer3 === false && (
                                    <FiPlus className={`${styles.icon__Answer} `} onClick={handleShowAnswer3}/>
                                )}
                                {showAnswer3 === true && (
                                    <FiMinus className={`${styles.icon__Answer} `} onClick={handleHideAnswer3}/>
                                )}
                            </div>
                        </div>
                        {showAnswer3 && (
                            <div className={`${styles.container__Answers} `}>
                                <p>Puedes cancelar tu suscripción en cualquier momento y no se renovará automáticamente después del periodo de pago actual. El servicio de pago permanecerá activo mientras dure el periodo de pago.</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.container__Question} m-auto pt-3 pb-3`}>
                        <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                            <h6 className={`${styles.question} m-0`}>¿Cuál es nuestra Política de reembolso?</h6>
                            <div className={`${styles.container__Icon_Plus} d-flex align-items-center justify-content-center`}>
                                {showAnswer4 === false && (
                                    <FiPlus className={`${styles.icon__Answer} `} onClick={handleShowAnswer4}/>
                                )}
                                {showAnswer4 === true && (
                                    <FiMinus className={`${styles.icon__Answer} `} onClick={handleHideAnswer4}/>
                                )}
                            </div>
                        </div>
                        {showAnswer4 && (
                            <div className={`${styles.container__Answers} `}>
                                <p>No hay reembolsos para compras iniciales (es decir, compras por primera vez) y no hay reembolsos para planes mensuales. Los reembolsos solo están disponibles tras una deducción automática para pagos anuales (es decir, tras la prueba y tras la renovación) en un plazo de 14 días naturales desde que se realizó el pago.</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.container__Question} m-auto pt-3 pb-3`}>
                        <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                            <h6 className={`${styles.question} m-0`}>¿Cómo funciona la mejora sin pago?</h6>
                            <div className={`${styles.container__Icon_Plus} d-flex align-items-center justify-content-center`}>
                                {showAnswer5 === false && (
                                    <FiPlus className={`${styles.icon__Answer} `} onClick={handleShowAnswer5}/>
                                )}
                                {showAnswer5 === true && (
                                    <FiMinus className={`${styles.icon__Answer} `} onClick={hhandleHideAnswer5}/>
                                )}
                            </div>
                        </div>
                        {showAnswer5 && (
                            <div className={`${styles.container__Answers} `}>
                                <p>Puedes mejorar tu suscripción anual en cualquier momento sin necesidad de realizar transacciones adicionales. Todos los días restantes de tu plan actual se convertirán automáticamente en días de valor equivalente en el nuevo nivel. No pierdes nada, basta con utilizar el importe restante para cambiar a una versión mejor. Así, se reducirá el periodo restante de tu suscripción y se cambiará tu próxima fecha de pago.</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.container__Question} m-auto pt-3 pb-3`}>
                        <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                            <h6 className={`${styles.question} m-0`}>¿Cómo se puede pasar a un plan con una versión inferior?</h6>
                            <div className={`${styles.container__Icon_Plus} d-flex align-items-center justify-content-center`}>
                                {showAnswer6 === false && (
                                    <FiPlus className={`${styles.icon__Answer} `} onClick={handleShowAnswer6}/>
                                )}
                                {showAnswer6 === true && (
                                    <FiMinus className={`${styles.icon__Answer} `} onClick={handleHideAnswer6}/>
                                )}
                            </div>
                        </div>
                        {showAnswer6 && (
                            <div className={`${styles.container__Answers} `}>
                                <p>Si bajas de categoría, tu plan actual se mantendrá tal cual hasta la fecha de suscripción. A continuación, cuando caduque, se activará el nuevo plan con la tarifa seleccionada.</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.container__Question} m-auto pt-3 pb-3`}>
                        <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                            <h6 className={`${styles.question} m-0`}>¿Puedo obtener datos en tiempo real?</h6>
                            <div className={`${styles.container__Icon_Plus} d-flex align-items-center justify-content-center`}>
                                {showAnswer7 === false && (
                                    <FiPlus className={`${styles.icon__Answer} `} onClick={handleShowAnswer7}/>
                                )}
                                {showAnswer7 === true && (
                                    <FiMinus className={`${styles.icon__Answer} `} onClick={handleHideAnswer7}/>
                                )}
                            </div>
                        </div>
                        {showAnswer7 && (
                            <div className={`${styles.container__Answers} `}>
                                <p>Todos los datos son en tiempo real, una vez realices el registro satisfactoriamente, puedes ver el cálculo inmediatamente de todos los indicadores así como su descarga, todo de acuerdo con el plan seleccionado.</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.container__Question} m-auto pt-3 pb-3`}>
                        <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                            <h6 className={`${styles.question} m-0`}>¿Qué diferencia hay entre la suscripción gratuita y las versiones de pago?</h6>
                            <div className={`${styles.container__Icon_Plus} d-flex align-items-center justify-content-center`}>
                                {showAnswer8 === false && (
                                    <FiPlus className={`${styles.icon__Answer} `} onClick={handleShowAnswer8}/>
                                )}
                                {showAnswer8 === true && (
                                    <FiMinus className={`${styles.icon__Answer} `} onClick={handleHideAnswer8}/>
                                )}
                            </div>
                        </div>
                        {showAnswer8 && (
                            <div className={`${styles.container__Answers} `}>
                                <p>Nuestra plataforma cuenta con una seríe de funcionalidades básicas en su versión gratuita, así como un número determinado de descargas de información (Máximo 30 descargas por todos los conceptos). Las cuentas de pago tienen una cantidad de indicadores y descargas acorde al seleccionado, échales un vistazo <a href="#plants" className={`${styles.anchor} text-decoration-none`} onClick={(e) => handleAnchorClick(e, 'plants')}>aquí</a>.</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.container__Question} m-auto pt-3 pb-3`}>
                        <div className={`${styles.question__And_Icon} d-flex align-items-center justify-content-between`}>
                            <h6 className={`${styles.question} m-0`}>¿Puedo contratar un plan aunque no sepa cómo analizar mi negocio de forma profesional?</h6>
                            <div className={`${styles.container__Icon_Plus} d-flex align-items-center justify-content-center`}>
                                {showAnswer9 === false && (
                                    <FiPlus className={`${styles.icon__Answer} `} onClick={handleShowAnswer9}/>
                                )}
                                {showAnswer9 === true && (
                                    <FiMinus className={`${styles.icon__Answer} `} onClick={handleHideAnswer9}/>
                                )}
                            </div>
                        </div>
                        {showAnswer9 && (
                            <div className={`${styles.container__Answers} `}>
                                <p>Por supuesto. Nuestros planes de pago tienen un montón de características, incluyendo más indicadores, datos, información comparativa, y mucho más. Si necesitas más de lo que ofrece el plan gratuito, puedes adquirir uno de pago, aunque no seas un analista profesional.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PaymentPlansPage;