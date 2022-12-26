import { readFileSync } from "fs";
const text = readFileSync("./input.prod").toString();

const inst = text.split("\n");

const cycleTimes: { [i: string]: number } = {
  addx: 2,
  noop: 1,
};
const registers: { [i: string]: number } = {
  x: 1,
};

const cycles: string[] = [];

inst.forEach((i) => {
  const instruction = i.split(" ")[0];
  const time: number = cycleTimes[instruction];

  for (let j = 1; j <= time; j++) {
    if (j === time) cycles.push(i);
    else cycles.push("noop");
  }
});

function addx(register: string, amount: number) {
  registers[register] += amount;
}
let row = 0;
let col = 0;
const crt: string[][] = [];

cycles.forEach((c, i) => {
  if (crt[row] === undefined) crt[row] = [];
  crt[row][col] = Math.abs(registers["x"] - col) < 2 ? "#" : ".";
  col++;
  if ((i + 1) % 40 === 0) {
    row++;
    col = 0;
  }
  const ins = c.split(" ");
  if (ins[0] === "addx") addx("x", parseInt(ins[1]));
});

// console.log(crt);
console.log(crt.map((c) => c.reduce((l = "", r) => (l += r))));
