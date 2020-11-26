import { validateUserAnswer } from './main.js'

let globalNodes = null
let globalLines = null
let selectedLines = []
let selectedNodes = null

export const lineSelection = (nodes, lines, inputNodes) => {

    globalNodes = nodes
    globalLines = lines
    selectedNodes = inputNodes

    /* We iterate through the lines, if a line is connected to the start node then we allow it to be
     highlighted and selected. If a line is selected then we call another function to give the user options to select lines from that node
    */
   highlightLinesFromCurrentNode(selectedNodes[0], lines)
}

/*
This function is called from the line selection function. It allows lines to be highlighted that are connected
to the current node 
*/
const highlightLinesFromCurrentNode = (currentNode, lines) => {

    //if there are already lines from the start node to the end node then stop here
    if(checkPathFromStartToEnd(selectedLines, selectedNodes)){
        validateUserAnswer(selectedLines)
    }else{
        console.log(selectedLines.length)
        for(let i = 0; i < lines.length; i++){
            
            // get current line
            let line = lines[i]

            // first check if the line has already been selected
            if(lineNotSelected(line)){
                if(line.nodeA.number == currentNode.number || line.nodeB.number == currentNode.number){
                    highlightLineOnHover(line, currentNode.number)
                }
            }
        }
    }
}

const highlightLineOnHover = (line, currentNodeNumber) => {
    // get the line element
    let  lineElement = line.line

    lineElement.onmouseover = () => {
        lineElement.style.height = '4px';
        lineElement.style.backgroundColor = 'yellow';
        lineElement.style.cursor = 'pointer';
    }
    
    lineElement.onmouseout = () => {
        lineElement.style.height = '0px';
        lineElement.style.backgroundColor = '';
    }
    
    lineElement.onclick = () => {
        
        // stop all current event handlers for the line
        stopEvents(globalLines)
        lineElement.style.height = '4px';
        lineElement.style.backgroundColor = 'red';
        lineElement.style.cursor = 'default';

        selectedLines.push(line)

        if(line.nodeA.number == currentNodeNumber){
            highlightLinesFromCurrentNode(line.nodeB, globalLines)
        }else{
            highlightLinesFromCurrentNode(line.nodeA, globalLines)
        }
    }
}

const checkPathFromStartToEnd = (lines, nodes) => {

    const endNode = nodes[1]

    // we just want to iterate through the selected lines and see if any of the lines join to the end node
    for(let i = 0; i < lines.length; i++){
        let currentLine = lines[i]
        if(currentLine.nodeA.number == endNode.number){
            return true
        }else if(currentLine.nodeB.number == endNode.number){
            return true
        }
    } 
    return false
}


const stopEvents = (lines) => {
    for(let i = 0; i < lines.length; i++){
        let currentLineElement = lines[i].line
        currentLineElement.onmouseover = null
        currentLineElement.onmouseout = null
    }
}

const lineNotSelected = (line) => {
    // check that the line has not been selected
    for(let i = 0; i < selectedLines.length; i++){
        if(selectedLines[i].line.id == line.line.id){
            return false
        }
    }
    return true
}