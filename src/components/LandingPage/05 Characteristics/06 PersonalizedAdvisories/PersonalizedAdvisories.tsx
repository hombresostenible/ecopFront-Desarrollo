import NavBarLandingPage from '../../../../components/LandingPage/01 NavBarLandingPage/NavBarLandingPage';
import Footer from '../../../../components/LandingPage/Footer/Footer';
import styles from './styles.module.css';

function PersonalizedAdvisories () {

    return (
        <div>
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} text-center`}>Recibir asesorías personalizadas</h2>
                    <p className='mb-5'>L@s empresari@s tenemos que tomar decisiones de manera recurrente. Sin embargo, en ocasiones nos sentimos abrumados porque llevamos dándole vueltas a un asunto varios días y no sabemos qué hacer.</p>
                    <p className='mb-5'>EcopcionApp te ofrece la posibilidad de acceder a una llamada de 20 minutos y conversar con un asesor sobre un indicador o tema estratégico de tu negocio. Agendarás la cita previamente a través de la plataforma y durante la sesión, el asesor te compartirá su visión, realizará un breve análisis de la situación de tu negocio y podrás resolver aquella duda que tengas y que no hayas podido resolver hasta el momento. </p>
                    <p className='mb-5'>Dependiendo de la membresía podrás acceder a este beneficio una (1) o dos (2) veces al mes. </p>
                    <p className='mb-5'>Para sacar el mejor provecho de la cita, deberás tener claro dos asuntos : ¿Qué decisión sobre tu negocio deseas tomar? Y ¿Qué objetivo/meta deseas alcanzar con esa decisión?  </p>
                    <p className='mb-5'>Es importante que sepas que, entre más información hayas registrado sobre tu negocio y mayor cantidad de transacciones hayas registrado en el libro diario digital, nuestro asesor contará con más y mejores datos para realizar su análisis y ofrecerte su recomendación. </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PersonalizedAdvisories;