import {
  getMemotestData,
  updateGameData,
  incrementLevel,
  getRandomFighter,
  formPairs,
  getPlayerData,
  validateTemporaryPairLength,
  addCardToTemporaryPair,
  resetPair,
  validateTemporaryPairMatch,
  addTemporaryPairToCorrectPairs,
} from '/memotest';

describe('Unit testing', function () {
  context('memotest.js', function () {
    it('Should return game data', function () {
      const memotest = getMemotestData();

      expect(memotest.lvl).to.eq(1);
      expect(memotest.cards).to.eq(8);
      expect(memotest.pairs).to.eq(4);
    });

    it('Should update game data', function () {
      const memotest = {
        lvl: 1,
        cards: 8,
        pairs: 4,
      };

      updateGameData(memotest, 2, 12, 6);

      expect(memotest.lvl).to.eq(2);
      expect(memotest.cards).to.eq(12);
      expect(memotest.pairs).to.eq(6);
    });

    it('Should increment level', function () {
      const memotest = {
        lvl: 1,
        cards: 8,
        pairs: 4,
      };

      incrementLevel(memotest);

      expect(memotest.lvl).to.eq(2);
      expect(memotest.cards).to.eq(12);
      expect(memotest.pairs).to.eq(6);
    });

    it('Should get a random fighter', function () {
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

      const randomFighter = getRandomFighter(fighters);

      expect(fighters).to.include(randomFighter);
    });

    it('Should generate pairs of fighters', function () {
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
      };

      const fighterPairs = formPairs(memotest.fighters, [], memotest.cards);

      expect(fighterPairs).to.have.lengthOf(memotest.cards);

      const fighters = [...new Set(fighterPairs)];

      expect(fighterPairs).include.members(fighters);
    });

    it('Should get player data', function () {
      const player = getPlayerData();

      expect(player.correctPairs).to.have.lengthOf(0);

      expect(player.temporaryPair).to.have.lengthOf(0);
    });

    it('Should validate temporary pair length', function () {
      const temporaryPair = ['Cammy', 'Cammy'];

      const isValid = validateTemporaryPairLength(temporaryPair);

      expect(isValid).to.be.false;
    });

    it('Should add a card to the temporary pair', function () {
      const temporaryPair = [];

      addCardToTemporaryPair('Ryu', temporaryPair);

      expect(temporaryPair).to.have.lengthOf(1);
    });

    it('Should reset temporary pair', function () {
      const temporaryPair = ['Ryu', 'Guille'];

      resetPair(temporaryPair);

      expect(temporaryPair).to.have.lengthOf(0);
    });

    it('Should check match of a pair', function () {
      const temporaryPair = ['Sagat', 'Sagat'];

      const isValid = validateTemporaryPairMatch(temporaryPair);

      expect(isValid).to.be.true;
    });

    it('Should merge 2 arrays', function () {
      const temporaryPair = ['Sagat', 'Sagat'];

      const correctPairs = [];

      addTemporaryPairToCorrectPairs(temporaryPair, correctPairs);

      expect(correctPairs).to.have.lengthOf(2);
    });
  });
});
