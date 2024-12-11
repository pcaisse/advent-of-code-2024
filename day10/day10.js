const s = require("fs").readFileSync(process.stdin.fd).toString();
const w = s.indexOf("\n") + 1;

const left = (x) => x - 1;
const right = (x) => x + 1;
const up = (x) => x - w;
const down = (x) => x + w;

console.log(s);

const trailheadIndices = [...s]
  .map((c, i) => [c, i])
  .filter(([c, i]) => c === "0")
  .map(([c, i]) => i);

function walk(trailheadIndex, currIndex, dest) {
  const currValue = s[currIndex];
  if (currValue === "9") {
    dest.add({ trailheadIndex, currIndex });
  }
  const nextValue = String(Number(s[currIndex]) + 1);
  const leftIndex = left(currIndex);
  const rightIndex = right(currIndex);
  const upIndex = up(currIndex);
  const downIndex = down(currIndex);
  if (s[leftIndex] === nextValue) walk(trailheadIndex, leftIndex, dest);
  if (s[rightIndex] === nextValue) walk(trailheadIndex, rightIndex, dest);
  if (s[upIndex] === nextValue) walk(trailheadIndex, upIndex, dest);
  if (s[downIndex] === nextValue) walk(trailheadIndex, downIndex, dest);
}

const score = trailheadIndices
  .map((trailheadIndex) => {
    const dest = new Set();
    walk(trailheadIndex, trailheadIndex, dest);
    return dest.size;
  })
  .reduce((a, b) => a + b, 0);

console.log(score);
