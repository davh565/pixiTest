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
    move: function (tag,address) {
        let thing = register.findTag(tag)
        for(let index in thing.locations){
            let location = register.findLocation(thing.locations[index])
            let destination = register.findLocation(address)
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
    moveThing: function(){},
    scaleThing: function(){},
}
function createThing(name,location,size=1){
    const thing = Object.create(thingProto)
    thing.id = thing.generateId(name)
    thing.locations = [location]
    thing.size = size
    register.add(thing,location)
}
function createToken(name,location,size){}
function createContainer(name,location,size){}
function toHexString (index){
    return index.toString(16).padStart(2,0)
}


createThing("bobby","grid01_tile0212")
createThing("bobby","grid01_tile0212")
createThing("billy","grid01_tile0212")
createThing("kim","grid01_tile0000")
let kim = register.findTag("kim00")
register.move("kim00","grid01_tile0212")
register.delete("bobby00")
console.log(register)
console.log(register.findLocation("grid01_tile0212").occupants)
console.log(register.findTag("bobby01"))
console.log(register.findTag("bobby00"))