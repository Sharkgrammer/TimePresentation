import {settingsStorage} from "settings";
import * as messaging from "messaging";

settingsStorage.addEventListener("change", evt => {
    if (evt.oldValue !== evt.newValue) {


        // Set darkmode if auto darkmode is true
        if (evt.key === "toggleModeSelects") {

            if (evt.newValue === "true") {
                let data = JSON.stringify({
                    "selected": [0],
                    "values": [{name: "Light Mode", desc: "All light colours", value: "0"}]
                });

                settingsStorage.setItem("darkmodeSet", data);
                sendValue("darkmodeSet", data);
            }

        }

        sendValue(evt.key, evt.newValue);

    }
});

function sendValue(key, val) {
    if (val) {
        sendSettingData({
            key: key,
            value: JSON.parse(val)
        });
    }
}

function sendSettingData(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.log("No peerSocket connection");
    }
}

setDefaultSetting("titleSet", {"name": "Time Presentation"});
setDefaultSetting("darkmodeSet", {"selected": [0]});
setDefaultSetting("toggleModeSelects", false);
setDefaultSetting("toggleModeHour", false);
setDefaultSetting("darkmodeOnTime", {"selected": [44], "values": [{name: "22:00"}]});
setDefaultSetting("darkmodeOffTime", {"selected": [20], "values": [{name: "10:00"}]});


function setDefaultSetting(key, value) {
    let extantValue = settingsStorage.getItem(key);

    if (extantValue === null) {
        settingsStorage.setItem(key, JSON.stringify(value));

        // This doesn't work on my sim but I hope that it does on an actual device
        // Either way, the code is designed to work around it
        sendSettingData(key, value);
    }
}