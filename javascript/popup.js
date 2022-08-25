// Read from storage
chrome.storage.local.get(['YoutubeTimeTracker'], function (result) {
    document.getElementById("value").innerHTML = result.YoutubeTimeTracker;
})