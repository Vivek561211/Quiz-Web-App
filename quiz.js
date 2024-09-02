document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restart');
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const questionContainer = document.getElementById('questioncontainer');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answerbuttons');
    const progressBar = document.getElementById('progressbar');
    const timerElement = document.getElementById('time');
    const scoreElement = document.getElementById('score');

    let shuffledQuestions, currentQuestionIndex;
    let score = 0;
    let timer;
    let timeLeft;

    const questions = [
        {
            question: "What is full form of HTML?",
            answers: [
                { text: "Hypertext Markup Language", correct: true },
                { text: "HyperText Madeup Language", correct: false },
                { text: "HypeTour Contex Language", correct: false },
                { text: "HyperTool Markup Logic", correct: false },

            ]
        },
        {
            question: "What is full form of CSS?",
            answers: [
                { text: "Cascading Style Sheet", correct: true },
                { text: "Coloured Special Sheet", correct: false },
                { text: "Color and Style Sheet", correct: false },
                { text: "None of the above", correct: false },
            ]
        },
        {
            question: "How can we change the background color of an element?",
            answers: [
                { text: "background-colour", correct: true },
                { text: "color", correct: false },
                { text: "Both A and B", correct: false },
                { text: "None of the above", correct: false },
            ]
        },
        {
            question: "What type of CSS is generally recommended for designing large web pages",
            answers: [
                { text: "External", correct: true },
                { text: "Internal", correct: false },
                { text: "Inline", correct: false },
                { text: "None of the above", correct: false },
            ]
        }
        
    ];

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);

    function startGame() {
        score = 0;
        timeLeft = 10;
        startButton.classList.add('hide');
        resultContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        setNextQuestion();
        startTimer();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (correct) {
            score++;
        }
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setTimeout(setNextQuestion, 1000);
        } else {
            setTimeout(showResult, 1000);
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function showResult() {
        quizContainer.classList.add('hide');
        resultContainer.classList.remove('hide');
        scoreElement.innerText = score;
        clearInterval(timer);
    }

    function startTimer() {
        timeLeft = 10;
        timerElement.innerText = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showResult();
            }
        }, 1000);
    }
});
