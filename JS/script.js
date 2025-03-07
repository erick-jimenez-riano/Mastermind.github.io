let numeroSecreto1, numeroSecreto2;

function startGame() {
    numeroSecreto1 = document.getElementById("secret1").value;
    numeroSecreto2 = document.getElementById("secret2").value;

    if (!validarNumero(numeroSecreto1) || !validarNumero(numeroSecreto2)) {
        alert("Los números deben tener exactamente 4 dígitos numéricos.");
        return;
    }

    document.getElementById("setup").classList.add("d-none");
    document.getElementById("game").classList.remove("d-none");
    document.getElementById("history1").innerHTML = "";
    document.getElementById("history2").innerHTML = "";
}

function makeGuess() {
    let intento1 = document.getElementById("guess1").value;
    let intento2 = document.getElementById("guess2").value;

    if (!validarNumero(intento1) || !validarNumero(intento2)) {
        alert("Los intentos deben ser de 4 dígitos.");
        return;
    }

    let resultado1 = evaluarIntento(intento1, numeroSecreto2);
    let resultado2 = evaluarIntento(intento2, numeroSecreto1);

    document.getElementById("feedback").innerHTML = `
        <p><strong>Jugador 1:</strong> ${resultado1.p}P ${resultado1.i}I</p>
        <p><strong>Jugador 2:</strong> ${resultado2.p}P ${resultado2.i}I</p>
    `;

    agregarHistorial("history1", intento1, resultado1);
    agregarHistorial("history2", intento2, resultado2);

    if (resultado1.p === 4 && resultado2.p === 4) {
        alert("¡Empate!");
        resetGame();
    } else if (resultado1.p === 4) {
        alert("¡Jugador 1 ha ganado!");
        resetGame();
    } else if (resultado2.p === 4) {
        alert("¡Jugador 2 ha ganado!");
        resetGame();
    }
}

// ✅ Función corregida para evaluar intentos
function evaluarIntento(intento, secreto) {
    let p = 0, i = 0;
    let intentoArr = intento.split('');
    let secretoArr = secreto.split('');

    let usadosSecreto = [false, false, false, false];
    let usadosIntento = [false, false, false, false];

    // ✅ Paso 1: Contar aciertos exactos (P)
    for (let idx = 0; idx < 4; idx++) {
        if (intentoArr[idx] === secretoArr[idx]) {
            p++;
            usadosSecreto[idx] = true;
            usadosIntento[idx] = true;
        }
    }

    // ✅ Paso 2: Contar aciertos en posición incorrecta (I)
    for (let idx = 0; idx < 4; idx++) {
        if (!usadosIntento[idx]) {
            for (let j = 0; j < 4; j++) {
                if (!usadosSecreto[j] && intentoArr[idx] === secretoArr[j]) {
                    i++;
                    usadosSecreto[j] = true;
                    break;
                }
            }
        }
    }

    return { p, i };
}

function validarNumero(num) {
    return /^[0-9]{4}$/.test(num);
}

function agregarHistorial(tablaId, intento, resultado) {
    let tabla = document.getElementById(tablaId);
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${intento}</td><td>${resultado.p}P ${resultado.i}I</td>`;
    tabla.appendChild(fila);
}

function resetGame() {
    document.getElementById("setup").classList.remove("d-none");
    document.getElementById("game").classList.add("d-none");
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("history1").innerHTML = "";
    document.getElementById("history2").innerHTML = "";
}