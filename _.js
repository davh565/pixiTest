register = {
    tags: {},
    paths: {},
    add: function(thing){
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
        for(let index in thing.locations){
            //add check that origin address is correct?
            //make "from" param optional
            let location = register.findLocation(addressFrom)
            let destination = register.findLocation(addressTo)
            destination.occupants[tag] = location.occupants[tag]
            delete location.occupants[tag]
            thing.locations[index] = address
        }
        
    },
    delete: function(tag){
        let thing = register.findTag(tag)
        for(let index in thing.locations){
            let location = register.findLocation(thing.locations[index])
            delete location.occupants[tag]
            delete register.tags[tag]
        }
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
function createThing(name,location,size=1){
    const thing = Object.create(thingProto)
    thing.id = thing.generateId(name)
    Array.isArray(location) 
    ? thing.locations = location
    : thing.locations = [location]
    thing.size = size
    register.add(thing,location)
}
function createToken(name,location,size){}
function createContainer(name,location,size){}
function toHexString (index){
    return index.toString(16).padStart(2,0)
}

createThing("bobby",["grid01_tile0111","grid01_tile0212"])

// const ft = register.findTag
console.log(register.findTag("bobby00"))
console.log(register)
