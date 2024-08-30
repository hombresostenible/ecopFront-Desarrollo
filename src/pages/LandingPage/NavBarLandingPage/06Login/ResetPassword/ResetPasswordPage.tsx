/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { putResetPassword } from '../../../../../redux/User/userSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IResetPassword } from '../../../../../types/Auth/resetPassword.types';
import Logo from '../../../../../assets/LogoEcopcion.svg';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import styles from './styles.module.css';

function ResetPasswordPage() {
    const { idParams, passwordResetCode } = useParams(); 
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const errorUser = useSelector((state: RootState) => state.user.errorUser);

    const { register, formState: { errors }, handleSubmit } = useForm<IResetPassword>();

    const [ idParamsUser, setIdParamsUser ] = useState('');                         //Setea el id del usuario del params
    const [ passwordResetCodeUser, setIdPasswordResetCodeUser ] = useState('');
    const [ password, setPassword ] = useState('');                                 //Setea la nueva contraseña del usuario
    const [ replyPassword, setReplyPassword ] = useState('');                       //Setea la confirmación de la nueva contraseña del usuario
    const [ messageErrorPassword, setMessageErrorPassword ] = useState('');         //Setea un mensaje de error
    const [ passwordUpdated, setPasswordUpdated ] = useState(false);                //Marca con un booleano si se actualiza la contraseña

    useEffect(() => {
        if (idParams) {
            setIdParamsUser(idParams);
        }
        if (passwordResetCode) {
            setIdPasswordResetCodeUser(passwordResetCode);
        }
    }, [ ]);

    const [ showPassword, setShowPassword ] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const [ showReplayPassword, setShowReplayPassword ] = useState(false);
    const toggleShowReplayPassword = () => {
        setShowReplayPassword((prevState) => !prevState);
    };

    const onSubmit = async (values: IResetPassword) => {
        if (password === replyPassword) {
            try {
                const formData = {
                    ...values,
                } as IResetPassword;
                await dispatch(putResetPassword(idParamsUser, passwordResetCodeUser, formData, ));
                setPasswordUpdated(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                setMessageErrorPassword('Hubo un problema al actualizar la contraseña');
            }
        } else {
            setMessageErrorPassword('Las contraseñas no coinciden');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={`${styles.container} d-flex align-items-center justify-content-center vh-100`}>
                <div className={`${styles.container__Component} d-flex flex-column align-items-center justify-content-center`}>
                    <Link to="/login" >
                        <img src={Logo} alt="Ecopcion" className={`${styles.logo} mb-2`}/>
                    </Link>

                    <div className='p-4 position-relative'>
                        {errorUser && errorUser.length > 0 && (
                            <div className={`${styles.errors} bg-danger p-2 text-white text-center border position-absolute w-100`}>
                                {Array.isArray(errorUser) && errorUser.map((error, i) => (
                                    <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                                ))}
                            </div>
                        )}

                        <h2 className={`${styles.title} text-center`}>Restablecer contraseña</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register('password', { required: true })}
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Nueva contraseña'
                                />
                                {showPassword ? (
                                    <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                ) : (
                                    <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                )}
                                {errors.password && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La nueva contraseña es requerida</p>
                                )}
                            </div>

                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type={showReplayPassword ? "text" : "password"}
                                    {...register('replyPassword', { required: true })}
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    value={replyPassword}
                                    onChange={(e) => setReplyPassword(e.target.value)}
                                    placeholder='Repetir nueva contraseña'
                                />
                                {showReplayPassword ? (
                                    <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowReplayPassword} />
                                ) : (
                                    <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowReplayPassword} />
                                )}
                                {errors.password && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La confirmación de tu nueva contraseña es requerida</p>
                                )}
                            </div>

                            {messageErrorPassword && <div className="error-message">{messageErrorPassword}</div>}

                            <div className="d-flex mb-4">
                                <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Enviar</button>
                            </div>

                            {passwordUpdated && (
                                <div className="success-message">Contraseña actualizada exitosamente</div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;