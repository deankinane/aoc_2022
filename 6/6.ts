import {readFileSync} from 'fs'

const text = readFileSync('./in.txt').toString().split('')

function isSignal(buffer: string[], signalLength: number): boolean {
    for(let i=0; i<signalLength; i++) {
        for(let j=0; j<signalLength; j++) {
            if(i==j) continue
            if(buffer[i] === buffer[j]) return false
        }
    }

    return true
}

// Part 1
const buffer: string[] = []
const signalLength = 14
let signal = 0

for(let i=0; i<text.length; i++) {
    buffer.push(text[i])
    if(buffer.length < signalLength) continue
    if(buffer.length > signalLength) buffer.splice(0,1)

    if(isSignal(buffer, signalLength)) {
        signal = i+1
        break
    }
}

console.log('Signal', signal, buffer)

