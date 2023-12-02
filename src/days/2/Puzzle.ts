type Key = {
  [key: string]: number;
};

type Cube = {
  color: string;
  number: number;
};

type Game = {
  id: number;
  sets: Cube[][];
};

const play = (games: Game[], bag: Key): number => {
  return games
    .map((game) => {
      for (let set of game.sets) {
        for (let cube of set) {
          if (cube.number > bag[cube.color]) return 0;
        }
      }
      return game.id;
    })
    .reduce((acc, curr) => acc + curr);
};

const calc = (games: Game[]): number => {
  return games
    .map((game) => {
      const power: Key = {
        red: 0,
        green: 0,
        blue: 0,
      };
      for (let set of game.sets) {
        for (let cube of set) {
          if (cube.number > power[cube.color]) {
            power[cube.color] = cube.number;
          }
        }
      }
      return power.red * power.green * power.blue;
    })
    .reduce((acc, curr) => acc + curr);
};

const load = (input: string): Game[] => {
  return input.split('\n').map((line) => {
    const part = line.split(':');
    const gameId = part[0].split(' ')[1];
    const gameSets = part[1].split(';').map((value) => {
      let set: Cube[] = [];
      let cubes = value.split(',');
      for (let cube of cubes) {
        let val = cube.split(' ');
        set.push({ number: Number(val[1]), color: val[2] });
      }
      return set;
    });

    return { id: Number(gameId), sets: gameSets };
  });
};

const first = (input: string) => {
  const bag: Key = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const games: Game[] = load(input);
  const result = play(games, bag);
  return result.toString();
};

const expectedFirstSolution = '3035';

const second = (input: string) => {
  const games: Game[] = load(input);
  const power = calc(games);
  return power.toString();
};

const expectedSecondSolution = '66027';

export { first, expectedFirstSolution, second, expectedSecondSolution };
