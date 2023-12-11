type Galaxy = {
  id: number;
  row: number;
  column: number;
  lenghts?: Map<number, number>;
};
const first = (input: string) => {
  // parse
  const image = input.split('\n').map((line) => line.split(''));
  const emptyCols = [];
  for (let col in image[0]) {
    let empty = true;
    for (let row = 0; row < image.length; row++) {
      if (image[row][col] !== '.') empty = false;
    }
    emptyCols.push(empty);
  }
  // expand image
  const expanded = expand(
    image,
    image.map((row) => (row.every((value) => value === '.') ? true : false)),
    emptyCols
  );
  // set each galaxy
  const galaxies = findGalaxies(expanded);
  // calc length between each galaxy
  for (const [id, galaxy] of galaxies.entries()) {
    if (!galaxy.lenghts) galaxy.lenghts = new Map<number, number>();
    for (const compare of galaxies.keys()) {
      if (compare === id) continue;
      if (!galaxy.lenghts.has(compare)) {
        let another = galaxies.get(compare);
        if (another.lenghts && !another.lenghts.has(id)) {
          let length =
            Math.abs(another.column - galaxy.column) +
            Math.abs(another.row - galaxy.row);
          galaxy.lenghts.set(compare, length);
        }
      }
    }
  }
  return sum(galaxies).toString();
};

const findGalaxies = (universe: string[][]): Map<number, Galaxy> => {
  let id = 0;
  const galaxies: Map<number, Galaxy> = new Map<number, Galaxy>();
  universe.forEach((row, r) =>
    row.forEach((space, c) => {
      if (space === '#') {
        id++;
        galaxies.set(id, { id: id, row: r, column: c });
      }
    })
  );
  return galaxies;
};

const expand = (
  str: string[][],
  emptyRows: any,
  emptyCols: any
): string[][] => {
  const expanded = [];
  for (let r in str) {
    let row = [];
    for (let c in str[r]) {
      row.push(str[r][c]);
      if (emptyCols[c]) row.push(str[r][c]);
    }
    expanded.push(row);
    if (emptyRows[r]) expanded.push(row);
  }
  return expanded;
};

const sum = (galaxies: Map<number, Galaxy>): number => {
  let sum = 0;
  for (const galaxy of galaxies.values()) {
    if (!galaxy.lenghts) continue;
    for (const length of galaxy.lenghts.values()) {
      sum += length;
    }
  }
  return sum;
};

const expectedFirstSolution = '9795148';

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
