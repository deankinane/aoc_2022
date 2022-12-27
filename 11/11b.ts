import { readFileSync } from 'fs'
const text = readFileSync('./input.prod').toString()

interface Monkey {
    id: number
    items: number[]
    operation: string
    test: string
    testPass: string
    testFail: string
    itemsInspected: number
}
function createMonkey(id: number): Monkey {
    return {
        id,
        items: [],
        operation: '',
        test: '',
        testFail: '',
        testPass: '',
        itemsInspected: 0,
    }
}
const monkeys: Monkey[] = []

const lines = text.split('\n')
for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(':')
    const p1 = parts[0].trim()

    if (p1.length === 0) continue

    if (p1.indexOf('Monkey') === 0) {
        monkeys.push(createMonkey(parseInt(p1.replace('Monkey ', ''))))
        continue
    }

    const cM = monkeys[monkeys.length - 1]

    const p2 = parts[1].trim()

    if (p1 === 'Starting items') {
        cM.items = p2.split(',').map((x) => parseInt(x))
        continue
    }

    if (p1 === 'Operation') {
        cM.operation = p2
        continue
    }

    if (p1 === 'Test') {
        cM.test = p2
        continue
    }

    if (p1 === 'If true') {
        cM.testPass = p2
        continue
    }

    if (p1 === 'If false') {
        cM.testFail = p2
        continue
    }
}
const divider = monkeys
    .map((m) => parseInt(m.test.split(' ')[2]))
    .reduce((x, y) => x * y, 1)
// console.log(monkeys)

function doOperation(val: number, operation: string): number {
    const parts = operation.replace('new = ', '').split(' ')
    const num = parts[2] === 'old' ? val : parseInt(parts[2])
    switch (parts[1]) {
        case '*':
            val = val * num
            break
        case '+':
            val = val + num
            break
        case '/':
            val = val / num
            break
    }

    val = val % divider
    return val
}

function doTest(val: number, test: string) {
    const parts = test.split(' ')
    switch (parts[0]) {
        case 'divisible':
            return val % parseInt(parts[2]) === 0
    }

    return false
}

function doAction(val: number, action: string) {
    const monkeyId = parseInt(action.replace('throw to monkey ', ''))
    const targetMonkey = monkeys.find((m) => m.id === monkeyId)

    targetMonkey?.items.push(val)
}

const rounds = 10000

for (let i = 0; i < rounds; i++) {
    monkeys.forEach((m) => {
        m.items.forEach((i) => {
            i = doOperation(i, m.operation)
            doAction(i, doTest(i, m.test) ? m.testPass : m.testFail)
            m.itemsInspected++
        })
        m.items = []
    })
}

const mb = monkeys.map((m) => m.itemsInspected).sort((a, b) => b - a)
console.log(mb)
console.log(mb[0] * mb[1])
