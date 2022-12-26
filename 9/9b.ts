import { readFileSync } from "fs";
const text = readFileSync("./input.prod").toString();

const moves = text.split("\n");
moves.splice(moves.length - 1, 1);

interface Pos {
  x: number;
  y: number;
}

const knots: Pos[] = [];
const history: Pos[] = [];

for (let i = 0; i < 10; i++) {
  knots[i] = { x: 0, y: 0 };
}

function move(iHead: number, iTail: number) {
  const head = knots[iHead];
  const tail = knots[iTail];

  if (!tail) return;

  const dx = Math.abs(head.x - tail.x);
  const dy = Math.abs(head.y - tail.y);

  if (dy === 0 && dx >= 2) {
    tail.x = head.x + (head.x > tail.x ? -1 : 1);
  } else if (dx === 0 && dy >= 2) {
    tail.y = head.y + (head.y > tail.y ? -1 : 1);
  } else if (dx > 1 || dy > 1) {
    tail.x += head.x > tail.x ? 1 : -1;
    tail.y += head.y > tail.y ? 1 : -1;
  }
  // console.log(iHead, iTail, head, tail);
  iHead++;
  iTail++;

  move(iHead, iTail);
}

moves.forEach((x) => {
  const m = x.split(" ");
  const count = parseInt(m[1]);
  console.log(m[0], count);
  for (let i = 0; i < count; i++) {
    history.push({ ...knots[9] });
    if (m[0] === "U") knots[0].y++;
    else if (m[0] === "D") knots[0].y--;
    else if (m[0] === "R") knots[0].x++;
    else if (m[0] === "L") knots[0].x--;
    move(0, 1);
  }
  history.push({ ...knots[9] });
});

const unique: Pos[] = [];

history.forEach((p) => {
  if (!unique.find((x) => x.x === p.x && x.y === p.y)) {
    unique.push(p);
  }
});

console.log(unique.length);
