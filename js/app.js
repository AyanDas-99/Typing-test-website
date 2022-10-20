const displayText = document.querySelector(".display-text");
const input = document.querySelector("#input");
const retry = document.querySelector("#retry");
const timer = document.querySelector(".timer");

let nthString = 0; // The index of string to be typed
let isTimerOn = false;
let time; // set interval object
let sec; // stores the number of seconds passed


// Typing data
const strings = [
  "The Odyssey, Homer's epic poem of the 8th Century BC, topped our poll. Why was it the first choice? According to writer and broadcaster Natalie Haynes: Because it is one of the great foundational myths of western culture; because it asks what it means to be a hero; because it has great female characters in it, as well as men; because it is full of gods and monsters and is properly epic and because it forces us to question the assumptions we might have about quests",
  "Harriet Beecher Stowe’s 1852 novel came in at number two, and for Zimbabwean novelist Tendai Huchu, it is hard to think of any literary work today that could ever have such an impact. Jenny Bhatt, writer and Contributing Editor at PopMatters calls it the first widely-read political novel in the US and the first work of fiction that openly addressed the cruelty of slavery, human exploitation, the lopsided legal system, the entrenched patriarchy, the need for feminism, and more.",
  "George Orwell’s ground-breaking dystopian novel Nineteen Eighty-Four was a popular choice with our voters. Why? “Because it captures a truth about totalitarianism and human history, says book critic Alex Clark. Novelist and reviewer at the Boston Globe, Rebecca Steinitz, meanwhile, comments on how the story’s themes of totalitarianism, technology and surveillance have been endlessly relevant and resonant since the day it appeared. Adam Thorpe, critic and author of Missing Fay among other novels, points to the book’s unique blend of past and future",
  "Telling the story of the colonisation of a Nigerian tribe from the point of view of an African, Things Fall Apart exploded stereotypes about Africa and brought to life the true impact of cross-cultural misunderstandings. Achebe said that “this was the first time we were seeing ourselves, as autonomous individuals, rather than half-people, or as Conrad would say, ‘rudimentary souls’ – many of those who responded to our poll agreed, and it reached number five.",
  "The classic One Thousand and One Nights, is another top pick. A timeless work, says Ainehi Edoro-Glines, Assistant Professor of Literature, Marquette University. “It gets at the primordial human desire for the story that never ends – which can very easily stand for life that never comes to an end. Ahdaf Soueif, novelist, writer and commentator, points out: “Many characters, motifs and quotations (‘Open Sesame!’) from this set of stories within stories have become common parlance across the world.",
  "Many consider Don Quixote, published in two volumes, in 1605 and 1615, to be the first novel. Terry Hong, critic at the Smithsonian Asian-Pacific American Center, certainly thinks so: “The Western canon was established with this evergreen, never-aging buddy adventure. Miguel de Cervantes satirical account of an aging Spaniard besotted with tales of chivalry who becomes a latter-day knight-errant himself has inspired a long-in-development film by Terry Gilliam, which just premiered at the Cannes Film Festival, and a popular Broadway musical."
];


// Typing Event listener
input.addEventListener("input", () => {
  if (!isTimerOn) {
    startTimer();
    isTimerOn = true;
  }
  const characterSpan = document.querySelectorAll("span");
  let flag;
  characterSpan.forEach((character, index) => {
    if (input.value[index] == null) {
      console.log(input.value[index]);
      character.classList.remove("correct");
      character.classList.remove("incorrect");
      flag = false;
    } else if (input.value[index] === character.textContent) {
      character.classList.remove("incorrect");
      character.classList.add("correct");
      flag = true;
    } else {
      flag = false;
      character.classList.add("incorrect");
      character.classList.remove("correct");
    }
  });
  if (flag) {
    finished();
  }
});

setDisplayText();

// Set the typing data in the display
// Each letter inside it's separate span
function setDisplayText() {
  const stringArray = strings[nthString].split("");
  stringArray.forEach((character) => {
    const span = document.createElement("span");
    span.textContent = character;
    displayText.appendChild(span);
  });
}

// Runs when all the letters are typed and are correct
// Stops the timer and runs calculate speed.
function finished() {
  input.value = "";
  clearInterval(time);
  console.log(strings[nthString].split(" ").length);
  calculateSpeed(sec, strings[nthString].split(" ").length);
}

function startTimer() {
  sec = 0;
  timer.textContent = sec;
  time = setInterval(() => {
    sec++;
    timer.textContent = sec;
  }, 1000);
}

// Calculate the WPM speed and display.
function calculateSpeed(time, numberOfWords) {
  const mins = time / 60;
  const wpm = Math.floor(numberOfWords / mins);
  timer.textContent = wpm + " WPM";
}