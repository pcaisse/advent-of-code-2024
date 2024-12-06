const input = require("fs").readFileSync(process.stdin.fd).toString();

const [p1, p2] = input.split("\n\n");

const g = p1
  .split("\n")
  .map((line) => line.split("|"))
  .reduce((acc, [x, y]) => {
    acc[x] = acc[x] || new Set();
    acc[x].add(y);
    return acc;
  }, {});

const k = p2
  .split("\n")
  .filter((x) => x)
  .map((line) => line.split(","))
  .filter((values) => {
    const missingValues = new Set();
    return values.every((x, i, arr) => {
      console.log(x, i, arr);
      if (!g[x]) {
        console.log(x, "not found");
        missingValues.add(x);
        return true;
      }
      const otherValues = arr.slice(i + 1);
      console.log("other values", otherValues);
      console.log("missing values", missingValues);
      console.log("g[x]", g[x]);
      return (
        otherValues.every((v) => g[x].has(v)) &&
        [...missingValues.values()].every((v) => !g[x].has(v))
      );
    });
  });

console.log(
  k
    .map((arr) => Number(arr[Math.floor(arr.length / 2)]))
    .reduce((a, b) => a + b, 0)
);
