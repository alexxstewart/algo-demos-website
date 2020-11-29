export async function animatePath(lines, path) {
    for(let i = 0; i < path.length-1; i++){
        for(let j = 0; j < lines.length; j++){
            let lineFrom = path[i]
            let lineTo = path[i+1]
            let currentLine = lines[j]
            if(currentLine.nodeA.number == lineFrom && currentLine.nodeB.number == lineTo){
                await animateLine(currentLine)
            }else if(currentLine.nodeA.number == lineTo && currentLine.nodeB.number == lineFrom){
                await animateLine(currentLine)
            }
        }
    }
}

async function animateLine(line) {
    const iterations = 20

    // create a new line element to layover the old line
    const newLine = document.createElement('div')

    // get the parent div and add the line to it
    document.getElementById('nodes-div').appendChild(newLine)

    // get the line properties
    let angle = line.line.style.transform
    let xStart = line.line.style.left
    let yStart = line.line.style.top
    let length = line.line.style.width

    // convert the x and y coords to pixels
    let parentSize = document.getElementById('nodes-div').getBoundingClientRect()
    console.log('Parent size: ' + parentSize.width, parentSize.height)
    let x = parseInt(xStart.substring(0, xStart.length-1))/100 * parentSize.width
    let y = parseInt(yStart.substring(0, yStart.length-1))/100 * parentSize.height

    // convert the length to pixels
    let lengthNum = parseInt(length.substring(0, length.length-1))/100 * parentSize.width

    let lengthPerIteration = lengthNum/iterations
    let currentLength = lengthNum

    let newElement = document.createElement('div')

    let yShift = 0 //lengthNum/20
    let xShift = 0 //lengthNum/30

    let yIterationShift = 0//lengthNum/50
    let xIterationShift = 0//lengthNum/100

    console.log(lengthNum)
    console.log(xShift, yShift)
    console.log(xIterationShift, yIterationShift)

    let style = 'border: 5px solid purple; '
   + 'background-color: red;'
   + 'width: ' + 100 + 'px; '
   + 'height: 4px; '
   + 'position: relative; '
   + '-moz-transform: ' + angle + '; '
   + '-webkit-transform: ' + angle + ';'
   + '-o-transform: ' + angle + '; ' 
   + '-ms-transform: ' + angle + '; '
   + 'top: ' + (y -= yShift) + 'px; '
   + 'left: ' + (x += xShift) + 'px; '
   + 'z-index: 9;';

   newElement.setAttribute('style', style)

   document.getElementById('nodes-div').appendChild(newElement)

   console.log(x, y)
   // now can we loop over it to increase the width
   let width = 0
   for(let i = 0; i < iterations; i++){
       newElement.style.width = `${width += lengthPerIteration}px`
       newElement.style.top = `${y += yIterationShift}px`
       newElement.style.left = `${x -= xIterationShift}px`
       await sleep(30)
   }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  