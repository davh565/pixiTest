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
});
// console.log(app.renderer)


let t = new Tink(PIXI, app.renderer.view);

document.body.appendChild(app.view);
loader 
  .add("images/tokens/farhad.png")
  .add("images/map1.jpg")
  .add("images/ui/baseline_add_white_18dp.png")
  .add("images/ui/baseline_delete_white_18dp.png")
  .load(setup);

let state, tokens, campaigns, chapters, grids, props, backgrounds, farhad;
let pointer, hilight;

function setup(){

//add multiple chapters later
chapter = new Container();
app.stage.addChild(chapter);

// Create an alias for the texture atlas frame ids
// id = resources["images/assets.json"].textures;


//%ASSET%
//BACKGROUND

background = new Sprite(resources["images/map1.jpg"].texture);
chapter.addChild(background);

farhad = new Sprite(resources["images/tokens/farhad.png"].texture);
farhad.scale.set(0.25,0.25);
farhad.x = 68;
farhad.y =  height / 2;
farhad.vx = 1;
farhad.vy = 0;
farhad.isClicked=false;
farhad.wasClicked=false;
t.makeDraggable(farhad);
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

hilight = new PIXI.Graphics();
hilight.beginFill(0xFFFFFF);
// console.log(hilight)
hilight.alpha = 0;
hilight.drawRect(0,0,64,64);
hilight.endFill();
chapter.addChild(hilight);

topBar = new PIXI.Graphics();
topBar.beginFill(0x444444);
// console.log(topBar)
topBar.alpha = 1;
topBar.drawRect(0,0,width,64);
topBar.endFill();
chapter.addChild(topBar);

addToken = new Sprite(resources["images/ui/baseline_add_white_18dp.png"].texture);
addToken.scale.set(1,1);
addToken.x = 14;
addToken.y =  14;
chapter.addChild(addToken);
t.makeInteractive(addToken);
addToken.press = ()=>console.log("add Token")

deleteToken = new Sprite(resources["images/ui/baseline_delete_white_18dp.png"].texture);
deleteToken.scale.set(1,1);
deleteToken.x = width/2;
deleteToken.y =  14;
chapter.addChild(deleteToken);

  //INPUT
  pointer = t.makePointer();
  // pointer.press = () => {
  //   if (pointer.hitTestSprite(farhad)){
  //     // if (!farhad.isClicked)farhad.isClicked = true;
  //   }
  //   else if (farhad.isClicked) farhad.isClicked = false;
  // }
  
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
  t.update();
}

/////////////////////////////////////////////////////////
//Play
/////////////////////////////////////////////////////////
function play(delta) {
  // farhad.x += farhad.vx;
  // farhad.y += farhad.vy;
  //add contain function
  contain(tokens)
  //add loop actions
  if (pointer.hitTestSprite(farhad)) {
    if (pointer.isDown){

      hilight.alpha=0.5;
      hilight.x = parseInt(pointer.x/tileSize)*tileSize;
      hilight.y = parseInt(pointer.y/tileSize)*tileSize;
      
      farhad.scale.set(0.30,0.30);
      farhad.x -= 6;
      farhad.y -= 6;
      farhad.isDragging = true;
      
    } 
    
    else {
      farhad.scale.set(0.25,0.25);
      if (farhad.isDragging){
        hilight.alpha=0;
        farhad.x = parseInt(pointer.x/tileSize)*tileSize;
        farhad.y = parseInt(pointer.y/tileSize)*tileSize;
        // farhad.x += 6;
        // farhad.y += 6;
        farhad.isDragging = false;

      }
    }
    //   //Display a hand icon while the pointer is over the sprite
    pointer.cursor = "pointer";
  }
  // console.log(hilight)
  // hilight.x = parseInt(pointer.x/tileSize)*tileSize;
  // hilight.y = parseInt(pointer.y/tileSize)*tileSize;
  // else {
  //   pointer.cursor = "auto";
  // }
  // if (farhad.isClicked){
  //   farhad.x = pointer.x-tileSize/2;
  //   farhad.y = pointer.y-tileSize/2;
  // }
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