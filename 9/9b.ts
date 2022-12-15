
import { readFileSync } from 'fs'
const text = readFileSync('./input.test2').toString()

const moves = text.split('\n')
moves.splice(moves.length - 1, 1)
// moves.forEach(m => console.log(m))

interface Pos {
    x: number
    y: number
    tail?: Pos
    history: Hist[]
}

interface Hist {
    x: number
    y: number
}
const head: Pos = { x: 0, y: 0, history: [] }
const knots: Pos[] = []
knots.push(head)
let current: Pos = head
for (let i = 0; i < 9; i++) {

    const newknot = {
        x: 0,
        y: 0,
        history: []
    }
    current.tail = newknot
    current = newknot
    knots.push(current)
}

console.log(knots)
moves.forEach(x => {
    const moveparts = x.split(' ')
    const dir = moveparts[0]
    const amount = parseInt(moveparts[1])

    console.log('');
    console.log(x);
    console.log('');

    for (let i = 0; i < amount; i++) {
        if (dir === 'R') {
            head.x++
        }
        else if (dir === 'L') {
            head.x--
        }
        else if (dir === 'U') {
            head.y++
        }
        else if (dir === 'D') {
            head.y--
        }

        if (head.tail)
            move(head, head.tail)
    }

    let knot: Pos | undefined = head
    while (knot) {
        console.log(knot.x, knot.y)
        knot = knot.tail
    }
})


function move(head: Pos, tail: Pos) {
    if (head.y === tail.y) {
        if (head.x > tail.x + 1) {
            tail.x++
        }
        else if (head.x < tail.x - 1) {
            tail.x--
        }
    }
    else if (head.x === tail.x) {
        if (head.y > tail.y + 1) {
            tail.y++
        }
        else if (head.y < tail.y - 1) {
            tail.y--
        }
    }
    else {
        if (head.y > tail.y + 1) {
            tail.y++
            tail.x = head.x
        }
        else if (head.y < tail.y - 1) {
            tail.y--
            tail.x = head.x
        }
        else if (head.x > tail.x + 1) {
            tail.x++
            tail.y = head.y
        }
        else if (head.x < tail.x - 1) {
            tail.x--
            tail.y = head.y
        }
    }

    console.log(tail.x, tail.y);


    if (tail.tail) {
        move(tail, tail.tail)
    }
    else {
        tail.history.push({ x: tail.x, y: tail.y })
        console.log('')
    }
}

const unique: Hist[] = []
if (current)
    current.history.forEach(p => {
        if (!unique.find(x => x.x === p.x && x.y === p.y)) {
            unique.push(p)
        }
    })

console.log(unique.length)

