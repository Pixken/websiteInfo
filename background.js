chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.frameId === 0) {
    chrome.tabs.update(details.tabId, { url: "http://localhost:3000" });
  }
}, { url: [{ urlMatches : "chrome://newtab/" }] });