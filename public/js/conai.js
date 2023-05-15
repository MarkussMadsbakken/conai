var evaluation = 0

//generic board, win in one for rød

var height = 6
var width = 7
var winLength = 4


function evaluate(incBoard,depth,turn,aiTurn){ //evaluer posisjonen
    let boardVals = incBoard

    if (depth < 0){ //hvis dybden er nådd
        return [getBoardScore(boardVals,turn,aiTurn,winLength,width,height), "draw"]
    }

    let nextDepth = depth - 1
    let nextBoard = copyBoard(boardVals)

    //console.log("checking " + i + [row])
    //console.log(nextBoard)

    let max_turns = 2
    let nextTurn = 0;

    if (turn == max_turns) { //
        nextTurn = 1;
            
    } else {
        nextTurn = 2
    }

    //sjekk om det er et move som vinner spillet
    let nextmoves = []
    for (let i = 0; i < width; i++){
        
        //hvis noen har vunnet eller tapt
        let winResult = checkWin(boardVals,turn,aiTurn,winLength,width,height)
        if (winResult > 0){
            return [-10000,"loss"]
        } else if(winResult < 0){
            return [10000, "win"]
        } else if(checkDraw(boardVals,width,height)){
            return [0, "draw"]
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
                
                nextBoard[i][row] = turn //plasserer brikke
                let eval = evaluate(nextBoard,nextDepth,nextTurn,aiTurn)
                nextmoves.push([eval[0],i + " - "+eval[1]]) //evaluer neste board
                nextBoard[i][row] = 0 //resette turn, krever mindre computing enn å klone brettet hver gang
            }

        }
    }
    var bestmove = []
    if (turn == aiTurn){ //max
        bestmove = [-Infinity,0]
        for (let i = 0; i < nextmoves.length-1; i++){
            if (nextmoves[i][0] > bestmove[0]){
                bestmove[0] = nextmoves[i][0]
                bestmove[1] = nextmoves[i][1]
            }
        }
        return bestmove

    } else { //min

        bestmove = [Infinity,0]
        for (let i = 0; i < nextmoves.length ; i++){
            if(nextmoves[i][0] < bestmove[0]){
                bestmove[0] = nextmoves[i][0]
                bestmove[1] = nextmoves[i][1]
            }
        }
        return bestmove
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
            if(y > winLength - 2 && x > winLength - 2){
                if (boardVals[x][y] == boardVals[x-1][y-1] && boardVals[x][y] == boardVals[x-2][y-2] && boardVals[x][y] == boardVals[x-3][y-3] && !boardVals[x][y] == 0){
                    haswon = true;
                }
            }
        }
    }

    if (haswon){
        if (turn == aiTurn){
            return 1
        } else if(!(turn == aiTurn)){
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

function getBoardScore(boardVals,turn,aiTurn,winLength,width,height){
    let aiscore = 0
    let pscore = 0 
    //sjekker horisontal score
    for (let y = 0; y < height; y++){
        for (let x = 0; x < width - winLength+1; x++){ //+1??? Vet ikke hvorfor, men fungerer ikke uten
            if (boardVals[x][y] == boardVals[x+1][y] && boardVals[x][y] == boardVals[x+2][y] && !boardVals[x][y] == 0 && boardVals[x][y] == aiTurn){ //endre til for løkke!!!
                try{
                    if (boardVals[x-1][y] == 0){
                        aiscore +=3
                    }
                } catch{}

                if(boardVals[x+3][y]==0)
                    aiscore +=3

            } if (boardVals[x][y] == boardVals[x+1][y] && boardVals[x][y] == boardVals[x+2][y] && !boardVals[x][y] == 0 && !(boardVals[x][y] == aiTurn)){ //endre til for løkke!!!
                try{
                    if (boardVals[x-1][y] == 0){
                        pscore +=3
                    }
                } catch{}

                if(boardVals[x+3][y]==0)
                    pscore +=3
            }
        }
    }

    //sjekker vertikal score
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){
            if (boardVals[x][y] == boardVals[x][y+1] && boardVals[x][y] == boardVals[x][y+2] && !boardVals[x][y] == 0 && (boardVals[x][y] == aiTurn)){
                try{
                    if (boardVals[x][y-1] == 0){
                        aiscore +=2
                    }
                } catch{}

                if(boardVals[x][y+3]==0)
                aiscore +=2
            }
            if (boardVals[x][y] == boardVals[x][y+1] && boardVals[x][y] == boardVals[x][y+2] && !boardVals[x][y] == 0 && !(boardVals[x][y] == aiTurn)){
                try{
                    if (boardVals[x][y-1] == 0){
                        pscore +=2
                    }
                } catch{}

                if(boardVals[x][y+3]==0)
                pscore +=2
            }
        }
    }

    for (let x = 0; x < width; x++){ //skrå score
        for (let y = 0; y < height; y++){

            //skrå opp til høyre
            if (y > winLength-2 && x < width - (winLength-1)){
                //console.log(boardVals[x][y] + "" + boardVals[x+1][y-1] + "" + boardVals[x+2][y-2] + "" + boardVals[x+3][y-3]) debug
                if (boardVals[x][y] == boardVals[x+1][y-1] && boardVals[x][y] == boardVals[x+2][y-2] && !boardVals[x][y] == 0 && boardVals[x][y] ==aiTurn){
                    try{
                        if (boardVals[x-1][y+1] == 0){
                            aiscore +=4
                        }
                    } catch{}
    
                    if(boardVals[x+3][y-3]==0)
                    aiscore +=2
                }
                if (boardVals[x][y] == boardVals[x+1][y-1] && boardVals[x][y] == boardVals[x+2][y-2] && !boardVals[x][y] == 0 && !(boardVals[x][y] ==aiTurn)){
                    try{
                        if (boardVals[x-1][y+1] == 0){
                            pscore +=4
                        }
                    } catch{}
    
                    if(boardVals[x+3][y-3]==0)
                    pscore +=4
                }
            }
            
            //skrå opp til venstre
            if(y > winLength - 2 && x > winLength - 2){
                if (boardVals[x][y] == boardVals[x-1][y-1] && boardVals[x][y] == boardVals[x-2][y-2] && !boardVals[x][y] == 0 && boardVals[x][y]==aiTurn){
                    try{
                        if (boardVals[x-3][y+3] == 0){
                            aiscore +=4
                        }
                    } catch{}
    
                    if(boardVals[x-1][y-1]==0)
                    aiscore +=4
                }
                if (boardVals[x][y] == boardVals[x-1][y-1] && boardVals[x][y] == boardVals[x-2][y-2] && !boardVals[x][y] == 0 && !(boardVals[x][y]==aiTurn)){
                    try{
                        if (boardVals[x-3][y+3] == 0){
                            pscore +=4
                        }
                    } catch{}
    
                    if(boardVals[x-1][y-1]==0)
                    pscore +=4
                }
            }
        }
    }

    return aiscore - pscore

}
