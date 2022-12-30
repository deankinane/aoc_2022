import { readFileSync } from 'fs'
const text = readFileSync('./13/input.prod').toString()

const pairs = text.split('\n\n').map((p) => p.split('\n').map((s) => eval(s)))
console.log(pairs)

// returns true if already on correct order
function compare(left: any, right: any): number {
    if (right.length === 0 && left.length > 0) return -1

    for (let i = 0; i < right.length; i++) {
        const li = left[i]
        const ri = right[i]

        if (!li) return 1
        let result = 0
        if (typeof li === 'number' && typeof ri !== 'number') {
            result = compare([li], ri)
        }
        if (typeof ri === 'number' && typeof li !== 'number') {
            result = compare(li, [ri])
        }
        if (typeof ri !== 'number' && typeof li !== 'number') {
            result = compare(li, ri)
        }
        if (result !== 0) return result
        if (li < ri) return 1
        if (ri < li) return -1

        if (i === right.length - 1 && left.length > right.length) return -1
    }
    return 0
}

let count = 0,
    sum = 0
const results: number[] = []
pairs.forEach((p, i) => {
    const result = compare(p[0], p[1])
    count += result >= 0 ? 1 : 0
    sum += result >= 0 ? i + 1 : 0
    if (result >= 0) results.push(i + 1)
})

console.log(sum)
// console.log(results)
