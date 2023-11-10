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

const screen = document.getElementById("screen");
const clickable = document.getElementById("clickable");

let iconsShown = false;

clickable.addEventListener("click", (evt) => {
    if (iconsShown) {
        screen.animate("disable");
    } else {
        screen.animate("enable");
    }

    iconsShown = !iconsShown;
});