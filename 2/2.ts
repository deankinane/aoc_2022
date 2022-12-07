import {readFileSync} from 'fs'

const text = readFileSync('./2/in.txt').toString()

const groups = text.split('\n')


function getScore(c: string): number {
    if(c === 'X') return 1
    if(c === 'Y') return 2
    if(c === 'Z') return 3

    return 0
}

function getOutcome(a: string, b: string) : number {
    if(a === 'A' && b === 'Y') return 6
    if(a === 'B' && b === 'Z') return 6
    if(a === 'C' && b === 'X') return 6

    if(a === 'A' && b === 'X') return 3
    if(a === 'B' && b === 'Y') return 3
    if(a === 'C' && b === 'Z') return 3

    return 0
}


const them = ['A', 'B', 'C']
const myMove = ['X', 'Y', 'Z']
const ocome = ['Y', 'Z', 'X']
const scores = [3, 6, 0]

function getNextMove(a: string, b: string) : string {
    const outcome = (ocome.indexOf(b))
    const move = (them.indexOf(a) + outcome) % 3
    return myMove[move]
}

const games = groups.map(x => x.split(' '))//.filter(x => x[0] )

//Part 1
const score1 = games.map( x => getScore(x[1]) + getOutcome(x[0],x[1])).reduce((x=0, y) => x+y)
console.log('part 1', score1)

const score2 = games.map( x => getScore(getNextMove(x[0], x[1])) + scores[ocome.indexOf(x[1])]).reduce((x=0, y) => x+y)
console.log('part 2', score2)
