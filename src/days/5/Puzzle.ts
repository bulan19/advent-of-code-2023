type Mapping = {
  source: number;
  dest: number;
  range: number;
};

const first = (input: string) => {
  const chunks: string[] = input.split('\n\n');
  const seeds = parseSeeds(chunks.shift());
  const maps = parseMaps(chunks);
  const locations = solve(seeds, maps).sort((a, b) => a - b);
  return locations.shift().toString();
};

const second = (input: string) => {
  const chunks: string[] = input.split('\n\n');
  const seeds = parseRangeSeeds(chunks.shift());
  const maps = parseMaps(chunks);
  let lowest: number = 999999999999999;
  // TODO how to do this more efficient? Takes forever to get thru
  seeds.forEach((range, start) => {
    for (let source = start, count = 0; count < range; source++, count++) {
      let location = solve([source], maps)[0];
      if (location < lowest) lowest = location;
    }
  });
  return lowest.toString();
};

const solve = (seeds: number[], maps: Mapping[][]): number[] => {
  return seeds.map((seed) => {
    for (const map of maps) {
      for (const line of map) {
        if (line.source <= seed && seed <= line.source + line.range) {
          seed = line.dest + seed - line.source;
          break;
        }
      }
    }
    return seed;
  });
};

const parseMaps = (chunks: string[]): Mapping[][] => {
  return chunks.map((chunk) => {
    const map: Mapping[] = [];
    const mapping = chunk
      .split(':')[1]
      .split('\n')
      .filter((value) => value.length);
    for (let line of mapping) {
      let [dest, source, range] = line.split(' ').map((value) => Number(value));
      map.push({ source: source, dest: dest, range: range });
    }
    return map.sort((a, b) => b.source - a.source);
  });
};

const parseSeeds = (chunk: string): number[] => {
  return chunk
    .split(':')[1]
    .split(' ')
    .filter((value) => value.length)
    .map((value) => Number(value));
};

const parseRangeSeeds = (chunk: string): Map<number, number> => {
  const numbers = chunk
    .split(':')[1]
    .split(' ')
    .filter((value) => value.length)
    .map((value) => Number(value));
  const map = new Map<number, number>();
  for (let i in numbers) {
    let odd = Number(i) % 2 === 1 ? true : false;
    if (odd) {
      map.set(numbers[Number(i) - 1], numbers[i]);
    }
  }
  return map;
};

const expectedFirstSolution = '318728750';

const expectedSecondSolution = '37384986';

export { first, expectedFirstSolution, second, expectedSecondSolution };
