type Race = {
  time: number;
  dist: number;
};

const first = (input: string) => {
  const races: Race[] = parseRaces(input);
  const result = races.map((race) => {
    let wins = 0;
    for (let hold = 0; hold < race.time; hold++) {
      if (run(hold, race.time, race.dist)) wins++;
    }
    return wins;
  });
  return result.reduce((acc, curr) => acc * curr).toString();
};

const second = (input: string) => {
  const race = parseRace(input);
  let min = 0;
  let max = 0;
  // minimum
  for (let hold = 0; hold < race.time; hold++) {
    if (run(hold, race.time, race.dist)) {
      min = hold;
      break;
    }
  }
  // maximum
  for (let hold = min; hold < race.time; hold++) {
    if (!run(hold, race.time, race.dist)) {
      max = hold;
      break;
    }
  }
  return (max - min).toString();
};

const run = (hold: number, time: number, record: number): boolean => {
  const distance = hold * (time - hold);
  return distance > record;
};

const parseRace = (input: string): Race => {
  const sheet: string[] = input.split('\n');
  const time = sheet[0]
    .split(':')[1]
    .split(' ')
    .filter((value) => value.length)
    .reduce((acc, curr) => acc + curr);
  const distance = sheet[1]
    .split(':')[1]
    .split(' ')
    .filter((value) => value.length)
    .reduce((acc, curr) => acc + curr);
  return { time: Number(time), dist: Number(distance) };
};

const parseRaces = (input: string): Race[] => {
  const sheet: string[] = input.split('\n');
  const times: number[] = sheet[0]
    .split(':')[1]
    .split(' ')
    .filter((value) => value.length)
    .map((value) => Number(value));
  const distances: number[] = sheet[1]
    .split(':')[1]
    .split(' ')
    .filter((value) => value.length)
    .map((value) => Number(value));
  const races: Race[] = [];
  for (let i in times) {
    races.push({ time: times[i], dist: distances[i] });
  }
  return races;
};

const expectedFirstSolution = '449550';

const expectedSecondSolution = '28360140';

export { first, expectedFirstSolution, second, expectedSecondSolution };
