const s = require("fs").readFileSync(process.stdin.fd).toString();

const w = s.indexOf("\n") + 1;

const upLeft = (i) => i - w - 1;
const upRight = (i) => i - w + 1;
const downLeft = (i) => i + w - 1;
const downRight = (i) => i + w + 1;

const xmas = (i) => {
  const uli = upLeft(i);
  const uri = upRight(i);
  const dli = downLeft(i);
  const dri = downRight(i);
  const checkMatch = (l1, l2, l3, l4, l5) =>
    s[uli] === l1 &&
    s[uri] === l2 &&
    s[i] === l3 &&
    s[dli] === l4 &&
    s[dri] === l5;
  return {
    match:
      checkMatch("M", "S", "A", "M", "S") ||
      checkMatch("S", "S", "A", "M", "M") ||
      checkMatch("M", "M", "A", "S", "S") ||
      checkMatch("S", "M", "A", "S", "M"),
    indices: [uli, uri, i, dli, dri],
  };
};

const matchingIndices = new Set();
let total = 0;

[...s].forEach((c, index) => {
  const { match, indices } = xmas(index);
  if (match) {
    for (const i of indices) {
      matchingIndices.add(i);
    }
    total++;
  }
});

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
