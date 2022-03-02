'use strict';

window.onload = () => {
  const memotest = getGameData();
  console.log(memotest);
};

export const getGameData = () => {
  const memotest = {
    lvl: 1,
    cards: 8,
    pairs: 4,
  };
  return memotest;
};

export const updateGameData = (memotest, newLVL, newCards, newPairs) => {
  memotest.lvl = newLVL;
  memotest.cards = newCards;
  memotest.pairs = newPairs;
  return memotest;
};

export const incrementLevel = (memotest) => {
  memotest.lvl++;
  memotest.cards = memotest.cards + 4;
  memotest.pairs = memotest.cards / 2;
  return memotest;
};
/*const currentLVL = 1;

const currentCards = 12;

const currentPairs = currentCards / 2;

const fighters = [
  'Gouki',
  'Balrog',
  'Blanka',
  'Cammy',
  'Chun-li',
  'Deejay',
  'Dhalsim',
  'Ehonda',
  'Feilong',
  'Guile',
  'Ken',
  'Mbison',
  'Ryu',
  'Sagat',
  'Thawk',
  'Vega',
  'Zangief',
];

const randomFighters = [];

const getRandomFighters = (fighters) => {
  const randomFighter = fighters[Math.floor(Math.random() * fighters.length)];
  fighters.splice(fighters.indexOf(randomFighter), 1);
  return randomFighter;
};

const checkExistence = (fighter) => {
  const isPresent = randomFighters.find((el) => el === fighter) ? true : false;
  return isPresent;
};

for (let i = 0; i < currentPairs; i++) {
  const randomFighter = getRandomFighters(fighters);
  const isPresent = checkExistence(randomFighter);
  if (!isPresent) {
    for (let j = 0; j < 2; j++) {
      randomFighters.push(randomFighter);
    }
  }
}

function shuffle(array) {
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

shuffle(randomFighters);

const toggle = (event) => {
  const $cardContainer = event.currentTarget.childNodes;
  const $cardContainerChildren = [...$cardContainer];
  const $frontCard = $cardContainerChildren.find((card) =>
    card.classList.contains(`front-card`)
  );
  const $backCard = $cardContainerChildren.find((card) =>
    card.classList.contains(`back-card`)
  );
  const isActive = $frontCard.classList.contains('active');

  isActive ? flipIn($frontCard, $backCard) : flipOut($frontCard, $backCard);
};

const flipIn = ($frontCard, $backCard) => {
  $frontCard.classList.add('hidden');
  $frontCard.classList.remove(
    'active',
    'animate__animated',
    'animate__flipInY',
    'animate__delay-0.5s'
  );
  $backCard.classList.add(
    'bg-amethyst',
    'animate__animated',
    'animate__flipInY',
    'animate__delay-0.5s'
  );
};

const flipOut = ($frontCard, $backCard) => {
  $frontCard.classList.remove('hidden');
  $frontCard.classList.add(
    'active',
    'animate__animated',
    'animate__flipInY',
    'animate__delay-0.5s'
  );
  $backCard.classList.remove(
    'bg-amethyst',
    'animate__animated',
    'animate__flipInY',
    'animate__delay-0.5s'
  );
};

const $fightersCardsContainer = document.querySelector(
  '.fighters-cards-container'
);

for (let i = 0; i < randomFighters.length; i++) {
  const $cardContainer = document.createElement('div');
  const $frontCard = document.createElement('div');
  const $backCard = document.createElement('div');
  $frontCard.classList.add('front-card', 'active');
  $backCard.classList.add('back-card');
  $cardContainer.classList.add(
    'overflow-clip',
    'rounded-lg',
    'box-border',
    'h-48',
    'w-48',
    'border-4',
    'bg-russianb',
    'cursor-pointer'
  );
  const $frontCardImg = document.createElement('img');
  const $backCardImg = document.createElement('img');
  $frontCardImg.setAttribute('src', 'imgs/ssf2thdr_logo_thumb.jpg');
  $frontCardImg.setAttribute('alt', 'SSF2THDR');
  $frontCardImg.classList.add('object-fill', 'h-48', 'w-48');

  $frontCard.appendChild($frontCardImg);

  $backCardImg.setAttribute('src', `imgs/${randomFighters[i]}.jpg`);
  $backCardImg.setAttribute('alt', randomFighters[i]);
  $backCardImg.classList.add('object-fill', 'h-48', 'w-48');

  $backCard.appendChild($backCardImg);

  $cardContainer.appendChild($frontCard);
  $cardContainer.appendChild($backCard);
  $cardContainer.addEventListener('click', toggle, false);
  $cardContainer.setAttribute('data-character', randomFighters[i]);

  $fightersCardsContainer.appendChild($cardContainer);
}*/
