import {readFileSync} from 'fs'

const text = readFileSync('./input.test').toString()

const lines = text.split('\n')
lines.splice(lines.length-1, 1) // remove trailing blank line


const treeGrid: number[][] = lines.map(x => x.split('').map(y => parseInt(y)))

 console.log('grid', treeGrid)

const visibleGrid: number[][] = []

for (let i=0; i<treeGrid.length; i++){
    const row = treeGrid[i]
    visibleGrid[i] = []

    for(let j=0; j<row.length; j++) {
        if(i==0 || i==treeGrid.length-1 || j===0 || j===row.length-1){
            visibleGrid[i][j] = 1
            continue
        } 

        visibleGrid[i][j] = 0

        if(treeGrid[i][j-1] < treeGrid[i][j] && visibleGrid[i][j-1] === 1){
            visibleGrid[i][j] = 1
        }
    }

    for(let j=row.length-1; j>=0; j--) {
        if(i==0 || i==treeGrid.length-1 || j===0 || j===row.length-1){
            continue
        } 

        if(treeGrid[i][j+1] < treeGrid[i][j] && visibleGrid[i][j+1] === 1){
            visibleGrid[i][j] = 1
        }
    }
}

// console.log(visibleGrid)

for (let i=1; i<visibleGrid[0].length; i++){

    for(let j=1; j<visibleGrid.length; j++) {
        if(treeGrid[j][i] > treeGrid[j-1][i] && visibleGrid[j-1][i] === 1) {
            treeGrid[j][i] = 1
        }
    }
  
    for(let j=visibleGrid.length-2; j>=0; j--) {
        if(treeGrid[j+1][i] < treeGrid[j][i] && visibleGrid[j+1][i] === 1) {
            treeGrid[j][i] = 1
        }
    }
}



 console.log(visibleGrid)
console.log('Visible trees:', visibleGrid.map(x => x.reduce((i=0, r) => i+r)).reduce((i=0,r) => i+r))
