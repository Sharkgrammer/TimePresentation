import * as document from "document";
import * as clock from "./simple/clock";
import * as activity from "./simple/activity";
import * as hrm from "./simple/hrm";
import * as settings from "./simple/device-settings";

/**
 * Animation code
 */

const clickable = document.getElementById("clickable");

const centerElemArr = [];
const TIME_SLIDE = 0, HEART_SLIDE = 1, AZM_SLIDE = 2;

centerElemArr.push(document.getElementById("datetimeOp"));  // 0
centerElemArr.push(document.getElementById("stats1Op"));    // 1
centerElemArr.push(document.getElementById("stats2Op"));    // 2

const numberElemArr = [];
numberElemArr.push(document.getElementById("left1Power")); // 0
numberElemArr.push(document.getElementById("left2Power")); // 1
numberElemArr.push(document.getElementById("left3Power")); // 2

const rectElemArr = [];
rectElemArr.push(document.getElementById("rect1Power")); // 0
rectElemArr.push(document.getElementById("rect2Power")); // 1
rectElemArr.push(document.getElementById("rect3Power")); // 2

let currentSlide = 0;
let currentLeft = 0;

clickable.addEventListener("click", (evt) => {

    // Slide change code
    centerElemArr[currentSlide].animate("disable");
    currentSlide++;
    centerElemArr[currentSlide > 2 ? 0 : currentSlide].animate("enable");

    if (currentSlide > 2) {
        currentSlide = 0
    }

    // Number change code
    numberElemArr[currentLeft].animate("disable");
    rectElemArr[currentLeft].animate("disable");

    currentLeft++;
    if (currentLeft > 2) currentLeft = 0;

    numberElemArr[currentLeft].animate("enable");
    rectElemArr[currentLeft].animate("enable");
});

/**
 * Datetime code
 */

const timeElem = document.getElementById("timeText");
const dateElem = document.getElementById("dateText");

let autoDarkModeEnabled = false;
let autoDarkModeTimes = {};
let currentTheme = 0;

function clockCallback(data) {
    if (currentSlide !== TIME_SLIDE) return;

    timeElem.text = data.time;
    dateElem.text = data.date;

    if (autoDarkModeEnabled) {
        let currentTime, onTime, offTime;

        // Convert to 24
        if (!data.h12) {
            currentTime = data.time;
        } else {
            currentTime = `${data.rawH}:${data.rawM}`;
        }

        if (!autoDarkModeTimes.h12) {
            onTime = autoDarkModeTimes.on;
            offTime = autoDarkModeTimes.off;
        } else {
            onTime = convertTo24(autoDarkModeTimes.on);
            offTime = convertTo24(autoDarkModeTimes.off);
        }

        // Set theme
        let setDarkTheme;

        if (onTime <= offTime) {
            setDarkTheme = currentTime >= onTime && currentTime <= offTime;
        } else {
            setDarkTheme = currentTime >= onTime || currentTime <= offTime;
        }

        if (setDarkTheme) {
            if (currentTheme === 0) setTheme(2);
        } else {
            if (currentTheme === 2) setTheme(0);
        }
    }

}

clock.initialize("seconds", "shortDate", clockCallback);

function convertTo24(time) {
    let split = time.split(" ");

    let tH = split[0].split(":")[0];
    let tM = split[0].split(":")[1];
    let p = split[1];

    if (p === "PM") {
        tH = Number(tH) + 12;
    }

    return `${tH}:${tM}`;
}

/**
 * STEPS, DISTANCE, AZM, CALORIES
 * Gets your current steps, and alters the arc based on your steps & steps goal.
 */

const stepsText = document.getElementById("steps");
const distanceText = document.getElementById("distance");
const AZMText = document.getElementById("azm");
const caloriesText = document.getElementById("calories");
const floorsText = document.getElementById("floors");

function activityCallback(data) {
    if (currentSlide === HEART_SLIDE) {
        stepsText.text = data.steps.pretty;
        distanceText.text = data.distance.pretty;

    } else if (currentSlide === AZM_SLIDE) {
        AZMText.text = data.activeMinutes.pretty;
        caloriesText.text = data.calories.pretty;
        floorsText.text = data.elevationGain.pretty;
    }


}

activity.initialize("seconds", activityCallback);

/**
 * Heart Rate code
 * Gets your current hr.
 */

const heartText = document.getElementById("heart");

function hrmCallback(data) {
    if (currentSlide !== HEART_SLIDE) return;

    let hr = data.bpm;
    if (hr === null) hr = "--";

    heartText.text = hr;
}

hrm.initialize(hrmCallback);

let title = document.getElementById("TPaneText");

function settingsCallback(data) {
    // Core Settings
    const title = data["titleSet"];
    const darkmode = data["darkmodeSet"] === undefined ? 0 : Number(data["darkmodeSet"].selected);

    if (title !== undefined) setTitle(title.name);

    // Auto Dark Mode
    const autoMode = data["toggleModeSelects"] === undefined ? false : data["toggleModeSelects"];
    const autoTimeMode = data["toggleModeHour"];
    const darkmodeOn = data["darkmodeOnTime"];
    const darkmodeOff = data["darkmodeOffTime"];

    if (darkmodeOn !== undefined && darkmodeOff !== undefined) {

        if (darkmode === 0) {
            autoDarkModeEnabled = autoMode;

            autoDarkModeTimes.on = darkmodeOn.values[0].name;
            autoDarkModeTimes.off = darkmodeOff.values[0].name;
            autoDarkModeTimes.h12 = (autoTimeMode === undefined ? false : autoTimeMode);
        } else {
            autoDarkModeEnabled = false;
        }

    }

    if (!autoDarkModeEnabled) {
        setTheme(darkmode);
    }
}

settings.initialize(settingsCallback);

function setTitle(val) {
    title.text = val;
}

function setTheme(mode) {
    currentTheme = mode;

    let themeData = {};

    // This is not very readable but its almost 3 in the morning and I don't care
    // Okay I think this version of JS/SVG/Whatever despises the switch statement because fuck
    if (mode === 0) {
        themeData = {
            cTPane: "#ba3f28",
            cTPaneText: "#FFDACC",
            cTPanePost: "#f3f2f1",
            cTPanePostText: "#4d4b49",
            clineShadow: "#d6d6d6",
            cLeftPaneTextBlack: "#000000",
            cLeftPaneText: "#ba3f28",
            crectGrey: "#c9c9c9",
            crectPowerpoint: "#ba3f28",
            crectWhite: "#ffffff",
            crectCPaneMain: "#ffffff",
            crectCPaneBackground: "#c9c9c9",
            ctimeText: "#000000",
            cdateText: "#000000",
            ctitleText: "#000000",
            cstatText: "#4d4b49",
            clineVertical: "#c9c9c9",
            cscreenBackground: "#e6e6e6",
            image: "clock.png",
        }
    } else if (mode === 1) {
        themeData = {
            cTPane: "#101010",
            cTPaneText: "#aaaaaa",
            cTPanePost: "#181818",
            cTPanePostText: "#f7f7f7",
            clineShadow: "#262626",
            cLeftPaneTextBlack: "#888888",
            cLeftPaneText: "#f7f7f7",
            crectGrey: "#f7f7f7",
            crectPowerpoint: "#ba3f28",
            crectWhite: "#ffffff",
            crectCPaneMain: "#ffffff",
            crectCPaneBackground: "#c9c9c9",
            ctimeText: "#000000",
            cdateText: "#000000",
            ctitleText: "#000000",
            cstatText: "#4d4b49",
            clineVertical: "#666666",
            cscreenBackground: "#262626",
            image: "clock.png",
        }
    } else if (mode === 2) {
        themeData = {
            cTPane: "#101010",
            cTPaneText: "#aaaaaa",
            cTPanePost: "#181818",
            cTPanePostText: "#f7f7f7",
            clineShadow: "#262626",
            cLeftPaneTextBlack: "#888888",
            cLeftPaneText: "#f7f7f7",
            crectGrey: "#363636",
            crectPowerpoint: "#ba3f28",
            crectWhite: "#121212",
            crectCPaneMain: "#121212",
            crectCPaneBackground: "#363636",
            ctimeText: "#ffffff",
            cdateText: "#ffffff",
            ctitleText: "#ffffff",
            cstatText: "#b2b4b6",
            clineVertical: "#666666",
            cscreenBackground: "#262626",
            image: "clockWhite.png",
        }
    }

    actuallySetTheme(themeData);
}

function actuallySetTheme(data) {
    const TPane = document.getElementById("TPane");
    const TPaneText = document.getElementById("TPaneText");
    const TPanePost = document.getElementById("TPanePost");
    const TPanePostText = document.getElementsByClassName("TPanePostText");
    const lineShadow = document.getElementById("lineShadow");
    const LeftPaneTextBlack = document.getElementsByClassName("LeftPaneTextBlack");
    const LeftPaneText = document.getElementsByClassName("LeftPaneText");
    const rectGrey = document.getElementsByClassName("rectGrey");
    const rectPowerpoint = document.getElementsByClassName("rectPowerpoint");
    const rectWhite = document.getElementsByClassName("rectWhite");
    const rectCPaneMain = document.getElementsByClassName("rectCPaneMain");
    const rectCPaneBackground = document.getElementsByClassName("rectCPaneBackground");
    const timeText = document.getElementById("timeText");
    const dateText = document.getElementById("dateText");
    const titleText = document.getElementsByClassName("titleText");
    const statText = document.getElementsByClassName("statText");
    const lineVertical = document.getElementById("lineVertical");
    const screenBackground = document.getElementById("screenBackground");
    const clockImage = document.getElementById("clockImage");

    TPane.style.fill = data.cTPane;
    TPaneText.style.fill = data.cTPaneText;
    TPanePost.style.fill = data.cTPanePost;

    for (let elem of TPanePostText) {
        elem.style.fill = data.cTPanePostText;
    }

    lineShadow.style.fill = data.clineShadow;

    for (let elem of LeftPaneTextBlack) {
        elem.style.fill = data.cLeftPaneTextBlack;
    }

    for (let elem of LeftPaneText) {
        elem.style.fill = data.cLeftPaneText;
    }

    for (let elem of rectGrey) {
        elem.style.fill = data.crectGrey;
    }

    for (let elem of rectPowerpoint) {
        elem.style.fill = data.crectPowerpoint;
    }

    for (let elem of rectWhite) {
        elem.style.fill = data.crectWhite;
    }

    for (let elem of rectCPaneMain) {
        elem.style.fill = data.crectCPaneMain;
    }

    for (let elem of rectCPaneBackground) {
        elem.style.fill = data.crectCPaneBackground;
    }

    timeText.style.fill = data.ctimeText;
    dateText.style.fill = data.cdateText;

    for (let elem of titleText) {
        elem.style.fill = data.ctitleText;
    }

    for (let elem of statText) {
        elem.style.fill = data.cstatText;
    }

    lineVertical.style.fill = data.clineVertical;
    screenBackground.style.fill = data.cscreenBackground;
    clockImage.href = "images/" + data.image;
}
