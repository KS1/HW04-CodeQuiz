var startQuizEl = document.querySelector("#btnStartQuiz");
var timerText = document.querySelector("#timerTime");

var questionText = document.querySelector("#question");
var answer1button = document.querySelector("#answer1button");
var answer2button = document.querySelector("#answer2button");
var answer3button = document.querySelector("#answer3button");
var answer4button = document.querySelector("#answer4button");
var userAnswerText = document.querySelector("#userAnswer");

var timing = document.querySelector(".card-contents-timer");
var finalScoreText = document.querySelector("#finalScore");
var initialsInputText = document.querySelector("#initialsInput");

// each question has 10 seconds
var timerTime = 50;
// there are five questions
var countQuestions = 0;
// there are four answers to choose from
var countAnswers = 4;
// each question carries 10 points score
var myScore = 0;
var forcedStoppedTimer = false;

// Start the quiz
function startQuiz(event) {
    // Prevent default action
    event.preventDefault();

    // display the time on the page
    timing.style.display = "block";

    // hide the first page
    var x = document.getElementsByClassName("firstpage");
    x[0].style.display = "none";

    // This will display the questions tab 
    var x = document.getElementsByClassName("tab");
    x[0].style.display = "block";

    // dynamically show question on the page
    questionText.innerHTML =  questions[countQuestions].question;
    
    // dynamically show answers on the page and set correct attribute
    answer1button.innerHTML = questions[countQuestions].answers[0].a;
    answer1button.dataset.correct = questions[countQuestions].answers[0].correct
    
    answer2button.innerHTML = questions[countQuestions].answers[1].a;
    answer2button.dataset.correct = questions[countQuestions].answers[1].correct
    
    answer3button.innerHTML = questions[countQuestions].answers[2].a;
    answer3button.dataset.correct = questions[countQuestions].answers[2].correct
    
    answer4button.innerHTML = questions[countQuestions].answers[3].a;
    answer4button.dataset.correct = questions[countQuestions].answers[3].correct

    // start the timer
    var counter = setInterval(function() {       
        if(timerTime <= 0){
            clearInterval(counter)
            // if user completes the questions before time-out then forcefully stop the timer
            if(!forcedStoppedTimer)
                window.alert("Code quiz timed out.");
            // load quiz completed page
            loadQuizCompletedPage();
        }
        checkTime();
    }, 1000);

}

// reduce the timer time and display time-left on the page
function checkTime() {
    timerTime--;
    timerText.innerHTML = timerTime;    
}

function moveToNextWizardPage() {
    
    countQuestions++;
 
    if(countQuestions < questions.length) {
    
        document.getElementById("question").innerHTML = questions[countQuestions].question;
            
        answer1button.innerHTML = questions[countQuestions].answers[0].a;
        answer1button.dataset.correct = questions[countQuestions].answers[0].correct   
        
        answer2button.innerHTML = questions[countQuestions].answers[1].a;
        answer2button.dataset.correct = questions[countQuestions].answers[1].correct   
        
        answer3button.innerHTML = questions[countQuestions].answers[2].a;
        answer3button.dataset.correct = questions[countQuestions].answers[2].correct  

        answer4button.innerHTML = questions[countQuestions].answers[3].a;
        answer4button.dataset.correct = questions[countQuestions].answers[3].correct   
    } else {
        // load quiz completed page
        loadQuizCompletedPage();
    }
}

function loadQuizCompletedPage()
{
    console.log("Inside loadQuizCompletedPage function.");
        // stop timer
        timerTime = 0;
        forcedStoppedTimer = true;

        // hide timing display on the page
        timing.style.display = "none";

        // hide questions page
        var x = document.getElementsByClassName("tab");
        x[0].style.display = "none";   
        // display quiz complete page
        var x = document.getElementsByClassName("quizCompletePage");
        x[0].style.display = "block";

        if(myScore == 50)
            finalScoreText.innerHTML = myScore + ". Congratulations!";
        else 
            finalScoreText.innerHTML = myScore + ".";
}

function checkIfAnswer1IsCorrect (event) {    
    if(answer1button.dataset.correct == "true"){
        document.getElementById("hrId").style.display = "block";
        userAnswerText.innerHTML = "Correct";    
        myScore += 10;        
    } else {        
         userAnswerText.innerHTML = "Wrong";    
        // Subtract time by 10 seconds if the answer is wrong
        timerTime -= 10;        
    }    
    moveToNextWizardPage();
}

function checkIfAnswer2IsCorrect (event) {
     if(answer2button.dataset.correct == "true"){
        console.log("Inside checkIfAnswer2IsCorrect function - answer 2 is correct");
        userAnswerText.innerHTML = "Correct";
        myScore += 10;
        console.log("My score is - " + myScore);
    }else {
        userAnswerText.innerHTML = "Wrong";
         // Subtract time by 10 seconds if the answer is wrong
         timerTime -= 10;
     }
    moveToNextWizardPage();
}

function checkIfAnswer3IsCorrect (event) {
    if(answer3button.dataset.correct == "true"){
        console.log("Inside checkIfAnswer3IsCorrect function - answer 3 is correct");
        userAnswerText.innerHTML = "Correct";
        myScore += 10;
        console.log("My score is - " + myScore);
    }else {
        console.log("Inside checkIfAnswer3IsCorrect function - answer 3 is incorrect");
        userAnswerText.innerHTML = "Wrong";
         // Subtract time by 10 seconds if the answer is wrong
         timerTime -= 10;
         console.log("Timer time after subtraction: " + timerTime);
    }    
    moveToNextWizardPage();
}

function checkIfAnswer4IsCorrect (event) {
    if(answer4button.dataset.correct == "true"){
        console.log("Inside checkIfAnswer4IsCorrect function - answer 4 is correct");
        userAnswerText.innerHTML = "Correct";
        myScore += 10;
        console.log("My score is - " + myScore);
    }
    else {
        console.log("Inside checkIfAnswer4IsCorrect function - answer 4 is incorrect");
        userAnswerText.innerHTML = "Wrong";
        // Subtract time by 10 seconds if the answer is wrong
        timerTime -= 10;
    }
    moveToNextWizardPage();
}

function showHighscores() {
 
    // TODO: validation code commented out because code does not work
    // if(document.getElementById("initialsInput").innerHTML === "")
    // {
    //     window.alert("Please enter initials.");
    //     return;
    // }  

    var x = document.getElementsByClassName("quizCompletePage");
    x[0].style.display = "none";
    
    var x = document.getElementsByClassName("highScorePage");
    x[0].style.display = "block";    
    
    var highScoreStorage = "1, " + document.getElementById("initialsInput").value + " - " + myScore;
    // Store high score in local storage
    localStorage.setItem("HighScore", highScoreStorage);  
   // Show high score on the page
    document.getElementById("highScore").innerHTML = highScoreStorage;   

    return;
}

function clearHighscores()
{
    document.getElementById("highScore").innerHTML = "";    
    localStorage.removeItem("HighScore");
}

function goBackToFirstPage () {
    // Redirect to home page
    document.location.href="/HW04-CodeQuiz/";
    return;
}

// Add listener to submit element
startQuizEl.addEventListener("click", startQuiz);

answer1button.addEventListener("click", checkIfAnswer1IsCorrect);
answer2button.addEventListener("click", checkIfAnswer2IsCorrect);
answer3button.addEventListener("click", checkIfAnswer3IsCorrect);
answer4button.addEventListener("click", checkIfAnswer4IsCorrect);

quizCompleteSubmit.addEventListener("click", showHighscores)
goBackButton.addEventListener("click", goBackToFirstPage)
clearHighscoresButton.addEventListener("click", clearHighscores)

