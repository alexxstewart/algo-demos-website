import { drawLines } from "./drawLines.js"

export function dragElements(nodes, lines) {
    // get boundaires of parent div
    for(let i = 0; i < nodes.length; i++){      
        //get the node from the array
        let currentNode = nodes[i]
        // get node element from DOM
        let element = document.getElementById(`node${i+1}`)
        element.onmousedown = dragMouseDown
        
        function dragMouseDown(e) {
            e = e || window.event
            e.preventDefault()
  
            document.onmouseup = closeDragElement
            document.onmousemove = elementDrag
        }
    
        function elementDrag(e) {
            e = e || window.event
            e.preventDefault()
    
            //get the size of the parent div when the element is clicked
            const parentSize = document.getElementById('nodes-div').getBoundingClientRect()

            //get the mouse position
            var mouseX = e.clientX
            var mouseY = e.clientY
    
            const belowTop = mouseY > parentSize.top + 25
            const aboveBottom = mouseY < parentSize.height + parentSize.top - 25
            const toRight = mouseX > 25
            const toLeft = mouseX < parentSize.width -25

            let newY = (mouseY/parentSize.height)*100-26
            let newX = (mouseX/parentSize.width)*100-2

            if( belowTop && aboveBottom ){
                element.style.top = `${newY}%`
                currentNode.y = newY
                if(toLeft && toRight){
                    element.style.left = `${newX}%`
                    currentNode.x = newX
                }
            }else{
                if(toLeft && toRight){
                    element.style.left = `${newX}%`
                    currentNode.x = newX
                }
            }

            drawLines(nodes, lines)
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null
            document.onmousemove = null
        }
    }
}