const s = require("fs").readFileSync(process.stdin.fd).toString();

const stones = s.split(" ").map((stone) => stone.trim());

function changeVal(stone) {
  return stone === "0"
    ? ["1"]
    : stone.length % 2 === 0
    ? [
        String(Number(stone.substring(0, stone.length / 2))),
        String(Number(stone.substring(stone.length / 2))),
      ]
    : [String(Number(stone) * 2024)];
}

const howMany = {};

function blink(stone, n, i) {
  if (i === n) return 1;

  const [val1, val2] = changeVal(stone);

  let totalCount = 0;
  if (val1) {
    howMany[val1] = howMany[val1] || {};
    const leftCount = howMany[val1][i] ?? blink(val1, n, i + 1);
    howMany[val1][i] = leftCount;
    totalCount += leftCount;
  }
  if (val2) {
    howMany[val2] = howMany[val2] || {};
    const rightCount = howMany[val2][i] ?? blink(val2, n, i + 1);
    howMany[val2][i] = rightCount;
    totalCount += rightCount;
  }
  return totalCount;
}

const ret = stones.map((stone) => blink(stone, 75, 0)).reduce((a, b) => a + b);
console.log(ret);
