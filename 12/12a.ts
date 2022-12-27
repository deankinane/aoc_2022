import { readFileSync } from 'fs'
const text = readFileSync('./input.test').toString()

interface Pos {
    x: number
    y: number
    c: number
}

// Char codes for start and end
const S = 83
const E = 69

const grid: number[][] = text
    .split('\n')
    .map((l) => l.split('').map((c) => c.charCodeAt(0)))

let start = { x: 0, y: 0, c: 0 }

const queue: Pos[] = []

// Find start and end positions
for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
        if (grid[y][x] === S) {
            start = { x: x, y: y, c: 0 }
        }
        if (grid[y][x] === E) {
            queue.push({ x: x, y: y, c: 0 })
        }
    }
}

function isValidStep(c: Pos, n: Pos): boolean {
    // If out of bounds
    if (n.x < 0 || n.x >= grid[0].length || n.y < 0 || n.y >= grid.length)
        return false

    // If already tracked
    if (queue.find((e) => e.x === n.x && e.y === n.y)) return false

    const diff = grid[c.y][c.x] - grid[n.y][n.x]
    return diff <= 1
}

let i = 0
while (queue[i]) {
    const c = queue[i]
    const n: Pos = { x: c.x, y: c.y - 1, c: c.c + 1 }
    const s: Pos = { x: c.x, y: c.y + 1, c: c.c + 1 }
    const e: Pos = { x: c.x + 1, y: c.y, c: c.c + 1 }
    const w: Pos = { x: c.x - 1, y: c.y, c: c.c + 1 }

    if (isValidStep(c, n)) queue.push(n)
    if (isValidStep(c, s)) queue.push(s)
    if (isValidStep(c, e)) queue.push(e)
    if (isValidStep(c, w)) queue.push(w)
    i++
}

// console.log(queue)

const steps: Pos[] = []
let pos: Pos = { ...start }
steps.push({ ...pos })
while (grid[pos.y][pos.x] !== E) {
    let lowest: number = 999999
    let next: Pos = { ...pos }

    if (
        pos.y - 1 >= 0 &&
        !steps.find((q) => q.x === pos.x && q.y === pos.y - 1)
    ) {
        lowest = queue.find((q) => q.x === pos.x && q.y === pos.y - 1)?.c || 0
        next.y = pos.y - 1
    }

    const s = queue.find((q) => q.x === pos.x && q.y === pos.y + 1)?.c || 0
    if (
        pos.y + 1 < grid.length &&
        s < lowest &&
        !steps.find((q) => q.x === pos.x && q.y === pos.y + 1)
    ) {
        lowest = s
        next = { ...pos, y: pos.y + 1 }
    }

    const e = queue.find((q) => q.x === pos.x + 1 && q.y === pos.y)?.c || 0
    if (
        pos.x + 1 < grid[0].length &&
        e < lowest &&
        !steps.find((q) => q.x === pos.x + 1 && q.y === pos.y)
    ) {
        lowest = e
        next = { ...pos, x: pos.x + 1 }
    }

    const w = queue.find((q) => q.x === pos.x - 1 && q.y === pos.y)?.c || 0
    if (
        pos.x - 1 >= 0 &&
        w < lowest &&
        !steps.find((q) => q.x === pos.x - 1 && q.y === pos.y)
    ) {
        lowest = w
        next = { ...pos, x: pos.x - 1 }
    }

    pos = next
    steps.push({ ...pos })
    console.log(pos)
}

console.log(steps.length)
