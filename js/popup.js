buttonColors = {};

function setButtonState(button, state) {
    element = document.getElementById(button);
    if (buttonColors[button] === undefined) {
        buttonColors[button] = element.style.backgroundColor;
    }

    element.style.backgroundColor = state ? "grey" : buttonColors[button];
}

function parseResponse(response) {
    const status = response["status"];
    const statusArray = status.split(",");
    return statusArray;
}

window.addEventListener("load", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "status" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error:", JSON.stringify(chrome.runtime.lastError));
                    setButtonState("gatherButton", true);
                    setButtonState("extractButton", true);
                } else {
                    setButtonState("extractButton", true);
                    const status = parseResponse(response);
                    status.forEach(entry => {
                        const statusInfo = document.getElementById(`${entry}sInfo`);
                        if (statusInfo) {
                            statusInfo.style.color = "green";
                            setButtonState("extractButton", false);
                        }
                    });
                }
            });
        } else {
            console.error("No active tab found");
        }
    });
});

document.getElementById("extractButton").addEventListener("click", () => {
    if (document.getElementById("extractButton").style.backgroundColor === "grey") {
        alert("To extract data, you first need to gather recipes.");
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "extract" }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error:", JSON.stringify(chrome.runtime.lastError));
                        alert("Failed to extract data. Set Warzone Idle as an active tab, reload the page (CTRL + F5) and try again.");
                    } else {
                        console.log("Response:", response);
                    }
                });
            } else {
                console.error("No active tab found");
            }
        });
    }
});

document.getElementById("gatherButton").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "gather" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error:", JSON.stringify(chrome.runtime.lastError));
                    alert("Failed to extract data. Set Warzone Idle as an active tab, reload the page (CTRL + F5) and try again.");
                } else {
                    const statusArray = parseResponse(response);
                    statusArray.forEach(entry => {
                        const statusInfo = document.getElementById(`${entry}sInfo`);
                        if (statusInfo) {
                            statusInfo.style.color = "green";
                            setButtonState("extractButton", false);
                        }
                    });
                }
            });
        } else {
            console.error("No active tab found");
        }
    });
});
