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
    setupTokens()
    setupPointers()

    console.log("setup complete")
    function setupStage(){
        stage = new PIXI.Container()
        app.stage.addChild(stage)
    }
    function setupBackground(){
        let background = {
            type: "background",
            render: new PIXI.Sprite(loader.resources["images/map1.jpg"].texture)
        }
        stage.addChild(background.render)
        addId(background,backgrounds)
        console.log("setupBackground Complete")
        console.log(backgrounds)
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
                    let id = "tile"+
                    hexify(u)+
                    hexify(v)
                    
                    grid[id] = {
                        id: id,
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
            stage.addChild(grid.render)
        }
        setupGrid()
    }
    function setupTokens(){
        addToken("Bob",["grid00","tile0001"])
        addToken("Bob",["grid00","tile0306"])
        addToken("Bill",["grid00","tile0203"],2)
    }
    function setupPointers(){}
}

function loop(){
    function loopContainers(){}
    function loopTokens(){}
    function loopPointers(){}
    loopTokens()
    loopContainers()
    loopPointers()
}
function addToken(type,location, size = 1){
    // location: [%CONTAINER%,%SLOT%]
    let container = location[0]
    let slot = location[1]
    let token = {
        type: type,
        location: location,
        size: size,
        render: new PIXI.Sprite(loader.resources["images/tokens/KEVIN.png"].texture)
    }
    token.render.scale.set(size*tileSize/token.render.width)
    let address = parseAddress(token.location[1])
    token.render.x = address[0]*tileSize
    token.render.y = address[1]*tileSize
    stage.addChild(token.render)
    addId(token,tokens)
    containers[container][slot].occupants[token.id] = token
}
function moveToken(tokenId,destination){
    let origin = tokens[tokenId].location
    
    tokens[tokenId].location = destination
    
    containers[destination[0]][destination[1]].occupants[tokenId] =
    containers[origin[0]][origin[1]].occupants[tokenId]
    delete containers[origin[0]][origin[1]].occupants[tokenId]
}
function deleteToken(tokenId){
    let origin = tokens[tokenId].location
    delete containers[origin[0]][origin[1]].occupants[tokenId]
    delete tokens[tokenId]
    

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
    return        [Number(address.substr(address.length-4,2)),
         Number(address.substr(address.length-2,2))]
}