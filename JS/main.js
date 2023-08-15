// Select Main Elements
const nameGame = document.querySelector(".name");
const selectContainer = document.querySelector(".select-lvl");
const selectContainerOpts = document.querySelectorAll(".select-lvl option");
const chooseBtn = document.querySelector(".choose");
const lvlNameSpan = document.querySelector(".message .lvl");
const secondSpan = document.querySelector(".message .seconds");
const startBtn = document.querySelector(".start");
const theWord = document.querySelector(".the-word");
const input = document.querySelector(".input");
const upcomingWords = document.querySelector(".upcoming-words");
const timeLeftSpan = document.querySelector(".time span");
const scoreGot = document.querySelector(".score .got");
const scoreTotal = document.querySelector(".score .total");
const finishMessage = document.querySelector(".finish");

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

//Choose Default Level
chooseBtn.onclick = getOption;

function getOption() {
  let value = selectContainer.value;
  let defaultLevelName = value;
  let defaultLevelSeconds = lvls[`${defaultLevelName}`];

  // Fill Data In Message Spans + Time Left
  // Name Level
  lvlNameSpan.innerHTML = defaultLevelName;

  // Second Depend On Level
  secondSpan.innerHTML = defaultLevelSeconds;

  // Time Left Span
  if (words.length === 30) {
    timeLeftSpan.innerHTML = defaultLevelSeconds + 3;
  } else {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  }

  startBtn.classList.add("active");
  selectContainer.classList.add("no-event");
}

// Fill Data In Score
//Total
scoreTotal.innerHTML = words.length;

//Disable Paste Event
input.onpaste = function () {
  return false;
};

//Start Game
startBtn.onclick = function () {
  this.remove();
  input.focus();

  //Generate Word Function
  genWords();
};

function genWords() {
  //Get Random Word From Arr
  let randWord = words[Math.floor(Math.random() * words.length)];
  //Show Rand Word
  theWord.innerHTML = randWord;
  //Index Of RandWord
  let wordIndex = words.indexOf(randWord);
  //Remove Word From Arr Depend On Index
  words.splice(wordIndex, 1);
  //Empty Upcoming Words After Delete Word From Arr
  upcomingWords.innerHTML = "";
  //Generate Words
  for (let i = 0; i < words.length; i++) {
    //Create Div
    let div = document.createElement("div");
    div.innerHTML = words[i];
    upcomingWords.appendChild(div);
  }
  //Call Start Play Func
  startPlay();
}

function startPlay() {
  let value = selectContainer.value;
  let defaultLevelName = value;
  let defaultLevelSeconds = lvls[`${defaultLevelName}`];
  if (words.length === 29) {
    timeLeftSpan.innerHTML = defaultLevelSeconds + 3;
  } else {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  }

  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML == 0) {
      //Stop Timer
      clearInterval(start);
      //Compare Words
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        //Empty Input Field
        input.value = "";
        //Increase Score
        scoreGot.innerHTML++;
        //Call Generate Func
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          span.innerHTML = "Congrats";
          finishMessage.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        span.innerHTML = "Game Over";
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
