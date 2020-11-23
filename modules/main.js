import { createNodesArray, printNodes } from '/modules/createNodes.js';

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

    // create 5 new nodes to place on the screen.
    nodes = createNodesArray(5)
    printNodes(nodes)
    // print nodes to screen

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