type Card = {
  number: number;
  winnings: number;
  copies: number;
};

const first = (input: string) => {
  return winnings(input)
    .reduce((acc, curr) => acc + curr)
    .toString();
};

const expectedFirstSolution = '15205';

const second = (input: string) => {
  return solveCards(wins(input)).toString();
};

const expectedSecondSolution = '6189740';

const solveCards = (facit: number[]): number => {
  const cards: Card[] = facit.map((value, index) => {
    return { number: index + 1, winnings: value, copies: 0 };
  });
  for (let card of cards) {
    for (
      let win = 0, index = card.number;
      win < card.winnings;
      win++, index++
    ) {
      if (cards[index]) cards[index].copies += 1 + card.copies;
    }
  }
  return cards.map((card) => 1 + card.copies).reduce((acc, curr) => acc + curr);
};

const wins = (input: string): number[] => {
  return input.split('\n').map((line) => {
    const card = line.split(':')[1].split('|');
    const winnings = card[0].split(' ').filter((value) => value.length);
    const numbers = card[1].split(' ').filter((value) => value.length);
    let win = 0;
    for (let winning of winnings) {
      for (let number of numbers) {
        if (winning === number) win += 1;
      }
    }
    return win;
  });
};

const winnings = (input: string): number[] => {
  return input.split('\n').map((line) => {
    const card = line.split(':')[1].split('|');
    const winnings = card[0].split(' ').filter((value) => value.length);
    const numbers = card[1].split(' ').filter((value) => value.length);
    let win = 0;
    for (let winning of winnings) {
      for (let number of numbers) {
        if (winning === number) {
          if (win === 0) {
            win += 1;
          } else {
            win = win * 2;
          }
        }
      }
    }
    return win;
  });
};

export { first, expectedFirstSolution, second, expectedSecondSolution };
