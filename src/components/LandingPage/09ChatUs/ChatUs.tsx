/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiChatSmile2Fill } from "react-icons/ri";
import { MdWifiCalling3 } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import WhatsApp from '../../../assets/WhatsApp.png';
import Telegram from '../../../assets/Telegram.png';
import styles from './styles.module.css';

function ChatUs () {
    // Tooltip Map
    const [ showTooltipMap, setShowTooltipMap ] = useState(false);
    let tooltipTimeoutMap: NodeJS.Timeout;

    const handleTooltipMap = () => {
        setShowTooltipMap(true);
    };

    const handleMouseLeaveTooltipMap = () => {
        tooltipTimeoutMap = setTimeout(() => {
            setShowTooltipMap(false);
        }, 500);
    };

    const handleInteractionMap = () => {
        clearTimeout(tooltipTimeoutMap);
    };

    // MAP
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7953.254729934276!2d-74.07621914432602!3d4.660354162380538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a5a5b70dd47%3A0xa903925128c202ef!2sCl.%2071A%20%2315-19%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1708602435528!5m2!1ses!2sco";

    // Tooltip Llámanos
    const [ showTooltipCallUs, setShowTooltipCallUs ] = useState(false);
    let tooltipTimeoutCallUs: NodeJS.Timeout;

    const handleTooltipCallUs = () => {
        setShowTooltipCallUs(true);
    };

    const handleMouseLeaveTooltipCallUs = () => {
        tooltipTimeoutCallUs = setTimeout(() => {
            setShowTooltipCallUs(false);
        }, 500);
    };

    const handleInteractionCallUs = () => {
        clearTimeout(tooltipTimeoutCallUs);
    };

    // Chatea con nosotros
    const [ showTooltipChatUs, setShowTooltipChatUs ] = useState(false);
    let tooltipTimeoutChatUs: NodeJS.Timeout;
    const phoneNumberWhatsapp = '573213270365';
    const username = 'CarlosMario';

    const handleTooltipChatUs = () => {
        setShowTooltipChatUs(true);
    };

    const handleMouseLeaveTooltipChatUs = () => {
        tooltipTimeoutChatUs = setTimeout(() => {
            setShowTooltipChatUs(false);
        }, 500);
    };

    const handleInteractionChatUs = () => {
        clearTimeout(tooltipTimeoutChatUs);
    };

    const handleWhatsAppClick = () => {
        const url = `whatsapp://send?phone=${phoneNumberWhatsapp}`;
        window.location.href = url;
    };


    // CQuieres que te llamemos?
    const [ showTooltipCallYou, setShowTooltipCallYou ] = useState(false);
    let tooltipTimeoutCallYou: NodeJS.Timeout;

    const handleTooltipCallYou = () => {
        setShowTooltipCallYou(true);
    };

    const handleMouseLeaveTooltipCallYou = () => {
        tooltipTimeoutCallYou = setTimeout(() => {
            setShowTooltipCallYou(false);
        }, 500);
    };

    const handleInteractionCallYou = () => {
        clearTimeout(tooltipTimeoutCallYou);
    };



    return (
        <div className={`${styles.containerComunication} w-100`}>
            <p className={`${styles.title} text-center display-6`}>¿Aún tienes dudas?</p>
            <div className={`${styles.comunication} d-flex align-items-center justify-content-center gap-4`}>
                
                <div className={`${styles.boxMap} p-2 d-flex flex-column align-items-center justify-content-center`} onMouseEnter={handleInteractionMap} onMouseLeave={handleMouseLeaveTooltipMap}>
                    <div className="d-flex flex-column align-items-center justify-content-center position-relative">
                        <FaMapMarkerAlt className={`${styles.iconMap} `} onMouseEnter={handleTooltipMap} />
                        <h6 className={`${styles.text} m-0 mt-1 text-center`}>Puntos de atención</h6>
                        {showTooltipMap && (
                            <div className={`${styles.tooltipContentMap} position-absolute overflow-hidden`}>
                                <iframe
                                    className={`${styles.iframe}`}
                                    src={mapUrl}
                                    width="600" 
                                    height="400"
                                    frameBorder="0"
                                    style={{ border: "2px solid #ced4da", borderRadius: "10px" }}
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className={`${styles.boxCallUs} p-2 d-flex flex-column align-items-center justify-content-center position-relative`} onMouseEnter={handleInteractionCallUs} onMouseLeave={handleMouseLeaveTooltipCallUs}>
                    <HiOutlineDevicePhoneMobile className={styles.iconCallUs} onMouseEnter={handleTooltipCallUs}/>
                    <h6 className={`${styles.text} m-0 mt-1 text-center`}>Llámanos</h6>
                    {showTooltipCallUs && (
                        <div className={`${styles.tooltipContentCallUs} p-2 position-absolute overflow-hidden w-100`}>
                            <div className="text-center" ><h6>Línea 321 327 0365</h6></div>
                            <div className="text-center" ><h6>Línea 312 808 2002</h6></div>
                        </div>
                    )}
                </div>

                <div className={`${styles.boxChatUs} p-2 d-flex flex-column align-items-center justify-content-center position-relative`} onMouseEnter={handleInteractionChatUs} onMouseLeave={handleMouseLeaveTooltipChatUs}>
                    <RiChatSmile2Fill className={styles.iconChatUs} onMouseEnter={handleTooltipChatUs}/>
                    <h6 className={`${styles.text} m-0 mt-1 text-center`}>Chatea con nosotros</h6>
                    {showTooltipChatUs && (
                        <div className={`${styles.tooltipContentChatUs} p-3 d-flex align-items-center justify-content-center gap-3 position-absolute overflow-hidden`}>
                            <div className={`${styles.whatsappLandgin} d-flex flex-column align-items-center justify-content-center`}>
                                <div onClick={handleWhatsAppClick} className={`${styles.whatsappContent} d-flex align-items-center justify-content-center border rounded border-dark-subtle`} >
                                    <img className={`${styles.whatsapp}`} src={WhatsApp} alt="Logo WhatsApp" />
                                </div>
                                <h6>Whatsapp</h6>
                            </div>

                            <div className={`${styles.telegramLanding} d-flex flex-column align-items-center justify-content-center`}>
                                <div className={`${styles.telegramContent} d-flex flex-column align-items-center justify-content-center border rounded border-dark-subtle`}>
                                    <a href={`https://t.me/${username}`} target="_blank" rel="noreferrer noopener" className="text-decoration-none" >
                                        <img className={`${styles.telegram}`} src={Telegram} alt="Logo Telegram" />
                                    </a>
                                </div>
                                <h6 >Telegram</h6>
                            </div>
                        </div>
                    )}
                </div>

                <div className={`${styles.boxCallYou} p-2 d-flex flex-column align-items-center justify-content-center position-relative`} onMouseEnter={handleInteractionCallYou} onMouseLeave={handleMouseLeaveTooltipCallYou}>
                    <MdWifiCalling3 className={styles.iconCallYou} onMouseEnter={handleTooltipCallYou}/>
                    <h6 className={`${styles.text} m-0 mt-1 text-center`}>¿Te llamemos?</h6>
                    {showTooltipCallYou && (
                        <div className={`${styles.tooltipContentCallYou} p-3 position-absolute overflow-hidden`}>
                            <p className="text-center">Deja tus datos y un asesor se comunicará contigo</p>
                            <div className={`${styles.formCallYou} d-flex flex-column align-items-center justify-content-center gap-2`}>
                                <input
                                    type="text"
                                    className="p-1 border rounded border-dark-subtle w-100"
                                    placeholder="Tu nombre o el de tu empresa"
                                />
                                <input
                                    type="text"
                                    className="p-1 border rounded border-dark-subtle w-100"
                                    placeholder="Tu número de celular"
                                />

                                <div className="d-flex">
                                    <button className={`${styles.buttonSubmit} m-0 border-0 text-decoration-none`} type='submit' >Enviar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatUs;