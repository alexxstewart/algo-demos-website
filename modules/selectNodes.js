import { selectLinesBetweenNodes } from '/modules/main.js' 

export const selectNodes = (nodes, array, lines) => {
    for(let i = 0; i < nodes.length; i++){

        // get current node
        let currentNode = document.getElementById(`node${i+1}`)
        let node = nodes[i]

        // set the cursor to 'pointer'
        currentNode.style.cursor = 'pointer'

        // add hover events
        currentNode.onmouseover = hoverInEvent
        currentNode.onmouseout = hoverOutEvent

        currentNode.onmousedown = (e) => {
            let elementSelected = e.path[0]
            array.push(node)
            elementSelected.style.backgroundColor = 'orangered'
            elementSelected.style.borderColor = 'orangered'

            // remove the mouse event handlers for this node
            currentNode.onmouseout = null
            currentNode.onmouseover = null
            
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

const hoverInEvent = (e) => {
    const node = e.toElement
    node.style.backgroundColor = 'orangered'
}

const hoverOutEvent = (e) => {
    const node = e.fromElement
    node.style.backgroundColor = 'black'
}