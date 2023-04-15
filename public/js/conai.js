var evaluation = 0

//generic board, win in one for rød

var height = 6
var width = 7
var winLength = 4

var boardValss = {}
for (let x = 0; x < width; x++){
    boardValss[x] = [];
    for (let y = 0; y < height; y++){
        boardValss[x].push(0)
    }
}

function evaluate(incBoard,depth,turn,aiTurn){ //evaluer posisjonen
    let boardVals = incBoard
    let highestEval = 0

    if (depth < 0){ //hvis dybden er nådd
        return 0
    }

    //sjekk om det er et move som vinner spillet

    for (let i = 0; i < width; i++){
        
        //hvis noen har vunnet eller tapt
        let winResult = checkWin(boardVals,turn,aiTurn,winLength,width,height)
        if (winResult > 0){
            return 1
        } else if(winResult < 0){
            return -1
        } else if(checkDraw(boardVals,width,height)){
            return 0
        } else {

            //sjekker om det er et valid move for ai-en å gjøre i kolonnen i
            var row = -1

            for (let j = 0; j < height+1; j++){
                if (boardVals[i][height-j] == 0){ //move er valid
                    row = height - j
                    break
                }
            }


            if (!(row == -1)){ //hvis ikke kolonnen fylt
            
                let nextBoard = copyBoard(boardVals)
                let nextDepth = depth - 1
                if (!(turn == aiTurn)){
                    nextBoard[i][row] = turn
                } else {
                    nextBoard[i][row] = aiTurn //lagrer neste board
                }

                //console.log("checking " + i + [row])
                //console.log(nextBoard)

                let max_turns = 2

                if (turn == max_turns) { //
                    nextTurn = 1;
            
                } else {
                    nextTurn = turn + 1
                }

                let nextIteration = evaluate(nextBoard,nextDepth,nextTurn,aiTurn)

                if (nextIteration > 0){ //hvis brettet framover vinner
                    if ((nextIteration < highestEval && Math.abs(nextIteration) < Math.abs(highestEval)) || highestEval == 0 ){
                        highestEval = nextIteration
                    }
                } else if (nextIteration < 0 ){
                    if (nextIteration < highestEval && Math.abs(nextIteration) < Math.abs(highestEval) || highestEval == 0){
                        highestEval = nextIteration
                        console.log("lost")
                    }
                }
            }
        }
    }
    if (highestEval > 0){ //hvis brettet framover vinner
        return highestEval + 1
    }

    if (highestEval == 0){ //hvis ingen vinner framover
        return 0
    }

    if (highestEval < 0){ //hvis posisjonen er tapende
        return highestEval - 1
    }
}

function checkWin(boardVals,turn,aiTurn,winLength,width,height){
    let haswon = false;

    //sjekker horisontal win
    for (let y = 0; y < height; y++){
        for (let x = 0; x < width - winLength+1; x++){ //+1??? Vet ikke hvorfor, men fungerer ikke uten
            if (boardVals[x][y] == boardVals[x+1][y] && boardVals[x][y] == boardVals[x+2][y] && boardVals[x][y]==boardVals[x+3][y] && !boardVals[x][y] == 0){ //endre til for løkke!!!
                haswon = true;
            }
        }
    }

    //sjekker vertikal win
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){
            if (boardVals[x][y] == boardVals[x][y+1] && boardVals[x][y] == boardVals[x][y+2] && boardVals[x][y] == boardVals[x][y+3] && !boardVals[x][y] == 0){
                haswon = true;
            }
        }
    }

    //sjekker skrå win
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){

            //skrå opp til høyre
            if (y > winLength-2 && x < width - (winLength-1)){
                //console.log(boardVals[x][y] + "" + boardVals[x+1][y-1] + "" + boardVals[x+2][y-2] + "" + boardVals[x+3][y-3]) debug
                if (boardVals[x][y] == boardVals[x+1][y-1] && boardVals[x][y] == boardVals[x+2][y-2] && boardVals[x][y] == boardVals[x+3][y-3] && !boardVals[x][y] == 0){
                    haswon = true;
                }
            }
            
            //skrå opp til venstre
            if(y > winLength - 2 && x > winLength - 1){
                if (boardVals[x][y] == boardVals[x-1][y-1] && boardVals[x][y] == boardVals[x-2][y-2] && boardVals[x][y] == boardVals[x-3][y-3] && !boardVals[x][y] == 0){
                    haswon = true;
                }
            }
        }
    }

    if (haswon){
        if (turn == aiTurn){
            console.log("winning")
            return 1
        } else if(!(turn == aiTurn)){
            console.log("loosing")

            return -1
        }
    }

}

function checkDraw(boardVals,width, height){
    let found = false
        for (let x = 0; x < width; x++){
            for (let y = 0; y < height; y++){
                if (boardVals[x][y] == 0){ //his brettet er fullt, break og return
                    found = true
                    break
                }
            }
            if (found){
                break
            }
        }
}

copyBoard(boardValss)

function copyBoard(boardVals){  //metode for å kopiere brettet, uten å lage pointers
    let buffer = {}
    for (let a = 0; a < Object.keys(boardVals).length ;a++){
        buffer[a] = []
        for (let b = 0; b < boardVals[a].length; b++){
            buffer[a].push(boardVals[a][b])
        }
    }
    return buffer
}