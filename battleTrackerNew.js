/////
//cleanup later
let hilight, pointer, lastCoord
/////

let battleTracker = {}
let bt = battleTracker

let stage
let loader = PIXI.Loader.shared

let tileSize = 64
let width = 512
let height = 512
let gridWidth = width/tileSize
let gridHeight = height/tileSize




tokens = {}
backgrounds = {}
containers = {}
pointers = {}

let app = new PIXI.Application({
    width: width,
    height: height,
})
document.body.appendChild(app.view)
let t = new Tink(PIXI, app.renderer.view)
loader
    .add("images/map1.jpg")
    .add("images/tokens/KEVIN.png")
    .add("images/ui/baseline_add_white_18dp.png")
    .add("images/ui/baseline_delete_white_18dp.png")
    .load(setup)

function setup(){
    setupStage()
    setupBackground()
    setupContainers()
    setupPointers()
    setupUI()
    setupTokens()
    moveToken("Bob01","grid00","tile0707")
    deleteToken("Bob01")
    app.ticker.add(() => loop())
    
    
    function setupStage(){
        stage = new PIXI.Container()
        app.stage.addChild(stage)
    }
    function setupBackground(){
        let background = {
            type: "background",
            render: new PIXI.Sprite(loader.resources["images/map1.jpg"].texture)
        }
        addId(background,backgrounds)
        background.render.id = background.id
        background.render.stageIndex = stage.children.length
        stage.addChild(background.render)
    }
    function setupContainers(){
        function setupGrid(){
            let grid = {
                type: "grid",
                render: new PIXI.Graphics()
            }
            grid.render.lineStyle(1, 0xFFFFFF, 0.5)
            
            for (u = 0; u<gridWidth;u++){
                for (v=0;v<gridHeight;v++){
                    let id = "tile" + hexify(u) + hexify(v)
                    grid[id] = {
                        id:  id,
                        u: u,
                        v: v,
                        occupants: {}
                    }
                    grid.render.moveTo(u*tileSize, v*tileSize)
                    grid.render.lineTo((u+1)*tileSize, (v)*tileSize)
                    grid.render.lineTo((u+1)*tileSize, (v+1)*tileSize)
                }
            }
            addId(grid,containers)
            grid.render.id = grid.id
            grid.render.stageIndex = stage.children.length
            stage.addChild(grid.render)
        }
        setupGrid()
    }
    function setupTokens(){
        addToken("Bob",["grid00","tile0001"])
        addToken("Bob",["grid00","tile0306"])
        addToken("Bill",["grid00","tile0203"],2)
    }
    function setupPointers(){
        pointer = t.makePointer()
        pointer.occupants ={}
    }
    function setupUI(){
        hilight = new PIXI.Graphics()
        hilight.beginFill(0xFFFFFF)
        hilight.alpha = 0.5
        hilight.drawRect(0,0,tileSize,tileSize)
        hilight.endFill()
        stage.addChild(hilight)
    }
}

function loop(){
    loopTokens()
    loopContainers()
    loopPointers()
    loopUI()
    t.update()
    
    function loopContainers(){
    }
    function loopTokens(){}
    function loopPointers(){}
    function loopUI(){
        let u = parseInt(pointer.x/tileSize)
        let v = parseInt(pointer.y/tileSize)
        hilight.x = u*tileSize
        hilight.y = v*tileSize
        let address = "tile" + hexify(u) +hexify(v)
        if(address !=lastCoord){
            lastCoord = address
            let occupants = containers.grid00[address].occupants
            if(isEmpty(occupants)){
                hilight.alpha = 0
            }
            else {
                hilight.alpha = 0.5
                
                console.log(occupants)
            }
        }
    }
}
function addToken(type,location, size = 1){
    // location: [%CONTAINER%,%SLOT%]
    let container = location[0]
    let slot = location[1]
    let token = {
        type: type,
        location: [location[0]],
        size: size,
        render: new PIXI.Sprite(
            loader.resources["images/tokens/KEVIN.png"].texture)
    }
    token.location.push(location[1])
    let currentAddress = parseAddress(location[1])
    for(i = 0; i < size; i++){
        for(j = 0; j < size; j++){
            let coLocation = 'tile' 
            +hexify(currentAddress[0]+i)
            +hexify(currentAddress[1]+j)
            if(coLocation != location[1]) token.location.push(coLocation)
        }
        
    }
    console.log('location',token.location)
   
    // t.makeDraggable(token.render)
    token.render.scale.set(size*tileSize/token.render.width)
    let address = parseAddress(token.location[1])
    token.render.x = address[0]*tileSize
    token.render.y = address[1]*tileSize
    stage.addChild(token.render)
    addId(token,tokens)
    token.render.id = token.id
    token.render.stageIndex = stage.children.length
    containers[container][slot].occupants[token.id] = token
}
function moveToken(tokenId,destContainer,destSlot){
    let token = tokens[tokenId]
    let origin = token.location
    let originAddress = containers[origin[0]][origin[1]]
    let destinationAddress = containers[destContainer][destSlot]
    
    token.location = [destContainer, destSlot]
    
    destinationAddress.occupants[tokenId] = originAddress.occupants[tokenId]
    delete originAddress.occupants[tokenId]

    token.render.x = destinationAddress.u * tileSize
    token.render.y = destinationAddress.v * tileSize




}
function deleteToken(tokenId){
    let token = tokens[tokenId]
    let origin = token.location
    token.render.parent.removeChild(token.render)
    delete containers[origin[0]][origin[1]].occupants[tokenId]
    delete token

    
    
}

//utility
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
function addId(object, destination){
    let index = 0
    while(destination[object.type+hexify(index)] != undefined){
        index++
    }
    object.id = object.type+hexify(index)
    destination[object.type+hexify(index)] = object
}
function hexify (input){
    return input.toString(16).padStart(2,0)
}
function parseAddress (address) {
    return [Number(address.substr(address.length-4,2)),
            Number(address.substr(address.length-2,2))]
}
function isEmpty(obj) {
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}