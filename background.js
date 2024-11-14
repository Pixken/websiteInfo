chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.frameId === 0) {
    chrome.tabs.update(details.tabId, { url: "http://117.72.49.27:3280" });
  }
}, { url: [{ urlMatches : "chrome://newtab/" }] });