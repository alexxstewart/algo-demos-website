export const checkUserAnswer = (computerPath, userPath) => {

    let simplifiedUserPath = []

    // we need to add the first numbers to the array before the loop begins
    const id = userPath[0].line.id
    const hyphenIndex = id.indexOf('-')
    const firstNum = id.substring(0,hyphenIndex)
    const lastNum = id.substring(hyphenIndex+1,id.length)

    if(computerPath[0] == firstNum){
        // add the firstNum first and the secondNum second
        simplifiedUserPath.push(firstNum)
        simplifiedUserPath.push(lastNum)
    }else{
        // add the second num first and the firstNum second
        simplifiedUserPath.push(lastNum)
        simplifiedUserPath.push(firstNum)
    }


    for(let i = 1; i < userPath.length; i++){
        const id = userPath[i].line.id
        const hyphenIndex = id.indexOf('-')
        const firstNum = id.substring(0,hyphenIndex)
        const lastNum = id.substring(hyphenIndex+1,id.length)

        // check which number already exists in the array then add the other
        if(simplifiedUserPath.includes(firstNum)){
            simplifiedUserPath.push(lastNum)
        }else{
            simplifiedUserPath.push(firstNum)
        }
    }

    // check to see if the paths are equal
    if(JSON.stringify(simplifiedUserPath) === JSON.stringify(computerPath)){
        return true
    }

    return false
}