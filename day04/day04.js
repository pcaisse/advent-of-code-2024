const input = require("fs").readFileSync(process.stdin.fd).toString();

const w = input.indexOf("\n");
const s = input.replaceAll("\n", "");

const regex = new RegExp(
  `(?=(SAMX|XMAS|S.{${w - 1}}A.{${w - 1}}M.{${w - 1}}X|S.{${w - 1}}A.{${
    w - 1
  }}M.{${w - 1}}X|X.{${w - 1}}M.{${w - 1}}A.{${w - 1}}S|X.{${w - 2}}M.{${
    w - 2
  }}A.{${w - 2}}S|X.{${w}}M.{${w}}A.{${w}}S|S.{${w}}A.{${w}}M.{${w}}X|S.{${
    w - 2
  }}A.{${w - 2}}M.{${w - 2}}X))`,
  "g"
);
console.log(regex);
const total = Array.from(s.matchAll(regex)).length;

console.log(total);
