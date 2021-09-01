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
var highScoreSpanText = document.querySelector("#highScoreSpan");
var highScoreDiv = document.querySelector("#viewHighScoreDiv");
var highscorePara = document.querySelector("#highscorePara");

var highScoreStorageArray = [] ;

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

    highScoreDiv.style.display = "none";

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
        myScore += 10;        
        userAnswerText.innerHTML = "Correct - Your score is " + myScore;      
    } else {        
         userAnswerText.innerHTML = "Wrong - Your score is " + myScore;    
        // Subtract time by 10 seconds if the answer is wrong
        timerTime -= 10;        
    }    
    moveToNextWizardPage();
}

function checkIfAnswer2IsCorrect (event) {
     if(answer2button.dataset.correct == "true"){
        myScore += 10;
        userAnswerText.innerHTML = "Correct - Your score is " + myScore;         
    }else {
        userAnswerText.innerHTML = "Wrong - Your score is " + myScore;    
         // Subtract time by 10 seconds if the answer is wrong
         timerTime -= 10;
     }
    moveToNextWizardPage();
}

function checkIfAnswer3IsCorrect (event) {
    if(answer3button.dataset.correct == "true"){
        myScore += 10;
        userAnswerText.innerHTML = "Correct - Your score is " + myScore;   
    }else {        
        userAnswerText.innerHTML = "Wrong - Your score is " + myScore;   
         // Subtract time by 10 seconds if the answer is wrong
         timerTime -= 10;
    }    
    moveToNextWizardPage();
}

function checkIfAnswer4IsCorrect (event) {
    if(answer4button.dataset.correct == "true"){
        myScore += 10;
        userAnswerText.innerHTML = "Correct - Your score is " + myScore;  
    }
    else {
        userAnswerText.innerHTML = "Wrong - Your score is " + myScore;  
        // Subtract time by 10 seconds if the answer is wrong
        timerTime -= 10;
    }
    moveToNextWizardPage();
}

function showHighscores() {
 
    // validation code for initials
    if(document.getElementById("initialsInput").value === "")
    {
        window.alert("Please enter initials.");
        return;
    }  

    var x = document.getElementsByClassName("quizCompletePage");
    x[0].style.display = "none";
    
    var x = document.getElementsByClassName("highScorePage");
    x[0].style.display = "block";    
    
    highscorePara.style.display = "none";
    viewHighScoreDiv.style.display = "none"
    
    highScoreStorageArray = JSON.parse(localStorage.getItem("HighScore"));
    
    if (highScoreStorageArray == null)
    {    
        highScoreStorageArray = ["1, " + document.getElementById("initialsInput").value + " - " + myScore];
        document.getElementById("highScore").innerHTML = highScoreStorageArray.toString();   
    }
    else
    {
        highScoreStorageArray.push((highScoreStorageArray.length + 1) + ", " + document.getElementById("initialsInput").value + " - " + myScore);
        document.getElementById("highScore").innerHTML = ("    ||    ") + highScoreStorageArray.join("    ||    ") + ("    ||    ");   
    }
   
    // Store high score in local storage
    localStorage.setItem("HighScore", JSON.stringify(highScoreStorageArray));  

    return;
}

function clearHighscores()
{
    document.getElementById("highScore").innerHTML = "";    
    localStorage.removeItem("HighScore");
}

function goBackToFirstPage () {

    highscorePara.display = "block";
    // Redirect to home page
    document.location.href="/HW04-CodeQuiz/";
    return;
}

function showHighscore() {

    if (highScoreDiv.style.display == "block")
        highScoreDiv.style.display = "none";
    else
        highScoreDiv.style.display = "block";

    highScoreStorageArray = JSON.parse(localStorage.getItem("HighScore"));  
    if (highScoreStorageArray == null)
        highScoreSpanText.innerHTML = " none ";
    else
        highScoreSpanText.innerHTML = ("    ||    ") + highScoreStorageArray.join("    ||    ") + ("    ||    ");   
    
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

highscorePara.addEventListener("click", showHighscore)

