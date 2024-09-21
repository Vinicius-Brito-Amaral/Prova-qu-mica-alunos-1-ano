const correctAnswers = {
    q1: "b",
    q2: "c",
    q3: "b",
    q4: "a",
    q5: "b",
    q6: "b"
};

const form = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');
const quizSection = document.getElementById('quiz-section');
const startBtn = document.getElementById('start-btn');
const startSection = document.getElementById('start-section');

function startQuiz() {
    startSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    submitBtn.classList.remove('hidden');
}

function calculateScore() {
    let score = 0;
    const formData = new FormData(form);

    for (let [question, answer] of formData.entries()) {
        if (answer === correctAnswers[question]) {
            score++;
        }
    }

    return score;
}

function displayResult(score) {
    const totalQuestions = Object.keys(correctAnswers).length;
    resultDiv.textContent = `Você acertou ${score} de ${totalQuestions} perguntas.`;
    resultDiv.classList.remove('hidden');
}

function blockRetake() {
    quizSection.innerHTML = 'Você já completou esta prova. Não é possível refazê-la.';
    localStorage.setItem('quizCompleted', 'true');
}

function handleSubmit() {
    const score = calculateScore();
    displayResult(score);
    blockRetake();
}

function checkIfCompleted() {
    const quizCompleted = localStorage.getItem('quizCompleted');
    if (quizCompleted === 'true') {
        quizSection.innerHTML = 'Você já completou esta prova. Não é possível refazê-la.';
    }
}

submitBtn.addEventListener('click', handleSubmit);
startBtn.addEventListener('click', startQuiz);
window.onload = checkIfCompleted;
