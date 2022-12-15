import { readFileSync } from 'fs'
const text = readFileSync('./input.prod').toString()

const moves = text.split('\n')
moves.splice(moves.length - 1, 1)

interface Pos {
    x: number
    y: number
}
const head: Pos = { x: 0, y: 0 }
const tail: Pos = { x: 0, y: 0 }
const history: Pos[] = []

console.log(moves);
history.push({ ...tail })

moves.forEach(x => {
    const move = x.split(' ')
    console.log(move);

    if (move[0] === 'R') moveRight(parseInt(move[1]))
    if (move[0] === 'L') moveLeft(parseInt(move[1]))
    if (move[0] === 'D') moveDown(parseInt(move[1]))
    if (move[0] === 'U') moveUp(parseInt(move[1]))
})

function moveRight(amount: number) {
    for (let i = 0; i < amount; i++) {
        head.x++
        //Moving on same axis
        if (head.y === tail.y && tail.x < head.x - 1) {
            tail.x++
            history.push({ ...tail })
        }
        //Moving on axis above
        else if (head.y > tail.y && tail.x < head.x - 1) {
            tail.x++
            tail.y++
            history.push({ ...tail })
        }
        //Moving on axis below 
        else if (head.y < tail.y && tail.x < head.x - 1) {
            tail.x++
            tail.y--
            history.push({ ...tail })
        }

        // console.log(tail);

    }
}

function moveLeft(amount: number) {
    for (let i = 0; i < amount; i++) {
        head.x--
        //Moving on same axis
        if (head.y === tail.y && tail.x > head.x + 1) {
            tail.x--
            history.push({ ...tail })
        }
        //Moving on axis above
        else if (head.y > tail.y && tail.x > head.x + 1) {
            tail.x--
            tail.y++
            history.push({ ...tail })
        }
        //Moving on axis below 
        else if (head.y < tail.y && tail.x > head.x + 1) {
            tail.x--
            tail.y--
            history.push({ ...tail })
        }
        // console.log(tail);
    }
}

function moveDown(amount: number) {
    for (let i = 0; i < amount; i++) {
        head.y--
        //Moving on same axis
        if (head.x === tail.x && tail.y > head.y + 1) {
            tail.y--
            history.push({ ...tail })
        }
        //Moving on axis to the right 
        else if (head.x > tail.x && tail.y > head.y + 1) {
            tail.y--
            tail.x++
            history.push({ ...tail })
        }
        //Moving on axis to the left 
        else if (head.x < tail.x && tail.y > head.y + 1) {
            tail.y--
            tail.x--
            history.push({ ...tail })
        }
        // console.log(tail);
    }
}

function moveUp(amount: number) {
    for (let i = 0; i < amount; i++) {
        head.y++
        //Moving on same axis
        if (head.x === tail.x && tail.y < head.y - 1) {
            tail.y++
            history.push({ ...tail })
        }
        //Moving on axis to the right 
        else if (head.x > tail.x && tail.y < head.y - 1) {
            tail.y++
            tail.x++
            history.push({ ...tail })
        }
        //Moving on axis to the left 
        else if (head.x < tail.x && tail.y < head.y - 1) {
            tail.y++
            tail.x--
            history.push({ ...tail })
        }
        // console.log(tail);
    }
}

const unique: Pos[] = []

history.forEach(p => {
    if (!unique.find(x => x.x === p.x && x.y === p.y)) {
        unique.push(p)
    }
})

console.log(unique.length)
// console.log(history)
