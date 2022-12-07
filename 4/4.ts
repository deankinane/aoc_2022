import {readFileSync} from 'fs'

const text = readFileSync('./in.txt').toString()

const lines = text.split('\n')
lines.splice(lines.length-1, 1) // remove trailing blank line


const ranges = lines.map(l => l.split(','))
// console.log(ranges)

let count = 0
for(let i=0;i<ranges.length; i++) {
    const s1 = ranges[i][0].split('-')
    const s2 = ranges[i][1].split('-')

    // console.log('range', s1, s2)

    if (parseInt(s1[0]) <= parseInt(s2[0])) 
        if(parseInt(s1[1]) >= parseInt(s2[1])) {
            count++
            console.log(ranges[i])
            continue
        }
            
    
    if (parseInt(s1[0]) >= parseInt(s2[0])) 
        if(parseInt(s1[1]) <= parseInt(s2[1])){
            count++
            console.log(ranges[i])
            continue
        }   
}

console.log('Part 1', count)

// Part 2

function getRange(start: number, stop:number): number[] {
    const r = [start]
    let b = start;
    while(b<stop){
        r.push(b+=1)
    }

    return r
}
const fullRange = ranges.map(x => {
    const split1 = x[0].split('-')
    const split2 = x[1].split('-')

    return [
        getRange(parseInt(split1[0]), parseInt(split1[1])),
        getRange(parseInt(split2[0]), parseInt(split2[1]))
    ]
})

let count2 = 0
fullRange.forEach(f => {
    let found = 0
    f[0].forEach(n => found += (f[1].indexOf(n) > -1 ? 1: 0))

    count2 += found > 0 ? 1 : 0
})

console.log('Part 2', count2)
