var submitEl = document.querySelector("#submit");
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
var submissionResponseEl = document.querySelector("#response");
var timerText = document.querySelector("#timerTime");

var timerTime = 5;

// Action to be performed on click store in named function
function showResponse(event) {
    // Prevent default action
    event.preventDefault();
    console.log(event);
    var counter = setInterval( function() {
        checkTime();
        if(timerTime <= 0){
            clearInterval(counter)
        }

    }, 1000);
    
    // var response = "Thank you for your submission " + nameInput.value + "! We will reach out to you at " + emailInput.value + ".";
    // submissionResponseEl.textContent = response;
}


function checkTime() {
    timerTime--;
    timerText.innerHTML = timerTime;


console.log("here")
 //   return;
}

console.log(checkTime)
// Add listener to submit element
submitEl.addEventListener("click", showResponse);

// [{"q1"}, "q2", "q3"]

// questions[1]