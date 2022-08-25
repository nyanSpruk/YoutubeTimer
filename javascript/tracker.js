window.addEventListener('load', () => {
    let button;

    const pause = "Play (k)";
    const playing = "Pause (k)";
    const playingValue = 1;
    const pausedValue = 0;
    let initialValue = document.querySelector(".ytp-play-button").getAttribute("title");
    const elementToObserve = document.querySelector(".ytp-play-button");

    compareValue(initialValue);

    const observer = new MutationObserver(() => {
        let value = document.querySelector(".ytp-play-button").getAttribute("title");
        compareValue(value);
    });

    observer.observe(elementToObserve, {
        attributeFilter: ['title'],
        attributeOldValue: initialValue
    });

    function compareValue(value) {
        if (value) {
            if (value.localeCompare(pause) == 0) {
                // console.log("Sending paused " + value);
                sendStatus(pausedValue);
            } else if (value.localeCompare(playing) == 0) {
                // console.log("Sending playing " + value);
                sendStatus(playingValue);
            }
        }
    }

    function sendStatus(statusVal) {
        chrome.runtime.sendMessage({ type: "tracker", status: statusVal, timeStamp: performance.now() }, (response) => {
            // console.log(response.farewell);
        });
    }

});