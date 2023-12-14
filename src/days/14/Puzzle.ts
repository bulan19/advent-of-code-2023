const first = (input: string) => {
  const levels = input.split('\n').length;
  const platform = tilt(parse(input));
  const load = calc(platform, levels);
  return load.toString();
};

const calc = (platform: Map<string, string>, levels: number): number => {
  let sum = 0;
  for (const [pos, char] of platform.entries()) {
    if (char === 'O') {
      sum += levels - Number(pos.split(',')[1]);
    }
  }
  return sum;
};

const tilt = (platform: Map<string, string>): Map<string, string> => {
  for (const [pos, char] of platform.entries()) {
    let [x, y] = pos.split(',');
    // moveable?
    if (char !== 'O') continue;
    // move up?
    let next = Number(y);
    while (true) {
      next--;
      let up = platform.get(`${x},${next}`);
      if (!up || up === 'O' || up === '#') {
        // stop / move
        if (Number(y) - next > 1) {
          platform.set(`${x},${next + 1}`, char);
          platform.set(`${x},${y}`, '.');
        }
        break;
      }
    }
  }
  return platform;
};

const parse = (input: string): Map<string, string> => {
  const platform = new Map<string, string>();
  input.split('\n').forEach((line, y) =>
    line.split('').forEach((char, x) => {
      platform.set(`${x},${y}`, char);
    })
  );
  return platform;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
