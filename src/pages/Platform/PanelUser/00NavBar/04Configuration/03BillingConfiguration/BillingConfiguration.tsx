import styles from './styles.module.css';

function BillingConfiguration () {

    return (
        <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
            <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                <h1 className={`${styles.title} mb-4`}>Configuración de facturación</h1>
            </div>
        </div>
    );
}

export default BillingConfiguration;