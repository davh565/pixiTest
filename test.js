let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type)

let app = new PIXI.Application({width: 1024, height: 1024});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);