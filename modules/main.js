import { createNodesArray, printNodes, addNewNode } from '/modules/createNodes.js';
import { dragElements, disableNodeDrag } from '/modules/dragNode.js'
import { drawLines } from '/modules/drawLines.js'
import { selectNodes, stopNodeSelection } from '/modules/selectNodes.js'
import { lineSelection } from '/modules/selectLines.js'
import { shortestPath } from './computeShortestPath.js' 
import { animatePath } from './animations.js'
import { checkUserAnswer } from './checkAnswer.js'

let nextButton = document.getElementById('next-button')
let addNodeButton = document.getElementById('add-node-button')

let nodes = []
let lines = []
let selectedNodesArray = []
let selectedLines = []
let userAnswerValue = false

let currentState = ''


function setUp(){
    // reset all the arrays
    nodes = []
    lines = []
    selectedNodesArray = []
    selectedLines = []

    currentState = 'setup'

    // add button listeners to buttons
    nextButton.addEventListener('click', selectStartAndEndNode)
    addNodeButton.addEventListener('click', addAnotherNode)

    // create 5 new nodes to place on the screen and print them.
    nodes = createNodesArray(6)
    printNodes(nodes)
    lines = drawLines(nodes, lines)
    // allow these nodes to be dragged
    dragElements(nodes, lines)
}


function addAnotherNode(){
    currentState = 'added node'
    nodes = addNewNode(nodes)
    printNodes(nodes)
    lines = drawLines(nodes, lines)
    dragElements(nodes, lines)
}

export function displayTextUnderTitle(text1, text2 = ''){

    let parentElement = document.getElementById('text-space')
    parentElement.innerHTML = `<p>${text1}</p>`

    if(text2 !== ''){
        parentElement.innerHTML = `<p>${text1}</p>
        <p>${text2}</p>`
    }
}

function deleteTopButtons(){
    document.getElementById('button-div').innerHTML = ''
}

// once two nodes have been selected we can allow the user to draw a path between these nodes
export function selectLinesBetweenNodes(array){

    currentState = 'user path'
    // now disable the ability to add nodes to the array
    stopNodeSelection(nodes)

    // display new text to the screen
    displayTextUnderTitle('Select Lines Starting At The Start Node And Ending At The End Node To Create Your Path')

    lineSelection(nodes, lines, array)

}

export function validateUserAnswer(pathSelected){
    currentState = 'showing answer'

    displayTextUnderTitle('Computing Shortest Path Now...')
    
    const path = shortestPath(lines, nodes, selectedNodesArray)
    
    userAnswerValue = checkUserAnswer(path, pathSelected)

    animatePath(lines, path)
}

export function demoDone(){

    if(userAnswerValue){
        displayTextUnderTitle('Correct Path! Well Done', 'Scroll Down To See How This Works Or Play Again.')
        addPlayAgainButton()
    }else{
        displayTextUnderTitle('Incorrect Path', 'Scroll Down To See How This Works Or Play Again.')
        addPlayAgainButton()
    }
}

export function updateLines(newLines){
    lines = newLines
}

function addPlayAgainButton(){
    const buttonDiv = document.getElementById('button-div')
    const newButton = document.createElement('button')
    newButton.innerHTML = 'Play Again'
    newButton.setAttribute('id', 'play-again-button')
    newButton.onclick = startDemoAgain
    buttonDiv.appendChild(newButton)
}

function selectStartAndEndNode(){

    disableNodeDrag(nodes)

    deleteTopButtons()

    displayTextUnderTitle('Select a Start Node')

    // remove previous nodes
    selectedNodesArray = []

    selectNodes(nodes, selectedNodesArray, lines)
}

function startDemoAgain(){
    document.getElementById('nodes-div').innerHTML = ''
    displayTextUnderTitle('Drag Nodes and Add New Nodes to Create the Map')
    createButtonsAgain()
    setUp()
}

function createButtonsAgain(){
    const parentDiv = document.getElementById('button-div')
    parentDiv.innerHTML = ''

    addNodeButton = document.createElement('button')
    addNodeButton.innerHTML = 'Add Node'
    addNodeButton.setAttribute('id', 'add-node-button')

    nextButton = document.createElement('button')
    nextButton.innerHTML = 'Next'
    nextButton.setAttribute('id', 'next-button')

    parentDiv.appendChild(addNodeButton)
    parentDiv.appendChild(nextButton)
}

const resizeEvent = () => {
    if(currentState == 'setup'){
        printNodes(nodes)
        lines = drawLines(nodes, lines)
        dragElements(nodes, lines)
    }else if(currentState == 'added node'){
        printNodes(nodes)
        lines = drawLines(nodes, lines)
        dragElements(nodes, lines)
    }
}

window.addEventListener('resize', resizeEvent)

setUp()