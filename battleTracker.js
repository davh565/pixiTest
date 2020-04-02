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

let app = new Application({ 
  width: width, 
  height: height,                       
  antialiasing: true, 
  transparent: false, 
  resolution: 1
});

let t = new Tink(PIXI, app.renderer.view);

document.body.appendChild(app.view);
loader 
  .add("images/tokens/farhad.png")
  .add("images/tokens/KEVIN.png")
  .add("images/map1.jpg")
  .add("images/ui/baseline_add_white_18dp.png")
  .add("images/ui/baseline_delete_white_18dp.png")
  .load(setup);

let state, token, campaigns, chapters, grids, props, backgrounds, farhad;
let pointer, hilight;
tokens = []

function setup(){

//add multiple chapters later
chapter = new Container();
app.stage.addChild(chapter);

background = new Sprite(resources["images/map1.jpg"].texture);
chapter.addChild(background);
makeToken(token,64,128);
makeToken(token,512,64);

//GRID
setupGrid()
setupTokens()

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



  //INPUT
  pointer = t.makePointer();
  // pointer.press = () => {
  //   if (pointer.hitTestSprite(token)){
  //     // if (!token.isClicked)token.isClicked = true;
  //   }
  //   else if (token.isClicked) token.isClicked = false;
  // }z
  
  state = play;
  //Start the game loop 
  app.ticker.add(delta => mainLoop(delta));
}

function makeToken(token,x,y){
  token = new Sprite(resources["images/tokens/KEVIN.png"].texture);
  token.scale.set(0.25,0.25);
  token.x = x;
  token.y = y;
  token.vx = 1;
  token.vy = 0;
  token.isClicked=false;
  token.wasClicked=false;
  t.makeDraggable(token);
  chapter.addChild(token);
  console.log(token)
  tokens.push(token)
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
  // token.x += token.vx;
  // token.y += token.vy;
  //add contain function
  contain(tokens)
  //add loop actions
  for(token in tokens){
    if (pointer.hitTestSprite(tokens[token])) {
      if (pointer.isDown){
  
        hilight.alpha=0.5;
        hilight.x = parseInt(pointer.x/tileSize)*tileSize;
        hilight.y = parseInt(pointer.y/tileSize)*tileSize;
        
        tokens[token].scale.set(0.30,0.30);
        tokens[token].x -= 6;
        tokens[token].y -= 6;
        tokens[token].isDragging = true;
        
      } 
      
      else {
        tokens[token].scale.set(0.25,0.25);
        if (token.isDragging){
          hilight.alpha=0;
          tokens[token].x = parseInt(pointer.x/tileSize)*tileSize;
          tokens[token].y = parseInt(pointer.y/tileSize)*tileSize;
          // token.x += 6;
          // token.y += 6;
          tokens[token].isDragging = false;
  
        }
      }
      //   //Display a hand icon while the pointer is over the sprite
      pointer.cursor = "pointer";
    }

  }
  
  // console.log(hilight)
  // hilight.x = parseInt(pointer.x/tileSize)*tileSize;
  // hilight.y = parseInt(pointer.y/tileSize)*tileSize;
  // else {
  //   pointer.cursor = "auto";
  // }
  // if (token.isClicked){
  //   token.x = pointer.x-tileSize/2;
  //   token.y = pointer.y-tileSize/2;
  // }
}

/////////////////////////////////////////////////////////
//Helper Functions
/////////////////////////////////////////////////////////

function contain(){
    
}
function collide(){

}

function setupUI(){
  
}
function setupGrid(){
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
  console.log("setup grid complete")
  
}
function setupTokens(){
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
  console.log("setup tokens complete")
}
//Add keyboard/mouse helper functions as needed
//Add Event listeners