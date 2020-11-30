export async function animatePath(lines, path) {

    // create an svg element and add it to the nodes-div element
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('height', document.getElementById('nodes-div').getBoundingClientRect().height)
    svg.setAttribute('width', document.getElementById('nodes-div').getBoundingClientRect().width)
    svg.setAttribute('id', 'line-container')
    document.getElementById('nodes-div').appendChild(svg)
    
    for(let i = 0; i < path.length-1; i++){
        for(let j = 0; j < lines.length; j++){
            let lineFrom = path[i]
            let lineTo = path[i+1]
            let currentLine = lines[j]
            if(currentLine.nodeA.number == lineFrom && currentLine.nodeB.number == lineTo){
                addSVGLine(currentLine)
            }else if(currentLine.nodeA.number == lineTo && currentLine.nodeB.number == lineFrom){
                addSVGLine(currentLine)
            }
        }
    }
}

function addSVGLine(line){

    // get the coords of the lines end points
    let nodeA_x = line.nodeA.x
    let nodeA_y = line.nodeA.y
    let nodeB_x = line.nodeB.x
    let nodeB_y = line.nodeB.y

    const shift = 25
    // convert coords to pixel values
    const parentSize = document.getElementById('nodes-div').getBoundingClientRect()
    nodeA_x = nodeA_x/100 * parentSize.width + shift
    nodeA_y = nodeA_y/100 * parentSize.height + shift
    nodeB_x = nodeB_x/100 * parentSize.width + shift
    nodeB_y = nodeB_y/100 * parentSize.height + shift

    // add the css animation
    //cssAnimation()

    console.log(nodeA_x, nodeA_y, nodeB_x, nodeB_y)
    // create a line and add it to the svg element
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('id','line1');
    newLine.setAttribute('x1',nodeA_x);
    newLine.setAttribute('y1',nodeA_y);
    newLine.setAttribute('x2',nodeB_x);
    newLine.setAttribute('y2',nodeB_y);
    newLine.setAttribute("stroke", "yellow")
    newLine.setAttribute('stroke-width', 15)
    document.getElementById('line-container').appendChild(newLine)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/*
============================================================
*/

function cssAnimation(){
    var style = document.createElement('style');
    const lineLength = 2000
    var keyFrames = `
    #line1 {
        stroke-dasharray: ${lineLength};
        stroke-dashoffset: ${lineLength};
        animation: dash 5s linear forwards;
    }
    @keyframes dash {
        to {
            stroke-dashoffset: 0;
        }
    }
    @keyframes dash {
        to {
            stroke-dashoffset: 0;
        }
    }`;
    document.getElementsByTagName('head')[0].appendChild(style);
}


  