const s = require("fs").readFileSync(process.stdin.fd).toString();
const w = s.indexOf("\n") + 1;

const left = (x) => x - 1;
const right = (x) => x + 1;
const up = (x) => x - w;
const down = (x) => x + w;

console.log(s);

const visited = new Set();

function walk(index, groupId, group) {
  visited.add(index);
  const value = s[index];

  const area = 1;

  const leftIndex = left(index);
  const rightIndex = right(index);
  const upIndex = up(index);
  const downIndex = down(index);

  let leftSide = 1;
  let rightSide = 1;
  let topSide = 1;
  let bottomSide = 1;
  if (s[leftIndex] === value) {
    leftSide = 0;
  }
  if (
    s[upIndex] === value &&
    s[leftIndex] !== value &&
    s[left(upIndex)] !== value
  ) {
    leftSide = 0; // left side continuation
  }
  if (s[rightIndex] === value) {
    rightSide = 0;
  }
  if (
    s[upIndex] === value &&
    s[rightIndex] !== value &&
    s[right(upIndex)] !== value
  ) {
    rightSide = 0; // right side continuation
  }
  if (s[upIndex] === value) {
    topSide = 0;
  }
  if (
    s[leftIndex] === value &&
    s[upIndex] !== value &&
    s[up(leftIndex)] !== value
  ) {
    topSide = 0; // top side continuation
  }
  if (s[downIndex] === value) {
    bottomSide = 0;
  }
  if (
    s[leftIndex] === value &&
    s[downIndex] !== value &&
    s[down(leftIndex)] !== value
  ) {
    bottomSide = 0; // bottom side continuation
  }
  group.push({
    index,
    groupId,
    area,
    leftSide,
    rightSide,
    topSide,
    bottomSide,
  });

  if (s[leftIndex] === value && !visited.has(leftIndex))
    walk(leftIndex, groupId, group);
  if (s[rightIndex] === value && !visited.has(rightIndex))
    walk(rightIndex, groupId, group);
  if (s[upIndex] === value && !visited.has(upIndex))
    walk(upIndex, groupId, group);
  if (s[downIndex] === value && !visited.has(downIndex))
    walk(downIndex, groupId, group);

  return group;
}

const totals = [...s]
  .reduce((acc, c, i) => {
    if (c === "\n") return acc;
    if (!visited.has(i)) {
      // console.log("walk!", c, i);
      acc.push(walk(i, c + i, []));
    }
    return acc;
  }, [])
  .flat();

const groupedTotals = Object.groupBy(totals, ({ groupId }) => groupId);
// console.log(groupedTotals);

const counts = Object.keys(groupedTotals)
  .map((key) =>
    groupedTotals[key].reduce(
      (acc, curr) => {
        acc.area += curr.area;
        acc.sides +=
          curr.leftSide + curr.rightSide + curr.topSide + curr.bottomSide;
        return acc;
      },
      { area: 0, sides: 0 }
    )
  )
  .map(({ area, sides }) => area * sides)
  .reduce((a, b) => a + b, 0);

console.log(counts);
