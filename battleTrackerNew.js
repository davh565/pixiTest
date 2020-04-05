let battleTracker = {}
let bt = battleTracker

let tileSize = 64
let gridWidth = 3
let gridHeight = 3

tokens = {}
containers = {}
pointers = {}

function setup(){
    function setupContainers(){
        function setupGrid(){
            let grid = {
                type: "grid"
            }
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
                    }
                }
                addId(grid,containers)
            }

        setupGrid()
    }
    function setupTokens(){
        addToken("Bob",["grid00","tile0001"])
        addToken("Bob",["grid00","tile0101"])
        addToken("Bill",["grid00","tile0101"])
    }
    function setupPointers(){}
    setupContainers()
    setupTokens()
    setupPointers()
    console.log("setup complete")
}
function loop(){
    function loopContainers(){}
    function loopTokens(){}
    function loopPointers(){}
    loopTokens()
    loopContainers()
    loopPointers()
}
function addToken(type,location){
    // location: [%CONTAINER%,%SLOT%]
    let container = location[0]
    let slot = location[1]
    let token = {
        type: type,
        location: location
    }
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
//

setup()
moveToken("Bob00",['grid00',"tile0202"])
console.log(containers.grid00)
deleteToken("Bob00")
console.log(containers.grid00)
while(true) loop()