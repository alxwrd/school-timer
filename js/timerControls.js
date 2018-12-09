
const inputMinutes = document.getElementById("inputMinutes");
const inputSeconds = document.getElementById("inputSeconds");
const startButton = document.getElementById("startButton");

const startEvent = new Event("start")

function keyDown(event) {
    if (event.key.length > 1) {
        return;
    };
    var target_value = Number(event.key)

    if (isNaN(target_value)) {
        return event.preventDefault();
    };
}


function keyUp(event) {
    if (Number(this.value) > 59) {
        this.value='59';
    };

    if (event.keyCode == 13) {
        window.dispatchEvent(startEvent)
    };
}


inputMinutes.addEventListener("keydown", keyDown);
inputSeconds.addEventListener("keydown", keyDown)
inputMinutes.addEventListener("keyup", keyUp);
inputSeconds.addEventListener("keyup", keyUp);


inputMinutes.addEventListener("keyup", function(event) {
    if (this.selectionEnd == 2) {
        document.getElementById("inputSeconds").select();
    };
});


inputSeconds.addEventListener("keydown", function(event) {
    if (event.keyCode == 8 && this.value == "") {
        inputMinutes.select();
        inputMinutes.setSelectionRange(
            inputMinutes.value.length, inputMinutes.value.length);

    };
});


startButton.addEventListener("click", function() {
    window.dispatchEvent(startEvent)
});


window.addEventListener("start", function(event) {
    document.getElementById("timerSelection").classList.add("gone");
    document.getElementById("timerDisplay").classList.remove("gone");
    document.getElementById("startButton").classList.add("gone");
});

window.addEventListener("stop", function(event) {
    document.getElementById("timerSelection").classList.remove("gone");
    document.getElementById("timerDisplay").classList.add("gone");
    document.getElementById("startButton").classList.remove("gone");
})