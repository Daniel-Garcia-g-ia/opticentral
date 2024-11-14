

function validateTurn(turn) {
    let min, max, min1, max1, min2, max2;
    
    if (turn === 'Turno 1') {
        min = '06:00';
        max = '14:00';
    } else if (turn === 'Turno 2') {
        min = '14:00';
        max = '22:00';
    } else if (turn === 'Turno 3') {
        min1 = '22:00';
        max1 = '23:59';
        min2 = '00:00';
        max2 = '06:00';
    }

    return turn === 'Turno 3'
        ? { min1, max1, min2, max2 } // Rango especial para Turno 3
        : { min, max };              // Rango normal para Turno 1 y Turno 2
}

export {
    validateTurn
}