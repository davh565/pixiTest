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
    .add("images/tokens/farhad.png")
    .add("images/map1.jpg")
    .load(setup);

    let state, tokens, campaigns, chapters, grids, props, backgrounds, farhad;

    function setup(){

        //add multiple chapters later
chapter = new Container();
app.stage.addChild(chapter);

// Create an alias for the texture atlas frame ids
// id = resources["images/assets.json"].textures;


//%ASSET%
//BACKGROUND
background = new Sprite(
    resources["images/map1.jpg"].texture
  );
chapter.addChild(background);

farhad = new Sprite(resources["images/tokens/farhad.png"].texture);
farhad.scale.set(0.25,0.25)
farhad.x = 68;
farhad.y =  height / 2;
farhad.vx = 1;
farhad.vy = 0;
chapter.addChild(farhad);

//GRID
let grid = new PIXI.Graphics();
  grid.lineStyle(1, 0xFFFFFF, 0.25);
  
  for (i = 0; i < width/tileSize; i++) {
    for (j = 0; j < height/tileSize; j++) {
      grid.moveTo(i*tileSize, j*tileSize);
      grid.lineTo((i+1)*tileSize, (j)*tileSize);
      grid.lineTo((i+1)*tileSize, (j+1)*tileSize);
    }  
  }
chapter.addChild(grid);
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
    farhad.x += farhad.vx;
    farhad.y += farhad.vy;
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