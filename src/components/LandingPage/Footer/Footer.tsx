/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { FaLinkedin} from 'react-icons/fa';
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoTelegram } from "react-icons/bi";
import styles from './styles.module.css';



function Footer() {


    return (
        <div className={`${styles.container} `}>
            <footer className={`${styles.containerFooter} `}>
                <div className={`${styles.columns} `}>
                    <div className={`${styles.column} `}>
                        <div className={`${styles.columnSection} `}>
                            <h6>SOBRE NOSOTROS</h6>
                            <Link to="/blog" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP}`}>Blog</p>
                            </Link>
                            <Link to="/ourCompany" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>La empresa</p>
                            </Link>
                            <Link to="/knowUs" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Conócenos</p>
                            </Link>
                            <Link to="/workWithUs" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Trabaja con nosotros</p>
                            </Link>
                            <Link to="/alliancesAndPrograms" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Alianzas y programas</p>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.column} `}>
                        <div className={`${styles.columnSection} `}>
                            <h6>LEGAL</h6>
                            <Link to="/termsAndConditions" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Términos y condiciones</p>
                            </Link>
                            <Link to="/dataProcessing" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Tratamiento de datos</p>
                            </Link>
                            <Link to="/habeasData" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Habeas data</p>
                            </Link>
                            <Link to="/membershipAgreement" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Contrato de membresía</p>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.column} `}>
                        <div className={`${styles.columnSection} `}>
                            <h6>SOPORTE</h6>
                            <Link to="/help" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Ayuda</p>
                            </Link>
                            <Link to="/trainings" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Capacitaciones</p>
                            </Link>
                            <Link to="/apiDocumentation" className={`${styles.linkFooter} `}>
                                <p className={`${styles.linkP} `}>Documentación de nuestra API</p>
                            </Link>
                        </div>
                    </div>
                </div>
            
                <div className={`${styles.socialMedia} `}>
                    <Link to="https://www.linkedin.com/company/ecopcion/">
                        <div className={`${styles.divIconSocial} `}>
                            <FaLinkedin className={`${styles.linkedin} `}/>
                        </div>
                    </Link>
                    <Link to="https://www.instagram.com/">
                        <div className={`${styles.divIconSocial} `}>
                            <FaInstagram className={`${styles.instagram} `}/>
                        </div>
                    </Link>
                    <Link to="https://www.facebook.com/">
                        <div className={`${styles.divIconSocial} `}>
                            <FaFacebookSquare className={`${styles.facebook} `}/>
                        </div>
                    </Link>
                    <Link to="https://twitter.com/">
                        <div className={`${styles.divIconSocial} `}>
                            <FaXTwitter className={`${styles.xTwitter} `}/>
                        </div>
                    </Link>
                    <Link to="https://web.whatsapp.com/">
                        <div className={`${styles.divIconSocial} `}>
                            <IoLogoWhatsapp className={`${styles.whatsapp} `}/>
                        </div>
                    </Link>
                    <Link to="https://web.whatsapp.com/">
                        <div className={`${styles.divIconSocial} `}>
                            <BiLogoTelegram  className={`${styles.telegram} `}/>
                        </div>
                    </Link>
                </div>
                <div className={`${styles.containerCopyright} `}>
                    <div className={`${styles.copyright} `}>
                        <div>Ecopción</div>
                        <div>Copyright © 2024, Ecopción SAS BIC NIT 901.714.110-5</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;