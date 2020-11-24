export const checkCollision = (nodes, lines, line) => {
    const lineCollision = checkLines(lines, line)
    const nodeCollision = checkNodes(nodes, line)
    if(lineCollision || nodeCollision){
        return true
    }
    return false
}

const checkLines = (lines, line) => {

    let x1 = line.nodeA.x, y1 = line.nodeA.y, x2 = line.nodeB.x, y2 = line.nodeB.y

    for(let i = 0; i < lines.length; i++){
        // get current line to check
        let nodeA = lines[i].nodeA
        let nodeB = lines[i].nodeB
        let x3 = nodeA.x, y3 = nodeA.y, x4 = nodeB.x, y4 = nodeB.y 
        if(lineIntersect(x1,y1,x2,y2,x3,y3,x4,y4)){
            return true
        }
    }
    return false
}

const checkNodes = (nodes, line) => {

}

const lineIntersect = (a,b,c,d,p,q,r,s) => {
    var lThan = -1;
    var gThan = 1
    if(((lThan<(a-p) && (a-p)<gThan) && (lThan<(b-q) && (b-q)<gThan)) || ((lThan<(a-r) && (a-r)<gThan) && (lThan<(b-s) && (b-s)<gThan)) || ((lThan<(c-p) && (c-p)<gThan) && (lThan<(d-q) && (d-q)<gThan)) || ((lThan<(c-r) && (c-r)<gThan) && (lThan<(d-s) && (d-s)<gThan))){
        return false;
    }
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}