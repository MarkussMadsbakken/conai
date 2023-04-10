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

        this.padding = 1 //padding mellom elementer i prosent av total størrelse av canvas

        //initiere sprites
        this.board = new PIXI.Sprite(this.boardTexture);
        this.hole = new PIXI.Sprite(this.holeTexture); 
    
        this.resize(); //kaller resize når spillet starter
    }

    place(){
        return
    }

    draw(){

        backgroundContainer.removeChildren(); //tømmer backgroundcontainer

        //hole.blendMode = PIXI.BLEND_MODES.ERASE;

        //draw background
        backgroundContainer.addChild(this.board);
        backgroundContainer.addChild(this.hole);

        for (let x = 0; x < this.width; x++){ //looper igjennom lengden av brettet
            
            
            for (let y = 0; y < this.height; y++){ //looper igjennom høyden av brettet
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
        let widthRatio = Math.floor(app.screen.width/this.width)
        let heightRatio = Math.floor(app.screen.height/this.height);

        console.log(widthRatio)

        //endrer størrelsen til gamebackgroundContainer og brettets bakgrunn
        if (widthRatio > heightRatio){ //hvis bredden er større 
            //bredden til sirklene må være lik høyden
            this.board.height = heightRatio*this.height;
            this.board.width = heightRatio*this.width;


        } else { //hvis høyden er større
            //høyden til sirklene må være lik bredden
            this.board.width = widthRatio*this.width;
            this.board.height = widthRatio*this.height;
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
        resizeTimeout = setTimeout(resizeHandler,500); //kaller resizehandler når 500ms har gått uten resize
    })

    /*
    app.ticker.add(function(delta){
        game.render();
    })
    */
}


startGame();

