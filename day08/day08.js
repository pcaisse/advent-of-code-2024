const s = require("fs").readFileSync(process.stdin.fd).toString();

const w = s.indexOf("\n") + 1;
let s2 = s;

// do a single pass. every time you come across a given antenna type, save its position for that
// type. if you come across another antenna of that same type, generate antinode positions and
// increment the antinode count if the positions are within the bounds of the map. return the
// antinode count at the end.

function newAntinodes(i, x) {
  console.log("compare positions", x, i);
  let set = new Set([i, x]);

  const diff = i - x;
  console.log("diff", diff);

  const newPos1 = x - diff;
  console.log("newPos1", newPos1);

  const offsetX = x % w;
  console.log("offsetX", offsetX);

  const offsetI = i % w;
  console.log("offsetI", offsetI);

  const offsetDiff = offsetI - offsetX;
  console.log("offsetDiff", offsetDiff);

  const newPosOffsetDiff = (newPos1 % w) - offsetX;
  console.log("newPosOffsetDiff", newPosOffsetDiff);

  const antinodePos1OnGrid =
    newPos1 >= 0 &&
    newPos1 < s.length &&
    s[newPos1] !== "\n" &&
    Math.abs(offsetDiff) === Math.abs(newPosOffsetDiff);
  console.log("antinodePos1OnGrid", antinodePos1OnGrid);

  if (antinodePos1OnGrid) {
    console.log("newPos1", newPos1);
    set.add(newPos1);
    set = set.union(newAntinodes(newPos1, i));
  }

  const newPos2 = i + diff;
  console.log("newPos2", newPos2);

  const newPos2OffsetDiff = (newPos2 % w) - offsetI;
  console.log("newPos2OffsetDiff", newPos2OffsetDiff);

  const antinodePos2OnGrid =
    newPos2 >= 0 &&
    newPos2 < s.length &&
    s[newPos2] !== "\n" &&
    Math.abs(offsetDiff) === Math.abs(newPos2OffsetDiff);
  console.log("antinodePos2OnGrid", antinodePos2OnGrid);

  if (antinodePos2OnGrid) {
    console.log("newPos2", newPos2);
    set.add(newPos2);
    set = set.union(newAntinodes(newPos2, i));
  }

  return set;
}

let antinodes = new Set();
const antennas = {};

for (let i = 0; i < s.length; i++) {
  const c = s[i];
  if (!/[a-z0-9]/i.test(c)) {
    continue;
  }
  if (!(c in antennas)) {
    antennas[c] = [i];
  } else {
    for (let j = 0; j < antennas[c].length; j++) {
      x = antennas[c][j];
      const na = newAntinodes(i, x);
      na.forEach(
        (antinodeIndex) =>
          (s2 =
            s2.substring(0, antinodeIndex) +
            "#" +
            s2.substring(antinodeIndex + 1))
      );
      antinodes = antinodes.union(na);
    }
    antennas[c].push(i);
  }
}

console.log(s2);
console.log(antinodes.size);
