/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { loginUser } from '../../../../redux/userSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { ILogin } from '../../../../types/login.types'
import Logo from '../../../../assets/LogoEcopcion.svg';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { PiWarningCircle } from 'react-icons/pi';
import styles from './styles.module.css';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const loginErrors = useSelector((state: RootState) => state.user.loginErrors);

    const { register, formState: { errors }, handleSubmit } = useForm<ILogin>();

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const onSubmit = async (loginData: ILogin) => {
        try {
            dispatch(loginUser(loginData));
        } catch (error) {
            throw new Error('Error al iniciar sesión');
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/panel-user/profile");
    }, [ isAuthenticated ]);

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={`${styles.container} d-flex align-items-center justify-content-center vh-100`}>

                <div className={`${styles.container__Login} d-flex flex-column align-items-center justify-content-center`}>
                    <Link to="/">
                        <img src={Logo} alt="Top Drive Group" className={`${styles.logo} mb-4`}/>
                    </Link>
                    
                    <div className='position-relative'>
                        {loginErrors && (
                            <div className={`${styles.errors__Login} p-2 text-center position-absolute w-100`}>
                                <p className='m-0'><PiWarningCircle /> {loginErrors}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <div className='mb-2 d-flex align-items-center justify-content-center position-relative'>
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

                            <div className='mb-2'>
                                <div className="rounded d-flex align-items-center justify-content-center position-relative">
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
                            
                            <div className="d-flex mb-4">
                                <button 
                                    className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`}
                                    type='submit'
                                >
                                    Login
                                </button>
                            </div>  
                        </form>

                        <p className='m-0 text-center'>¿No tienes cuenta? <Link to="/register" className={`${styles.link} text-sky-500 text-decoration-none`}>Regístrate acá</Link></p>
                        <p className='text-center'><Link to="/reset-password-user" className={`${styles.link} text-sky-500 text-decoration-none`}>¿Has olvidado la contraseña?</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;



// import { Link } from 'react-router-dom';
// // import PublicityLogin from './PublicityLogin/PublicityLogin';
// import Logo from '../../../../assets/LogoEcopcion.svg';
// import styles from './styles.module.css';

// function LoginPage() {
    
//     return (
//         <div className={`${styles.container} d-flex align-items-center justify-content-center`}>
//             <div className={`${styles.containerLogin} d-flex align-items-center justify-content-center`}>
//                 <div className={`${styles.login} d-flex flex-column align-items-center justify-content-center`}>
//                     <Link to="/" >
//                         <img src={Logo} alt="Ecopcion" height="80" className="mb-3"/>
//                     </Link>
//                     <div className='p-4'>
//                         <h1 className={`${styles.title} text-center`}>Inicia sesión</h1>
//                         <div className='d-flex justify-content-around'>
//                             <div className='mb-3'>
//                                 <Link to="/loginUser">
//                                     <button
//                                         className={`${styles.buttonLogin} m-1 border-0`}
//                                     >
//                                         Personas
//                                     </button>
//                                 </Link>
//                             </div>
//                             <div className='mb-3'>
//                                 <Link to="/loginCompany">
//                                     <button
//                                         className={`${styles.buttonLogin} m-1 border-0`}
//                                     >
//                                         Empresas
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LoginPage;