/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { AiFillCaretRight } from "react-icons/ai";
import styles from './styles.module.css';

function Sustainability () {

    return (
        <div className={`${styles.container} d-flex w-100`}>
            <div className={`${styles.containerSustainability} d-flex align-items-center justify-content-center gap-3`}>
                <div className={`${styles.sustainability} m-0 d-flex flex-column align-items-center justify-content-center gap-3`}>
                    <h2 className={`${styles.title} m-0 text-center`}>¿Por qué en Ecopción somos diferentes?</h2>
                    <Link to="/primer"className={`${styles.containerComponent} p-3 d-flex text-decoration-none`} >
                        <div className="d-flex flex-column align-items-start justify-content-center w-100">
                            <p className="m-0">Porque hacemos más sostenible tu negocio</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                            <AiFillCaretRight className={`${styles.icon} d-flex `} />
                        </div>
                    </Link>

                    <Link to="/segundo"className={`${styles.containerComponent} p-3 d-flex text-decoration-none`} >
                        <div className="d-flex flex-column align-items-start justify-content-center w-100">
                            <p className="m-0">Porque hacemos más competitivo tu negocio</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                            <AiFillCaretRight className={`${styles.icon} d-flex `} />
                        </div>                        
                    </Link>
                </div>

                <div className={`${styles.sustainability} m-0 d-flex flex-column align-items-center justify-content-center gap-3`}>
                    <h2 className={`${styles.title} m-0 text-center`}>La sosteniblidad es nuestra prioridad</h2>
                    <Link to="/tercer"className={`${styles.containerComponent} p-3 d-flex text-decoration-none`} >
                        <div className="d-flex flex-column align-items-start justify-content-center w-100">
                            <p className="m-0">Porque en un (1) solo software puedes gestionar tus facturas, tus clientes y hacer inteligencia de negocios.</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                            <AiFillCaretRight className={`${styles.icon} d-flex `} />
                        </div>                        
                    </Link>

                    <Link to="/cuarto"className={`${styles.containerComponent} p-3 d-flex text-decoration-none`} >
                        <div className="d-flex flex-column align-items-start justify-content-center w-100">
                            <p className="m-0">Porque hacemos las cosas fáciles</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                            <AiFillCaretRight className={`${styles.icon} d-flex `} />
                        </div>                        
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sustainability;