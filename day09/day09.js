const s = require("fs").readFileSync(process.stdin.fd).toString();

let blocks = [...s.trim()]
  .map((c, index) => {
    const n = Number(c);
    const id = Math.floor(index / 2);
    const isFreeSpace = index % 2 === 1;
    return {
      type: isFreeSpace ? "free" : "file",
      size: n,
      id: isFreeSpace ? null : id,
      index,
    };
  })
  .filter((o) => o.size);

function move(blocks, fileIndex, freeIndex) {
  const file = blocks[fileIndex];
  const free = blocks[freeIndex];
  if (file.size > free.size) {
    throw `file size ${file.size} is greater than free size ${free.size}`;
  }
  const cleanSwap = file.size === free.size;
  if (cleanSwap) {
    // clean swap
    blocks[fileIndex] = free;
    blocks[freeIndex] = file;
  } else {
    // extra free space
    blocks[freeIndex].size -= file.size;
    blocks[fileIndex] = { type: "free", size: file.size }; // TODO: merge with surrounding free space??
    blocks.splice(freeIndex, 0, file);
  }
  return cleanSwap;
}

for (let j = blocks.length - 1; j >= 0; j--) {
  if (blocks[j].type !== "file") continue;

  const nextLargestFile = blocks[j];

  for (let i = 0; i < j; i++) {
    if (blocks[i].type !== "free") continue;

    const nextFree = blocks[i];
    const freeSize = nextFree.size;

    if (nextLargestFile.size <= freeSize) {
      const isCleanSwap = move(blocks, j, i);
      if (!isCleanSwap) {
        j++;
      }
      break;
    }
  }
}

function blockChars() {
  return blocks.flatMap((block) =>
    Array(block.size).fill(block.type === "file" ? block.id : ".")
  );
}

const checksum = blockChars()
  .map((c, i) => (c === "." ? 0 : Number(c) * i))
  .reduce((a, b) => a + b, 0);

console.log(checksum);
