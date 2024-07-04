import styles from './styles.module.css';

function YourPlan () {

    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.containerUserCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Tu plan actual</h1>
            </div>
        </div>
    );
}

export default YourPlan;