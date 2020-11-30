export async function animatePath(lines, path) {

    // create an svg element and add it to the nodes-div element
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('height', document.getElementById('nodes-div').getBoundingClientRect().height)
    svg.setAttribute('width', document.getElementById('nodes-div').getBoundingClientRect().width)
    svg.setAttribute('id', 'line-container')
    document.getElementById('nodes-div').appendChild(svg)

    let linesNum = 0
    let svgPath = []
    let lineLengthSum = 0
    for(let i = 0; i < path.length-1; i++){
        for(let j = 0; j < lines.length; j++){
            let lineFrom = path[i]
            let lineTo = path[i+1]
            let currentLine = lines[j]
            if(currentLine.nodeA.number == lineFrom && currentLine.nodeB.number == lineTo){
                console.log(`Path from ${lineFrom} to ${lineTo}`)
                if(linesNum == 0){
                    // add both the first and last coords of the first line
                    svgPath.push(currentLine.nodeA.x)
                    svgPath.push(currentLine.nodeA.y)
                }
                svgPath.push(currentLine.nodeB.x)
                svgPath.push(currentLine.nodeB.y)
                linesNum++

                // add the line length onto the running sum
                lineLengthSum += Math.sqrt(currentLine.length)

            }else if(currentLine.nodeA.number == lineTo && currentLine.nodeB.number == lineFrom){
                console.log(`Path from ${lineFrom} to ${lineTo}`)
                if(linesNum == 0){
                    // add both the first and last coords of the first line
                    svgPath.push(currentLine.nodeB.x)
                    svgPath.push(currentLine.nodeB.y)
                }
                svgPath.push(currentLine.nodeA.x)
                svgPath.push(currentLine.nodeA.y)
                linesNum++

                // add the line length onto the running sum
                lineLengthSum += Math.sqrt(currentLine.length)
            }
        }
    }
    animate(svgPath, lineLengthSum, linesNum)
}

function animate(pathCoords, length, numLines){
    
    // we need to convert line coords into pixel values
    const parentSize = document.getElementById('nodes-div').getBoundingClientRect()
    for(let i = 0; i < pathCoords.length; i += 2){
        pathCoords[i] = pathCoords[i]/100 * parentSize.width + 25;
        pathCoords[i+1] = pathCoords[i+1]/100 * parentSize.height + 25;
    }

    // now we can create the string
    let pathString = 'M'
    pathString += `${pathCoords[0]} ${pathCoords[1]} `
    for(let i = 2; i < pathCoords.length; i+=2){
        console.log(pathCoords[i], pathCoords[i+1])
        pathString += `L${pathCoords[i]} ${pathCoords[i+1]} `
    }

    // now we can create the path element and add the pathString as a d property
    let pathElement = document.createElementNS('http://www.w3.org/2000/svg','path')
    pathElement.setAttribute('d', pathString)

    // add the new element to the svg container
    document.getElementById('line-container').appendChild(pathElement)

    const styleString = `
        fill: none;
        stroke-dasharray: ${length};
        stroke-dashoffset: ${length};
        animation: dash ${numLines}s linear forwards;
        stroke-width: 20px;
        stroke: red;
    `;

    pathElement.setAttribute('style', styleString)
    /*
    path {
    fill: none;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: dash 5s linear forwards;
    stroke-width: 20px;
    stroke: yellow;
    }
    */
}

function computeLength(coords){
    
    let distance = 0;

    // iterate through the coords and add the distance for each line on along the way
}
async function addSVGLine(line, lineNumber){
    console.log("Adding SVG line")
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
    cssAnimation(lineNumber)

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
    sleep(5000)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/*
============================================================
*/

function cssAnimation(lineNum){
    var style = document.createElement('style');
    const lineLength = 2000
    var keyFrames = `
    #line${lineNum} {
        stroke-dasharray: ${lineLength};
        stroke-dashoffset: ${lineLength};
        animation: dash 5s linear forwards;
    }`;
    document.getElementsByTagName('head')[0].appendChild(style);
}


  