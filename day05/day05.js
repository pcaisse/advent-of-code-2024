const input = require("fs").readFileSync(process.stdin.fd).toString();

const [p1, p2] = input.split("\n\n");

const orderGraph = p1
  .split("\n")
  .map((line) => line.split("|"))
  .reduce((acc, [x, y]) => {
    acc[x] = acc[x] || new Set();
    acc[x].add(y);
    return acc;
  }, {});

const valuesCorrectlyOrdered = (values) => {
  const missingValues = new Set();
  return values.every((x, i, arr) => {
    if (!orderGraph[x]) {
      console.log(x, "not found");
      missingValues.add(x);
      return true;
    }
    const otherValues = arr.slice(i + 1);
    console.log("other values", otherValues);
    console.log("missing values", missingValues);
    console.log("g[x]", orderGraph[x]);
    return (
      otherValues.every((v) => orderGraph[x].has(v)) &&
      [...missingValues.values()].every((v) => !orderGraph[x].has(v))
    );
  });
};

const correctOrder = (values) => {
  return values.sort((x, y) =>
    orderGraph[x] && orderGraph[x].has(y)
      ? -1
      : orderGraph[y] && orderGraph[y].has(x)
      ? 1
      : 0
  );
};

const k = p2
  .split("\n")
  .filter((x) => x)
  .map((line) => line.split(","))
  .filter((values) => !valuesCorrectlyOrdered(values))
  .map((values) => correctOrder(values));

console.log(k);

console.log(
  k
    .map((arr) => Number(arr[Math.floor(arr.length / 2)]))
    .reduce((a, b) => a + b, 0)
);
