
let numeroSecreto;
let vidas;

const txtStatus = document.getElementById("status");
const btnIniciar = document.getElementById("btIniciar");
const numeroChute = document.getElementById("num1");
const btnChutar = document.getElementById("btChutar");
const resultado = document.getElementById("txtResultado");

btnIniciar.addEventListener("click", novoJogo);
btnChutar.addEventListener("click", chutar);
numeroChute.addEventListener("keydown", (event) => {
    if (event.key === "Enter") chutar();
});


desabilitarChute(true);

function novoJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    vidas = 10;

    limparTela();
    atualizarVidas();
    desabilitarChute(false);
    numeroChute.focus();
}

function atualizarVidas() {
    txtStatus.textContent = "+ ".repeat(vidas);

    if (vidas <= 0) {
        mostrarMensagem("Você perdeu! :(", "red");
        desabilitarChute(true);
    }
}

function chutar() {
    const num = parseInt(numeroChute.value);

    if (num < 1 || num > 100) {
        alert("O número deve estar entre 1 e 100! (-1 vida)");
        vidas--;
    } else if (num === numeroSecreto) {
        mostrarMensagem(`Parabéns! Você acertou o número :)`, "green");
        desabilitarChute(true);
    } else {
        const dica = num > numeroSecreto ? "menor" : "maior";
        mostrarMensagem(`Palpite: ${num} → O número é ${dica}.`, "black");
        vidas--;
    }

    numeroChute.value = "";
    numeroChute.focus();
    atualizarVidas();
}

function desabilitarChute(valor) {
    numeroChute.disabled = valor;
    btnChutar.disabled = valor;
}

function limparTela() {
    resultado.innerHTML = "";
    txtStatus.textContent = "";
}

function mostrarMensagem(msg, cor = "black") {
    const p = document.createElement("p");
    p.style.color = cor;
    p.innerHTML = msg;
    resultado.appendChild(p);
}