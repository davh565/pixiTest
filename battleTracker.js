//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

    
    const width = 1024;
    const height = 1024;
    let tileSize = 64;
    let moveSize = tileSize/2;
    
    //Create a Pixi Application
    let app = new Application({ 
        width: width, 
        height: height,                       
        antialiasing: true, 
        transparent: false, 
        resolution: 1
    }
    );
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    loader 
    .add("images/assets.json")
    .load(setup);

    let state, tokens, campaigns, chapters, grids, props, backgrounds;

    function setup(){

        //add multiple chapters later
chapter = new Container();
app.stage.addChild(chapter);

//Create an alias for the texture atlas frame ids
id = resources["images/assets.json"].textures;


//%ASSET%
%ASSET%= new Sprite(id["%ASSET%.png"]);
%ASSET%.x = 68;
%ASSET%.y =  chapter.height / 2 - chapter.height / 2;
%ASSET%.vx = 0;
%ASSET%.vy = 0;
chapter.addChild(%ASSET%);

//Token Spawner
let numTokens= 6,
    spacing = 48,
    xOffset = 150,
    speed = 2,
    direction = 1;
tokens= [];
for (let i = 0; i < numTokens; i++) {

    //Make a Token
    let token= new Sprite(id["token.png"]);
    blob.x = x;
    blob.y = y;
    tokens.push(token);
    chapter.addChild(token);
}

%%%%%%%
//add UI input capture
%%%%%%%

state = play;
//Start the game loop 
app.ticker.add(delta => mainLoop(delta));
}
/////////////////////////////////////////////////////////
//mainLoop
/////////////////////////////////////////////////////////
function mainLoop(delta){

    //Update the current game state:
    state(delta);
}

/////////////////////////////////////////////////////////
//Play
/////////////////////////////////////////////////////////
function play(delta) {
    //add contain function
    contain(tokens)
    //add loop actions
}

/////////////////////////////////////////////////////////
//Helper Functions
/////////////////////////////////////////////////////////

function contain(){
    
}
function collide(){

}
//Add keyboard/mouse helper functions as needed
//Add Event listeners