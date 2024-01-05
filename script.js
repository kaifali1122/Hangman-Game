const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const palayAgainBtn = document.querySelector(".play-again");


let currentWord,correctLetters ,wrongGuessCount;
const maxGuesses=6 ;

const resetGame= ()=>{
    correctLetters=[];
    wrongGuessCount=0;
    hangmanImage.src=`hangman-${wrongGuessCount}.svg`;
    guessText.innerText=`${wrongGuessCount}/${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}
const getRandomWord = () => {
    // selecting a random word and hint from the wordlist
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}
const gameOver=(isVictory)=>{
    //After 600ms of game complete.. showing modal with relevent details
    setTimeout(()=>{
        const modalText= isVictory?`You found the word`: `The correct word was:`;
        gameModal.querySelector("img").src = `${isVictory ? `victory`:`lost`}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? `Congrats`:`Game Over`}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300);
}
const initGame = (button, clickedLetter) => {
    // checking if clickedLetter is existed or currentWord
    if (currentWord.includes(clickedLetter)) {
        // Showing all correct letter on the word Display
        [...currentWord].forEach((letter, index) => {
    if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
    }
});
    }else{
        wrongGuessCount++;
        hangmanImage.src=`hangman-${wrongGuessCount}.svg`;
    }
    button.disabled=true;
    guessText.innerText=`${wrongGuessCount}/${maxGuesses}`;

    // Calling Gameover function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}
// creating keyboard button and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord()
palayAgainBtn.addEventListener("click",getRandomWord);

palayAgainBtn.addEventListenerO("click",getRandomWord);
