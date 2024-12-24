const typingtext = document.querySelector(".typing-text p");
const time = document.querySelector(".time span b");
const mistakeSpan = document.querySelector(".mistake span b");
const wpm = document.querySelector(".wpm span b");
const cpm = document.querySelector(".cpm span b");
const btn = document.querySelector("button");
const input = document.querySelector(".input-field");
const msg = document.querySelector(".msg");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let mistakes = 0;
let charIndex = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "The best way to predict the future is to create it.",
    "Keep your face always toward the sunshine, and shadows will fall behind you. ",
    "Believe you can and you're halfway there.",
    "Happiness is not something ready-made. It comes from your own actions. ",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. ",
    "You are never too old to set another goal or to dream a new dream.",
    "Act as if what you do makes a difference. It does. ",
    "Start where you are. Use what you have. Do what you can.",
  ];

  const randomIndex = Math.floor(Math.random() * paragraph.length);
  console.log(paragraph[randomIndex]);
  typingtext.innerHTML = " ";
  for (const char of paragraph[randomIndex]) {
    typingtext.innerHTML += `<span>${char}</span>`; //add each charater to form text
  }
  typingtext.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingtext.addEventListener("click", () => input.focus());
}

//handle inpput

function initTyping() {
  const char = typingtext.querySelectorAll("span");
  let typedChar = input.value.charAt(charIndex);
  if (charIndex < char.length && timeLeft > 0) {
    msg.innerHTML = "";
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }
    console.log(charIndex);
    if (char[charIndex].innerText == typedChar) {
      char[charIndex].classList.add("correct");
      console.log("corect");
      console.log(typedChar);
    } else {
      char[charIndex].classList.add("incorrect");
      console.log("incorect");
      console.log(char[charIndex]);
      mistakes++;
      console.log(typedChar);
      cpm.innerHTML = charIndex - mistakes;
    }
    charIndex++;
    char[charIndex].classList.add("active");
    mistakeSpan.innerText = mistakes;
  } else {
    clearInterval(timer);
    msg.innerHTML = "You completed the test!";
    console.log(msg.innerText);
    input.value = "";
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerHTML = `${timeLeft} s`;
    let wpmCount = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = wpmCount;
  } else {
    clearInterval(timer);
    msg.innerHTML = "⏰ Time's up! Try again!";
  }
}

function reset() {
  loadParagraph();
  timeLeft = maxTime;
  clearInterval(timer);
  charIndex = 0;
  mistakes = 0;
  isTyping = false;
  cpm.innerHTML = "0";
  wpm.innerHTML = "0";
  mistakeSpan.innerHTML = "0";
  time.innerHTML = `${timeLeft} s`;
  input.value = "";
  msg.innerHTML = "";
}

input.addEventListener("input", initTyping);
loadParagraph();

btn.addEventListener("click", reset);
