import { demoDone } from './main.js'

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
                if(linesNum == 0){
                    // add both the first and last coords of the first line
                    svgPath.push(currentLine.nodeA.x)
                    svgPath.push(currentLine.nodeA.y)
                }
                svgPath.push(currentLine.nodeB.x)
                svgPath.push(currentLine.nodeB.y)
                linesNum++

                // add the line length onto the running sum
                lineLengthSum += currentLine.length

            }else if(currentLine.nodeA.number == lineTo && currentLine.nodeB.number == lineFrom){
                if(linesNum == 0){
                    // add both the first and last coords of the first line
                    svgPath.push(currentLine.nodeB.x)
                    svgPath.push(currentLine.nodeB.y)
                }
                svgPath.push(currentLine.nodeA.x)
                svgPath.push(currentLine.nodeA.y)
                linesNum++

                // add the line length onto the running sum
                lineLengthSum += currentLine.length
            }
        }
    }
    animate(svgPath, lineLengthSum, linesNum)
}

function animate(pathCoords, length, numLines){
    
    // we need to convert line coords into pixel values
    const parentSize = document.getElementById('nodes-div').getBoundingClientRect()
    for(let i = 0; i < pathCoords.length; i += 2){
        pathCoords[i] = pathCoords[i]/100 * parentSize.width + 28;
        pathCoords[i+1] = pathCoords[i+1]/100 * parentSize.height + 28;
    }

    // now we can create the string
    let pathString = 'M'
    pathString += `${pathCoords[0]} ${pathCoords[1]} `
    for(let i = 2; i < pathCoords.length; i+=2){
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
        stroke-width: 10px;
        stroke: rgb(0, 140, 255);
    `;

    pathElement.setAttribute('style', styleString)

    // invoke function from main after svg line has finished rendering
    setTimeout(animationFinished, numLines * 1000);
}

const animationFinished = () =>{
    demoDone()
}


  