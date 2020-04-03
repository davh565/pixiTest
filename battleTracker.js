//Aliases
let Application = PIXI.Application,
Container = PIXI.Container,
loader = PIXI.loader,
resources = PIXI.loader.resources,
Graphics = PIXI.Graphics,
TextureCache = PIXI.utils.TextureCache,
Sprite = PIXI.Sprite,
Text = PIXI.Text,
TextStyle = PIXI.TextStyle


const width = 1024
const height = 1024
let tileSize = 64
let moveSize = tileSize/2

let app = new Application({ 
  width: width, 
  height: height,                       
  antialiasing: true, 
  transparent: false, 
  resolution: 1
})

let t = new Tink(PIXI, app.renderer.view)

document.body.appendChild(app.view)
loader 
  .add("images/tokens/farhad.png")
  .add("images/tokens/KEVIN.png")
  .add("images/map1.jpg")
  .add("images/ui/baseline_add_white_18dp.png")
  .add("images/ui/baseline_delete_white_18dp.png")
  .load(setup)

let state, token, campaigns, chapter, grid,grids, props, background, farhad
let pointer, hilight
tokens = []

function setup(){
  function setupUI(){
    hilight = new PIXI.Graphics()
    hilight.beginFill(0xFFFFFF)
    hilight.alpha = 0
    hilight.drawRect(0,0,64,64)
    hilight.endFill()
    chapter.addChild(hilight)
    
    topBar = new PIXI.Graphics()
    topBar.beginFill(0x444444)
    topBar.alpha = 1
    topBar.drawRect(0,0,width,64)
    topBar.endFill()
    chapter.addChild(topBar)
    
    addToken = new Sprite(resources["images/ui/baseline_add_white_18dp.png"].texture)
    addToken.scale.set(1,1)
    addToken.x = 14
    addToken.y =  14
    chapter.addChild(addToken)
    t.makeInteractive(addToken)
    addToken.press = ()=>console.log("add Token")
    
    deleteToken = new Sprite(resources["images/ui/baseline_delete_white_18dp.png"].texture)
    deleteToken.scale.set(1,1)
    deleteToken.x = width/2
    deleteToken.y =  14
chapter.addChild(deleteToken)
console.log("setup UI complete")
  }
  function setupGrid(){
  
  grid = new PIXI.Graphics()
  let gridWidth = width/tileSize 
  let gridHeight = height/tileSize 
  grid.lineStyle(1, 0xFFFFFF, 0.25)
  grid.tile = createArray(gridWidth,gridHeight)
  console.log(grid.tile)
  let coords = []

  for (i = 0; i < gridWidth; i++) {
    for (j = 0; j < gridHeight; j++) {
      grid.moveTo(i*tileSize, j*tileSize)
      grid.lineTo((i+1)*tileSize, (j)*tileSize)
      grid.lineTo((i+1)*tileSize, (j+1)*tileSize)
      
      coords = i+","+j
      occupants = []
      selected = false
      hovered = false
      clicked = false

      grid.tile[i][j] = {coords,occupants,selected,hovered,clicked}

    }  
  }
  chapter.addChild(grid)
  console.log("setup grid complete")
  
  }
  function setupTokens(){
  makeToken(token,64,128)
  makeToken(token,512,64)
  console.log("setup tokens complete")
  }
  function setupInput() {
    pointer = t.makePointer()
    // pointer.press = () => {
      //   if (pointer.hitTestSprite(token)){
        //     // if (!token.isClicked)token.isClicked = true
        //   }
        //   else if (token.isClicked) token.isClicked = false
    // }z
    console.log("setup input complete")
  }
  function setupChapter(){
    chapter = new Container()
    app.stage.addChild(chapter)
    console.log("setup chapter complete")
  }
  function setupBackground() {
    background = new Sprite(resources["images/map1.jpg"].texture)
    chapter.addChild(background)
    console.log("setup background complete")
  }
  function makeToken(token,x,y){
    token = new Sprite(resources["images/tokens/KEVIN.png"].texture)
    token.scale.set(0.25,0.25)
    token.x = x
    token.y = y
    token.vx = 1
    token.vy = 0
    token.isClicked=false
    token.wasClicked=false
    t.makeDraggable(token)
    chapter.addChild(token)
    tokens.push(token)
  }
  setupInput()
  setupChapter()
  setupBackground()
  setupGrid()
  setupUI()
  setupTokens()
  
  state = loop
  //Start the game loop 
  app.ticker.add(delta => mainLoop(delta))
}

/////////////////////////////////////////////////////////
//mainLoop
/////////////////////////////////////////////////////////
function mainLoop(delta){
  //Update the current game state:
  state(delta)
  t.update()
}

/////////////////////////////////////////////////////////
//loop
/////////////////////////////////////////////////////////
function loop(delta) {
  function loopInput(){}
  function loopChapter(){}
  function loopBackground(){}
  function loopGrid(){}
  function loopUI(){}
  function loopTokens(){
    let lock = false
    for(token in tokens){
      if (pointer.hitTestSprite(tokens[token])) {
        if (true){
        if (pointer.isDown){
          
          //select grid rectangle
          hilight.alpha=0.5
          hilight.x = parseInt(pointer.x/tileSize)*tileSize
          hilight.y = parseInt(pointer.y/tileSize)*tileSize
          //drag sprite
          tokens[token].scale.set(0.30,0.30)
          tokens[token].x -= 6
          tokens[token].y -= 6
          tokens[token].isDragging = true
          
        } 
        
        else {
          tokens[token].scale.set(0.25,0.25)
          if (tokens[token].isDragging){
            hilight.alpha=0
            tokens[token].x = parseInt(pointer.x/tileSize)*tileSize
            tokens[token].y = parseInt(pointer.y/tileSize)*tileSize
            tokens[token].isDragging = false
            
          }
        }
        //   //Display a hand icon while the pointer is over the sprite
        pointer.cursor = "pointer"
      }
      }  
    }
    
  }
  loopInput()
  loopChapter()
  loopBackground()
  loopGrid()
  loopUI()
  loopTokens()
  // token.x += token.vx
  // token.y += token.vy
  //add contain function
  contain(tokens)
}

/////////////////////////////////////////////////////////
//Helper Functions
/////////////////////////////////////////////////////////
function contain(){
  
}
function collide(){
  
}
function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}
//Add keyboard/mouse helper functions as needed
//Add Event listeners