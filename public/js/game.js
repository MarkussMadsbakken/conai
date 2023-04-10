let window_width = window.innerWidth;
let window_heigth = window.innerHeight;

const app = new PIXI.Application({ background: '#cccccc ', resizeTo: window, antialias: true});
app.ticker.maxFPS = 30;

document.getElementById("game").appendChild(app.view);

//backgroundContainer
const backgroundContainer = new PIXI.Container({antialias: true});
app.stage.addChild(backgroundContainer);

//playercontainer
const playerContainer = new PIXI.Container ({antialias: true})
app.stage.addChild(backgroundContainer);

//graphics init
const graphics = new PIXI.Graphics();
backgroundContainer.addChild(graphics);


//textures
const redTexture = PIXI.Texture.from('assets/red.png');



players = {
    1: "assets/red.png",
    2: "assets/black.png"
}



class Game {
    constructor(width, height,players){
        this.width = width;
        this.height = height;
        this.players = players; 
        this.boardTexture = PIXI.Texture.from('assets/board.png') //boardTexture
        this.holeTexture = PIXI.Texture.from('assets/hole.png')

        this.padding = 2 //padding mellom elementer i prosent av total størrelse av canvas
        this.column = 0

        //initiere sprites
        this.board = new PIXI.Sprite(this.boardTexture);

        Object.keys(this.players).forEach(player => { //lagrer players i form av sprite
            this.players[player] = PIXI.Texture.from(this.players[player])
        });


        //lager lister som lagrer brikkene i spill
        this.boardVals = {}
        for (let x = 0; x < this.width; x++){
            this.boardVals[x] = [];
            for (let y = 0; y < this.height; y++){
                this.boardVals[x].push(0)
            }
        }

        console.log(this.boardVals)

        app.stage.interactive = true;

        app.stage.addEventListener("pointermove", (e) => {
            this.pointerMove(e.global)
        })

        app.stage.addEventListener("click", (e) =>{
            console.log(e.global)
        })
    
        this.resize(); //kaller resize når spillet starter
    }

    pointerMove(pos){

        //endrer posijonen til relativt i forhold til brettet.
        pos["x"] -= this.board.x
        
        //finner hvilken kolonne musen er over
        this.column = 0
        for (let i = 0; i < this.width; i++){ //for alle kolonnene
            if (pos["x"] > i * (((this.board.width - ((this.board.width/100) * this.padding)) / this.width)) + ((this.board.width/100) * this.padding)/2){ //bruker samme logikk som blir brukt til å rendere brikkene
                this.column = i //setter kollonnen til det høyeste i-verdien
            }
        }

        console.log(this.column)

    }

    place(){
        return
    }

    draw(){

        backgroundContainer.removeChildren(); //tømmer backgroundcontainer

        //hole.blendMode = PIXI.BLEND_MODES.ERASE;

        //draw background
        backgroundContainer.addChild(this.board);

        for (let x = 0; x < this.width; x++){ //looper igjennom lengden av brettet
            let padding = (this.board.width/100) * this.padding
            let newSize = (this.board.width - ((this.width + 2) * padding)) / this.width

            for (let y = 0; y < this.height; y++){ //looper igjennom høyden av brettet

                    if (this.boardVals[x][y] == 0){ //hvis det ikke er en brikke i hullet
                    let hole = new PIXI.Sprite(this.holeTexture); //initierer sprite

                    //((this.board.width / 100) * this.padding* (x+1)) + this.board.x
                    let spriteSize = 100 //endre dette til en metode for å finne den faktiske størrelsen til spriten. 

                    //størrelsen burde være lik i begge retninger
                    hole.width = newSize
                    hole.height = newSize
                
                
                    hole.x = (x * (((this.board.width - (padding)) / this.width))) + this.board.x + padding
                    hole.y = (y * (((this.board.height - (padding)) / this.height))) + this.board.y + padding

                    //console.log(hole.width)

                    backgroundContainer.addChild(hole)

                } else { //det er en brikke i hullet
                    console.log(this.boardVals[x][y])
                    let piece = new PIXI.Sprite(this.players[this.boardVals[x][y]])
                    piece.width = newSize
                    piece.height = newSize

                    piece.x = (x * (((this.board.width - (padding)) / this.width))) + this.board.x + padding
                    piece.y = (y * (((this.board.height - (padding)) / this.height))) + this.board.y + padding
                    
                    backgroundContainer.addChild(piece)

                }
            }
        }



        //this.resize();
    }

    resize(){

        //resetter plasseringen til bakgrunnen
        this.board.x = 0
        this.board.y = 0

        //finner hvor størrelsen til padding
        let paddingx = (this.width + 2) * ((app.screen.width / 100) * this.padding)
        let paddingy = (this.height + 2) * ((app.screen.height / 100) * this.padding)

        //finner forholdet mellom høyde og lengde
        let widthRatio = Math.floor((app.screen.width - paddingx)/this.width)
        let heightRatio = Math.floor((app.screen.height - paddingy)/this.height);

        //endrer størrelsen til gamebackgroundContainer og brettets bakgrunn
        if (widthRatio > heightRatio){ //hvis bredden er større 
            //bredden til sirklene må være lik høyden
            this.board.height = heightRatio * this.height + paddingy;
            this.board.width = heightRatio * this.width + paddingx;


        } else { //hvis høyden er større
            //høyden til sirklene må være lik bredden
            this.board.width = widthRatio * this.width + paddingx;
            this.board.height = widthRatio * this.height + paddingy;
        }

        //flytter brettet til midten av skjermen
        this.board.x -= (this.board.width/2) - (app.renderer.width/2);
        this.board.y -= (this.board.height/2) - (app.renderer.height/2);

        this.draw(); //tegner brettet

    }
    render(){ 

        for (let x = 0; x < this.width; x++){ //looper igjennom lengden av brettet
            
            for (let y = 0; y < this.height; y++){ //looper igjennom høyden av brettet
            }
        }
    }
}

function startGame(){

    var game = new Game(7,6,players) //initierer ett nytt spill

    //koden under håndterer resize. Resize må skje med delay, for å unngå å resize til feil dimensjoner

    function resizeHandler(){ //funksjon for å calle resize etter delay
        game.resize();
    }

    //resizer etter 500ms
    var resizeTimeout;
    window.addEventListener("resize",function(){
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeHandler,100); //kaller resizehandler når 500ms har gått uten resize
    })

    /*
    app.ticker.add(function(delta){
        game.render();
    })
    */
}




startGame();


//resizer fungerer ikke alltid i enkelte ekstreme tilfeller