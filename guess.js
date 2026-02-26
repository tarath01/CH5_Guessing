/*
==========================================================
Guessing Game (1 - 100)
Author: Taylor Rath
Date: 02/25/2026
GitHub: https://github.com/tarath01/CH5_Guessing

Program Summary: This program generates a random number
between 1 and 100. The user is to attempt to guess the number. The program provides
feedback in a color code based on how close your guess is.

 */


"use strict";

// global variables
let randomNum = 0;
let tries = 0;
let bestScore = 0;

// helper function
const getRandomInt = (max = 100) => {
    let num = Math.random() * max;  // get a random number between 0 and max
    num = Math.ceil(num);           // round up to nearest integer
    return num;
};

// event handler functions
const guessClick = () => {
    const guess = parseInt(document.querySelector("#number").value);
    const distance = Math.abs(randomNum - guess); // used AI on this part to help with this specific part

    let color = "black";
    let message = "";

    if (isNaN(guess)) {
        message = "Not a valid number. Please enter a valid number."
    } else if (guess < 1 || guess > 100) {
        message = "Invalid number. Enter a number between 1 and 100.";
    } else if (guess < randomNum) {
        message = "Too small. Try again.";
        tries++;
    } else if (guess > randomNum) {
        message = "Too big. Try again.";
        tries++;
    } else if (guess === randomNum) {
        tries++;
        const lastWord = (tries === 1) ? "try" : "tries";
        message = `You guessed it in ${tries} ${lastWord}!`;
    }
    // color messages based on distance
    switch (true) {
        case (distance === 0):
            const lastWord = (tries === 1) ? "try" : "tries";
            message = `Fire! You guessed it in ${tries} ${lastWord}!`;
            color = "green";
            updateBestScore();
            break;
        case(distance <= 5):
            message = "Hot! (Within 5)";
            color = "red";
            break;
        case (distance <= 10):
            message = "Warmer (Within 10)";
            color = "orangered";
            break;
        case (distance <= 20):
            message = "Warm (Within 20)";
            color = "orange";
            break;
        case (distance <= 30):
            message = "Cold (Within 30)";
            color = "lightblue";
            break;
        case (distance <= 40):
            message = "Colder (Within 40)";
            color = "blue";
            break;
        default:
            message = "Otherwise Freezing (Way Off)";
            color = "darkblue";
            break;
    }

    //Update History & guess history
    const historyEl = document.querySelector("#history")
    historyEl.innerHTML += `Guess ${tries}: ${guess} - ${message}<br>`;

    //color
    const messageEl = document.querySelector("#message")
    messageEl.style.color = color; // set color
    messageEl.textContent = message;

    // set focus back to input and clear
    const guessInput = document.querySelector("#number");
    guessInput.value = ""; //clear input
    guessInput.focus(); // set focus back
};


//best score
const updateBestScore = () => {
    if (bestScore === 0 || tries < bestScore) { // used AI on this line to help give me idea on how to start
        bestScore = tries;
        document.querySelector("#best_score").textContent = bestScore;
    }
};

const playAgainClick = () => {
    randomNum = getRandomInt(100);

    console.log(randomNum); // console log for random # output
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = "";
    document.querySelector("#history").innerHTML = "";
};

document.addEventListener("DOMContentLoaded", () => {
    playAgainClick(); // initial a new game

    document.querySelector("#guess").addEventListener(
        "click", guessClick);
    document.querySelector("#play_again").addEventListener(
        "click", playAgainClick);

    //Enable "Enter" Key
    document.querySelector("#number").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            guessClick();
        }
    });
});