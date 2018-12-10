
const playerToggle = document.getElementById("youtubeToggle");
const playerDiv = document.getElementById("player");
const playlistId = document.getElementById("playlistId");

playlistId.value = getStoreageItem("youtubePlaylist", "PL9PqVRbzGoibU4nDs_0RCfyw7BIC_p5mI");

const playerHeight = 180;
const playerWidth = 400;

playerToggle.showing = false;


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 


window.onYouTubeIframeAPIReady = function() {
    window.player = new YT.Player(
        'youtube',
        {
            height: playerHeight,
            width: playerWidth,
            playerVars: {
                listType:'playlist',
                list: getStoreageItem("youtubePlaylist", "PL9PqVRbzGoibU4nDs_0RCfyw7BIC_p5mI")
            },
            events: {
                'onReady': function(event) {
                    window.playerReady = true
                },
                'onStateChange': checkPlayback,
                'onError': function(event) {
                    console.log("error");
                    playerToggle.classList.add("youtubeerror")
                }
            },
        }
    );
};

function checkPlayback(event) {
    // event -1 unstarted, event 3 buffering
    // If a video's last state was buffering, and it's now unstarted,
    //  it most likely wasn't a embedable video, so skip it
    if (
        event.data == -1
        && checkPlayback.lastEvent
        && checkPlayback.lastEvent.data == 3) {
        setTimeout(function () {
            window.player.nextVideo();
            checkPlayback.lastEvent = null;
        }, 2000)
    }
    checkPlayback.lastEvent = event;
}

window.addEventListener("start", function(event) {
    playVideo();
});


function playVideo() {
    if (!window.playerReady) {
        setTimeout(function () {
            playVideo();
        }, 1000);
        return;
    } 
    playerToggle.click();
    window.player.setSize(1, 1);
    window.player.playVideo();
    playlistId.classList.add("hidden");
    setTimeout(function() {
        window.player.setSize(playerWidth, playerHeight);
        playerToggle.click();
        playlistId.classList.remove("hidden");
    }, 500);
};


window.addEventListener("readyToStop", function(event) {
    window.player.stopVideo();
});

playerToggle.addEventListener("click", function(event) {
    playerToggle.classList.remove("youtubeerror");

    if (playerToggle.showing) {
        playerDiv.classList.add("hidden");
    } else {
        playerDiv.classList.remove("hidden");
    }
    playerToggle.showing = !playerToggle.showing;
});

playlistId.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        window.player.loadPlaylist({
            list: this.value,
            listType: "playlist"
        })
        window.player.stopVideo()
        setStoreageItem("youtubePlaylist", this.value)
    }
})



