const s = require("fs").readFileSync(process.stdin.fd).toString();

const stones = s.split(" ").map((stone) => stone.trim());

function blink(stones) {
  return stones.flatMap((stone) =>
    stone === "0"
      ? "1"
      : stone.length % 2 === 0
      ? [
          String(Number(stone.substring(0, stone.length / 2))),
          String(Number(stone.substring(stone.length / 2))),
        ]
      : String(Number(stone) * 2024)
  );
}

function applyNTimes(func, arg, n) {
  let ret = func(arg);
  for (let i = 0; i < n - 1; i++) {
    ret = func(ret);
  }
  return ret;
}

console.log(applyNTimes(blink, stones, 25).length);
