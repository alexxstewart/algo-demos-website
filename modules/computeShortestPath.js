import { Graph } from './graph.js'

export const shortestPath = (lines, nodes, selectedNodes) => {

    // add a line length propetry to the lines
    lines = computeLineLength(lines)

    // we first need to get the data into a form that we can use easily with the algorithm
    let g = new Graph();

    g = populateGraph(g, nodes, lines)
}

const djikstraAlgorithm = (startNode) => {
    let distances = {};
 
    // Stores the reference to previous nodes
    let prev = {};
    let pq = new PriorityQueue(this.nodes.length * this.nodes.length);
 
    // Set distances to all nodes to be infinite except startNode
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);
    this.nodes.forEach(node => {
       if (node !== startNode) distances[node] = Infinity;
       prev[node] = null;
    });
 
    while (!pq.isEmpty()) {
       let minNode = pq.dequeue();
       let currNode = minNode.data;
       let weight = minNode.priority;
       this.edges[currNode].forEach(neighbor => {
          let alt = distances[currNode] + neighbor.weight;
          if (alt < distances[neighbor.node]) {
             distances[neighbor.node] = alt;
             prev[neighbor.node] = currNode;
             pq.enqueue(neighbor.node, distances[neighbor.node]);
          }
       });
    }
    return distances;
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

const populateGraph = (graph, nodes, lines) => {

    // add nodes to the graph
    for(let i = 0; i < nodes.length; i++){
        graph.addNode(`${nodes[i].number}`)
    }

    console.log(graph.nodes())

    // add the edges to the graph
    //graph.addDirectedEdge("E", "G", 50);
}

