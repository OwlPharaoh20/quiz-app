const questions =  [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text:"Shark", correct: false},
            {text:"Blue Whale", correct: true},
            {text:"Elephant", correct: false},
            {text:"Giraffe", correct: false},
        ]
    }, 

    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text:"Vatican City", correct: true},
            {text:"Bhutan", correct: false},
            {text:"Nepal", correct: false},
            {text:"Sri Lanka", correct: false},
        ]


    },

    {
        question: "Which is the largest Desert in the world?",
        answers: [
            {text:"Kalahari", correct: false},
            {text:"Gobi", correct: false},
            {text:"Sahara", correct: false},
            {text:"Antarctica", correct: true},
        ]
    },

    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text:"asia", correct: false},
            {text:"australia", correct: true},
            {text:"Arctic", correct: false},
            {text:"Africa", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion (){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>  {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });


}

function resetState (){
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){ 
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add ("incorrect"); 
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    }) 
    nextButton.style.display = "block";

}

function showScore () {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block";

}


function handleNextButton(){
    currentQuestionIndex++;
    if( currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }

}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();


//How this quiz app works:
//In this quiz app we can add multiple questions and 4 answer choices for each questions. When you select any one answer the the answer button's background color will become green if it is correct answer and the background color will become red if it is wrong answer.
//After selecting one answer you can not change the answer, you can only go for next question.

//Display quiz score or result:
//When user will submit the answer of last question and click on the next button. Then it will display the score.