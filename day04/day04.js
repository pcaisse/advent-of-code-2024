const input = require("fs").readFileSync(process.stdin.fd).toString();

const w = input.indexOf("\n");
const s = input.replaceAll("\n", "");

const xmas = (s, xi, mi, ai, si) => ({
  match: s[xi] === "X" && s[mi] === "M" && s[ai] === "A" && s[si] === "S",
  indices: [xi, mi, ai, si],
});

const left = (s, i) => xmas(s, i, i - 1, i - 2, i - 3);
const right = (s, i) => xmas(s, i, i + 1, i + 2, i + 3);
const up = (s, i) => xmas(s, i, i - w, i - 2 * w, i - 3 * w);
const upLeft = (s, i) => xmas(s, i, i - w - 1, i - 2 * w - 2, i - 3 * w - 3);
const upRight = (s, i) => xmas(s, i, i - w + 1, i - 2 * w + 2, i - 3 * w + 3);
const down = (s, i) => xmas(s, i, i + w, i + 2 * w, i + 3 * w);
const downLeft = (s, i) => xmas(s, i, i + w - 1, i + 2 * w - 2, i + 3 * w - 3);
const downRight = (s, i) => xmas(s, i, i + w + 1, i + 2 * w + 2, i + 3 * w + 3);

const matchingIndices = new Set();
let total = 0;

[...s].forEach((c, index) =>
  [left, right, up, upLeft, upRight, down, downLeft, downRight].forEach((f) => {
    const { match, indices } = f(s, index);
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
