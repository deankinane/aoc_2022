import { readFileSync } from 'fs'
const text = readFileSync('./12/input.prod').toString()

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
    .filter((l) => l.length > 0)
    .map((l) => l.split('').map((c) => c.charCodeAt(0)))

let start = { x: 0, y: 0, c: 0 }

const queue: Pos[] = []

// Find start and end positions
for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
        if (grid[y][x] === S) {
            start = { x: x, y: y, c: 0 }
            grid[y][x] = 'a'.charCodeAt(0)
        }
        if (grid[y][x] === E) {
            queue.push({ x: x, y: y, c: 0 })
            grid[y][x] = 'z'.charCodeAt(0)
        }
    }
}
// console.log(grid)
console.log('start', start)
console.log('end', queue[0])

function isValidStep(c: Pos, n: Pos): boolean {
    // If out of bounds
    if (n.x < 0 || n.x >= grid[0].length || n.y < 0 || n.y > grid.length - 1)
        return false

    // If already tracked
    if (queue.find((e) => e.x === n.x && e.y === n.y)) return false
    const ch = grid[c.y][c.x]
    const nh = grid[n.y][n.x]
    const diff = ch - nh
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

const end = queue.find((q) => q.x === start.x && q.y === start.y)
console.log(end?.c)
// for (let y = 0; y < grid.length; y++) {
//     const row = grid[y]
//     let r = ''
//     for (let x = 0; x < row.length; x++) {
//         r = r + `${queue.find((q) => q.x === x && q.y === y)?.c}, `
//     }
//     console.log(r)
// }
// console.log(queue)

// const steps: Pos[] = []
// let pos: Pos = { ...start }
// steps.push({ ...pos })
// while (grid[pos.y][pos.x] !== E) {
//     const current = queue.find((q) => q.x === pos.x && q.y === pos.y)?.c || 0
//     const n = queue.find((q) => q.x === pos.x && q.y === pos.y - 1)
//     const s = queue.find((q) => q.x === pos.x && q.y === pos.y + 1)
//     const e = queue.find((q) => q.x === pos.x + 1 && q.y === pos.y)
//     const w = queue.find((q) => q.x === pos.x - 1 && q.y === pos.y)
//     // console.log(pos, current, n, s, e, w)
//     let lowest = 99999
//     let next = { ...pos }
//     if (
//         n &&
//         current - n.c <= 1 &&
//         current - n.c >= 0 &&
//         n.c < lowest &&
//         !steps.find((q) => q.x === pos.x && q.y === pos.y - 1)
//     ) {
//         next = n
//         lowest = n.c
//     }
//
//     if (
//         s &&
//         current - s.c <= 1 &&
//         current - s.c >= 0 &&
//         s.c < lowest &&
//         !steps.find((q) => q.x === pos.x && q.y === pos.y + 1)
//     ) {
//         next = s
//         lowest = s.c
//     }
//
//     if (
//         e &&
//         current - e.c <= 1 &&
//         current - e.c >= 0 &&
//         e.c < lowest &&
//         !steps.find((q) => q.x === pos.x + 1 && q.y === pos.y)
//     ) {
//         next = e
//         lowest = e.c
//     }
//
//     if (
//         w &&
//         current - w.c <= 1 &&
//         current - w.c >= 0 &&
//         w.c < lowest &&
//         !steps.find((q) => q.x === pos.x - 1 && q.y === pos.y)
//     ) {
//         next = w
//         lowest = w.c
//     }
//
//     if (lowest === 99999) {
//         console.log('failed')
//         break
//     }
//
//     pos = next
//     steps.push({ ...next })
//     // console.log(pos, grid[pos.y][pos.x])
// }
// console.log(steps[0], steps[steps.length - 2], steps[steps.length - 1])
// console.log(steps.length)
