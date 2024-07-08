"use strict";

// Selecting Elements
const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const restartBtn = document.querySelector(".details button");

// Required Variables
let maxTime = 25;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let card1, card2, timer;

// Function initial Timer
function initialTimer() {
  if (timeLeft <= 0) {
    return clearInterval(timer);
  }
  timeLeft--;
  timeTag.innerText = timeLeft;
}

// Function FlipCard
function flipCard({ target: clickedCard }) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initialTimer, 1000);
  }
  if (clickedCard !== card1 && !disableDeck && timeLeft > 0) {
    flips++;
    flipsTag.innerText = flips;
    clickedCard.classList.add("flip");
    if (!card1) {
      return (card1 = clickedCard);
    }
    card2 = clickedCard;
    disableDeck = true;
    let card1Img = card1.querySelector(".back-view img").src,
      card2Img = card2.querySelector(".back-view img").src;
    matchCard(card1Img, card2Img);
  }
}

// Function MatchCard
function matchCard(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 6 && timeLeft > 0) {
      return clearInterval(timer);
    }
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    card1 = card2 = "";
    return (disableDeck = false);
  }

  setTimeout(() => {
    card1.classList.add("shake");
    card2.classList.add("shake");
  }, 400);

  setTimeout(() => {
    card1.classList.remove("shake", "flip");
    card2.classList.remove("shake", "flip");
    card1 = card2 = "";
    disableDeck = false;
  }, 1200);
}

// Function ShuffleCard
function shuffleCard() {
  timeLeft = maxTime;
  flips = matchedCard = 0;
  card1 = card1 = "";
  clearInterval(timer);
  timeTag.innerText = timeLeft;
  flipsTag.innerText = flips;
  disableDeck = isPlaying = false;

  let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");

    setTimeout(() => {
      imgTag.src = `/assets/images/img-${arr[i]}.png`;
    }, 500);
    card.addEventListener("click", flipCard);
  });
}
shuffleCard();

// Add events
restartBtn.addEventListener("click", shuffleCard);

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
