const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {

  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  //Stretch goal: check input between 1 and 99
  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert("Please enter a number between 1 and 99.");
    guessInput.value = ''; // Clear the invalid input
    return;
  }

  attempts = attempts + 1;
  hideAllMessages();

  if (guess === targetNumber) {
    // Stretch goal: singular vs plural for guess/guesses
    const guessWord = attempts === 1 ? 'guess' : 'guesses';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${guessWord}`;
    numberOfGuessesMessage.style.display = '';

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      //bug fix 5: tooLowMessage to tooHighMessage
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    // Stretch goal: singular vs plural for guess/guesses
    const guessWord = remainingAttempts === 1 ? 'guess' : 'guesses';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessWord} remaining`;
    numberOfGuessesMessage.style.display = '';



    //bug fix 2: change ==== to ===
    if (attempts === maxNumberOfAttempts) {
      submitButton.disabled = true;
      guessInput.disabled = true;
    }
  }

  guessInput.value = '';

  resetButton.style.display = '';
}


function hideAllMessages() {
  //bug fix 4: change <= to <
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}
//bug fix 1:funtion to function
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  //big fix 6: change maxNumberOfAttempts to attempts
  attempts = 0;

  // Enable the input and submit button

  submitButton.disabled = false;//bug fix 3: change disabeld to disabled
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();