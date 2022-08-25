chrome.storage.local.get(['YoutubeTimeTracker'], function (result) {
    // TODO if timestamp is different (day) then clear storage to 0

    let currentValue = undefined;
    let currentTimeStamp;

    let totalTimeSpent = result.YoutubeTimeTracker === undefined ? 0 : parseFloat(result.YoutubeTimeTracker);

    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            if (request.type) {
                if ("tracker".localeCompare(request.type) == 0) {
                    trackerResponse(request);
                    sendResponse({ farewell: "bye tracker" });
                }
            }
        }
    );

    function trackerResponse(request) {
        if (currentValue === undefined) {
            currentValue = request.status;
            currentTimeStamp = request.timeStamp;
        } else if (currentValue != request.status) {
            if (currentValue === 1) {
                totalTimeSpent += parseFloat(calculateTime(request.timeStamp));
                let timeInSeconds = millisecondsToSeconds(totalTimeSpent);
                chrome.storage.local.set({ YoutubeTimeTracker: timeInSeconds }, () => console.log("Set"));
            }
            currentValue = request.status;
            currentTimeStamp = request.timeStamp;
        }
    }

    function millisecondsToSeconds(time) {
        var seconds = ((time % 60000) / 1000).toFixed(0);
        return seconds;
    }

    function calculateTime(newTimeStamp) {
        return newTimeStamp - currentTimeStamp;
    }
});