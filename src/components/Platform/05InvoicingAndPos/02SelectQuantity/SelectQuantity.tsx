import React, { useState, useEffect, useRef } from 'react';

interface SelectQuantityProps {
    onQuantityComplete: (quantity: number) => void;
}

function SelectQuantity ({ onQuantityComplete }: SelectQuantityProps) {
    const [quantity, setQuantity] = useState<number | undefined>();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleConfirm();
        }
    };

    const handleConfirm = () => {
        if (quantity !== undefined) {
            onQuantityComplete(quantity); // Llama a la función onQuantityComplete con la cantidad seleccionada
        }
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="number"
                value={quantity === undefined ? '' : quantity}
                onChange={handleChange}
                onKeyPress={handleKeyPress} // Manejador de eventos para la tecla Enter
                min={0}
            />
            <button onClick={handleConfirm}>Confirmar</button>
        </div>
    );
}

export default SelectQuantity;
