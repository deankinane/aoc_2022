import {readFileSync} from 'fs'

const text = readFileSync('./input.prod').toString()

const lines = text.split('\n')
lines.splice(lines.length-1, 1) // remove trailing blank line

type Dir = {
    name: string
    size: number
    subs: Dir[]
    parent?: Dir
}

const root: Dir = {
    name: '/',
    size: 0,
    subs: []
}

function addToSize(dir: Dir, size: number) {
    dir.size += size
    if(dir.parent) {
        addToSize(dir.parent, size)
    }
}

let currentDir: Dir | undefined = root
let l:string
for(let i=0; i<lines.length; i++) {
    l = lines[i]

    if (l.startsWith('$ cd')) {
        const move = l.replace('$ cd ', '')

        if (move === '/') {
            currentDir = root
            continue
        }

        if (move === '..') {
            currentDir = currentDir?.parent
            continue
        }

        const sub: Dir | undefined = currentDir?.subs.find(x => x.name === move)
        if(!sub) {
            const newDir: Dir = {
                name: move,
                size: 0,
                subs: [],
                parent: currentDir
            }
            currentDir?.subs.push(newDir)
            currentDir = newDir
        }
        else {
            currentDir = sub
        }

        continue
    }

    if (l.startsWith('dir') || l.startsWith('$ ls')) continue
    
    if(currentDir)
        addToSize(currentDir, parseInt(l.split(' ')[0]))

}


// function getTotalA(dir: Dir[], threshold: number): number {
//     let total = 0
//     for(let i=0; i<dir.length; i++) {
//         total += dir[i].size <= threshold ? dir[i].size : 0
//         total += getTotalA(dir[i].subs, threshold)
//     }

//     return total
// }
// const threshold = 100000
// console.log(getTotalA(root.subs,threshold))


function getSmallest(dir: Dir[], size: number, threshold: number): number {

    for(let i=0; i<dir.length; i++) {
        // console.log(`Dir ${dir[i].name}`, dir[i].size)
        size = (dir[i].size >= threshold && dir[i].size < size ? dir[i].size : getSmallest(dir[i].subs, size, threshold))
    }

    return size
}

const sizes: number[] = []
function logAll(dir: Dir[]) {
    dir.forEach(d => {
        sizes.push(d.size)
        logAll(d.subs)
    })
}

const diskSize = 70000000
const freeSpace = diskSize - root.size
const updateSize = 30000000
const spaceRequired = updateSize - freeSpace
console.log('Space required', spaceRequired)
console.log(getSmallest(root.subs, root.size, spaceRequired))

logAll(root.subs)
console.log(sizes.reduce((x=0,s) => {
    if (x===0) x = s
    if (s >= spaceRequired && s < x) x = s
    return x
}))
