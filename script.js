const respostasCorretas = {
    q1: 'B',
    q2: 'C',
    q3: 'B',
    q4: 'D',
    q5: 'A',
    q6: 'C',
    q7: 'C',
    q8: 'A'
};

let provaEncerrada = false;

function iniciarProva() {
    if (localStorage.getItem('provaEncerrada')) {
        alert("Você já enviou a prova. O resultado final já foi exibido.");
        exibirResultadoFinal();
    } else {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("prova").style.display = "block";
    }
}

function encerrarProva() {
    if (!provaEncerrada) {
        const form = document.getElementById('quizForm');
        let score = 0;
        let total = Object.keys(respostasCorretas).length;
        let gabarito = '<h3>Gabarito:</h3><ul>';

        for (let i = 1; i <= total; i++) {
            let resposta = form['q' + i].value;
            if (resposta === respostasCorretas['q' + i]) {
                score++;
                gabarito += `<li>Questão ${i}: Correta (Resposta: ${respostasCorretas['q' + i]})</li>`;
            } else {
                gabarito += `<li>Questão ${i}: Incorreta (Sua resposta: ${resposta}, Correta: ${respostasCorretas['q' + i]})</li>`;
            }
        }

        gabarito += '</ul>';
        document.getElementById('prova').style.display = 'none';
        document.getElementById('resultado').style.display = 'block';
        document.getElementById('score').textContent = `Você acertou ${score} de ${total} questões.`;
        document.getElementById('gabarito').innerHTML = gabarito;

        // Salvar estado de prova encerrada
        localStorage.setItem('provaEncerrada', true);
        provaEncerrada = true;
    } else {
        alert("Você já enviou a prova. O resultado final já foi exibido.");
    }
}

function exibirResultadoFinal() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('prova').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';

    const score = localStorage.getItem('score');
    const gabarito = localStorage.getItem('gabarito');
    if (score && gabarito) {
        document.getElementById('score').textContent = score;
        document.getElementById('gabarito').innerHTML = gabarito;
    } else {
        document.getElementById('score').textContent = "Resultado não disponível.";
        document.getElementById('gabarito').innerHTML = "";
    }
}
