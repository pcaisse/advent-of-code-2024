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
  let perimeter = 4;
  for (const func of [left, right, up, down]) {
    if (s[func(index)] === value) {
      perimeter--;
    }
  }
  group.push({ index, groupId, area, perimeter });

  // console.log(visited, group);

  const leftIndex = left(index);
  const rightIndex = right(index);
  const upIndex = up(index);
  const downIndex = down(index);

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
        acc.perimeter += curr.perimeter;
        return acc;
      },
      { area: 0, perimeter: 0 }
    )
  )
  .map(({ area, perimeter }) => area * perimeter)
  .reduce((a, b) => a + b, 0);

console.log(counts);
