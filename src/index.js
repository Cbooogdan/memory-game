import './styles/main.scss';

const cards = document.querySelector('.js-cards');
const win = document.querySelector('.js-win');
const remaining = document.querySelector('.js-remaining');
const counter = document.querySelector('.js-counter');

const cardsNames = [
    'js',
    'css',
    'c_plus_plus',
    'kotlin',
    'php',
    'python',
    'r',
    'ruby',
];

let matchedCards = [];
let matchCard = '';
let canIClick = true;
let counterFlips = 0;
let prevCard = '';

function generateCards() {
    for (let card of cardsNames) {
        let cardItem = document.createElement('div');
        cardItem.setAttribute('class', `card__item js-${card}`);
        cardItem.setAttribute('data-name', `${card}`);
    
        let imgBack = document.createElement('img');
        imgBack.setAttribute('class', 'card__image card__back');
        imgBack.setAttribute('src', `src/images/${card}.png`);
        cardItem.appendChild(imgBack);
    
        let imgFront = document.createElement('img');
        imgFront.setAttribute('class', 'card__image card__front');
        imgFront.setAttribute('src', 'src/images/secret.png');
        cardItem.appendChild(imgFront);
    
        cards.appendChild(cardItem);
    }
}

function shuffle() {
    let shuffleCards = Array.from(cards.children).sort( () => { 
        return 0.5 - Math.random();
    } );
    
    for (let card of shuffleCards) {
        cards.appendChild(card);
    }
}

function reset() {
    win.classList.remove('active');
    for (let card of cards.children) {
        card.classList.remove('match');
        card.classList.remove('active');
    }
    remaining.innerHTML = 8;
    counter.innerHTML = 0;
    matchedCards = [];
    matchCard = '';
    canIClick = true;
    counterFlips = 0;
}

function flip(event) {
    let card = event.toElement;
    if ( canIClick === true && prevCard !== this && !card.classList.contains('match')) {
        canIClick = false;
        card.classList.toggle('active');

        if ( matchCard.dataset && matchCard.dataset.name === card.dataset.name ) {
            card.classList.add('match');
            matchCard.classList.add('match');

            matchedCards = [...matchedCards, matchCard, card];
            remaining.innerHTML = (16 - matchedCards.length) / 2;
            matchCard = '';
            canIClick = true;
            counter.innerHTML = ++counterFlips;
        } 

        if ( matchCard === '' && canIClick === false ) {
            matchCard = card;
            canIClick = true;
        }

        if (matchCard !== '' && matchCard.dataset.name !== card.dataset.name) {
            counter.innerHTML = ++counterFlips;
            setTimeout(function() {
                card.classList.toggle('active');
                matchCard.classList.toggle('active');
                matchCard = '';
                canIClick = true;
            }, 800);
        }
    }

    if ( matchedCards.length === 16 ) {
        win.classList.add('active');
        setTimeout(function() {
            reset();
        }, 4000);
    }

    prevCard = this;
}

function init() {
    generateCards();
    generateCards();
    
    matchedCards = [];
    matchCard = '';
    canIClick = true;
    counterFlips = 0;

    remaining.innerHTML = 8;
    counter.innerHTML = 0;

    shuffle();

    for (let card of cards.children) {
        card.addEventListener('click', flip);
    }
}

init();