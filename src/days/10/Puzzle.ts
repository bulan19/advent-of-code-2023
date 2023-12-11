type Pos = {
  c: string;
  y: number;
  x: number;
};

const first = (input: string) => {
  const pipes = map(input);
  const startPos = start(pipes);
  let dir = 'south';
  let steps = 1;
  let pipe = pipes.get(`y${startPos.y + 1}x${startPos.x}`);
  while (pipe.c != 'S') {
    steps++;
    switch (dir) {
      case 'south':
        if (pipe.c === 'L') {
          dir = 'east';
          pipe = pipes.get(east(pipe));
        } else if (pipe.c === 'J') {
          dir = 'west';
          pipe = pipes.get(west(pipe));
        } else {
          dir = 'south';
          pipe = pipes.get(south(pipe));
        }
        break;
      case 'west':
        if (pipe.c === 'F') {
          dir = 'south';
          pipe = pipes.get(south(pipe));
        } else if (pipe.c === 'L') {
          dir = 'north';
          pipe = pipes.get(north(pipe));
        } else {
          dir = 'west';
          pipe = pipes.get(west(pipe));
        }
        break;
      case 'north':
        if (pipe.c === '7') {
          dir = 'west';
          pipe = pipes.get(west(pipe));
        } else if (pipe.c === 'F') {
          dir = 'east';
          pipe = pipes.get(east(pipe));
        } else {
          dir = 'north';
          pipe = pipes.get(north(pipe));
        }
        break;
      case 'east':
        if (pipe.c === 'J') {
          dir = 'north';
          pipe = pipes.get(north(pipe));
        } else if (pipe.c === '7') {
          dir = 'south';
          pipe = pipes.get(south(pipe));
        } else {
          dir = 'east';
          pipe = pipes.get(east(pipe));
        }
        break;
    }
  }
  return (steps / 2).toString();
};

const west = (pos: Pos): string => {
  return `y${pos.y}x${pos.x - 1}`;
};

const south = (pos: Pos): string => {
  return `y${pos.y + 1}x${pos.x}`;
};

const east = (pos: Pos): string => {
  return `y${pos.y}x${pos.x + 1}`;
};

const north = (pos: Pos): string => {
  return `y${pos.y - 1}x${pos.x}`;
};

const start = (pos: Map<string, Pos>): Pos => {
  for (const [key, value] of pos.entries()) {
    if (value.c === 'S') return value;
  }
  return null;
};

const map = (input: string): Map<string, Pos> => {
  const map: Map<string, Pos> = new Map<string, Pos>();
  input.split('\n').forEach((line, y) => {
    line.split('').forEach((c, x) => {
      if (c !== '.') {
        map.set(`y${y}x${x}`, { c: c, y: y, x: x });
      }
    });
  });
  return map;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
