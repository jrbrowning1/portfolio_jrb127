/*
 * logic for jotto game
 *
 * @author: Jonathan Browning
*/

var remainingWords;

var originalNumGuesses;
var numGuessRemaining;

var currentGuess;
var currentGuessLocation;

var numGuessesIn;

function refresh(){
    //used asset 4 to determine how to force page refresh
    location.reload();
}

function startGame(){
    
    remainingWords = wordString;
    //onsole.log(remainingWords[1]);
    
    //used asset 1 to determine how to hide part of html until button is clicked
    var T = document.getElementById('gameplay');
    T.style.display = "block";

    document.getElementById('start-game').disabled = true;

    let name = document.getElementById('name').value;
    document.getElementById('name-area').innerHTML = "Name: "+name;
    document.getElementById('name').disabled = true;

    let difficulty = document.getElementById('difficulty').value;
    document.getElementById('diff-area').innerHTML = "Difficulty: "+ difficulty;
    document.getElementById('difficulty').disabled = true;

    numGuessesIn = 0;
    if (difficulty == "hard"){
        numGuessRemaining = 16;
        originalNumGuesses = 16;
    }
    else if (difficulty == "medium"){
        numGuessRemaining = 12;
        originalNumGuesses = 12;
    }
    else{
        numGuessRemaining = 8;
        originalNumGuesses = 8;
    }

    guessRandomWord();   
}

function guessRandomWord(){
    numGuessesIn++;
    numGuessRemaining--;

    if (numGuessRemaining < 0){
        youWin();
    }
    
    document.getElementById('num-guess-area').innerHTML = "Guesses remaining: "+numGuessRemaining;

    if (numGuessRemaining < originalNumGuesses/2){
        document.getElementById('num-guess-area').style.backgroundColor = "#ffcccb";
    }
    else{
        document.getElementById('num-guess-area').style.backgroundColor = "#90ee90";
    }

    console.log(remainingWords.length);

    //used asset 3 for random number
    let randGuess = Math.floor(Math.random() * remainingWords.length);
    currentGuessLocation = randGuess;
    console.log(remainingWords[randGuess]);
    currentGuess = remainingWords[randGuess];

    document.getElementById('guess-num').innerHTML = "My "+guessString[numGuessesIn-1]+" guess is: "+remainingWords[randGuess];
    


    let guessingSpace = document.getElementById('guesses-area');
    var guessNumber = document.createElement("body");
    var linebreak = document.createElement("br");
    guessNumber.innerHTML = 'There are '+remainingWords.length+' words in my dictionary.';
    guessingSpace.appendChild(guessNumber);
    //guessingSpace.appendChild(linebreak);
    var actualGuess = document.createElement("body");
    actualGuess.innerHTML = "My "+guessString[numGuessesIn-1]+" guess is: "+remainingWords[randGuess];
    guessingSpace.appendChild(actualGuess);
    guessingSpace.appendChild(linebreak);

    commonLetters(remainingWords[randGuess],"there",1);
}

function checkInput(){
    var lettersInCommon = document.getElementById('num-right').value;
     //adapted from asset 6
    var regex=/^[0-9]+$/;
    if (!lettersInCommon.match(regex)){
        console.log("Bad input: Guess must be a number");
        document.getElementById("error-message").innerHTML = "Bad input: Guess must be a number";
    }
    else if (lettersInCommon > 5 || lettersInCommon < 0){
        console.log("Bad input: Guess must be a number between 0 and 5");
        document.getElementById("error-message").innerHTML = "Bad input: Guess must be a number between 0 and 5";
    }
    else if (lettersInCommon == 5){
        remainingWords.splice(currentGuessLocation, 1);
        document.getElementById("error-message").innerHTML = "";
        guessRandomWord();
    }
    else{
        console.log("input is good");
        document.getElementById("error-message").innerHTML = "";
        trimGuesses(lettersInCommon);

    }
    document.getElementById('num-right').value= "";
}

function trimGuesses(numCommonLetters){
    console.log("My current guess is "+currentGuess);
    remainingWords = remainingWords.filter(x => commonLetters(currentGuess, x, numCommonLetters));
    console.log("the number of remaing words is "+remainingWords.length);
    guessRandomWord();
}


function commonLetters(wordGuessed, currWord, numCommonLetters){
    let inCommon = 0;
    const obj = currWord.split("");

    //adapted from asset 5
    for (str of wordGuessed){
        let idx = obj.findIndex(s => s === str);
        if (idx >= 0){
            inCommon++;
            obj.splice(idx, 1);
        }
    }
    //console.log(inCommon);
    if (numCommonLetters == 0 && inCommon > 0){
        return false;
    }
    else if (inCommon < numCommonLetters){
        //console.log(false);
        return false;
    }
    else{
        //console.log(true);
        return true;
    }
}



function iWin(){
    //document.getElementById('results-area').innerHTML = "<h3>I win!! Want to try again?</h3>";
    document.getElementById('guess-num').style.backgroundColor = "#90ee90";
    alert("I win! Want to try again? If so, click new game!");
    document.getElementById("num-right").disabled = true;
    document.getElementById("num-in-common").disabled = true;
    document.getElementById("word-guessed").disabled = true;
}

function youWin(){
    document.getElementById('guess-num').style.backgroundColor = "#ffcccb";
    alert("You win :( Want to let me try again? If so, click new game!");
    document.getElementById("num-right").disabled = true;
    document.getElementById("num-in-common").disabled = true;
    document.getElementById("word-guessed").disabled = true;
}


