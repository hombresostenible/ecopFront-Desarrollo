/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { loginUser } from '../../../../redux/User/userSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { ILogin } from '../../../../types/Auth/login.types'
import Logo from '../../../../assets/LogoEcopcion.svg';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { PiWarningCircle } from 'react-icons/pi';
import styles from './styles.module.css';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    // Estado de Redux
    const errorUser = useSelector((state: RootState) => state.user.errorUser);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    const { register, formState: { errors }, handleSubmit } = useForm<ILogin>();
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const onSubmit = async (loginData: ILogin) => {
        setLoading(true);
        try {
            dispatch(loginUser(loginData));
        } catch (error) {
            throw new Error('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/home");
    }, [ isAuthenticated ]);

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={`${styles.container} d-flex align-items-center justify-content-center vh-100`}>
                <div className={`${styles.container__Component} d-flex flex-column align-items-center justify-content-center`}>
                    <Link to="/" className='mb-3'>
                        <img src={Logo} alt="Top Drive Group" className={`${styles.logo} mb-4`}/>
                    </Link>
                    
                    <div className='position-relative'>
                        {errorUser && (
                            <div className={`${styles.errors} text-center position-absolute w-100`}>
                                <p className='m-0'><PiWarningCircle /> {errorUser}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    placeholder='Email del usuario'
                                />
                                {errors.email && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El email del usuario es requerido</p>
                                )}
                            </div>

                            <div className='mb-3'>
                                <div className={`${styles.password} d-flex align-items-center justify-content-center position-relative`}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register('password', { required: true })}
                                        className={`${styles.input} p-2 mb-3 border rounded`}
                                        placeholder='Contraseña'
                                    />
                                    {showPassword ? (
                                        <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                    ) : (
                                        <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                    )}
                                    {errors.password && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>La contraseña es requerida</p>
                                    )}
                                </div>
                            </div>

                            {loading ? 
                                <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit'>
                                    <span className="spinner-border spinner-border-sm" role="status"></span> Login...
                                </button>
                            :
                                <div className='d-flex'>
                                    <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Login</button>
                                </div>
                            }
                        </form>

                        <p className='m-0 text-center'>¿No tienes cuenta? <Link to="/register-user" className={`${styles.link} text-sky-500 text-decoration-none`}>Regístrate acá</Link></p>
                        <p className='text-center'><Link to="/reset-password" className={`${styles.link} text-sky-500 text-decoration-none`}>¿Has olvidado la contraseña?</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;