console.log("Warzone Idle Extractor loaded.");
const extractor = new Extractor();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    function getStatus() {
        const status = Array.from(extractor.status).join(",");
        sendResponse({ "status": status });
    }

    if (request.action === "extract") {
        extractor.gatherGeneralData();
        extractor.getAndSend();
    }
    if (request.action === "gather") {
        extractor.gatherRecipes();
        getStatus();
    }
    if (request.action === "status") {
        getStatus();
    }
});
