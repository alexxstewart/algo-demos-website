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
    readJsFiles('/modules/printTaskBar.js')
    console.log(value)
    printNewTaskBar('hello')
    
    createNodesArray('print')
}

function onStart(){

    // create nodes creates the nodes and returns an array of node objects
    //nodes = createNodesArray()

    //lines = createLines(nodes)

    //printNodes(nodes)

    //printLines(lines)


}

function addAnotherNode(){
    console.log("Add another node")
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
onStart()