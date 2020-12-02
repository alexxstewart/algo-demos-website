import { selectLinesBetweenNodes } from '/modules/main.js' 

export const selectNodes = (nodes, array, lines) => {
    
    for(let i = 0; i < nodes.length; i++){

        // get current node
        let currentNode = document.getElementById(`node${i+1}`)
        let node = nodes[i]

        // set the cursor to 'pointer'
        currentNode.style.cursor = 'pointer'

        // add hover events
        currentNode.onmouseover = function(){
            currentNode.style.backgroundColor = 'orangered'
        }
        currentNode.onmouseout = function(){
            currentNode.style.backgroundColor = 'black'
        }

        currentNode.onmousedown = (e) => {
            let elementSelected = null
            if(e.target.nodeName === 'P'){
                elementSelected = e.path[1]
            }else{
                elementSelected = e.path[0]
            }

            // change the style of the node
            elementSelected.style.backgroundColor = 'orangered'
            elementSelected.style.borderColor = 'orangered'

            // remove the mouse event handlers for this node
            currentNode.onmouseout = null
            currentNode.onmouseover = null
            
            // create new p element to display the text
            let pElement = document.createElement('p')
            pElement.style.alignContent = 'center'

            // remove the current content from within the node and add the new content
            currentNode.innerHTML = ''
            currentNode.appendChild(pElement)
            
            // we change the inner text of the node
            if(array.length == 0){
                pElement.innerHTML = 'Start Here'
            }else if(array.length == 1){
                pElement.innerHTML = 'End Here'
            }
            
            // add the node to the selected nodes array
            array.push(node)

            if(array.length == 2){
                removeNodeHoverEvents(nodes)
                selectLinesBetweenNodes(array, lines)
            }
        }
    }
}

export const stopNodeSelection = (nodes) => {
    for(let i = 0; i < nodes.length; i++){

        // get current node
        let currentNode = document.getElementById(`node${i+1}`)

        // set the cursor to 'grab'
        currentNode.style.cursor = 'default'

        // do nothing on mouse down
        currentNode.onmousedown = null
    }
}

export const showStartAndEnd = (array) => {

    let startNode = array[0]
    let endNode = array[1]

    startNode.innerHTML = '<p>Start Here</p>'
    endNode.innerHTML = '<p>End Here</p>'
}

const removeNodeHoverEvents = (nodes) => {
    for(let i = 0; i < nodes.length; i++){

        // get the node
        const node = document.getElementById(`node${i+1}`)
        node.onmouseover = null
        node.onmouseout = null
    }
}