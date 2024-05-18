/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { postRegisterClient } from '../../../../../redux/User/userSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IUser } from "../../../../../types/User/user.types";
import UserInformationPage from './01UserInformationPage';
import EconomicActivityPage from './02EconomicActivityPage';
import LocalizarionPage from './03LocalizarionPage';
import UserCredentialsPage from './04UserCredentialsPage';
import Logo from '../../../../../assets/LogoEcopcion.svg';
import { PiWarningCircle } from 'react-icons/pi';
import styles from './styles.module.css';

enum RegistrationStep {
    UserInformationPage,
    EconomicActivityPage,
    LocalizarionPage,
    UserCredentialsPage,
}

function RegisterUserPagePage() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const errorUser = useSelector((state: RootState) => state.user.errorUser);

    const [currentStep, setCurrentStep] = useState(RegistrationStep.UserInformationPage);
    const {register, formState: { errors }, handleSubmit} = useForm<IUser>();
    
    useEffect(() => {
        if (isAuthenticated) navigate("/configuration/profile");
    }, [ isAuthenticated ]);

    const [ selectedDepartment, setSelectedDepartment ] = useState('');
    const [ selectedCity, setSelectedCity ] = useState('');
    const [ selectedCodeDane, setSelectedCodeDane ] = useState('');
    const [ selectedSubregionCodeDane, setSelectedSubregionCodeDane ] = useState('');
    const [ resetDepartmenAndCity, setResetDepartmenAndCity ] = useState(false);
    const handleSelectDepartmentCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        setSelectedDepartment(department);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedSubregionCodeDane(subregionCodeDane);
    };

    const [ codeCiiu, setCodeCiiu ] = useState('');
    const handleSelectCodeCiiu = (codeCiiu: string) => {
        setCodeCiiu(codeCiiu);
    };  

    const onSubmit: SubmitHandler<IUser> = async (values) => {
        const registerData = {
            ...values,
            userType: "User",
            typeRole: "Superadmin",
            department: selectedDepartment,
            city: selectedCity,
            codeDane: selectedCodeDane,
            subregionCodeDane: selectedSubregionCodeDane,
            codeCiiu: codeCiiu,
            // corporateName: null,
        } as IUser;
        switch (currentStep) {
            case RegistrationStep.UserInformationPage:
                break;
            case RegistrationStep.EconomicActivityPage:
                break;
            case RegistrationStep.LocalizarionPage:
                break;
            case RegistrationStep.UserCredentialsPage:
                dispatch(postRegisterClient(registerData));
                break;
            default:
                break;
        }
        if (currentStep !== RegistrationStep.UserCredentialsPage) setCurrentStep(currentStep + 1);
        setTimeout(() => {
            setResetDepartmenAndCity(true);
            setTimeout(() => {
                setResetDepartmenAndCity(false);
            }, 10);
        }, 1500);
    };

    const handleBack = () => {
        if (currentStep !== RegistrationStep.UserInformationPage) setCurrentStep(currentStep - 1);
    };

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-center vh-100`}>
            <div className={`${styles.container__Register_User} d-flex flex-column align-items-center justify-content-center vh-100`}>
                <div className={`${styles.register__User} `}>
                    <div className='d-flex align-items-center justify-content-center'>
                        <Link to="/" >
                            <img src={Logo} alt="Ecopcion" className={`${styles.logo} mb-3`} />
                        </Link>
                    </div>

                    <div className='position-relative'>
                        {errorUser && (
                            <div className={`${styles.errors__Register} p-2 text-center position-absolute w-100`}>
                                <p className='m-0'><PiWarningCircle /> {errorUser}</p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)} >
                        {currentStep === RegistrationStep.UserInformationPage && (
                                <UserInformationPage
                                    register={register} errors={errors}
                                />
                            )}
                            {currentStep === RegistrationStep.EconomicActivityPage && (
                                <EconomicActivityPage
                                    register={register} errors={errors}
                                    onSelect={handleSelectCodeCiiu}
                                />
                            )}
                            {currentStep === RegistrationStep.LocalizarionPage && (
                                <LocalizarionPage
                                    register={register}
                                    errors={errors}
                                    onSelect={handleSelectDepartmentCity}
                                    reset={resetDepartmenAndCity}
                                />
                            )}
                            {currentStep === RegistrationStep.UserCredentialsPage && (
                                <UserCredentialsPage
                                    register={register} errors={errors}
                                />
                            )}

                            <div className="d-flex align-items-center justify-content-center gap-4">
                                {currentStep !== RegistrationStep.UserInformationPage && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className={`${styles.button__Back} mb-2 border-0 rounded text-decoration-none`}
                                    >
                                        Atrás
                                    </button>
                                )}
                                <div className="d-flex mb-2">
                                    <button
                                        type='submit'
                                        className={`${styles.button__Submit} border-0 rounded text-decoration-none`}
                                    >
                                        {currentStep === RegistrationStep.UserCredentialsPage ? 'Enviar' : 'Siguiente'}
                                    </button>
                                </div>
                            </div>
                        </form>

                        <p className='m-0 text-center'>
                            ¿Ya tienes una cuenta? <Link to="/login" className={`${styles.link} text-decoration-none text-sky-500`}>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterUserPagePage;