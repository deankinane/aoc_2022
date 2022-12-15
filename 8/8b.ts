import { readFileSync } from 'fs'
const text = readFileSync('./input.prod').toString()

const lines = text.split('\n')
lines.splice(lines.length - 1, 1) // remove trailing blank line

const treeGrid = lines.map(c => c.split('').map(x => parseInt(x)))
const visible: number[][] = []

console.log(treeGrid);


for (let i = 0; i < treeGrid.length; i++) {
    visible[i] = []
    for (let j = 0; j < treeGrid[0].length; j++) {
        const left = castLeft(j, i)
        const right = castRight(j, i)
        const up = castUp(j, i)
        const down = castDown(j, i)
        visible[i][j] = left * right * up * down
    }
}

function castLeft(startX: number, startY: number): number {
    let x = startX
    let i = 0
    while (x > 0) {
        x--
        i++
        if (treeGrid[startY][x] >= treeGrid[startY][startX]) {
            break
        }
    }

    return i
}

function castRight(startX: number, startY: number): number {
    let x = startX
    let i = 0
    while (x < treeGrid[0].length - 1) {
        x++
        i++
        if (treeGrid[startY][x] >= treeGrid[startY][startX]) {
            break
        }
    }

    return i
}

function castUp(startX: number, startY: number): number {
    let y = startY
    let i = 0
    while (y > 0) {
        y--
        i++
        if (treeGrid[y][startX] >= treeGrid[startY][startX]) {
            break
        }
    }

    return i
}

function castDown(startX: number, startY: number): number {
    let y = startY
    let i = 0
    while (y < treeGrid.length - 1) {
        y++
        i++
        if (treeGrid[y][startX] >= treeGrid[startY][startX]) {
            break
        }
    }

    return i
}

console.log(visible);

const result = visible.map(x => x.reduce((i = 0, j) => i = Math.max(i, j))).reduce((i = 0, j) => Math.max(i, j))
console.log('visible', result);

// console.log(castUp(2, 1), castLeft(2, 1), castRight(2, 1), castDown(2, 1));

