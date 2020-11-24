import { createNodesArray, printNodes, addNewNode } from '/modules/createNodes.js';
import { dragElements } from '/modules/dragNode.js'
import { drawLines } from '/modules/drawLines.js'

var nextButton = document.getElementById('next-button')
var addNodeButton = document.getElementById('add-node-button')

var nodes = []
var lines = []


function setUp(){

    // add button listeners to buttons
    nextButton.addEventListener('click', selectStartAndEndNode)
    addNodeButton.addEventListener('click', addAnotherNode)

    // create 5 new nodes to place on the screen and print them.
    nodes = createNodesArray(5)
    printNodes(nodes)
    drawLines(nodes, lines)
    // allow these nodes to be dragged
    dragElements(nodes, lines)

}


function addAnotherNode(){
    nodes = addNewNode(nodes)
    printNodes(nodes)
    drawLines(nodes, lines)
    dragElements(nodes, lines)
}

function selectStartAndEndNode(){
    console.log('next step')
}

const resizeEvent = (message) => {
    console.log(message)
}

window.addEventListener('resize', resizeEvent)

setUp()