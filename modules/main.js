import { createNodesArray, printNodes, addNewNode } from '/modules/createNodes.js';
import { dragElements, disableNodeDrag } from '/modules/dragNode.js'
import { drawLines } from '/modules/drawLines.js'
import { selectNodes, stopNodeSelection, showStartAndEnd } from '/modules/selectNodes.js'
import { lineSelection } from '/modules/selectLines.js'
import { shortestPath } from './computeShortestPath.js' 

let nextButton = document.getElementById('next-button')
let addNodeButton = document.getElementById('add-node-button')

let nodes = []
let lines = []
let selectedNodesArray = []
let selectedLines = []


function setUp(){

    // add button listeners to buttons
    nextButton.addEventListener('click', selectStartAndEndNode)
    addNodeButton.addEventListener('click', addAnotherNode)

    // create 5 new nodes to place on the screen and print them.
    nodes = createNodesArray(5)
    printNodes(nodes)
    lines = drawLines(nodes, lines)
    // allow these nodes to be dragged
    dragElements(nodes, lines)
}


function addAnotherNode(){
    nodes = addNewNode(nodes)
    printNodes(nodes)
    lines = drawLines(nodes, lines)
    dragElements(nodes, lines)
}

function displayTextUnderTitle(text){

    let parentElement = document.getElementById('text-space')
    parentElement.innerHTML = `<p>${text}</p>`
}

function deleteTopButtons(){
    let buttonDiv = document.getElementById('button-div')
    buttonDiv.parentNode.removeChild(buttonDiv)
}

// once two nodes have been selected we can allow the user to draw a path between these nodes
export function selectLinesBetweenNodes(array){

    // now disable the ability to add nodes to the array
    stopNodeSelection(nodes)

    // display new text to the screen
    displayTextUnderTitle('Click on lines between nodes to input your path')

    // show start and end nodes
    showStartAndEnd(array)

    lineSelection(nodes, lines, array)

}

export function validateUserAnswer(pathSelected){
    const path = shortestPath(lines, selectedNodesArray)
    console.log(path)
}

export function updateLines(newLines){
    lines = newLines
}

function selectStartAndEndNode(){

    disableNodeDrag(nodes)

    deleteTopButtons()

    displayTextUnderTitle('Select a start and an end node')

    selectNodes(nodes, selectedNodesArray, lines)
}

const resizeEvent = () => {
    printNodes(nodes)
    lines = drawLines(nodes, lines)
}

window.addEventListener('resize', resizeEvent)

setUp()