register = {
    tags: {},
    paths: {},
    add: function(thing){
        //reject if path undefined. move occupants creation to container
        for(let index in thing.locations){
            let path = thing.locations[index]
            if(this.paths[path] == undefined){
                this.paths[path] = {}
                this.paths[path].occupants = {}
            }
            this.paths[path].occupants[thing.id] = thing
        }
        this.tags[thing.id] = thing
        return this
    },
    move: function (tag,addressTo,addressFrom) {
        let thing = register.findTag(tag)
        // for(let index in thing.locations){
            //add check that  addresses are correct
        
        if(addressFrom == undefined)
            addressFrom = register.findTag(tag).locations[0]
        let location = register.findLocation(addressFrom)
        let destination = register.findLocation(addressTo)
        destination.occupants[tag] = location.occupants[tag]
        delete location.occupants[tag]
        for(let index in thing.locations){
            if(thing.locations[index] == addressFrom)
                thing.locations[index] = addressTo
        }
        return this    
    },
    delete: function(tag){
        //throw if tag not found
        let thing = register.findTag(tag)
        for(let index in thing.locations){
            let location = register.findLocation(thing.locations[index])
            delete location.occupants[tag]
            delete register.tags[tag]
        }
        return this
    },
    findLocation: function(location){
        return this.paths[location]
    },
    findTag: function(tag){
        return this.tags[tag]
    },
    validate: function(){},
}
thingProto = {
    generateId: function(name){
        let index = 0
        while(register.tags[name+toHexString(index)] != undefined){
            index++
        }
        return name+toHexString(index)
    },
    addThing: function(){},
    moveThing: function(){
        //add stuf to fix move
    },
    scaleThing: function(){},
}
function createThing(name,location,type){
    const thing = Object.create(thingProto)
    thing.id = thing.generateId(name)
    Array.isArray(location) 
    ? thing.locations = location
    : thing.locations = [location]
    register.add(thing,location)
    thing.type = type
    return thing
}
function createToken(name,location,size){
    const thing = createThing(name,location,"Token")
    size == undefined
    ? thing.size = 1
    : thing.size = size
    console.log(thing)
    
    // scale(size)
}
function createContainer(name,location,u,v){
    const thing = createThing(name,location,"Container")
    thing.components = {}
    thing.occupants = {}
    thing.dimension = 0
    thing.scale = function(){}
	thing.moveLocal = function(){}
    thing.map =[[]]
}
function toHexString (index){
    return index.toString(16).padStart(2,0)
}
createContainer("grid",">")
createToken("joe","grid01_tile0000",2)
createThing("bobby",["grid01_tile0111","grid01_tile0212"])
register
    .move("bobby00","grid01_tile0000","grid01_tile0212")
    .move("joe00","grid01_tile0111")

// const ft = register.findTag
console.log(register)
