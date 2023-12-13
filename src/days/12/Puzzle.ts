const first = (input: string) => {
  const rows = input.split('\n').map((str) => {
    return str.split(' ').map((str, i) => {
      switch (i) {
        case 0:
          return str.split('');
        default:
          return str.split(',').map((str) => Number(str));
      }
    });
  });
  const result = rows.map((row) => {});
  return 'solution 1';
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
