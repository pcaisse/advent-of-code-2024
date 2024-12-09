const s = require("fs").readFileSync(process.stdin.fd).toString();

let blocks = [...s.trim()].flatMap((c, index) => {
  const n = Number(c);
  const id = Math.floor(index / 2);
  const isFreeSpace = index % 2 === 1;
  const ch = isFreeSpace ? "." : String(id);
  return Array(n).fill(ch);
});

// console.log("blocks", blocks);

const numFreeSpaces = blocks.reduce(
  (total, ch) => (ch === "." ? total + 1 : total),
  0
);

// console.log("numFreeSpaces", numFreeSpaces);

// NOTE: number of dots is conserved!
// iterate once for each dot
// each iteration, find the leftmost and rightmost dot (maintain index for each)
// then switch the characters at each of those index and continue

let lastNonDotCharIndex = blocks.length - 1;
let firstDotCharIndex = 0;

while (lastNonDotCharIndex > firstDotCharIndex) {
  // console.log("blocks", blocks);
  while (blocks[lastNonDotCharIndex] === ".") {
    lastNonDotCharIndex--;
  }
  while (blocks[firstDotCharIndex] !== ".") {
    firstDotCharIndex++;
  }
  // console.log(
  // "lastNonDotCharIndex",
  // lastNonDotCharIndex,
  // "lastNonDotChar",
  // blocks[lastNonDotCharIndex]
  // );
  // console.log(
  // "firstDotCharIndex",
  // firstDotCharIndex,
  // "firstDotChar",
  // blocks[firstDotCharIndex]
  // );
  blocks[firstDotCharIndex] = blocks[lastNonDotCharIndex];
  blocks[lastNonDotCharIndex] = ".";
}

console.log("blocks", blocks.join(""));

const checksum = blocks
  .filter((c) => c !== ".")
  .map((c, i) => Number(c) * i)
  .reduce((a, b) => a + b, 0);

console.log(checksum);
