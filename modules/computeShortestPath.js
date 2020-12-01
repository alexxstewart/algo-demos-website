import { Graph } from './graph.js'

export const shortestPath = (lines, nodes, selectedNodes) => {

    // add a line length propetry to the lines
    lines = computeLineLength(lines)

    // we first need to get the data into a form that we can use easily with the algorithm
    let g = new Graph();

    g = populateGraph(g, nodes, lines)

    let path = g.shortestPath(`${selectedNodes[0].number}`,`${selectedNodes[1].number}`)

    return path
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

        // assign the length value to the line
        lines[i].length = Math.round(Math.sqrt(distance))
    }
    return lines
}

const populateGraph = (graph, nodes, lines) => {

    // add nodes to the graph
    for(let i = 0; i < nodes.length; i++){
        graph.addNode(`${nodes[i].number}`)
    }

    // add the edges to the graph
    for(let i = 0; i < lines.length; i++){
        let line = lines[i]
        graph.addEdge(`${line.nodeA.number}`,`${line.nodeB.number}`, line.length)
        graph.addEdge(`${line.nodeB.number}`,`${line.nodeA.number}`, line.length)
    }

    return graph
}

