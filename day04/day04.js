const s = require("fs").readFileSync(process.stdin.fd).toString();

const w = s.indexOf("\n") + 1;

const xmas = (i, f) => {
  const xi = i;
  const mi = f(i);
  const ai = f(f(i));
  const si = f(f(f(i)));
  return {
    match: s[xi] === "X" && s[mi] === "M" && s[ai] === "A" && s[si] === "S",
    indices: [xi, mi, ai, si],
  };
};

const left = (i) => xmas(i, (x) => x - 1);
const right = (i) => xmas(i, (x) => x + 1);
const up = (i) => xmas(i, (x) => x - w);
const upLeft = (i) => xmas(i, (x) => x - w - 1);
const upRight = (i) => xmas(i, (x) => x - w + 1);
const down = (i) => xmas(i, (x) => x + w);
const downLeft = (i) => xmas(i, (x) => x + w - 1);
const downRight = (i) => xmas(i, (x) => x + w + 1);

const matchingIndices = new Set();
let total = 0;

[...s].forEach((c, index) =>
  [left, right, up, upLeft, upRight, down, downLeft, downRight].forEach((f) => {
    const { match, indices } = f(index);
    if (match) {
      for (const i of indices) {
        matchingIndices.add(i);
      }
      total++;
    }
  })
);

let output = "";
for (let i = 0; i < s.length; i++) {
  if (matchingIndices.has(i)) {
    output += s[i];
  } else {
    output += ".";
  }
  if ((i + 1) % w === 0) output += "\n";
}

console.log(output);

console.log(total);
