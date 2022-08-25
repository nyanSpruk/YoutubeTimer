// Read from storage
chrome.storage.local.get(['YoutubeTimeTracker'], function (result) {
    document.getElementById("value").innerHTML = "Time spent watching youtube: " + result.YoutubeTimeTracker + " seconds";
})