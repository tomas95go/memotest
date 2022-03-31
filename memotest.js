'use strict';

window.onload = () => {
  startGame();
};

export const startGame = () => {
  const gameData = getGameData();
  const { memotest, player } = gameData;
  initializeNewRound(memotest, player);
};

export const getGameData = () => {
  const memotest = getMemotestData();
  const player = getPlayerData();

  const gameData = {
    memotest,
    player,
  };

  return gameData;
};

export const initializeNewRound = (memotest, player) => {
  resetCardsContainer();
  resetPair(player.temporaryPair);
  resetPair(memotest.totalPairs);
  resetPair(player.correctPairs);
  displayCurrentLVL(memotest.lvl);
  displayPairs(memotest.pairs);
  formPairs(memotest.fighters, memotest.totalPairs, memotest.cards);
  shuffle(memotest.totalPairs);
  displayCards(memotest.totalPairs);
  const $cardContainer = document.querySelectorAll('.card-container');
  $cardContainer.forEach((card) => {
    card.addEventListener(
      'click',
      (event) => {
        registerPlayerAction(event, player, memotest);
      },
      false
    );
  });
};

export const getMemotestData = () => {
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
    totalPairs: [],
  };
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

export const formPairs = (fighters, totalPairs, cardsQty) => {
  while (totalPairs.length < cardsQty) {
    const randomFighter = getRandomFighter(fighters);
    const isPresent = totalPairs.find((fighter) => fighter === randomFighter);
    if (!isPresent) {
      totalPairs.push(randomFighter);
      totalPairs.push(randomFighter);
    }
  }

  return totalPairs;
};

export const getPlayerData = () => {
  const player = {
    correctPairs: [],
    temporaryPair: [],
  };

  return player;
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
  const isDuplicated = checkCardsDuplication(temporaryPair);

  const isMatch = checkCardsMatch(temporaryPair);

  const isValid = !isDuplicated && isMatch ? true : false;

  return isValid;
};

export const checkCardsDuplication = (temporaryPair) => {
  const fighter = temporaryPair[0];
  const isDuplicated = temporaryPair.every((element) => fighter === element);
  return isDuplicated;
};

export const checkCardsMatch = (temporaryPair) => {
  const regex = /\-[0-9]/;
  const modifiedTemporaryPair = temporaryPair.map((card) =>
    card.replace(regex, '')
  );
  const fighter = modifiedTemporaryPair[0];
  const isMatch = modifiedTemporaryPair.every((element) => fighter === element);
  return isMatch;
};

export const addTemporaryPairToCorrectPairs = (temporaryPair, correctPairs) => {
  correctPairs.push(...temporaryPair);
  return correctPairs;
};

export const registerPlayerAction = (event, player, memotest) => {
  const { correctPairs, temporaryPair } = player;

  const { totalPairs } = memotest;

  const fighter = event.currentTarget.dataset.fighter;

  const $fighterCard = document.querySelector(`[data-fighter="${fighter}"]`);

  addCardToTemporaryPair(fighter, temporaryPair);
  flipIn($fighterCard);

  if (temporaryPair.length === 2) {
    const isMatch = validateTemporaryPairMatch(temporaryPair);
    if (isMatch) {
      addTemporaryPairToCorrectPairs(temporaryPair, correctPairs);
      temporaryPair.forEach((card) =>
        document
          .querySelector(`[data-fighter="${card}"]`)
          .removeAttribute('data-fighter')
      );
    } else {
      temporaryPair.forEach((card) =>
        setTimeout(
          () => flipOut(document.querySelector(`[data-fighter="${card}"]`)),
          1000
        )
      );
    }
    resetPair(temporaryPair);
  }

  if (correctPairs.length === totalPairs.length) {
    incrementLevel(memotest);
    setTimeout(() => {
      initializeNewRound(memotest, player);
    }, 1500);
  }
};

const resetCardsContainer = () => {
  const $fightersCardsContainer = document.querySelectorAll(
    '.fighters-cards-container > .card-container'
  );

  $fightersCardsContainer.forEach((card) => {
    card.remove();
  });
};

export const displayCards = (pairs) => {
  const $fightersCardsContainer = document.querySelector(
    '.fighters-cards-container'
  );

  pairs.forEach((fighter) => {
    const $cardContainer = document.createElement('div');
    const $frontCard = document.createElement('div');
    const $backCard = document.createElement('div');
    $frontCard.classList.add('front-card');
    $backCard.classList.add('back-card');
    $cardContainer.classList.add(
      'card-container',
      'overflow-clip',
      'rounded-lg',
      'box-border',
      'h-24',
      'w-24',
      'md:h-48',
      'md:w-48',
      'lg:h-48',
      'lg:w-48',
      'border-4',
      'bg-russianb',
      'cursor-pointer'
    );
    const $frontCardImg = document.createElement('img');
    const $backCardImg = document.createElement('img');
    $frontCardImg.setAttribute('src', 'imgs/ssf2thdr_logo_thumb.jpg');
    $frontCardImg.setAttribute('alt', 'SSF2THDR');
    $frontCardImg.classList.add(
      'object-fill',
      'h-24',
      'w-24',
      'md:h-48',
      'md:w-48',
      'lg:h-48',
      'lg:w-48'
    );

    $frontCard.appendChild($frontCardImg);

    $backCardImg.setAttribute('src', `imgs/${fighter}.jpg`);
    $backCardImg.setAttribute('alt', fighter);
    $backCardImg.classList.add(
      'object-fill',
      'h-24',
      'w-24',
      'md:h-48',
      'md:w-48',
      'lg:h-48',
      'lg:w-48'
    );

    $backCard.appendChild($backCardImg);

    $cardContainer.appendChild($frontCard);
    $cardContainer.appendChild($backCard);

    const $cardExists = document.querySelectorAll(
      `[data-fighter="${fighter}-1"]`
    ).length;

    $cardContainer.setAttribute('data-fighter', `${fighter}-1`);

    if ($cardExists) {
      $cardContainer.setAttribute('data-fighter', `${fighter}-2`);
    }

    $fightersCardsContainer.appendChild($cardContainer);
  });
};

const flipIn = ($card) => {
  const $frontCard = $card.childNodes[0];
  $frontCard.classList.add('hidden');
  $card.classList.add(
    'bg-amethyst',
    'animate__animated',
    'animate__flipInY',
    'animate__delay-0.7s'
  );
};

const flipOut = ($card) => {
  const $frontCard = $card.childNodes[0];
  $frontCard.classList.remove('hidden');
  $card.classList.remove(
    'animate__animated',
    'animate__flipInY',
    'animate__delay-0.7s',
    'bg-amethyst'
  );
};

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
