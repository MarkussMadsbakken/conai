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



players = {}



class Game {
    constructor(width, height,players){
        this.width = width;
        this.height = height;
        this.players = players; 
        this.boardTexture = PIXI.Texture.from('assets/board.png') //boardTexture
        this.holeTexture = PIXI.Texture.from('assets/hole.png')

        this.padding = 5 //padding mellom elementer i prosent av total størrelse av canvas
    
        this.draw();
    }

    place(){
        return
    }

    draw(){

        //initiere sprites
        let board = new PIXI.Sprite(this.boardTexture);
        let hole = new PIXI.Sprite(this.holeTexture); 

        //hole.blendMode = PIXI.BLEND_MODES.ERASE;
        console.log(backgroundContainer.width)
        //draw background
        backgroundContainer.addChild(board);
        backgroundContainer.addChild(hole);

        
        console.log(backgroundContainer.width)
        console.log("ak")
        
        //this.resize();
    }

    resize(){
        //finner det minste størrelsesforholdet
        
        //finner forholdet mellom høyde og lengde
        let widthRatio = Math.floor(app.screen.width/this.width);
        let heightRatio = Math.floor(app.screen.height/this.height);

        //endrer størrelsen til gamebackgroundContainer og brettets bakgrunn
        if (widthRatio > heightRatio){ //hvis bredden er større
            //bredden til sirklene må være lik høyden
            backgroundContainer.height = heightRatio*this.height;
            backgroundContainer.width = heightRatio*this.width;

        } else { //hvis høyden er større
            //høyden til sirklene må være lik bredden
            backgroundContainer.width = widthRatio*this.width
            backgroundContainer.height = widthRatio*this.height
        }
        
        console.log(backgroundContainer.width)

        //sjekke hva som begrenser størrelsen, for å maksimere backgroundContainer
        //endre backgroundContainer størrelse, for å best maksimere brettstørrelsen

        // flytt backgroundContainer til midten av skjermen
        //backgroundContainer.x = app.screen.width / 2;
        //backgroundContainer.y = app.screen.height / 2;



    }
    render(){ 

        for (let x = 0; x < this.width; x++){ //looper igjennom lengden av brettet
            
            for (let y = 0; y < this.height; y++){ //looper igjennom høyden av brettet
            }
        }
    }
}

function startGame(){
    var game = new Game(7,6,players)
    /*
    var resizeTimeout;
    window.onresize = function(){
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(game.resize,500);
    }
    */
    window.addEventListener("resize",function(){
        game.resize();
    })

    /*
    app.ticker.add(function(delta){
        game.render();
    })
    */

}

startGame();

