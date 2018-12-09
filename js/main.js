const timeUpSound = new Audio("files/Mariachi_Snooze.mp3");
const defaultTime = 600; //Default to 10 minutes

const stopEvent = new Event("stop")
const readyToStopEvent = new Event("readyToStop")


function getStoreageItem(name, defaultValue) {
    var result = JSON.parse(window.localStorage.getItem(name));
    if (result) {
        return result
    } else {
        return defaultValue;
    }
};


function setStoreageItem(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
};


window.addEventListener("start", function() {
    let minutes = document.getElementById("inputMinutes").value;
    let seconds = document.getElementById("inputSeconds").value;

    totalTime = (Number(minutes) * 60) + Number(seconds);

    clearInterval(window.timer);

    var time = totalTime || defaultTime;

    timeUpSound.pause();
    timeUpSound.currentTime = 0;

    var timerDisplay = document.getElementById("timerDisplay")
    timerDisplay.innerHTML = secondsToTimeString(time);

    // Execute every second
    window.timer = setInterval(() => {
        time = time - 1;

        timerDisplay.innerHTML = secondsToTimeString(time);

        if (time == 7) {
            timeUpSound.play();
        }

        if (time == 5) {
            window.dispatchEvent(readyToStopEvent)
        }

        if (time <= 0) {
            window.dispatchEvent(stopEvent)
            clearInterval(window.timer);
        }

    }, 1000);
});


function secondsToTimeString(seconds) {
    var time = moment.duration(seconds, 'seconds');
    var sec = time.seconds() < 10 ? ('0' + time.seconds()) : time.seconds();
    var min = time.minutes() < 10 ? ('0' + time.minutes()) : time.minutes();

    return `${min}:${sec}`;
};
