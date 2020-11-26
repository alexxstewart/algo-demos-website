export const shortestPath = (lines, selectedNodes) => {
    lines = computeLineLength(lines)
    console.log(lines[0].length)

    // we start at the first selected node
    let currentNode = selectedNodes[0]

    // we need to also keep track of the lines that we have selected
    let selectedLines = []

    // we also need an array to store all the options for each iteration of the algorithm
    let lineOptions = []
    lineOptions = getOptions(lines, currentNode, lineOptions, selectedLines)

    // we can now iterate through the lines to compute the shortest path
    let count = 0;
    while(count < 8){
        count++
        console.log('Line Options: ')
        for(let i = 0; i < lineOptions.length; i++){
            console.log(lineOptions[i])
        }

        // do a check to see if the lines we have selected reach the end node
        if(completedPath(selectedLines, selectedNodes[1])){
            console.log('breaking')
            break
        }

        let minLine = minimumLine(lineOptions)
        selectedLines.push(minLine)
        
        // remove the now selected line from the options
        lineOptions = lineOptions.filter(item => item !== minLine)

        // we need to change the currentNode to where the line went
        if(minLine.nodeA == currentNode){
            // we want to select nodeB to be the current node
            currentNode = minLine.nodeB
        }else{
            // we select nodeA to be the current node
            currentNode = minLine.nodeA
        }

        //once we have selected a node we want to add the next nodes line to the lineOptions array
        lineOptions = getOptions(lines, currentNode, lineOptions, selectedLines) 

        console.log('Selected Lines: ')
        for(let i = 0; i < selectedLines.length; i++){
            console.log(selectedLines[i])
        }
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

const minimumLine = (potentialMinLines) => {
    let minDistance = Infinity
    let line = null

    for(let i = 0; i < potentialMinLines.length; i++){
        let currentLine = potentialMinLines[i]
        // all we need to do is select the line with the smallest distance
        if(currentLine.length < minDistance){
            minDistance = currentLine.length
            line = currentLine
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

const getOptions = (lines, node, potentialPathLines, selectedLines) => {
    // here we add all the lines that are available to select from
    for(let i = 0; i < lines.length; i++){
        let line = lines[i]

        // check if the line starts or ends at the node and that it isnt already selected and in the potentialPathLines array
        if((line.nodeA.number == node.number || line.nodeB.number == node.number) && !selectedLines.includes(line) && !potentialPathLines.includes(line)){
            potentialPathLines.push(line)
        }
    }
    return potentialPathLines
}