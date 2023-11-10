import * as document from "document";
import * as clock from "./simple/clock";
import * as activity from "./simple/activity";
import * as hrm from "./simple/hrm";

/**
 * Datetime code
 */

const timeElem = document.getElementById("timeText");
const dateElem = document.getElementById("dateText");

function clockCallback(data) {
    timeElem.text = data.time;
    dateElem.text = data.date;
}

clock.initialize("minutes", "shortDate", clockCallback);

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
    stepsText.text = data.steps.pretty;
    distanceText.text = data.distance.pretty;
    AZMText.text = data.activeMinutes.pretty;
    caloriesText.text = data.calories.pretty;
    floorsText.text = data.elevationGain.pretty;
}

activity.initialize("seconds", activityCallback);

/**
 * Heart Rate code
 * Gets your current hr.
 */

const heartText = document.getElementById("heart");

function hrmCallback(data) {
    let hr = data.bpm;
    if (hr === null) hr = "--";

    if (heartText !== null) heartText.text = hr;

    if (hr === "--") {
        return
    }
}

hrm.initialize(hrmCallback);

/**
 * Animation code
 */

const clickable = document.getElementById("clickable");

const centerElemArr = [];
centerElemArr.push(document.getElementById("datetimeOp"));  // 0
centerElemArr.push(document.getElementById("stats1Op"));    // 1
centerElemArr.push(document.getElementById("stats2Op"));    // 2

const numberElemArr = [];
numberElemArr.push(document.getElementById("left1Power")); // 0
numberElemArr.push(document.getElementById("left2Power")); // 1
numberElemArr.push(document.getElementById("left3Power")); // 2
numberElemArr.push(document.getElementById("left1Black")); // 3
numberElemArr.push(document.getElementById("left2Black")); // 4
numberElemArr.push(document.getElementById("left3Black")); // 5

const rectElemArr = [];
rectElemArr.push(document.getElementById("rect1Power")); // 0
rectElemArr.push(document.getElementById("rect2Power")); // 1
rectElemArr.push(document.getElementById("rect3Power")); // 2
rectElemArr.push(document.getElementById("rect1Grey")); // 3
rectElemArr.push(document.getElementById("rect2Grey")); // 4
rectElemArr.push(document.getElementById("rect3Grey")); // 5

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
    numberElemArr[currentLeft].style.opacity = 0;
    numberElemArr[currentLeft + 3].style.opacity = 1;
    rectElemArr[currentLeft].style.opacity = 0;
    rectElemArr[currentLeft + 3].style.opacity = 1;

    currentLeft++;
    if (currentLeft > 2) currentLeft = 0;

    numberElemArr[currentLeft].style.opacity = 1;
    numberElemArr[currentLeft + 3].style.opacity = 0;
    rectElemArr[currentLeft].style.opacity = 1;
    rectElemArr[currentLeft + 3].style.opacity = 0;
});

