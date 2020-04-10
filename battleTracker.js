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
let oldcoords
function setup(){
  function setupInput() {
    pointer = t.makePointer()
    pointer.coords = {
      scale: tileSize,
      x: null,
      y: null,
    }
    pointer.occupants = {}
    console.log("setup input complete")
  }
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
  // console.log(grid.tile)z
  let coords = {}

  for (i = 0; i < gridWidth; i++) {
    for (j = 0; j < gridHeight; j++) {
      // setup data structure
      coords.x = i
      coords.y = j
      occupants = {}
      selected = false
      hovered = false
      clicked = false

      grid.tile[i][j] = {coords,occupants,selected,hovered,clicked}
      //draw gridlines
      grid.moveTo(i*tileSize, j*tileSize)
      grid.lineTo((i+1)*tileSize, (j)*tileSize)
      grid.lineTo((i+1)*tileSize, (j+1)*tileSize)

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
  function makeToken(token,x,y,scale = 0.25){
    token = new Sprite(resources["images/tokens/KEVIN.png"].texture)
    addContainer(token,[ parseInt(x/tileSize),parseInt(y/tileSize)])
    token.scale.set(scale,scale)
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
  function loopInput(){
    pointer.coords.x = pointer.x/tileSize
    pointer.coords.y = pointer.y/tileSize
    // console.log(pointer.coords,pointer.x,pointer.y)
  }
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
function addContainer(container, destination){
  container.coords = {
    x: destination[0],
    y: destination[1],
  }
  grid.tile[destination[0]][destination[1]]=container

  console.log(grid.tile[destination[0]][destination[1]])

}
function removeContainer(){container, location}
function moveContainer(){container, location, destination}
//Add keyboard/mouse helper functions as needed
//Add Event listeners