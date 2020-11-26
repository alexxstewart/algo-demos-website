export const shortestPath = (lines, selectedNodes) => {
    lines = computeLineLength(lines)
    console.log(lines[0].length)

    // we start at the first selected node
    let currentNode = selectedNodes[0]

    // we need to also keep track of the lines that we have selected

    // we can now iterate through the lines to compute the shortest path
    while(true){
        minimumLine(lines, )
    }
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

const minimumLine = (lines, selectedLines) => {

    return line
}