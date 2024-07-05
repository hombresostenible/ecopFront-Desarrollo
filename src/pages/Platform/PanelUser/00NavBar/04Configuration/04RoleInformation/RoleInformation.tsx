import styles from './styles.module.css';

function RoleInformation () {
    
    return (
        <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
            <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                <h1 className={`${styles.title} mb-4`}>Informacion de roles</h1>
                <p>Actualmente en Ecopción tenemos por defecto los siguientes roles:</p>
                <div>
                    <h3>Superadmin</h3>
                    <p>Dedicado al dueño del negocio, este rol tiene facultades para todas las funcionalidades de la plataforma</p>
                </div>
                <div>
                    <h3>Administrador</h3>
                    <p>Rol dedicado para el administrador de la sede o sucursal, tiene todos los permisos a excepción de crear las sedes</p>
                </div>
                <div>
                    <h3>Vendedor</h3>
                    <p>Este rol tiene autorizado crear los registros de facturación del Sistema POS y del libro diario, no tiene permitido crear, actualizar y/o eliminar registros de equipos, herramientas, máquinas, mercancías, materias primas, productos o servicios, en caso de que requiera eliminar un registro transaccional del POS o del libro diario, requiere solicitar permito al Superadmino Administrador para que estos sean quienes puedan proceder con la eliminación</p>
                </div>
                <div>
                    <h3>Cajero</h3>
                    <p>Este rol tiene autorizado crear los registros de facturación del Sistema POS y del libro diario, no tiene permitido crear, actualizar y/o eliminar registros de equipos, herramientas, máquinas, mercancías, materias primas, productos o servicios, en caso de que requiera eliminar un registro transaccional del POS o del libro diario, requiere solicitar permito al Superadmino Administrador para que estos sean quienes puedan proceder con la eliminación</p>
                </div>
                <div>
                    <h3>Operativo</h3>
                    <p>Este rol tiene autorizado crear los registros de facturación del Sistema POS y del libro diario, no tiene permitido crear, actualizar y/o eliminar registros de equipos, herramientas, máquinas, mercancías, materias primas, productos o servicios, en caso de que requiera eliminar un registro transaccional del POS o del libro diario, requiere solicitar permito al Superadmino Administrador para que estos sean quienes puedan proceder con la eliminación</p>
                </div>
                <div>
                    <h3>Contador</h3>
                    <p>Este rol tiene autorizado crear los registros de facturación del Sistema POS y del libro diario, no tiene permitido crear, actualizar y/o eliminar registros de equipos, herramientas, máquinas, mercancías, materias primas, productos o servicios, en caso de que requiera eliminar un registro transaccional del POS o del libro diario, requiere solicitar permito al Superadmino Administrador para que estos sean quienes puedan proceder con la eliminación</p>
                </div>
            </div>
        </div>
    );
}

export default RoleInformation;