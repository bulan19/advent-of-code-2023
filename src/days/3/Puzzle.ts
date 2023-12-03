type Pos = {
  x: number;
  y: number;
  char?: string;
};

type Part = {
  number: number;
  pos: Pos[];
};

const findSymbols = (input: string): Pos[] => {
  const symbols: Pos[] = [];
  const rows: string[] = input.split('\n');
  for (const y in rows) {
    const line = rows[y];
    for (let x = 0; x < line.length; x++) {
      let c = line[x];
      if (isNaN(Number(c)) && c !== '.') {
        symbols.push({ x: x, y: Number(y), char: c });
      }
    }
  }
  return symbols;
};

const findNumbers = (input: string): Part[] => {
  const parts: Part[] = [];
  const rows: string[] = input.split('\n');
  for (const y in rows) {
    const line = rows[y];
    let number: string = '';
    let pos: Pos[] = [];
    for (let x = 0; x < line.length; x++) {
      const c = line[x];
      if (!isNaN(Number(c))) {
        number += c;
        pos.push({ x: x, y: Number(y) });
      } else if (number.length) {
        parts.push({
          number: Number(number),
          pos: pos,
        });
        number = '';
        pos = [];
      }
    }
    // end of line
    if (number.length) {
      parts.push({
        number: Number(number),
        pos: pos,
      });
    }
  }
  return parts;
};

const checkParts = (symbols: Pos[], numbers: Part[]): Part[] => {
  return numbers.filter((part) => {
    for (let pos of part.pos) {
      for (let symbol of symbols) {
        if (
          Math.abs(symbol.x - pos.x) <= 1 &&
          Math.abs(symbol.y - pos.y) <= 1
        ) {
          return true;
        }
      }
    }
  });
};

const gears = (symbols: Pos[], numbers: Part[]): number => {
  let ratio = 0;
  for (const symbol of symbols) {
    const parts: Part[] = [];
    for (const number of numbers) {
      for (const pos of number.pos) {
        if (
          Math.abs(symbol.x - pos.x) <= 1 &&
          Math.abs(symbol.y - pos.y) <= 1
        ) {
          parts.push(number);
          break;
        }
      }
    }
    if (parts.length === 2) {
      ratio += parts[0].number * parts[1].number;
    }
  }
  return ratio;
};

const sum = (parts: Part[]): number => {
  let total: number = 0;
  for (let part of parts) {
    total += part.number;
  }
  return total;
};

const first = (input: string) => {
  const parts: Part[] = checkParts(findSymbols(input), findNumbers(input));
  return sum(parts).toString();
};

const expectedFirstSolution = '539637';

const second = (input: string) => {
  const symbols: Pos[] = findSymbols(input).filter((pos) => pos.char === '*');
  const numbers: Part[] = findNumbers(input);
  return gears(symbols, numbers).toString();
};

const expectedSecondSolution = '82818007';

export { first, expectedFirstSolution, second, expectedSecondSolution };
