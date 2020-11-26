export const shortestPath = (lines, selectedNodes) => {
    lines = computeLineLength(lines)
    console.log(lines[0].length)

    // we start at the first selected node
    let currentNode = selectedNodes[0]

    // we need to also keep track of the lines that we have selected
    let selectedLines = []

    // we can now iterate through the lines to compute the shortest path
    while(true){

        // do a check to see if the lines we have selected reach the end node
        if(completedPath(selectedLines, selectedNodes[1])){
            console.log('breaking')
            break
        }

        let minLine = minimumLine(currentNode, lines, selectedLines)
        selectedLines.push(minLine)

        // we need to change the currentNode to where the line went
        if(minLine.nodeA == currentNode){
            // we want to select nodeB to be the current node
            currentNode = minLine.nodeB
        }else{
            // we select nodeA to be the current node
            currentNode = minLine.nodeA
        }
        console.log(selectedLines)
        //console.log('computing')
    }
    console.log(selectedLines)
}

const computeLineLength = (lines) => {

    // get the parent div size to help convert the coords in % to px values
    const parentDiv = document.getElementById('nodes-div').getBoundingClientRect()

    for(let i = 0; i < lines.length; i++){
        const nodeA = lines[i].nodeA
        const nodeB = lines[i].nodeB

        const xDiff = nodeA.x - nodeB.x
        const yDiff = nodeA.y - nodeB.y

        const xPx = xDiff/100 * parentDiv.width
        const yPx = yDiff/100 * parentDiv.height

        const distance = xPx ** 2 + yPx ** 2
        console.log(`Distance between ${nodeA.number} and ${nodeB.number} is: ${Math.round(distance)/100}`)

        // assign the length value to the line
        lines[i].length = Math.round(distance)
    }
    return lines
}

const minimumLine = (nodeAt, lines, selectedLines) => {
    let minDistance = Infinity
    let line = null

    for(let i = 0; i < lines.length; i++){
        let currentLine = lines[i]
        // we first need to check if the line has been selected before
        if(!selectedLines.includes(currentLine)){
            if(currentLine.nodeA == nodeAt || currentLine.nodeB == nodeAt){
                if(currentLine.length < minDistance){
                    minDistance = currentLine.length
                    line = currentLine
                }
            }
        }
    }

    return line
}

const completedPath = (lines, endNode) => {
    for(let i = 0; i < lines.length; i++){
        if(lines[i].nodeA.number == endNode.number || lines[i].nodeB.number == endNode.number){
            // we have a completed path so we break here
            return true
        }
    }
    return false
}