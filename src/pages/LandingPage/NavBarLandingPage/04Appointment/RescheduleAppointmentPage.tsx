import styles from './styles.module.css';

function RescheduleAppointmentPage() {

    return (
        <div className='text-center'>
            <h1 className='text-2xl font-bold'>Reagendar la cita</h1>
            <div className='text-center'>
                <div className='p-4'>
                    <div>
                        <h2 className={`${styles.subtitle} `}>Selecciona la fecha y hora</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RescheduleAppointmentPage;