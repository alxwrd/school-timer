// // Require moment.js
// const moment = require('moment');
// // Require ipcRender
// const {ipcRenderer, dialog} = require('electron');
// const remote = require('electron').remote;

var js = document.createElement("script");

js.type = "text/javascript";
js.src = "../node_modules/moment/moment.js";

document.body.appendChild(js);

var almostSnd = new Audio("Mariachi_Snooze.mp3");

// minInput.focus();
// btnyoutubeToggle.disabled = true;
//
// quitButton.addEventListener('click', function (e) {
//     var window = remote.getCurrentWindow();
//     window.close();
// });
//
// minInput.addEventListener('keyup', function (e) {
//     e.preventDefault();
//     if (e.keyCode == 13) {startButton.click();}
// });
//
// secInput.addEventListener('keyup', function (e) {
//     e.preventDefault();
//     if (e.keyCode == 13) {startButton.click();}
// });


// Helper function, to format the time
const secondsToTime = (s) => {
    let momentTime = moment.duration(s, 'seconds');
    let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();

    return `${min}:${sec}`;
};


function youtubeToggle() {
    if (youtubePlaylist.width > 1){
        console.log("increase");
        youtubePlaylist.width = "0";
        youtubePlaylist.height = "0";
    } else {
        youtubePlaylist.width = "500";
        youtubePlaylist.height = "200";
    };
};


function gifChange() {
    image.src = gifSelect.value;
}


// Helper function to toggle the fields when the timer starts.
function turnOffFields(state){
    quitButton.disabled = state;
    minInput.disabled = state;
    minInput.value = "";
    secInput.disabled = state;
    secInput.value = "";
    startButton.disabled = state;
    btnyoutubeToggle.disabled = !state;
    gifSelect.disabled = state;
    lessonAims.disabled = state;
    targetOne.disabled = state;
    targetTwo.disabled = state;
    targetThree.disabled = state;
    if (state) {
        instructions.innerHTML = "Refresh to restart";
        instructions.classList.add('animate');
        youtubePlaylist.src = 'https://www.youtube.com/embed/videoseries?list=PLN9v-ASsJra3gSmRyMAQfwZwJT0Cf-bzP&autoplay=1';
        if (lessonAims.value || targetOne.value || targetTwo.value || targetThree.value) {
            aimTable.style.display = "inline";
            targetFrame.style.display = "inline";
            overallAims.innerHTML = lessonAims.value;
            aimOne.innerHTML = "&nbsp;" + targetOne.value;
            aimTwo.innerHTML = "&nbsp;" + targetTwo.value;
            aimThree.innerHTML = "&nbsp;" + targetThree.value;
            image.style.top = "55%"; frame.style.top = "55%"; timerDiv.style.bottom = "-2vmax";
        } else {
            image.style.top = "40%"; frame.style.top = "40%"; timerDiv.style.bottom = "2vmax"
        }
    } else {
        instructions.innerHTML = "";
        instructions.classList.remove('animate');
        youtubePlaylist.src = "";
        aimTable.style.display = "none";
        targetFrame.style.display = "none";
        image.style.top = "55%"; frame.style.top = "55%"; timerDiv.style.bottom = "-2vmax";
    }
    minInput.focus();
};


// The timer function
function setTime(){
    // Get the time input from the timeInput element
    if ((minInput.value || secInput.value) && (Number(minInput.value) + Number(secInput.value) > 0)) {
        var inputMinutes = Number(minInput.value);
        var inputSeconds = Number(secInput.value);
        var currentTime = (inputMinutes * 60) + inputSeconds;
    } else {
        var currentTime = 1200;
    }
    // Disable the time input and start elements
    turnOffFields(true);
    almostSnd.pause();
    almostSnd.currentTime = 0;
    gifChange();

    // Print out the time
    timerDiv.innerHTML = secondsToTime(currentTime);

    // Execute every second
    let timer = setInterval(() => {

        // Remove one second
        currentTime = currentTime - 1;

        // Print out the time
        timerDiv.innerHTML = secondsToTime(currentTime);

        if (currentTime == 7) {
            almostSnd.play();
        }

        if (currentTime == 5) {
            youtubePlaylist.src = "";
        }

        // When reaching 0. Stop.
        if (currentTime <= 0) {
            turnOffFields(false);
            image.src = 'done.jpg';
            clearInterval(timer);
        }
    }, 1000); // 1 second
};
