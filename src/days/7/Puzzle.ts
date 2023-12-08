enum TYPE {
  HIGH = 0,
  ONEPAIR,
  TWOPAIR,
  THREE,
  HOUSE,
  FOUR,
  FIVE,
}

type Hand = {
  cards: string;
  bet: number;
  type?: number;
  sort?: number[];
};

const SORT = {
  A: '14',
  K: '13',
  Q: '12',
  J: '11',
  T: '10',
};

const JOKER = {
  A: '14',
  K: '13',
  Q: '12',
  J: '1',
  T: '10',
};

const first = (input: string) => {
  const hands: Hand[] = parseHands(input.split('\n'), SORT);
  hands.forEach((hand) => play(hand));
  hands.sort((a, b) => {
    if (a.type === b.type) {
      for (let i in a.sort) {
        if (a.sort[i] < b.sort[i]) {
          return -1;
        }
        if (a.sort[i] > b.sort[i]) {
          return 1;
        }
      }
      return 0;
    }
    return a.type - b.type;
  });
  const result = hands
    .map((hand, index) => {
      return hand.bet * (index + 1);
    })
    .reduce((a, b) => a + b);
  return result.toString();
};

const second = (input: string) => {
  const hands: Hand[] = parseHands(input.split('\n'), JOKER);
  hands.forEach((hand) => playWithJoker(hand));
  hands.sort((a, b) => {
    if (a.type === b.type) {
      for (let i in a.sort) {
        if (a.sort[i] < b.sort[i]) {
          return -1;
        }
        if (a.sort[i] > b.sort[i]) {
          return 1;
        }
      }
      return 0;
    }
    return a.type - b.type;
  });
  const result = hands
    .map((hand, index) => {
      return hand.bet * (index + 1);
    })
    .reduce((a, b) => a + b);
  return result.toString();
};

const playWithJoker = (hand: Hand): Hand => {
  let cards = hand.cards
    .split('')
    .filter((c) => c !== 'J')
    .sort()
    .join('');
  const jokers = 5 - cards.length;
  // X + JJJJ
  if (jokers > 3) {
    hand.type = TYPE.FIVE;
    return hand;
  }
  // XX + JJJ
  if (jokers === 3) {
    if (same(cards)) {
      hand.type = TYPE.FIVE;
      return hand;
    }
    hand.type = TYPE.FOUR;
    return hand;
  }
  // XXX + JJ
  if (jokers === 2) {
    if (same(cards)) {
      hand.type = TYPE.FIVE;
      return hand;
    }
    if (same(cards.substring(0, 2))) {
      hand.type = TYPE.FOUR;
      return hand;
    }
    if (same(cards.substring(1, 3))) {
      hand.type = TYPE.FOUR;
      return hand;
    }
    for (let i = 0; i < 3; i++) {
      let next = i + 2;
      if (same(cards.substring(i, next))) {
        hand.type = TYPE.FOUR;
        return hand;
      }
    }
    hand.type = TYPE.THREE;
    return hand;
  }
  // XXXX + J
  if (jokers === 1) {
    if (same(cards)) {
      hand.type = TYPE.FIVE;
      return hand;
    }
    if (same(cards.substring(0, 3))) {
      hand.type = TYPE.FOUR;
      return hand;
    }
    if (same(cards.substring(1, 4))) {
      hand.type = TYPE.FOUR;
      return hand;
    }
    for (let i = 0; i < 4; i++) {
      let next = i + 2;
      if (same(cards.substring(i, next))) {
        for (let x = next; x < 4; x++) {
          if (same(cards.substring(x, x + 2))) {
            hand.type = TYPE.HOUSE;
            return hand;
          }
        }
        hand.type = TYPE.THREE;
        return hand;
      }
    }
    hand.type = TYPE.ONEPAIR;
    return hand;
  }

  return play(hand);
};

const play = (hand: Hand): Hand => {
  let cards = hand.cards.split('').sort().join('');
  // FIVE
  if (same(cards)) {
    hand.type = TYPE.FIVE;
    return hand;
  }
  // FOUR
  if (same(cards.substring(0, 4))) {
    hand.type = TYPE.FOUR;
    return hand;
  }
  if (same(cards.substring(1, 5))) {
    hand.type = TYPE.FOUR;
    return hand;
  }
  // HOUSE / THREE
  for (let i = 0; i < 3; i++) {
    if (same(cards.substring(i, i + 3))) {
      if (i !== 1) {
        let next = i === 0 ? 3 : 0;
        if (same(cards.substring(next, next + 2))) {
          hand.type = TYPE.HOUSE;
          return;
        }
      }
      hand.type = TYPE.THREE;
      return hand;
    }
  }
  // PAIR(S)
  for (let i = 0; i < 5; i++) {
    let next = i + 2;
    if (same(cards.substring(i, next))) {
      for (let x = next; x < 5; x++) {
        if (same(cards.substring(x, x + 2))) {
          hand.type = TYPE.TWOPAIR;
          return hand;
        }
      }
      hand.type = TYPE.ONEPAIR;
      return hand;
    }
  }
  hand.type = TYPE.HIGH;
  return hand;
};

const same = (str: string): boolean => {
  if (str.length < 2) return false;
  const start = str[0];
  for (let c of str) {
    if (c !== start) return false;
  }
  return true;
};

const parseHands = (lines: string[], sorter: any): Hand[] => {
  return lines.map((line) => {
    const arr = line.split(' ');
    let cards = arr.shift();
    let sort = cards.split('');
    for (const [c, n] of Object.entries(sorter)) {
      for (let i in sort) {
        if (sort[i] === c) {
          sort[i] = n.toString();
        }
      }
    }
    return {
      cards: cards,
      bet: Number(arr.shift()),
      sort: sort.map((value) => Number(value)),
    };
  });
};

const expectedFirstSolution = '252656917';

const expectedSecondSolution = '253499763';

export { first, expectedFirstSolution, second, expectedSecondSolution };
