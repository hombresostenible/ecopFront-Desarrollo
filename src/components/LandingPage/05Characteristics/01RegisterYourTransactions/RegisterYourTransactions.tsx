import NavBarLandingPage from '../../01NavBarLandingPage/NavBarLandingPage';
import Footer from '../../Footer/Footer';
import styles from './styles.module.css';

function RegisterYourTransactions() {

    return (
        <div> 
            <NavBarLandingPage />
            <div className={`${styles.container} `}>
                <div className="d-flex flex-column">
                    <h2 className={`${styles.subtitle} m-5 text-center`}>Registrar tus transacciones diarias</h2>
                    <p className='mb-5'>Registrar las transacciones diarias del negocio es un hábito que deben desarrollar tod@s l@s empresari@s. Si de manera permanente, registras todas tus ventas y todas tus compras, podrás obtener datos financieros importantes como, por ejemplo, la cantidad de dinero que entra y sale del negocio, y lo más importante, sabrás si al final del día, ganas o pierdes dinero. Igualmente podrás obtener datos de mercadeo importante como, por ejemplo, cuál es el cliente que más te compra o cual es el producto o servicio que más se vende. Además, con el registro de tus transacciones, podrás saber cuánta agua y energía consumes, cuántos residuos generas y tendrás la posibilidad de usar esa información para transformar tu modelo de negocio hacia la sostenibilidad, marcando la diferencia frente a tu competencia, generando valor a tus clientes.</p>

                    <p>Para registrar los movimientos hemos diseñado para ti un libro diario de transacciones digital, intuitivo y muy fácil de usar. Una vez hechos los registros, podrás visualizar todos los movimientos en un cuadro resumen y podrás hacer filtros para verlos en las fechas que tu elijas. La visualización y los filtros te permitirán llevar el control de todos tus movimientos y además, podrás descargar esta información para analizar los resultados con tu equipo de trabajo</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegisterYourTransactions;