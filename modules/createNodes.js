export const createNodesArray = (numNodes) => {
    var nodes = []

    const parentSize = document.getElementById('nodes-div').getBoundingClientRect()
    const maxX = parentSize.width
    const minX = 0
    const minY = parentSize.top
    const maxY = parentSize.height

    // create default values instead of random values
    const defaultCoordsArray = [[20,20], [80,60], [50,50], [30,70], [60,20]]

    for(let i = 1; i < numNodes+1; i++){
        var node = {
            number: i,
            html: `<div id=node${i}><p>${i}</p></div>`,
            x: defaultCoordsArray[i-1][0],
            y: defaultCoordsArray[i-1][1]
        }
        nodes.push(node)
    }

    return nodes
}

export const printNodes = nodesArray => {
    const parentDiv = document.getElementById('nodes-div')
    parentDiv.innerHTML = null
    nodesArray.forEach((element, index) => {
        parentDiv.innerHTML += element.html
        const nodeDiv = document.getElementById(`node${index+1}`)

        var nodeStyle = 'color: white;'
        + 'background-color: black;'
        + 'position: absolute;'
        + 'width: 50px;'
        + 'height: 50px;'
        + 'left: ' + element.x + '%;'
        + 'top: ' + element.y + '%;'
        + 'cursor: move;'
        + 'border-radius: 50%;'
        + 'display: flex;'
        + 'justify-content: center;'
        + 'align-items: center;'
        + 'z-index: 10;';

        nodeDiv.setAttribute('style', nodeStyle)
    });
}

export const addNewNode = nodes => {
    var node = {
        number: nodes.length+1,
        html: `<div id=node${nodes.length+1}><p>${nodes.length+1}</p></div>`,
        x: 50,
        y: 50
    }

    nodes.push(node)
    return nodes
}