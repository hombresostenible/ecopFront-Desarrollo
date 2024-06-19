import { useState } from 'react';
import { formatNumber } from '../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface FacturationProps {
    totalPurchase: number | undefined;
}

function Facturation ({ totalPurchase }: FacturationProps) {
    
    const [ devueltas, setDeueltas ] = useState<number>();
    //Setea el valor unitario de la compra, gasto o pago
    const [ moneyDisbursed, setMoneyDisbursed ] = useState<number>();
    const handleUnitValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUnitValue = parseFloat(event.target.value);
        setMoneyDisbursed(newUnitValue);
    };
    console.log(moneyDisbursed)

    const handleCalculate = () => {
        if (moneyDisbursed && totalPurchase) {
            setDeueltas(moneyDisbursed - totalPurchase)
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleCalculate();
        }
    };


    return (
        <div>            
            <div className='mb-2 d-flex flex-column align-items-start justify-content-start'>            
                <p className={`${styles.infoDetail} m-0 w-50`}>Selecciona el medio de pago</p>
                <select name="" id="" className={`${styles.info} p-2 form-control`}>
                    <option value="Efectivo">Efectivo</option>
                    <option value="A cuotas">A cuotas</option>
                    <option value="Tarjeta débito">Tarjeta débito</option>
                    <option value="Tarjeta crédito">Tarjeta crédito</option>
                    <option value="Wallets">Wallets</option>
                    <option value="Nequi">Nequi</option>
                    <option value="Daviplata ">Daviplata </option>
                    <option value="Movii ">Movii </option>
                    <option value="Tuya Pay">Tuya Pay</option>
                    <option value="Rappi Pay">Rappi Pay</option>
                    <option value="Dale!">Dale!</option>
                    <option value="Nubank">Nubank</option>
                    <option value="Lulo">Lulo</option>
                    <option value="Ualá">Ualá</option>
                    <option value="Transfiya">Transfiya</option>
                    <option value="Transferencia bancaria">Transferencia bancaria</option>
                    <option value="Cheque">Cheque</option>
                </select>
            </div>

            <div>Valor a cobrar $ {formatNumber(totalPurchase)}</div>

            <div className='mb-2 d-flex flex-column align-items-start justify-content-start'>
                <input 
                    type="number"
                    className={`${styles.info} p-2 form-control`}
                    placeholder='El valor entregado'
                    onChange={handleUnitValueChange}
                    onKeyPress={handleKeyPress} // Escuchar evento de teclado para Enter
                    min={0}
                />
            </div>

            <div className="d-flex">
                <button className={`${styles.buttonSubmit} m-auto border-0 text-decoration-none`} onClick={handleCalculate}>Calcular deueltas</button>
            </div>

            <div>Cambio $ {devueltas}</div>
        </div>
    );
}

export default Facturation;