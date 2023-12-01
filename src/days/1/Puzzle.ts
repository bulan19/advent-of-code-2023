// had to google on this one with overlapping letters..
const LETTERS: { [key: string]: string } = {
  one: 'o1e', // ..instead of '1'
  two: 't2o',
  three: 't3e',
  four: 'f4r',
  five: 'f5e',
  six: 's6x',
  seven: 's7n',
  eight: 'e8t',
  nine: 'n9e',
};

const calibrations = (input: string): number[] => {
  return input.split('\n').map((line) => {
    return Number(firstDigit(line) + firstDigit(reverse(line)));
  });
};

const firstDigit = (str: string) => {
  for (let c of str) {
    if (Number(c)) return c;
  }
};

const reverse = (str: string) => {
  return str.split('').reverse().join('');
};

const sum = (numbers: number[]) => {
  const total: number = numbers.reduce((acc, curr) => acc + curr);
  return total.toString();
};

const first = (input: string) => {
  return sum(calibrations(input));
};

const expectedFirstSolution = '54081';

const second = (input: string) => {
  for (const key in LETTERS) {
    input = input.replaceAll(key, LETTERS[key]);
  }
  return sum(calibrations(input));
};

const expectedSecondSolution = '54649';

export { first, expectedFirstSolution, second, expectedSecondSolution };
