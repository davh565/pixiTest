let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type)

let app = new PIXI.Application({ 
  width: 1024,         // default: 800
  height: 1024,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1       // default: 1
}
);
app.renderer.backgroundColor = 0x061639;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.loader
  .add([
    "images/map1.jpg",
    "images/tokens/KEVIN.png",
    "images/tokens/farhad.png",
    ])
  .load(setup);

function setup() {
  let background = new PIXI.Sprite(
    PIXI.loader.resources["images/map1.jpg"].texture
  );
  let player = new PIXI.Sprite(
    PIXI.loader.resources["images/tokens/KEVIN.png"].texture
  );
  let farhad = new PIXI.Sprite(
    PIXI.loader.resources["images/tokens/farhad.png"].texture
  );
  app.stage.addChild(background);
  app.stage.addChild(player);
  app.stage.addChild(farhad);

  player.scale.set(0.25,0.25)
  player.x = 64*1;
  player.y = 64*4;
  
  farhad.scale.set(0.25,0.25)
  farhad.x = 64*2;
  farhad.y = 64*2;
}