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
const strength: { [i: string]: number } = {
  x: 0,
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

function addStrength(register: string, cycle: number) {
  const currentStr = strength[register];
  strength[register] = currentStr + registers[register] * cycle;
  // console.log(cycle, register, currentStr, strength[register]);
}

cycles.forEach((c, i) => {
  if (i + 1 === 20 || (i - 19) % 40 === 0) {
    addStrength("x", i + 1);
  }
  const ins = c.split(" ");
  if (ins[0] === "addx") addx("x", parseInt(ins[1]));
});

console.log(strength);
