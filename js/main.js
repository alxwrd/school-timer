const timeUpSound = new Audio("files/Mariachi_Snooze.mp3");
const defaultTime = 600; //Default to 10 minutes


var keyDownCheck = function() {
    if(this.selectionEnd == 2 && this.selectionStart !=0 && event.keyCode!=8) {
        return false;
    }
}


document.getElementById("inputMinutes").onkeydown = keyDownCheck;
document.getElementById("inputMinutes").onkeyup = function() {
    if(Number(this.value) > 59) {
        this.value='59';
        self.inputSeconds.select();
    } else if (this.selectionEnd == 2) {
        self.inputSeconds.select();}
};


document.getElementById("inputSeconds").onkeydown = keyDownCheck;
document.getElementById("inputSeconds").onkeyup = function() {
    if(Number(this.value) > 59) {
        this.value='59';
    }
};


var secondsToTimeString = function(seconds) {
    var time = moment.duration(seconds, 'seconds');
    var sec = time.seconds() < 10 ? ('0' + time.seconds()) : time.seconds();
    var min = time.minutes() < 10 ? ('0' + time.minutes()) : time.minutes();

    return `${min}:${sec}`;
}


var start = function(time) {
    timeUpSound.pause();
    timeUpSound.currentTime = 0;

    var timerDisplay = document.getElementById("timerDisplay")
    timerDisplay.innerHTML = secondsToTimeString(time);

    // Execute every second
    window.timer = setInterval(() => {
        time = time - 1;

        if (time == 7) {
            timeUpSound.play();
        }

        if (time == 5) {
            document.getElementById("youtubePlaylist").src = "";
        }

        if (time <= 0) {
            turnOffFields(false);
            document.getElementById("image").src = 'images/done.jpg';
            clearInterval(timer);
        }

        timerDisplay.innerHTML = secondsToTimeString(time);
    }, 1000);
};


var turnOffFields = function(state) {

};


document.getElementById("startButton").onclick = function() {
    let minutes = document.getElementById("inputMinutes").value;
    let seconds = document.getElementById("inputSeconds").value;
    debugger;

    totalTime = (Number(minutes) * 60) + Number(seconds);

    clearInterval(window.timer);
    start(totalTime || defaultTime);
};


document.getElementById("youtubeToggle").onclick = function() {
    youtubePlaylist = document.getElementById("youtubePlaylist")

    if (youtubePlaylist.width > 1) {
        youtubePlaylist.width = "0";
        youtubePlaylist.height = "0";
    } else {
        youtubePlaylist.width = "500";
        youtubePlaylist.height = "200";
    };
};


document.getElementById("gifSelect").onchange = function() {
    document.getElementById("image").src = document.getElementById("gifSelect").value;
}
