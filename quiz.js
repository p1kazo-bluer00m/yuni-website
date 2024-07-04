const questions = [
    {
        question: "When is my birthday?🎂🎊",
        answers: [
            { text: "jun 31", correct: false },
            { text: "Mar 31", correct: true },
            { text: "Mar 30", correct: false },
            { text: "jun 30", correct: false }
        ]
    },
    {
        question: "What is my middle name?🤔",
        answers: [
            { text: "Dela cerna", correct: true },
            { text: "Cruz", correct: false },
            { text: "Dela Cruz", correct: false },
            { text: "Algoso", correct: false }
        ]
    },
    {
        question: "What is my favorite Grunge band?🤘🎸",
        answers: [
            { text: "PEARL JAM", correct: false },
            { text: "SOUND GARDEN", correct: false },
            { text: "ALICE IN CHAINS", correct: false },
            { text: "NIRVANA", correct: true }
        ]
    },
    {
        question: "How many bitches I got?", 
        answers: [
            { text: "3", correct: false },
            { text: "100000", correct: false },
            { text: "None💀", correct: true },
            { text: "1", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons"); 
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => { 
        const button = document.createElement("button");
        button.innerText = answer.text; 
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) { 
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
