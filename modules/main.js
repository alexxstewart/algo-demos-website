import { createNodesArray, printNodes } from '/modules/createNodes.js';
import { dragElements } from '/modules/dragNode.js'

var nextButton = document.getElementById('next-button')
var addNodeButton = document.getElementById('add-node-button')

var nodes = []
var lines = []


function setUp(){
    // add button listeners to buttons
    if(nextButton != null && addNodeButton != null){
        nextButton.addEventListener('click', selectStartAndEndNode)
        addNodeButton.addEventListener('click', addAnotherNode)
    }

    // create 5 new nodes to place on the screen and print them.
    nodes = createNodesArray(5)
    printNodes(nodes)

    // allow these nodes to be dragged
    dragElements(nodes)

}


function addAnotherNode(){
    nodes = addNodeToArray(nodes)

    reprint()
}

function selectStartAndEndNode(){
    console.log("next step")
}

var readJsFiles = url => {
    let head = document.getElementsByTagName('head')[0]
    let script = document.createElement('script')
    script.src = url
    head.appendChild(script)
}



setUp()