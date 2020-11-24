export const drawLines = (nodes, lines) => {
    
    // delete previous lines
    deleteLines(lines)

    // create an array which represents which nodes have been visited
    let visitedNodeArray = initialiseVisitedNodesArray([], nodes.length)

    //get parent div
    const parentDiv = document.getElementById('nodes-div')

    let nodesLeft = true

    while(nodesLeft){
        for(let i = 0; i < nodes.length; i++){
            const currentNode = nodes[i]
            const closestNode = findClosestNode(nodes, currentNode, visitedNodeArray[i])
            if(closestNode != null){
                let line = createLine(currentNode.x, currentNode.y, closestNode.x, closestNode.y)
                lines.push(line)
                // now we must check that the line does not collide with any other lines
                if(!collision(lines, line)){
                    parentDiv.appendChild(line)
                }
                
                // make the nodes visited in the array
                visitedNodeArray[i][closestNode.number-1] = true
                console.log(closestNode.number-1, i)
                visitedNodeArray[closestNode.number-1][i] = true
            }
        }

        console.log(visitedNodeArray)

        // check if there are any unvisited nodes in the array
        if(!unvisitedNodes(visitedNodeArray)){
            nodesLeft = false;  
        }
         
    }
}

const findClosestNode = (nodes, currentNode, visitedArray) => {
    
    let minDistance = {
        distance: Infinity,
        closestNode: null
    }

    for(let i = 0; i < nodes.length; i++){
        let node = nodes[i]
        if(!visitedArray[node.number-1]){
            let distance = computeDistanceBetweenTwoNodes(currentNode, node)
            if(distance < minDistance.distance){
                minDistance = {
                    distance: distance,
                    closestNode: node
                }
            }
        }
    }
    return minDistance.closestNode
}

const computeDistanceBetweenTwoNodes = (nodeA, nodeB) => {
    const A_X = nodeA.x, A_Y = nodeA.y, B_X = nodeB.x, B_Y = nodeB.y
    const xDiff = A_X - B_X
    const yDiff = A_Y - B_Y
    return Math.pow(Math.abs(yDiff), 2) + Math.pow(Math.abs(xDiff), 2)
}

const createLineElement = (x, y, length, angle) => {
    let line = document.createElement('div');
    line.className = 'line'
    let styles = 'border: 1px solid greenyellow; '
               + 'width: ' + length + '%; '
               + 'height: 0px; '
               + '-moz-transform: rotate(' + angle + 'rad); '
               + '-webkit-transform: rotate(' + angle + 'rad);'
               + '-o-transform: rotate(' + angle + 'rad); '  
               + '-ms-transform: rotate(' + angle + 'rad); '  
               + 'position: absolute; '
               + 'top: ' + y + '%; '
               + 'left: ' + x + '%; '
               + 'z-index: 8;';
    line.setAttribute('style', styles);  
    return line;
}

const createLine = (x1, y1, x2, y2) => {

    let nodesDiv = document.getElementById("nodes-div")
    let divRect = nodesDiv.getBoundingClientRect()
    let topShift = divRect.top
    let width = divRect.width
    let height = divRect.height

    // first convert the coords back to pixels as they are in relative %
    x1 = x1/100 * width
    x2 = x2/100 * width
    y1 = y1/100 * height
    y2 = y2/100 * height

    let a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    let sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    let x = sx - c / 2,
        y = sy;

    let alpha = Math.PI - Math.atan2(-b, a);

    // convert the values back to relative values
    c = (c / width) * 100
    x = (x / width) * 100 + 2
    y = (y / height) * 100 + 4

    return createLineElement(x, y, c, alpha);
}

const deleteLines = lines => {
    const removeLines = (elements) => elements.forEach(element => {
        element.remove()
    });
    removeLines(document.querySelectorAll('.line'))
    lines = []
}

const initialiseVisitedNodesArray = (array, size) => {
    for(let i = 0; i < size; i++){
        array[i] = []
        for(let j = 0; j < size; j++){
            i === j ? array[i].push(true) : array[i].push(false)
        }
    }
    return array
}

const unvisitedNodes = (visitedArray) => {
    for(let i = 0; i < visitedArray.length; i++){
        let innerArray = visitedArray[i]
        for(let j = 0; j < innerArray.length; j++){
            if(!innerArray[j]){
                return true;
            }
        }
    }
}

const collision = (lines, line) => {
    return false;
}