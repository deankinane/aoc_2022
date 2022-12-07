import {readFileSync} from 'fs'

const text = readFileSync('./3/in.txt').toString()

const sacks = text.split('\n')
sacks.splice(sacks.length-1, 1)


// a 97
// A is 65

function getPriority(char: string): number {
    const ascii = char.charCodeAt(0)
    return ascii >= 97 ? ascii - 96 : ascii - 38
}

const comps = sacks.map(s => [s.substring(0, s.length/2).split(''), s.substring(s.length/2, s.length).split('')])


// Part 1
let sum =0;
for (let i=0; i<comps.length; i++){
    const letter = comps[i][0].find(x => comps[i][1].findIndex(y => y===x) > -1)
    sum += getPriority(letter || '')
}

console.log('Part 1', sum)


// Part 2

let sum2 =0;
for (let i=0; i<comps.length; i+=3){
    
    let badge = ''
    sacks[i].split('').forEach(l => {
        if (sacks[i+1].indexOf(l) > -1){
            if (sacks[i+2].indexOf(l) > -1){
                badge = l
            }
        }
    })
    sum2 += getPriority(badge)
}
console.log('Part 2', sum2)

