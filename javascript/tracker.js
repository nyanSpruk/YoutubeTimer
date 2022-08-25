let button;

const pause = "Play (k)";
const playing = "Pause (k)";

setInterval(checkState, 500);

function checkState() {
    buttonState = document.querySelector(".ytp-play-button").getAttribute("title");
    if (buttonState.localeCompare(playing == 0)) {
    }
}