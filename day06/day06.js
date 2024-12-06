const input = require("fs").readFileSync(process.stdin.fd).toString();
const w = input.indexOf("\n") + 1;

const start = {
  index: input.indexOf("^"),
  orientation: "UP",
};

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

function take_step({ index, orientation }) {
  const nextIndex = orientationToMovement[orientation](index);
  if (input[nextIndex] === "#") {
    console.log("hit an obstacle");
    return { index, orientation: nextOrientation[orientation] };
  }
  return { index: nextIndex, orientation };
}

const positionsVisited = new Set([start.index]);

let currentPosition = start;

while (true) {
  console.log("currentPosition", currentPosition);
  console.log("positionsVisited.size", positionsVisited.size);
  const nextPosition = take_step(currentPosition);
  if (
    input[nextPosition.index] === "\n" ||
    input[nextPosition.index] === undefined
  )
    break;
  if (nextPosition.index !== currentPosition.index) {
    console.log("increment positionsVisited");
    positionsVisited.add(nextPosition.index);
  }
  currentPosition = nextPosition;
}

console.log(positionsVisited.size);
