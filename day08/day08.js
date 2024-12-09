const s = require("fs").readFileSync(process.stdin.fd).toString();

const arr = s
  .split("\n")
  .filter((l) => l)
  .map((line) => [...line]);

let s2 = s;

const serialize = (i, j) => `${i}-${j}`;
const deserialize = (str) => str.split("-").map(Number);

function newAntinodes(i, j, rowIndex, colIndex, numRows, numCols) {
  let set = new Set(); //([serialize(i, j), serialize(rowIndex, colIndex)]);

  const rowDiff = i - rowIndex;
  const colDiff = j - colIndex;

  console.log("rowDiff", rowDiff, "colDiff", colDiff);

  const newRowIndex1 = rowIndex - rowDiff;
  const newColIndex1 = colIndex - colDiff;

  console.log("newRowIndex1", newRowIndex1, "newColIndex1", newColIndex1);

  const rowIsValid = (val) => val >= 0 && val < numRows;
  const colIsValid = (val) => val >= 0 && val < numCols;

  if (rowIsValid(newRowIndex1) && colIsValid(newColIndex1)) {
    // console.log("newRowIndex1", newRowIndex1, "newColIndex1", newColIndex1);
    set.add(serialize(newRowIndex1, newColIndex1));
    // set = set.union(
    //   newAntinodes(rowIndex, colIndex, newRowIndex1, newColIndex1)
    // );
  }

  const newRowIndex2 = i + rowDiff;
  const newColIndex2 = j + colDiff;

  if (rowIsValid(newRowIndex2) && colIsValid(newColIndex2)) {
    // console.log("newRowIndex2", newRowIndex2, "newColIndex2", newColIndex2);
    set.add(serialize(newRowIndex2, newColIndex2));
    // set = set.union(
    //   newAntinodes(rowIndex, colIndex, newRowIndex2, newColIndex2)
    // );
  }

  return set;
}

let antinodes = new Set();

const antennas = {};

for (let i = 0; i < arr.length; i++) {
  const row = arr[i];
  for (let j = 0; j < row.length; j++) {
    const c = row[j];
    if (!/[a-z0-9]/i.test(c)) {
      continue;
    }
    if (!(c in antennas)) {
      antennas[c] = [serialize(i, j)];
    } else {
      for (let k = 0; k < antennas[c].length; k++) {
        const [rowIndex, colIndex] = deserialize(antennas[c][k]);
        console.log(
          "c",
          c,
          "i",
          i,
          "j",
          j,
          "rowIndex",
          rowIndex,
          "colIndex",
          colIndex
        );
        const na = newAntinodes(
          i,
          j,
          rowIndex,
          colIndex,
          arr.length,
          row.length
        );
        console.log("na", na);
        na.forEach((antinodeStr) => {
          const [rowIndex, colIndex] = deserialize(antinodeStr);
          const antinodeIndex = rowIndex * (row.length + 1) + colIndex;
          s2 =
            s2.substring(0, antinodeIndex) +
            "#" +
            s2.substring(antinodeIndex + 1);
        });
        antinodes = antinodes.union(na);
      }
      antennas[c].push(serialize(i, j));
    }
  }
}

console.log(s2);
console.log(antinodes.size);
