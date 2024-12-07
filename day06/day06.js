const input = require("fs").readFileSync(process.stdin.fd).toString();
const w = input.indexOf("\n") + 1;

const OBSTACLE = "#";
const startIndex = input.indexOf("^");
const obstacleIndices = [...input].filter((_, i, a) => a[i] === OBSTACLE);

const prohibitedStartingIndices = new Set(obstacleIndices.concat(startIndex));

const left = (x) => x - 1;
const right = (x) => x + 1;
const up = (x) => x - w;
const down = (x) => x + w;

const orientationToMovement = {
  UP: up,
  RIGHT: right,
  DOWN: down,
  LEFT: left,
};

const nextOrientation = {
  UP: "RIGHT",
  RIGHT: "DOWN",
  DOWN: "LEFT",
  LEFT: "UP",
};

function take_step({ index, orientation }, specialObstacleIndex) {
  const nextIndex = orientationToMovement[orientation](index);
  if (input[nextIndex] === OBSTACLE || nextIndex === specialObstacleIndex) {
    return { index, orientation: nextOrientation[orientation] };
  }
  return { index: nextIndex, orientation };
}

const positionToString = (position) =>
  `${position.index}${position.orientation}`;

function walk(startingIndex, specialObstacleIndex) {
  let currentPosition = {
    index: startingIndex,
    orientation: "UP",
  };
  const previousPositions = new Set();
  while (true) {
    const nextPosition = take_step(currentPosition, specialObstacleIndex);
    if (
      input[nextPosition.index] === "\n" ||
      input[nextPosition.index] === undefined
    )
      return false;
    if (previousPositions.has(positionToString(currentPosition))) {
      return true;
    }
    previousPositions.add(positionToString(currentPosition));
    currentPosition = nextPosition;
  }
}

const obstructionCount = [...input].filter((_, i) => {
  if (prohibitedStartingIndices.has(i)) {
    return false;
  }
  return walk(startIndex, i);
}).length;

console.log(obstructionCount);
