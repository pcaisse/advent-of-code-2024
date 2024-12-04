const s = require("fs").readFileSync(process.stdin.fd).toString();
// const t = s.split("\n").join("");
const replaced = s.replaceAll(/don't\(\).*(?=do\(\))/g, "");
const r = [...replaced.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)];
const ret = r.reduce((r, [, x, y]) => (r += x * y), 0);
// console.log(r);
// console.log(ret);
console.log(ret);
