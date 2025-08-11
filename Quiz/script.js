const question = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "HyperText Markup Language",correct: true},
            {text: "HyperText Machine Language",correct: false},
            {text: "Hyperlink and Text Markup Language",correct: false},
            {text: "Home Tool Markup Language",correct: false},
        ]
    },
    {
          question: "Which tag is used to create a hyperlink?",
        answers: [
            {text: "<link>",correct: false},
            {text: "<url>",correct: false},
            {text: "<a>",correct: true},
            {text: "<href>",correct: false},
        ]
    },
    {
          question: "Which of these is not a Javascript data type?",
        answers: [
            {text: "background-color",correct: false},
            {text: "text-style",correct: false},
            {text: "font-color",correct: false},
            {text: "color",correct: true},
        ]
    },
    {
          question: "How do you select an element with the id main",
        answers: [
            {text: "main",correct: false},
            {text: "#main",correct: true},
            {text: "main",correct: false},
            {text: "`",correct: false},
        ]
    },
    {
          question: "Which method displays an alert box",
        answers: [
            {text: "alert",correct: true},
            {text: "prompt",correct: false},
            {text: "confirm",correct: false},
            {text: "popup",correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
         const button = document.createElement("button");
         button.innerHTML = answer.text;
         button.classList.add("btn");
         answerButtons.appendChild(button);
         if(answer.correct){
            button.dataset.correct = answer.correct;
         }
         button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ${score} out of ${questions.length}!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
