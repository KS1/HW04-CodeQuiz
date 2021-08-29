var startQuizEl = document.querySelector("#btnStartQuiz");
var timerText = document.querySelector("#timerTime");
var answer1button = document.querySelector("#answer1button");

// var timing = document.getElementsByClassName("card-contents-timer");
var timing = document.querySelector(".card-contents-timer");

var finalScoreText = document.querySelector("#finalScore");
var finalScore = 0;

console.log("startQuizEl object: " + startQuizEl);
console.log("answer1button object: " + answer1button);

var timerTime = 5;
var countQuestions = 0;
var countAnswers = 4;
var myScore = 0;

// Action to be performed on click store in named function
function startQuiz(event) {
    // Prevent default action
    event.preventDefault();

    console.log(event);
    console.log("timing: " + timing);
    // console.log("timing[0]: " + timing[0]);
    // timing[0].style.display = "block";
    timing.style.display = "block";

    var x = document.getElementsByClassName("firstpage");
    x[0].style.display = "none";

    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[0].style.display = "block";

    var b = document.getElementById("question");
    b.innerHTML = questions[countQuestions].question;

    document.getElementById("answer1button").innerHTML = questions[countQuestions].answers[0].a;
    document.getElementById("answer1button").dataset.correct = questions[countQuestions].answers[0].correct
    
    document.getElementById("answer2button").innerHTML = questions[countQuestions].answers[1].a;
    document.getElementById("answer2button").dataset.correct = questions[countQuestions].answers[1].correct
    
    document.getElementById("answer3button").innerHTML = questions[countQuestions].answers[2].a;
    document.getElementById("answer3button").dataset.correct = questions[countQuestions].answers[2].correct
    
    document.getElementById("answer4button").innerHTML = questions[countQuestions].answers[3].a;
    document.getElementById("answer4button").dataset.correct = questions[countQuestions].answers[3].correct
    
    // document.getElementById("answer3button").innerHTML = "changedAnswer3 Text"; 
    // document.getElementById("answer4button").innerHTML = "changedAnswer4 Text"; 

    console.log(b.innerHTML);
    
        if(document.getElementById("answer1button").dataset.correct == false){
            console.log("incorrect");
        }
    
    console.log(x[0]);

    // uncomment this to start the timer
    // var counter = setInterval(function() {
    //     checkTime();
    //     if(timerTime <= 0){
    //         clearInterval(counter)
    //     }

    // }, 1000);

}

function checkTime() {
    timerTime--;
    timerText.innerHTML = timerTime;

    console.log("here")
    //   return;
}

console.log(checkTime)

function moveToNextWizardPage() {
    console.log("Inside moveToNextWizardPage function");

    countQuestions++;
    console.log("countAnswers: " + countAnswers);

    if(countQuestions < questions.length) {
    
        document.getElementById("question").innerHTML = questions[countQuestions].question;
            
        document.getElementById("answer1button").innerHTML = questions[countQuestions].answers[0].a;
        document.getElementById("answer1button").dataset.correct = questions[countQuestions].answers[0].correct   
        
        document.getElementById("answer2button").innerHTML = questions[countQuestions].answers[1].a;
        document.getElementById("answer2button").dataset.correct = questions[countQuestions].answers[1].correct   
        
        document.getElementById("answer3button").innerHTML = questions[countQuestions].answers[2].a;
        document.getElementById("answer3button").dataset.correct = questions[countQuestions].answers[2].correct  

        document.getElementById("answer4button").innerHTML = questions[countQuestions].answers[3].a;
        document.getElementById("answer4button").dataset.correct = questions[countQuestions].answers[3].correct   
    } else {
        // load quiz completed page
        console.log("load quiz completed page");
        timing.style.display = "none";

        var x = document.getElementsByClassName("tab");
        x[0].style.display = "none";   
        var x = document.getElementsByClassName("quizCompletePage");
        x[0].style.display = "block";

        finalScoreText.innerHTML = finalScore + ".";

    }


}

function checkIfAnswer1IsCorrect (event) {
    console.log("Inside checkIfAnswer1IsCorrect function");

    console.log(document.getElementById("answer1button").dataset.correct);

    if(document.getElementById("answer1button").dataset.correct == "true"){
        console.log("Inside checkIfAnswer1IsCorrect function - answer 1 is correct");
    }else
    console.log("Inside checkIfAnswer1IsCorrect function - answer 1 is incorrect");

    moveToNextWizardPage();
}

function checkIfAnswer2IsCorrect (event) {
    console.log("Inside checkIfAnswer2IsCorrect function");

    console.log(document.getElementById("answer2button").dataset.correct);

    if(document.getElementById("answer2button").dataset.correct == "true"){
        console.log("Inside checkIfAnswer2IsCorrect function - answer 2 is correct");
    }else
    console.log("Inside checkIfAnswer2IsCorrect function - answer 2 is incorrect");

    moveToNextWizardPage();
}
function checkIfAnswer3IsCorrect (event) {
    console.log("Inside checkIfAnswer3IsCorrect function");

    console.log(document.getElementById("answer3button").dataset.correct);

    if(document.getElementById("answer3button").dataset.correct == "true"){
        console.log("Inside checkIfAnswer3IsCorrect function - answer 3 is correct");
    }else
    console.log("Inside checkIfAnswer3IsCorrect function - answer 3 is incorrect");

    moveToNextWizardPage();
}
function checkIfAnswer4IsCorrect (event) {
    console.log("Inside checkIfAnswer3IsCorrect function");

    console.log(document.getElementById("answer4button").dataset.correct);

    if(document.getElementById("answer4button").dataset.correct == "true"){
        console.log("Inside checkIfAnswer4IsCorrect function - answer 4 is correct");
    }
    else
        console.log("Inside checkIfAnswer4IsCorrect function - answer 4 is incorrect");


    moveToNextWizardPage();
}

function showHighscores() {

    var x = document.getElementsByClassName("quizCompletePage");
    x[0].style.display = "none";

    var x = document.getElementsByClassName("highScorePage");
    x[0].style.display = "block";
    
    return;
}

function goBackToFirstPage () {
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

// [{"q1"}, "q2", "q3"]

// questions[1]

// Refer: 19 Ins Data attributes
// var imageContainer = document.querySelector(".img-container");

// // Listen for any clicks within the img-container div
// imageContainer.addEventListener("click", function(event) {
//   var element = event.target;

//   // Check if the clicked element was an image
//   if (element.matches("img")) {
//     // Get the current value of the image's data-state attribute
//     var state = element.getAttribute("data-state");

//     if (state === "still") {
//       // Change the data-state attribute's value
//       // There are two different ways this attribute can be set
//       element.dataset.state = "animate";
//       element.setAttribute("data-state", "animate");

//       // Update the image's source to the string being stored in the data-animate attribute
//       element.setAttribute("src", element.dataset.animate);
//     } else {
//       // Change the attributes back to their non-animated values
//       element.dataset.state = "still";
//       element.setAttribute("src", element.dataset.still);
//     }
//   }
// });

// var questionObject = {
//     question: "This is question",
//     anwser: ['1', '2'],
//     correct: 2
// }
