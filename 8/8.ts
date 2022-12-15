import { readFileSync } from 'fs'
const text = readFileSync('./input.prod').toString()

const lines = text.split('\n')
lines.splice(lines.length - 1, 1) // remove trailing blank line

const treeGrid = lines.map(c => c.split('').map(x => parseInt(x)))
const visible: number[][] = []

console.log(treeGrid);

for (let i = 0; i < treeGrid.length; i++) {
    const row = treeGrid[i]
    visible[i] = []
    for (let j = 0; j < row.length; j++) {
        visible[i][j] = 0
        if (i == 0 || i == treeGrid.length - 1 || j == 0 || j == row.length - 1) {
            visible[i][j] = 1
        }

    }
}

for (let i = 1; i < treeGrid.length; i++) {
    for (let j = 1; j < treeGrid[0].length; j++) {
        if (castLeft(j, i) || castRight(j, i) || castUp(j, i) || castDown(j, i)) {
            visible[i][j] = 1
        }
    }
}

function castLeft(startX: number, startY: number): boolean {
    let x = startX
    while (x > 0) {
        x--
        if (treeGrid[startY][x] >= treeGrid[startY][startX]) {
            return false
        }
    }

    return true
}

function castRight(startX: number, startY: number): boolean {
    let x = startX
    while (x < treeGrid[0].length - 1) {
        x++
        if (treeGrid[startY][x] >= treeGrid[startY][startX]) {
            return false
        }
    }

    return true
}

function castUp(startX: number, startY: number): boolean {
    let y = startY
    while (y > 0) {
        y--
        if (treeGrid[y][startX] >= treeGrid[startY][startX]) {
            return false
        }
    }

    return true
}

function castDown(startX: number, startY: number): boolean {
    let y = startY
    while (y < treeGrid.length - 1) {
        y++
        if (treeGrid[y][startX] >= treeGrid[startY][startX]) {
            return false
        }
    }

    return true
}
console.log(visible);

const result = visible.map(x => x.reduce((i = 0, j) => i + j)).reduce((i = 0, j) => i + j)
console.log('visible', result);


