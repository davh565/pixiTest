//Aliases
let Application = PIXI.Application,
loader = PIXI.loader,
resources = PIXI.loader.resources,
Sprite = PIXI.Sprite;

let player;
let farhad;
let type = "WebGL"

const width = 1024;
const height = 1024;
let tileSize = 64;
let moveSize = tileSize/2;

////////////////////////////////
function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}
/////////////////////////////////


if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type)

let app = new Application({ 
  width: width,         // default: 800
  height: height,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1       // default: 1
}
);
app.renderer.backgroundColor = 0x061639;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
  .add([
    "images/map1.jpg",
    "images/tokens/KEVIN.png",
    "images/tokens/farhad.png",
    ])
  .load(setup);
function setup() {
  let background = new Sprite(
    resources["images/map1.jpg"].texture
  );
player = new Sprite(
    resources["images/tokens/KEVIN.png"].texture
  );
farhad = new Sprite(
    resources["images/tokens/farhad.png"].texture
  );
  
  player.scale.set(0.25,0.25)
  player.vx=  0;
  player.vy=  0;
  player.x = tileSize*1;
  player.y = tileSize*4;
  
  farhad.scale.set(0.25,0.25)
  farhad.vx=  0;
  farhad.vy=  0;
  farhad.x = tileSize*2;
  farhad.y = tileSize*2;
  
  let gridSquare = new PIXI.Graphics();
  gridSquare.lineStyle(1, 0xFFFFFF, 1);
  
  for (i = 0; i < width/tileSize; i++) {
    for (j = 0; j < height/tileSize; j++) {
      // gridSquare.drawRect(i*tileSize, j*tileSize, tileSize, tileSize);
      gridSquare.moveTo(i*tileSize, j*tileSize);
      gridSquare.lineTo((i+1)*tileSize, (j)*tileSize);
      gridSquare.lineTo((i+1)*tileSize, (j+1)*tileSize);
    }
    
  }
  // line.x = 0;
  // line.y = 50;
  app.stage.addChild(background);
  app.stage.addChild(gridSquare);
  app.stage.addChild(player);
  app.stage.addChild(farhad);

app.ticker.add(delta => mainLoop(delta));
}
let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");

  //Left arrow key `press` method
  left.press = () => {
    //Change the player's velocity when the key is pressed
    player.vx = -moveSize;
    player.vy = 0;
  };
  
  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the player isn't moving vertically:
    //Stop the player
    if (!right.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };

  //Up
  up.press = () => {
    player.vy = -moveSize;
    player.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && player.vx === 0) {
      player.vy = 0;
    }
  };

  //Right
  right.press = () => {
    player.vx = moveSize;
    player.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };

  //Down
  down.press = () => {
    player.vy = moveSize;
    player.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && player.vx === 0) {
      player.vy = 0;
    }
  };


function mainLoop(delta){
  player.x += player.vx;
  player.y += player.vy

  //Move the player 1 pixel 
}