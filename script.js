// JavaScript for the Memory Card Game

const cardValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false; // Prevents flipping more than two cards at once
let matchedPairs = 0; // Keep track of matched pairs

const gameBoard = document.getElementById('game-board');
const attemptsCounter = document.getElementById('attempts-counter');
const resetButton = document.getElementById('reset-button');

// Function to shuffle cards (Fisher-Yates algorithm)
function shuffleCards(array) {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Function to create the game board
function createBoard() {
    gameBoard.innerHTML = ''; // Clear previous board
    attempts = 0;
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    updateAttemptsCounter();

    const shuffledValues = shuffleCards(cardValues);

    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = value;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = '?';

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
    console.log("Board created. Total cards:", shuffledValues.length);
}

// Function to handle card clicks
function handleCardClick(event) {
    if (lockBoard) return; // If board is locked, do nothing
    const clickedCard = event.currentTarget;

    // If the clicked card is already flipped, matched, or is the first card again, do nothing
    if (clickedCard === firstCard || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    flipCard(clickedCard);

    if (!firstCard) {
        firstCard = clickedCard;
        return; // Wait for the second card
    }

    // This is the second card
    secondCard = clickedCard;
    lockBoard = true; // Lock board while checking for match
    attempts++;
    updateAttemptsCounter();
    checkForMatch();
}

// Function to flip a card
function flipCard(card) {
    card.classList.add('flipped');
}

// Function to check for a match
function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Function to disable matched cards
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // Optional: remove event listener if not handled by class checks
    // firstCard.removeEventListener('click', handleCardClick);
    // secondCard.removeEventListener('click', handleCardClick);

    matchedPairs++;
    resetTurn();
    checkGameCompletion();
}

// Function to unflip cards if they don't match
function unflipCards() {
    setTimeout(() => {
        if (firstCard) firstCard.classList.remove('flipped');
        if (secondCard) secondCard.classList.remove('flipped');
        resetTurn();
    }, 1000); // 1 second delay
}

// Function to reset firstCard, secondCard, and lockBoard
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Function to update the attempts counter display
function updateAttemptsCounter() {
    attemptsCounter.textContent = `Attempts: ${attempts}`;
}

// Function to check for game completion
function checkGameCompletion() {
    console.log("Matched pairs:", matchedPairs, "Total pairs:", cardValues.length / 2);
    if (matchedPairs === cardValues.length / 2) {
        // Delay alert slightly to allow final card flip animation
        setTimeout(() => {
            alert(`Congratulations! You won in ${attempts} attempts!`);
        }, 100);
    }
}

// Reset Game Function (called by button)
function resetGame() {
    // createBoard already handles resetting variables and clearing the board
    createBoard();
}

// Event listener for the reset button
resetButton.addEventListener('click', resetGame);

// Initial call to set up the game
createBoard();

console.log("Memory game script loaded with full logic.");
