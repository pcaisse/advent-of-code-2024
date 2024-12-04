const input = require("fs").readFileSync(process.stdin.fd).toString();

const w = input.indexOf("\n");
const s = input.replaceAll("\n", "");

const left = [...s.matchAll(/SAMX/g)].length;
if (left !== 2) throw Error();

const right = [...s.matchAll(/XMAS/g)].length;
if (right !== 3) throw Error();

const up = [
  ...s.matchAll(new RegExp(`S.{${w - 1}}A.{${w - 1}}M.{${w - 1}}X`, "g")),
].length;
if (up !== 2) throw Error();

const down = [
  ...s.matchAll(new RegExp(`X.{${w - 1}}M.{${w - 1}}A.{${w - 1}}S`, "g")),
].length;
if (down !== 1) throw Error();

const downLeft = [
  ...s.matchAll(new RegExp(`(?=(X.{${w - 2}}M.{${w - 2}}A.{${w - 2}}S))`, "g")),
].length;
if (downLeft !== 1) throw Error();

const downRight = [
  ...s.matchAll(new RegExp(`(?=(X.{${w}}M.{${w}}A.{${w}}S))`, "g")),
].length;
if (downRight !== 1) throw Error();

const upLeft = [
  ...s.matchAll(new RegExp(`(?=(S.{${w}}A.{${w}}M.{${w}}X))`, "g")),
].length;
if (upLeft !== 4) throw Error();

const upRight = [
  ...s.matchAll(new RegExp(`(?=(S.{${w - 2}}A.{${w - 2}}M.{${w - 2}}X))`, "g")),
].length;
if (upRight !== 4) throw Error();

const total =
  right + left + up + upLeft + upRight + down + downLeft + downRight;

console.log(total);
