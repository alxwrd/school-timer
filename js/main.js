
class Timer {

    constructor() {
        var self = this

        this.timerDisplay = document.getElementById("timerDisplay");
        this.inputMinutes = document.getElementById("inputMinutes");
        this.inputSeconds = document.getElementById("inputSeconds");
        this.startButton = document.getElementById("startButton");
        this.youtubeToggle = document.getElementById("youtubeToggle");
        this.youtubePlaylist = document.getElementById("youtubePlaylist");
        this.gifSelect = document.getElementById("gifSelect");
        this.image = document.getElementById("image");
        this.frame = document.getElementById("frame");

        this.aims = new Aims();

        var keyDownCheck = function() {
            if(this.selectionEnd == 2 && this.selectionStart !=0 && event.keyCode!=8) {
                return false;
            }
        }

        this.inputMinutes.onkeydown = keyDownCheck;
        this.inputMinutes.onkeyup = function() {
            if(Number(this.value) > 59) {
                this.value='59';
                self.inputSeconds.select();
            } else if (this.selectionEnd == 2) {
                self.inputSeconds.select();}
        };

        this.inputSeconds.onkeydown = keyDownCheck;
        this.inputSeconds.onkeyup = function() {
            if(Number(this.value) > 59) {
                this.value='59';
            }
        };

        this.timeUpSound = new Audio("files/Mariachi_Snooze.mp3");

        this.currentTime = 600; //Default to 10 minutes

        if (this.inputMinutes.value || this.inputSeconds.value) {
            this.currentTime = (Number(this.inputMinutes.value) * 60) + Number(this.inputSeconds.value);
        };
    }


    secondsToTime(seconds) {
        let momentTime = moment.duration(seconds, 'seconds');
        let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
        let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();

        return `${min}:${sec}`;
    }


    start() {
        this.turnOffFields(true);
        this.timeUpSound.pause();
        this.timeUpSound.currentTime = 0;

        // Print out the time
        this.timerDisplay.innerHTML = this.secondsToTime(this.currentTime);

        // Execute every second
        let timer = setInterval(() => {

            this.currentTime = this.currentTime - 1;
            this.timerDisplay.innerHTML = this.secondsToTime(this.currentTime);

            if (this.currentTime == 7) {
                this.timeUpSound.play();
            }

            if (this.currentTime == 5) {
                youtubePlaylist.src = "";
            }

            // When reaching 0. Stop.
            if (this.currentTime <= 0) {
                this.turnOffFields(false);
                image.src = 'images/done.jpg';
                clearInterval(timer);
            }
        }, 1000); // 1 second
    };


    turnOffFields(state){
        this.inputMinutes.disabled = state;
        this.inputSeconds.disabled = state;
        this.inputMinutes.value = "";
        this.inputSeconds.value = "";
        this.startButton.disabled = state;
        this.youtubeToggle.disabled = !state;
        this.gifSelect.disabled = state;
        this.aims.lessonAims.disabled = state;
        this.aims.targetOne.disabled = state;
        this.aims.targetTwo.disabled = state;
        this.aims.targetThree.disabled = state;
        if (state) {
            this.youtubePlaylist.src = 'https://www.youtube.com/embed/videoseries?list=PLN9v-ASsJra3gSmRyMAQfwZwJT0Cf-bzP&autoplay=1';
            if (this.aims.lessonAims.value || this.aims.targetOne.value ||
                 this.aims.targetTwo.value || this.aims.targetThree.value) {
                this.aims.targetFrame.style.display = "inline";
                this.aims.aimTable.style.display = "inline";
                this.aims.overallAims.innerHTML = this.aims.lessonAims.value;
                this.aims.aimOne.innerHTML = "&nbsp;" + this.aims.targetOne.value;
                this.aims.aimTwo.innerHTML = "&nbsp;" + this.aims.targetTwo.value;
                this.aims.aimThree.innerHTML = "&nbsp;" + this.aims.targetThree.value;
                this.image.style.top = "55%";
                this.frame.style.top = "55%";
                this.timerDisplay.style.bottom = "-2vmax";
            } else {
                this.image.style.top = "40%";
                this.frame.style.top = "40%";
                this.timerDisplay.style.bottom = "2vmax"
            }
        } else {
            this.youtubePlaylist.src = "";
            this.aims.aimTable.style.display = "none";
            this.aims.targetFrame.style.display = "none";
            this.image.style.top = "55%";
            this.frame.style.top = "55%";
            this.timerDisplay.style.bottom = "-2vmax";
        }
        this.inputMinutes.focus();
    };
}



class Aims {

    constructor() {
        this.lessonAims = document.getElementById("lessonAims");
        this.targetOne = document.getElementById("targetOne");
        this.targetTwo = document.getElementById("targetTwo");
        this.targetThree = document.getElementById("targetThree");
        this.aimOne = document.getElementById("aimOne");
        this.aimTwo = document.getElementById("aimTwo");
        this.aimThree = document.getElementById("aimThree");
        this.targetFrame = document.getElementById("targetFrame");
        this.aimTable = document.getElementById("aimTable");
        this.overallAims = document.getElementById("overallAims");
    }

}



document.getElementById("startButton").onclick = function() {
    timer = new Timer();
    timer.start();
}


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
    image.src = gifSelect.value;
}
