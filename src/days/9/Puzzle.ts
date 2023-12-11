const first = (input: string) => {
  const histories: number[][] = parseHistory(input);
  const result = histories.map((history) => {
    const histories: number[][] = [];
    let arr = history;
    while (true) {
      arr = diff(arr);
      histories.push(arr);
      if (stop(arr)) break;
    }
    let predict = 0;
    for (let i = histories.length; i > 0; i--) {
      predict += histories[i - 1].pop();
    }
    return history.pop() + predict;
  });
  return result.reduce((acc, curr) => acc + curr).toString();
};

const stop = (numbers: number[]): boolean => {
  for (let number of numbers) {
    if (number !== 0) return false;
  }
  return true;
};

const diff = (numbers: number[]): number[] => {
  const diff: number[] = [];
  for (let i in numbers) {
    let next = Number(i) + 1;
    if (numbers[next] === undefined) continue;
    diff.push(numbers[next] - numbers[i]);
  }
  return diff;
};

const parseHistory = (input: string): number[][] => {
  return input.split('\n').map((str) => {
    return str.split(' ').map((str) => {
      return Number(str);
    });
  });
};

const expectedFirstSolution = '1953784198';

const second = (input: string) => {
  return 'DNF';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
