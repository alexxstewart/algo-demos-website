export function dragElements(nodes) {

    // get boundaires of parent div
    const parentSize = document.getElementById('nodes-div').getBoundingClientRect()
    for(let i = 0; i < nodes.length; i++){      
        // get node element
        let element = document.getElementById(`node${i+1}`)
        element.onmousedown = dragMouseDown
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
    
            console.log(e)
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
            /*
            // we know which node is being dragged but we need to delete all lines that connect to the node being dragged
            if(linesGenerated()){
                deleteLines(elmnt.id, getNumberOfNodes());
                drawNewLines(elmnt.id);
            }
            */
            e = e || window.event;
            e.preventDefault();
    
            //get the mouse position
            var mouseX = e.clientX;
            var mouseY = e.clientY;
    
            const belowTop = mouseY > parentSize.top + 25
            const aboveBottom = mouseY < parentSize.height + parentSize.top - 25
            const toRight = mouseX > 25
            const toLeft = mouseX < parentSize.width -25

            if( belowTop && aboveBottom ){
                element.style.top = `${((mouseY)/parentSize.height)*100-26}%`;
                if(toLeft && toRight){
                    element.style.left = `${((mouseX)/parentSize.width)*100-2}%`;
                }
            }else{
                if(toLeft && toRight){
                    element.style.left = `${((mouseX)/parentSize.width)*100-2}%`;
                }
            }
        }
    
        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    return console.log("returning")
}