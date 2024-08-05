/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postContactUs } from '../../../../redux/User/contactUs/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IContactUs } from '../../../../types/Ecopcion/contactUs.types';
import NavBarLandingPage from '../../../../components/LandingPage/01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function ContactUsPage() {
    const dispatch: AppDispatch = useDispatch();

    // Estado de Redux
    const errorContactUs = useSelector((state: RootState) => state.contactUs.errorContactUs);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IContactUs>();

    const [formSubmitted, setFormSubmitted] = useState(false); 
    const [acceptedPolicy, setAcceptedPolicy] = useState(false);
    const [message, setMessage] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(500);

    const [selectedTopic, setSelectedTopic] = useState('Indicadores');
    const handleSelectedTopic = (event: { target: { value: SetStateAction<string> }}) => {
        setSelectedTopic(event.target.value);
    };

    const handleTextareaChange = (event: { target: { value: any; }; }) => {
        const newValue = event.target.value;
        if (newValue.length <= 500) {
            setMessage(newValue);
            setCharsRemaining(500 - newValue.length);
        }
    };

    const onSubmit = async (values: IContactUs) => {
        try {
            if (!acceptedPolicy) return;
            const formData = {
                ...values,
                selectedTopic: selectedTopic,
                helpDescription: message,
            } as IContactUs;
            await dispatch(postContactUs(formData));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                setFormSubmitted(false);
            }, 2000);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} d-flex`}>
                <div className={`${styles.container__Form_Contact} m-auto d-flex gap-4`}>
                    <div className={`${styles.container__Form} `}>
                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} px-1 position-relative`} >
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>Formulario enviado con éxito</div>
                            )}
                            {Array.isArray(errorContactUs) && errorContactUs.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}

                            <h1 className={`${styles.title} text-center`}>¡Déjanos tus datos!</h1>
                            <p className={styles.text}>Uno de nuestros asesores se comunicará contigo lo más pronto posible.</p>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Tu nombre completo</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('nameUser', { required: true })}
                                        className={`${styles.input} mb-4 p-2 border rounded`}
                                        placeholder="Tu nombre completo"
                                    />
                                    {errors.nameUser && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre es requeriido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Tu email</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('email', { required: true })}
                                        className={`${styles.input} mb-4 p-2 border rounded`}
                                        placeholder="Tu email"
                                    />
                                    {errors.email && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El email es requeriido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Celular o teléfono fijo</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="phone"
                                        {...register('phone', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='¿Cuál es el celular o teléfono fijo de tu oficina principal?'
                                        min={0}
                                    />
                                    {errors.phone && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El celular del usuario es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Tipo de identificación</h6>
                                <div className={styles.container__Input}>
                                    <select
                                        {...register('selectedTopic', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        onChange={handleSelectedTopic}
                                    >
                                        <option value='Indicadores'>Indicadores</option>
                                        <option value='Inventario'>Inventario</option>
                                        <option value='Facturacion electronica'>Facturacion electronica</option>
                                        <option value='Otro'>Otro</option>
                                    </select>
                                    {errors.selectedTopic && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de documento del usuario es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Descripción</h6>
                                <div className={styles.container__Input}>
                                    <textarea
                                        {...register('helpDescription', { required: true })}
                                        className={`${styles.textarea} p-2 border rounded`}
                                        placeholder="Descripción"
                                        cols={10}
                                        rows={5}
                                        value={message}
                                        onChange={handleTextareaChange}
                                    ></textarea>
                                    <p className={`${styles.chars__Remaining} mb-2 text-muted`}>{charsRemaining} caracteres restantes</p>
                                    {errors.helpDescription && (
                                        <p className={`${styles.text__Danger_Textarea} text-danger position-absolute`}>La descripción es requerida</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className={`${styles.container__Accepted_Policy} d-flex align-items-center justify-content-center position-relative`}>
                                <p className={`${styles.text__Accepted_Policy} text-center m-0`}>He leído y acepto los <Link to="/personalDataPolicy" className={`${styles.link} text-decoration-none text-sky-500`}>Términos y Condiciones junto con la Política de tratamiento de datos Personales</Link></p>
                                <input
                                    type="checkbox"
                                    {...register('isAceptedConditions', { required: true })}
                                    checked={acceptedPolicy}
                                    onChange={() => setAcceptedPolicy(!acceptedPolicy)}
                                    className={`${styles.checkbox} border`}
                                />
                                {errors.isAceptedConditions && (
                                    <p className={`${styles.text__Danger_Accepted_Policy} text-danger position-absolute`}>Debes de aceptar términos y condiciones</p>
                                )}
                            </div>

                            <div className="mb-4 d-flex align-items-center justify-content-center">
                                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                            </div>
                        </form>
                    </div>

                    <div className={`${styles.container__Contact} d-flex flex-column align-items-start justify-content-start`}>
                        <div className={`${styles.infoText} `}>
                            <h2 className={`${styles.info__Title} text-center`}>Contáctanos, estamos para ayudarte</h2>
                            <p className={`${styles.infoP} text-center`}><span className={`${styles.spanWhatsApp} `}>WhatsApp</span> 321 327 0365</p>
                            <p className='text-center'>
                                <span className={`${styles.infoEmail} `}>Email</span>
                                {' '}
                                <a href="mailto:felipehernandezramirez@gmail.com" className={`${styles.email} `}>info@ecopcion.com</a>
                            </p>
                        </div>
                        <div className={`${styles.containerOpeningHours} `}>
                            <h2 className={`${styles.opening} text-center`}>Horario de atención</h2>
                            <p className={`${styles.hours} text-center`}>Lunea a Viernes, de 9 am a 5 pm, fines de semana y días festivos no operamos</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContactUsPage;