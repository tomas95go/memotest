'use strict';

window.onload = () => {
  const memotest = getGameData();
  displayCurrentLVL(memotest.lvl);
  displayPairs(memotest.pairs);
  formPairs(memotest.fighters, memotest.fighterPairs, memotest.cards);
  displayCards(memotest.fighterPairs);
  const $cardContainer = document.querySelectorAll('.card-container');
  const player = getPlayerData();
  $cardContainer.forEach((card) => {
    card.addEventListener(
      'click',
      (event) => {
        registerPlayerAction(
          event,
          memotest.fighterPairs,
          player.temporaryPair,
          player.correctPairs
        );
      },
      false
    );
  });
};

export const getGameData = () => {
  const memotest = {
    lvl: 1,
    cards: 8,
    pairs: 4,
    fighters: [
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
    ],
    fighterPairs: [],
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

export const displayCurrentLVL = (lvl) => {
  const $currentLVL = document.getElementById('current-level');
  $currentLVL.textContent = lvl;
};

export const displayPairs = (pairs) => {
  const $currentPairs = document.getElementById('current-pairs');
  $currentPairs.textContent = pairs;
};

export const getRandomFighter = (fighters) => {
  const randomFighters =
    fighters[Math.floor(Math.random() * (fighters.length - 1))];
  return randomFighters;
};

export const formPairs = (fighters, fighterPairs, cardsQty) => {
  while (fighterPairs.length < cardsQty) {
    const randomFighter = getRandomFighter(fighters);
    const isPresent = fighterPairs.find((fighter) => fighter === randomFighter);
    if (!isPresent) {
      fighterPairs.push(randomFighter);
      fighterPairs.push(randomFighter);
    }
  }

  return fighterPairs;
};

export const getPlayerData = () => {
  const player = {
    correctPairs: [],
    temporaryPair: [],
  };

  return player;
};

export const validateTemporaryPairLength = (temporaryPair) => {
  const isValid = temporaryPair.length < 2 ? true : false;
  return isValid;
};

export const addCardToTemporaryPair = (card, temporaryPair) => {
  temporaryPair.push(card);
  return temporaryPair;
};

export const resetPair = (pair) => {
  pair.length = 0;
  return pair;
};

export const validateTemporaryPairMatch = (temporaryPair) => {
  const fighter = temporaryPair[0];
  const isMatch = temporaryPair.every((element) => fighter === element);
  return isMatch;
};

export const addTemporaryPairToCorrectPairs = (temporaryPair, correctPairs) => {
  correctPairs.push(...temporaryPair);
  return correctPairs;
};

export const registerPlayerAction = (
  event,
  fighterPairs,
  temporaryPair,
  correctPairs
) => {
  const isValid = validateTemporaryPairLength(temporaryPair);

  const fighter = event.currentTarget.dataset.fighter;

  if (isValid) {
    addCardToTemporaryPair(fighter, temporaryPair);

    if (temporaryPair.length === 2) {
      const isMatch = validateTemporaryPairMatch(temporaryPair);

      if (isMatch) {
        addTemporaryPairToCorrectPairs(temporaryPair);
      } else {
        resetPair(temporaryPair);
      }
    }
  } else {
    resetPair(temporaryPair);
  }
};

export const displayCards = (pairs) => {
  const $fightersCardsContainer = document.querySelector(
    '.fighters-cards-container'
  );

  pairs.forEach((fighter) => {
    const $cardContainer = document.createElement('div');
    const $frontCard = document.createElement('div');
    const $backCard = document.createElement('div');
    $frontCard.classList.add('front-card', 'active');
    $backCard.classList.add('back-card');
    $cardContainer.classList.add(
      'card-container',
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

    $backCardImg.setAttribute('src', `imgs/${fighter}.jpg`);
    $backCardImg.setAttribute('alt', fighter);
    $backCardImg.classList.add('object-fill', 'h-48', 'w-48');

    $backCard.appendChild($backCardImg);

    $cardContainer.appendChild($frontCard);
    $cardContainer.appendChild($backCard);
    $cardContainer.setAttribute('data-fighter', fighter);

    $fightersCardsContainer.appendChild($cardContainer);
  });
};

/*
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
