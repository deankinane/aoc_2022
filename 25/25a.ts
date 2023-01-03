import { readFileSync } from 'fs'
const text = readFileSync('./25/input.test').toString()

function fromSnafu(before: string) {
    let after: number = 0
    let exp: number = 0

    for (let i = before.length - 1; i >= 0; i--) {
        let digit = before[i]
        digit = digit === '=' ? '-2' : digit
        digit = digit === '-' ? '-1' : digit

        const mult = Math.pow(5, exp)

        after += mult === 0 ? parseInt(digit) : parseInt(digit) * mult
        exp++
    }

    return after
}

const result = text.split('\n').map((x) => fromSnafu(x))
console.log(result)
