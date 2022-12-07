import {readFileSync} from 'fs'

const text = readFileSync('./1/in.txt').toString()

const groups = text.split('\n\n')
const sums = groups.map(x => x.split('\n').map(y => parseInt(y)).reduce((total, val) => total + val))

const max = sums.reduce((x = 0, y) => x = y > x ? y : x)

console.log(max)


sums.sort((a,b) => b-a)
console.log(sums[0]+ sums[1]+ sums[2])
