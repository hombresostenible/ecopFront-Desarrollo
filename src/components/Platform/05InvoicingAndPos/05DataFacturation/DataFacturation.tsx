import { useState } from 'react';
import styles from './styles.module.css';

function DataFacturation() {
    const [showFields, setShowFields] = useState(false);

    const handleSelectionChange = (event: { target: { value: string; }; }) => {
        setShowFields(event.target.value === 'Si');
    };

    /*
        Especificar la forma de pago, si es contado o a crédito. Si el pago es a crédito, se debe establecer el plazo. Si es de contado, especificar el medio de pago, es decir, si es efectivo, tarjeta de crédito, tarjeta débito, transferencia electrónica u otro medio que aplique.
        PREGUNTAR A SIMBA
        Si dice no, se pone consumidor final
    */
    return (
        <div>
            <div>Primero preguntar si es a contado o a crédito</div>
            <div>
                <p>¿El cliente desea registrar sus datos para facturación?</p>
                <div>
                    <div>
                        <input type="radio" name="facturation" value="Si" onChange={handleSelectionChange} />
                        <label htmlFor="si">Si</label>
                    </div>
                    <div>
                        <input type="radio" name="facturation" value="No" onChange={handleSelectionChange} />
                        <label htmlFor="no">No - 222222222222</label>
                    </div>
                </div>
            </div>

            {showFields && (
                <>
                    <div className='mb-2 d-flex flex-column align-items-start justify-content-start'>
                        <label htmlFor="">Nombre</label>
                        <input type="text" className={`${styles.info} p-2 form-control`} />
                    </div>
                    <div className='mb-2 d-flex flex-column align-items-start justify-content-start'>
                        <label htmlFor="">Apellidos</label>
                        <input type="text" className={`${styles.info} p-2 form-control`} />
                    </div>
                    <div className='mb-2 d-flex flex-column align-items-start justify-content-start'>
                        <label htmlFor="">Tipo de documento de identidad</label>
                        <select name="" id="" className={`${styles.info} p-2 form-control`}>
                            <option value="NIT">NIT</option>
                            <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                            <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </select>
                    </div>
                    <div className='mb-2 d-flex flex-column align-items-start justify-content-start'>
                        <label htmlFor="">Correo electrónico</label>
                        <input type="text" className={`${styles.info} p-2 form-control`} />
                    </div>
                    <div className='mb-2 d-flex flex-column align-items-start justify-content-start'>
                        <label htmlFor="">Dirección de facturación</label>
                        <input type="text" className={`${styles.info} p-2 form-control`} />
                    </div>
                </>
            )}

            <div className="d-flex">
                <button className={`${styles.buttonSubmit} m-auto border-0 text-decoration-none`} type='submit'>Capturar datos</button>
            </div>
        </div>
    );
}

export default DataFacturation;