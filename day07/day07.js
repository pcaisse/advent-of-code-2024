const input = require("fs").readFileSync(process.stdin.fd).toString();

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;
const concat = (x, y) => Number(String(x) + String(y));

const possibleResults = (terms) =>
  terms.reduce((allPossibilities, x) => {
    if (allPossibilities.length === 0) {
      return [x];
    } else {
      return allPossibilities.flatMap((value) => [
        add(value, x),
        multiply(value, x),
        concat(value, x),
      ]);
    }
  }, []);

const equations = input
  .split("\n")
  .filter((l) => l)
  .map((s) => {
    const [left, right] = s.split(":");
    const result = Number(left);
    const terms = right.trim().split(" ").map(Number);
    return { result, terms };
  })
  .filter(({ result, terms }) => {
    const allPossibleResults = new Set(possibleResults(terms));
    return allPossibleResults.has(result);
  })
  .map(({ result }) => result)
  .reduce(add, 0);

console.log(equations);
