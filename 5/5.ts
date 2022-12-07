import {readFileSync} from 'fs'

const text = readFileSync('./in.txt').toString()

const lines = text.split('\n')
lines.splice(lines.length-1, 1) // remove trailing blank line

const stackStrings = lines.splice(0, lines.findIndex(x => x === ''))
const moves = lines.splice(1, lines.length)

// console.log('crates', crates)

// console.log('moves', moves)

const numColumns = stackStrings.map(x => x.split('').filter(l => l === '[').length).reduce((x=0, y) => x = y>x ? y : x)

// const grid: string[][] = []

const stacks: string[][] = []

for(let i=stackStrings.length-2; i>=0; i--) {
    
    let offset = 0
    
    for(let j=0; j<numColumns; j++) {
        if (stacks[j] === undefined) stacks[j] = []
        const crate = stackStrings[i].substring(offset, offset+4)
        stacks[j].push(crate.trimEnd())
        offset+=4
    }
    
}
 console.log(stacks)

const regex = /[0-9]{1,2}/g
const movePattern = moves.map(x => [...x.matchAll(regex)].map(m => parseInt(m[0])))
// console.log(movePattern)


/*
[ 
    [ '[Z]', '[N]', '' ], 
    [ '[M]', '[C]', '[D]' ],
    [ '[P]', '', '' ] 
]

*/
// movePattern.forEach(mp => {
//     // console.log(`move ${mp[0]} from ${mp[1]} to ${mp[2]}`)
//     const from = mp[1]-1
//     const to = mp[2]-1

//     let crateToMove = -1
//     let newFirstPosition = -1

//     for(let i=0; i<mp[0]; i++) {
//         crateToMove = stacks[from].findIndex(x => x === '')
//         newFirstPosition = stacks[to].findIndex(x => x === '')

//         crateToMove = crateToMove === -1 ? stacks[from].length -1 : crateToMove -1
//         newFirstPosition = newFirstPosition === -1 ? stacks[to].length : newFirstPosition

//         // console.log('from', from, crateToMove)
//         // console.log('to', to, newFirstPosition)

//         stacks[to][newFirstPosition] = stacks[from][crateToMove]
//         stacks[from][crateToMove] = ''
//     }
// })

// const result = stacks.map(s => s.reduce((l,c) => l = c.startsWith('[') ? c.charAt(1) : l)).map(l => l.replace('[', '').replace(']', ''))
// console.log('Part 1', result.join(''))


movePattern.forEach(mp => {
    
    const amount = mp[0]
    const from = mp[1]-1
    const to = mp[2]-1

    // console.log(`move ${amount} from ${from} to ${to}`)
    
    let crateToMove = stacks[from].findIndex(x => x === '')
    let newFirstPosition = stacks[to].findIndex(x => x === '')

    crateToMove = crateToMove === -1 ? stacks[from].length : crateToMove
    newFirstPosition = newFirstPosition === -1 ? stacks[to].length : newFirstPosition

    const crates = stacks[from].splice(crateToMove-amount, amount)
    stacks[to].splice(newFirstPosition, 0, ...crates)
    // console.log(stacks)
})


 const result2 = stacks.map(s => s.reduce((l,c) => l = c.startsWith('[') ? c.charAt(1) : l)).map(l => l.replace('[', '').replace(']', ''))
console.log(result2.join(''))
