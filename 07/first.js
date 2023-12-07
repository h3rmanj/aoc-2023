import { input } from "./input.js";

const lines = input.split("\n");

const cardTypes = {
  fiveOfAKind: 7,
  fourOfAKind: 6,
  fullHouse: 5,
  threeOfAKind: 4,
  twoPair: 3,
  onePair: 2,
  highCard: 1,
};

const values = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

function determineType(cards) {
  const numberOfEachCards = Object.values(
    cards.split("").reduce((acc, cur) => {
      acc[cur] ??= 0;
      acc[cur]++;
      return acc;
    }, {}),
  );

  switch (numberOfEachCards.length) {
    case 1:
      return cardTypes.fiveOfAKind;
    case 2:
      if (numberOfEachCards.includes(4)) {
        return cardTypes.fourOfAKind;
      } else {
        return cardTypes.fullHouse;
      }
    case 3:
      if (numberOfEachCards.includes(3)) {
        return cardTypes.threeOfAKind;
      } else {
        return cardTypes.twoPair;
      }
    case 4:
      return cardTypes.onePair;
    default:
      return cardTypes.highCard;
  }
}

const hands = lines
  .map((hand) => {
    const handSplit = hand.split(" ");
    const cards = handSplit[0];
    const bid = parseInt(handSplit[1]);
    const type = determineType(handSplit[0]);
    return {
      cards,
      bid,
      type,
    };
  })
  .sort((a, z) => {
    let result = a.type - z.type;

    if (result !== 0) {
      return result;
    }

    let i = 0;
    while (i < 5 && result === 0) {
      result = values[a.cards[i]] - values[z.cards[i]];
      i++;
    }

    return result;
  });

let total = 0;

for (let i = 0; i < hands.length; i++) {
  let hand = hands[i];

  total += hand.bid * (i + 1);
}

console.log(total);
