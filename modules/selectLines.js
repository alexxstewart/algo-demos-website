export const lineSelection = (nodes, lines, selectedNodes, selectedLines) => {

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

    for(let i = 0; i < lines.length; i++){
        
        // get current line
        let line = lines[i]

        if(line.nodeA.number == currentNode.number || line.nodeB.number == currentNode.number){
            highlightLineOnHover(line)
        }
    }

}

const highlightLineOnHover = (line) => {

    // get the parent div
    let parentDiv = document.getElementById('nodes-div')

    // get the line element
    let  lineElement = line.line
    console.log(lineElement)

    //let elements = document.getElementsByClassName('line')
    //console.log(elements)

    //let element = document.getElementById('1-4')
    //lineElement.parentNode.removeChild(lineElement)

    let gotElement = document.getElementById(lineElement.id)
    console.log(gotElement === lineElement)
    console.log(gotElement)

    // create a new line element
    let newLineElement = document.createElement('div');

    lineElement.onmouseover = () => {

        console.log('mouse over')

        // remove the line from the page
        lineElement.parentNode.removeChild(lineElement)
    
        let length = lineElement.style.width
        let angle = lineElement.style.transform
        let x = lineElement.style.left
        let y = lineElement.style.top

        let xNumber = parseInt(x.substring(0, x.length-1)) - 0.01
        let yNumber = parseInt(y.substring(0, y.length-1)) - 1 

        console.log(xNumber, yNumber)
        newLineElement.className = 'line'
        let styles = 'border: 5px solid yellow; '
                   + 'width: ' + length + '; '
                   + 'height: 0px; '
                   + '-moz-transform: ' + angle +'; '
                   + '-webkit-transform: ' + angle +'; '
                   + '-o-transform: ' + angle +'; '
                   + '-ms-transform: ' + angle +'; '  
                   + 'position: absolute; '
                   + 'top: ' + yNumber + '% ; '
                   + 'left: ' + xNumber + '% ; '
                   + 'z-index: 8;';
        newLineElement.setAttribute('style', styles);  
    
        parentDiv.appendChild(newLineElement)
    }
    
    newLineElement.onmouseout = () => {
        console.log('mouse out event')
        newLineElement.parentNode.removeChild(newLineElement)
        parentDiv.appendChild(lineElement)
    }
    
}

const checkPathFromStartToEnd = () => {
    
}

const highlight = (lineElement) => {
}