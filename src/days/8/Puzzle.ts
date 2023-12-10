type Node = {
  id: string;
  L: string;
  R: string;
};

const first = (input: string) => {
  const [a, b] = input.split('\n\n');
  const instructions = a.split('');
  const network = parseNodes(b);
  const target = 'ZZZ';
  let curr = network.get('AAA');
  let index = 0;
  let steps = 0;
  while (curr.id !== target) {
    steps++;
    curr = network.get(next(instructions[index], curr));
    if (index === instructions.length - 1) {
      index = 0;
    } else {
      index++;
    }
  }
  return steps.toString();
};

const next = (direction: string, node: Node): string => {
  return direction === 'L' ? node.L : node.R;
};

const parseNodes = (str: string): Map<string, Node> => {
  let network: Map<string, Node> = new Map<string, Node>();
  str.split('\n').forEach((string) => {
    network.set(string.substring(0, 3), {
      id: string.substring(0, 3),
      L: string.substring(7, 10),
      R: string.substring(12, 15),
    });
  });
  return network;
};

const startingNodes = (network: Map<string, Node>): Node[] => {
  const nodes: Node[] = [];
  for (let [key, node] of network.entries()) {
    if (key.substring(2, 3) === 'A') {
      nodes.push(node);
    }
  }
  return nodes;
};

const expectedFirstSolution = '19241';

const second = (input: string) => {
  const [a, b] = input.split('\n\n');
  const instructions = a.split('');
  const network = parseNodes(b);
  let nodes = startingNodes(network);
  const target = 'Z';
  let index = 0;
  let steps = 0;
  while (true) {
    steps++;
    nodes = nodes.map((node) => {
      return network.get(next(instructions[index], node));
    });
    if (stop(nodes, target)) break;
    if (index === instructions.length - 1) {
      index = 0;
    } else {
      index++;
    }
  }
  return steps.toString();
};

const stop = (nodes: Node[], target: string): boolean => {
  for (let [key, node] of nodes.entries()) {
    if (node.id.substring(2, 3) !== target) return false;
  }
  return true;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
